from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import util

#from slowapi import Limiter

app = FastAPI()

# enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://mediskinai.vercel.app",
    ], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

@app.on_event("startup")
async def load_data():
    util.load_artifacts()

@app.post("/detect_skin_lesion")
#@limiter.limit("5/minute")
async def detect_skin_lesion(file: UploadFile = File(...)):
    """
    Upload an image file to detect if skin lesion is cancer.
    
    - **file**: An image file (PNG, JPG, etc.) containing the skin lesion.
    - **Returns**: A JSON response with the diagnosis and confidence score.
    """

    try:

        result = util.get_skin_lesion(file.file)

        return result
    
    finally:
        await file.close() 