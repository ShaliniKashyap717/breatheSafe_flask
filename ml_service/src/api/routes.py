from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from src.engine.inference import Predictor

router = APIRouter()
engine = Predictor()

class RiskRequest(BaseModel):
    pm2_5: float
    pm10: float
    no2: float
    nox: float
    no: float
    at: float
    ozone: float
    co: float
    nh3: float
    so2: float
    benzene: float
    toluene: float
    xylene: float
    
    temp: float
    rh: float
    ws: float
    wd: float
    sr: float
    rf: float
    bp: float
    vws: float
    
    age: int
    mask_type: int = Field(..., ge=0, le=3)
    is_smoker: int = Field(..., ge=0, le=1)
    has_asthma: int = Field(..., ge=0, le=1)

@router.post("/predict")
async def predict_risk(request: RiskRequest):
    try:
        input_data = request.dict()
        result = engine.run(input_data)
        
        return {
            "status": "success",
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))