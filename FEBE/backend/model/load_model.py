# backend/model/load_model.py

import pickle
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
MODEL_PATH = os.path.join(BASE_DIR, '..', 'model_hoax.pkl')
VECTORIZER_PATH = os.path.join(BASE_DIR, '..', 'tfidf_vectorizer.pkl')  # Jika nanti ada

def load_model():
    with open(os.path.abspath(MODEL_PATH), 'rb') as f:
        model = pickle.load(f)

    # Kalau belum ada tfidf_vectorizer.pkl, sementara bisa skip baris di bawah ini
    try:
        with open(os.path.abspath(VECTORIZER_PATH), 'rb') as f:
            vectorizer = pickle.load(f)
    except FileNotFoundError:
        print("Warning: tfidf_vectorizer.pkl not found. Make sure to add it.")
        vectorizer = None

    return model, vectorizer
