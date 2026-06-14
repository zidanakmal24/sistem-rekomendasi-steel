import uvicorn
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import ml_models
from api_routes import router

app = FastAPI(title="Steel Industry API", version="1.0")

# Enable CORS for React frontend (Vite usually runs on port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    # Initialize the Machine Learning models
    ml_models.init_ml()

app.include_router(router, prefix="/api")

# Serve React static files if the 'static' folder exists
if os.path.isdir("static"):
    app.mount("/", StaticFiles(directory="static", html=True), name="static")

    @app.exception_handler(404)
    async def custom_404_handler(request, exc):
        return FileResponse("static/index.html")
else:
    @app.get("/")
    def read_root():
        return {"message": "Steel Industry Optimization API is running (Frontend not built)"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
