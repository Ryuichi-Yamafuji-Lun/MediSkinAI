from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from server import util 

app = FastAPI()

# enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

@app.on_event("startup")
async def load_data():
    util.load_artifacts()

@app.post("/detect_skin_lesion")
async def detect_skin_lesion(file: UploadFile = File(...)):
    try:

        result = util.get_skin_lesion(file.file)

        return result
    
    finally:
        await file.close() 