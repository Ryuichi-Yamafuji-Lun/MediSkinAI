from fastapi import FastAPI, File, HTTPException, Request, UploadFile
from PIL import UnidentifiedImageError
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
import logging
from contextlib import asynccontextmanager
import util
from agent import mediskinai_graph_app

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MAX_UPLOAD_BYTES = 10 * 1024 * 1024


def get_client_ip(request: Request) -> str:
    # Behind Cloud Run every request comes from Google's proxy, so request.client.host
    # would put all users in one bucket. Google appends the real client IP as the
    # last X-Forwarded-For entry (earlier entries can be spoofed by the client).
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[-1].strip()
    return request.client.host if request.client else "unknown"


# in-memory per instance, which is enough to stop one client hammering the model
limiter = Limiter(key_func=get_client_ip)

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        logger.info("⏳ Attempting to load artifacts...")
        util.load_artifacts()
        logger.info("✅ Artifacts loaded successfully!")
    except Exception as e:
        logger.error(f"🔥 CRITICAL STARTUP ERROR: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
    yield


app = FastAPI(lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://mediskinai.vercel.app",
    ],
    # no cookies or auth headers are used, so don't allow credentialed requests
    allow_credentials=False,
    allow_methods=["POST"],
    allow_headers=["*"],
)

@app.post("/detect_skin_lesion")
@limiter.limit("10/minute")
async def detect_skin_lesion(request: Request, file: UploadFile = File(...)):
    """
    Upload an image file to detect if skin lesion is cancer.
    
    - **file**: An image file (PNG, JPG, etc.) containing the skin lesion.
    - **Returns**: A JSON response with the classification and confidence score.
    """

    try:
        image_bytes = await file.read(MAX_UPLOAD_BYTES + 1)
        if len(image_bytes) > MAX_UPLOAD_BYTES:
            raise HTTPException(status_code=413, detail="Image is too large. Please upload an image under 10 MB.")

        try:
            result = mediskinai_graph_app.invoke({"image_data": image_bytes})
        except UnidentifiedImageError:
            raise HTTPException(status_code=400, detail="We couldn't read that image. Please upload a JPG or PNG photo.")

        final_response = {
            "classification": result.get("classification"),
            "confidence": result.get("confidence"),
            "explanation": result.get("explanation")
        }

        return final_response
    
    finally:
        await file.close() 