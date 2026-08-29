# pick-pack
# Tech Stack
## Frontend
React, Vite, Node.js, JavaScript / TypeScript
## Backend
Python, FastAPI, Uvicorn
# Installation
## Frontend
Navigate to the frontend folder:
```bash
cd frontend
```
## Install the dependencies:
```bash
npm install
```
## Run the development server:
```bash
npm run dev
```
# Backend
## Open a new terminal and navigate to the backend folder:
```bash
cd backend
```
## Create and activate a virtual environment:
Windows:
```bash
python -m venv venv
venv\Scripts\activate
```
Linux / macOS:
```bash
python3 -m venv venv
source venv/bin/activate
```
## Install the Python dependencies:
```bash
pip install -r requirements.txt
```
## Make sure Ollama is installed and running, then pull the Llama 3.2 3B model:
```bash
ollama pull llama3.2:3b
```
## Run the FastAPI server:
```bash
uvicorn main:app --reload
```
# AI Model
The chatbot is powered by Llama 3.2 3B.

Please note that the chatbot is still under development and may have limitations in terms of accuracy, response quality, and overall performance. There are still several areas that can be improved, and future development will focus on making the chatbot more reliable, accurate, and capable.
# Live demo
[![Live Demo](https://img.youtube.com/vi/TuTdM6Dctvw/hqdefault.jpg)](https://youtu.be/TuTdM6Dctvw)

