# server.py
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import easyocr
import cv2
import numpy as np
import uvicorn
from tempfile import NamedTemporaryFile
import os
from typing import Dict

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Modify this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_text_from_image(image_path: str) -> tuple[str, list]:
    reader = easyocr.Reader(['en'])
    image = cv2.imread(image_path)
    results = reader.readtext(image)
    
    extracted_text = ""
    for (bbox, text, prob) in results:
        extracted_text += f"{text} "
    
    return extracted_text.strip(), results

@app.post("/extract-text")
async def extract_text(file: UploadFile = File(...)) -> Dict[str, str]:
    try:
        # Create a temporary file to store the uploaded image
        with NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp_file:
            # Read the uploaded file content
            content = await file.read()
            # Write it to the temporary file
            temp_file.write(content)
            temp_file.flush()
            
            # Process the image
            extracted_text, _ = extract_text_from_image(temp_file.name)
            
            # Clean up the temporary file
            os.unlink(temp_file.name)
            
            return {"text": extracted_text}
            
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)