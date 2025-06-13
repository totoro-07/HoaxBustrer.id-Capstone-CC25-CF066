import os
import joblib  # atau pickle juga bisa
import tensorflow as tf

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
MODEL_PATH = os.path.join(BASE_DIR, '..', 'model_hoax.h5')
TOKENIZER_PATH = os.path.join(BASE_DIR, '..', 'tokenizer.pkl')

def load_model():
    # Load model Keras
    model = tf.keras.models.load_model(MODEL_PATH)

    # Load tokenizer dan maxlen
    try:
        data = joblib.load(TOKENIZER_PATH)  # pastikan isinya dict: {"tokenizer": ..., "maxlen": ...}
        tokenizer = data["tokenizer"]
        maxlen = data["maxlen"]
        print("✅ Tokenizer berhasil dimuat!")
    except Exception as e:
        print(f"❌ Gagal memuat tokenizer - {e}")
        tokenizer = None
        maxlen = None

    return model, tokenizer, maxlen
