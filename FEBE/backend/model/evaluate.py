from .predict import predict_hoax


samples = [
    "Pemerintah menyalurkan bantuan tunai langsung kepada warga.",
    "Ini hoax! Jangan percaya vaksin bisa mengendalikan pikiran.",
    "WHO menyatakan pandemi COVID-19 sudah berakhir pada 2023.",
]

for text in samples:
    result = predict_hoax(text)
    print(f"\nText: {text}")
    print(f"Prediction: {result}")
