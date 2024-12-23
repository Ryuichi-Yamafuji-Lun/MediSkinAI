# tests to see if server works
import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from server.server import app
from server import util
from PIL import Image
import torch
import io

client = TestClient(app)

# Load artifacts before running tests
@pytest.fixture(scope="session", autouse=True)
def load_artifacts():
    util.load_artifacts()

@pytest.fixture
def mock_util():
    with patch("server.util.get_skin_lesion") as mock_get_skin_lesion:
        yield mock_get_skin_lesion

# Test for valid image input
def test_detect_skin_lesion_valid_image(mock_util):
    mock_util.return_value = {
        "diagnosis": "melanoma",
        "confidence": 92.5
    }

    # Simulate a valid image file upload
    file = {"file": ("test.jpg", b"fake_image_data", "image/jpeg")}
    response = client.post("/detect_skin_lesion", files=file)

    assert response.status_code == 200
    data = response.json()
    assert "diagnosis" in data
    assert "confidence" in data
    assert data["diagnosis"] == "melanoma"
    assert data["confidence"] == 92.5

# Test for missing file
def test_detect_skin_lesion_missing_file():
    response = client.post("/detect_skin_lesion", files={})
    assert response.status_code == 422

# Test the utility function for get_skin_lesion
def test_get_skin_lesion():
    with patch("server.util.__model") as mock_model, patch("server.util.__dx_mapping") as mock_mapping:
        # Mock model and mapping behavior
        mock_model.return_value = torch.tensor([[0.1, 0.9]])
        mock_mapping.__getitem__.return_value = "melanoma"

        # Mock image loading and transformation
        mock_image = MagicMock()
        with patch("server.util.Image.open", return_value=mock_image) as mock_open:
            with patch("server.util.T.Compose") as mock_transform:
                mock_transform.return_value = lambda x: torch.rand(1, 3, 224, 224)
                
                from server.util import get_skin_lesion
                with io.BytesIO(b"fake_image_data") as image_file:
                    result = get_skin_lesion(image_file)

                assert result["diagnosis"] == "melanoma"
                assert 0 <= result["confidence"] <= 100
