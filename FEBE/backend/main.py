# backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from model.predict import predict_hoax

app = FastAPI()

class TextInput(BaseModel):
    text: str

@app.get("/")
def read_root():
    return {"message": "Hoax Detection API is running"}

@app.post("/predict")
def predict(input: TextInput):
    result = predict_hoax(input.text)
    return {"prediction": result}

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Tambahkan middleware agar frontend bisa akses backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

