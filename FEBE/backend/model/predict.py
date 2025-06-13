from .load_model import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

model, tokenizer, maxlen = load_model()

def predict_hoax(text: str) -> dict:
    if tokenizer is None or maxlen is None:
        raise ValueError("Tokenizer atau maxlen tidak tersedia")

    try:
        seq = tokenizer.texts_to_sequences([text])
        padded = pad_sequences(seq, maxlen=maxlen)

        prediction = model.predict(padded)
        prob = float(prediction[0][0])

        label = "Hoax" if prob >= 0.5 else "Not Hoax"
        confidence = round(prob * 100, 2) if label == "Hoax" else round((1 - prob) * 100, 2)

        print(f"[predict_hoax] Text: {text}")
        print(f"[predict_hoax] Prob: {prob:.4f}, Label: {label}, Confidence: {confidence}%")

        return {
            "label": label,
            "confidence": confidence
        }

    except Exception as e:
        print(f"[predict_hoax] Error: {e}")
        raise e
