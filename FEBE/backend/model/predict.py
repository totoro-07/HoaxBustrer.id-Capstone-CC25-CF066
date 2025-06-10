# backend/model/predict.py
from .load_model import load_model

model, vectorizer = load_model()

def predict_hoax(text: str) -> str:
    vec = vectorizer.transform([text])
    prediction = model.predict(vec)[0]
    return "Hoax" if prediction == 1 else "Not Hoax"
