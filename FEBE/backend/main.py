from fastapi import FastAPI, HTTPException, Depends, Header, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr
from model.predict import predict_hoax
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
import os

# Setup FastAPI
app = FastAPI()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Gunakan ["http://localhost:5173"] jika ingin lebih ketat
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create API router with prefix /api
api_router = APIRouter()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Fake user database (sementara, disimpan di memori)
fake_users_db = {}

# Konfigurasi JWT
SECRET_KEY = "rahasia"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Data model untuk input
class TextInput(BaseModel):
    text: str

class RegisterInput(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginInput(BaseModel):
    email: EmailStr
    password: str

# Fungsi untuk verifikasi token
def verify_token(authorization: str = Header(...)):
    try:
        scheme, _, token = authorization.partition(" ")
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid auth scheme")

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# API endpoints under /api prefix
@api_router.get("/")
def read_root():
    return {"message": "Hoax Detection API is running"}

@api_router.post("/predict")
def predict(input: TextInput):
    try:
        result = predict_hoax(input.text)
        return {"error": False, "prediction": result}
    except Exception as e:
        print(f"[ERROR] Predict failed: {e}")  # <-- ini penting!
        raise HTTPException(status_code=500, detail="Prediction error")

@api_router.post("/register")
def register(input: RegisterInput):
    if input.email in fake_users_db:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(input.password)
    fake_users_db[input.email] = {
        "name": input.name,
        "email": input.email,
        "hashed_password": hashed_password
    }
    return {"error": False, "message": "User registered successfully"}

@api_router.post("/login")
def login(input: LoginInput):
    user = fake_users_db.get(input.email)
    if not user or not pwd_context.verify(input.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token_data = {
        "sub": user["email"],
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "error": False,
        "loginResult": {
            "name": user["name"],
            "token": token
        }
    }

@api_router.post("/hoax-check/guest")
def check_hoax_guest(input: TextInput):
    result = predict_hoax(input.text)
    return {
        "error": False,
        "prediction": result
    }

# Include API router with prefix /api
app.include_router(api_router, prefix="/api")

# Mount the entire dist folder as static files at root
frontend_dist_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "Frontend", "dist")
app.mount("/", StaticFiles(directory=frontend_dist_path, html=True), name="frontend")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
