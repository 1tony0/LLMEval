from fastapi import FastAPI, HTTPException
from sqlalchemy.orm import Session
from models import PromptResponse, SessionLocal
from db.database import create_db_and_tables
import requests
import time

app = FastAPI()

# Load API key from .env file
import os
from dotenv import load_dotenv

load_dotenv()
GROQ_API_KEY = os.getenv(GROQ_API_KEY)


# Initialize database
@app.on_event("startup")
def startup_event():
    create_db_and_tables()

@app.post("/evaluate")
def evaluate(prompt: str, db: Session = SessionLocal()):
    try:
        # Start response time logging
        start_time = time.time()
        response = requests.post(
            GROQ_API_URL,
            json={"prompt": prompt},
            headers={"Authorization": f"Bearer {GROQ_API_KEY}"}
        )
        end_time = time.time()

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Groq API Error")

        data = response.json()
        llm_response = data["choices"][0]["text"]
        response_time = end_time - start_time

        # Store results in database
        result = PromptResponse(
            prompt=prompt,
            response=llm_response,
            response_time=response_time
        )
        db.add(result)
        db.commit()

        return {
            "response": llm_response,
            "response_time": response_time
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
