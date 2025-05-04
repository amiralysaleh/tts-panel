from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from automation import generate_speech
import os

app = FastAPI()

class TTSRequest(BaseModel):
    text: str
    voice: str

@app.post("/api/tts")
async def text_to_speech(request: TTSRequest):
    try:
        output_file = await generate_speech(request.text, request.voice)
        return {"status": "success", "file_url": f"/downloads/{os.path.basename(output_file)}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "healthy"}
