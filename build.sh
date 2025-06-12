#!/bin/bash

# Build frontend
echo "Building frontend..."
cd FEBE/Frontend
npm install
npm run build

# Copy built frontend to backend directory
echo "Copying frontend build to backend..."
cd ../..
cp -r FEBE/Frontend/dist FEBE/backend/

# Install backend dependencies
echo "Installing backend dependencies..."
cd FEBE/backend
pip install -r requirements.txt

echo "Build completed!"
