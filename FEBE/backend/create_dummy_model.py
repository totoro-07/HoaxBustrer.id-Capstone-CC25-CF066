# backend/create_dummy_model.py

import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Dummy data
texts = ["berita ini bohong", "ini berita valid", "penipuan terjadi", "informasi terpercaya"]
labels = [1, 0, 1, 0]  # 1 = hoax, 0 = not hoax

# Buat vectorizer dan model sederhana
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

model = LogisticRegression()
model.fit(X, labels)

# Simpan ke pickle
with open("model_hoax.pkl", "wb") as f:
    pickle.dump(model, f)

with open("tfidf_vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print("✅ Dummy model dan vectorizer berhasil dibuat.")
