from fastapi import FastAPI
from src.api.routes import router as ml_router

app = FastAPI(
    title="BreatheSafe ML Microservice",
    version="1.0.0"
)

app.include_router(ml_router, prefix="/api/v1", tags=["Health Risk Prediction"])

@app.get("/health")
def health_check():
    return {"status": "online", "model_version": "1.0.0_ensemble"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)