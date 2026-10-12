# tests to see if server works
# run from the server/ directory: python -m pytest test_server.py
import importlib.util
import io
import os
import sys

import pytest
from fastapi.testclient import TestClient
from PIL import Image
from unittest.mock import patch

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.chdir(os.path.dirname(os.path.abspath(__file__)))  # model/ paths are relative

import util  # noqa: E402
import agent  # noqa: E402

# load server.py by path: "import server" would resolve to the server/ package itself
_spec = importlib.util.spec_from_file_location("mediskin_server", "server.py")
server = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(server)

client = TestClient(server.app)


def make_image_bytes(fmt="JPEG"):
    buf = io.BytesIO()
    Image.new("RGB", (64, 64), (200, 150, 120)).save(buf, format=fmt)
    return buf.getvalue()


@pytest.fixture(autouse=True)
def reset_rate_limit():
    server.limiter.reset()
    yield


@pytest.fixture
def mock_llm():
    """Replace the Gemini call so tests never hit the network."""
    with patch.object(agent, "ChatGoogleGenerativeAI") as mock_cls:
        mock_cls.return_value.invoke.return_value.content = "mock explanation"
        yield mock_cls


@pytest.fixture
def mock_classifier():
    with patch.object(util, "get_skin_lesion") as mock_get:
        mock_get.return_value = {"classification": "malignant", "confidence": 92.5}
        yield mock_get


def post_image(data, name="test.jpg", content_type="image/jpeg", headers=None):
    return client.post(
        "/detect_skin_lesion",
        files={"file": (name, data, content_type)},
        headers=headers or {},
    )


def test_detect_skin_lesion_valid_image(mock_classifier, mock_llm):
    response = post_image(make_image_bytes())

    assert response.status_code == 200
    assert response.json() == {
        "classification": "malignant",
        "confidence": 92.5,
        "explanation": "mock explanation",
    }


def test_detect_skin_lesion_missing_file():
    response = client.post("/detect_skin_lesion", files={})
    assert response.status_code == 422


def test_invalid_image_returns_400(mock_llm):
    response = post_image(b"definitely not an image")
    assert response.status_code == 400
    assert "couldn't read" in response.json()["detail"]


def test_oversized_upload_returns_413():
    response = post_image(b"0" * (server.MAX_UPLOAD_BYTES + 1))
    assert response.status_code == 413


def test_llm_failure_still_returns_classification(mock_classifier, mock_llm):
    mock_llm.return_value.invoke.side_effect = RuntimeError("quota exceeded")

    response = post_image(make_image_bytes())

    assert response.status_code == 200
    data = response.json()
    assert data["classification"] == "malignant"
    assert data["explanation"]


def test_rate_limit_is_per_client_ip(mock_classifier, mock_llm):
    first = {"X-Forwarded-For": "203.0.113.1"}
    for _ in range(5):
        assert post_image(make_image_bytes(), headers=first).status_code == 200
    assert post_image(make_image_bytes(), headers=first).status_code == 429

    # a different client is unaffected
    other = {"X-Forwarded-For": "203.0.113.2"}
    assert post_image(make_image_bytes(), headers=other).status_code == 200


def test_rate_limit_ignores_spoofed_forwarded_entries(mock_classifier, mock_llm):
    for i in range(5):
        headers = {"X-Forwarded-For": f"10.0.0.{i}, 203.0.113.9"}
        assert post_image(make_image_bytes(), headers=headers).status_code == 200
    headers = {"X-Forwarded-For": "10.0.0.99, 203.0.113.9"}
    assert post_image(make_image_bytes(), headers=headers).status_code == 429


def test_site_wide_daily_cap(mock_classifier, mock_llm):
    with patch.object(server.limiter, "enabled", True):
        # many different IPs, each well under the per-client limit
        statuses = [
            post_image(make_image_bytes(), headers={"X-Forwarded-For": f"198.51.{i // 250}.{i % 250}"}).status_code
            for i in range(301)
        ]
    assert statuses[:300] == [200] * 300
    assert statuses[300] == 429


def test_get_skin_lesion_with_real_model():
    util.load_artifacts()

    result = util.get_skin_lesion(make_image_bytes("PNG"))

    assert result["classification"] in {"benign", "malignant", "Benign", "Malignant"}
    assert 0 <= result["confidence"] <= 100


def test_get_skin_lesion_rejects_garbage():
    util.load_artifacts()
    with pytest.raises(Exception) as exc:
        util.get_skin_lesion(b"garbage")
    # the original decode error must surface, not an UnboundLocalError from cleanup
    assert not isinstance(exc.value, UnboundLocalError)

