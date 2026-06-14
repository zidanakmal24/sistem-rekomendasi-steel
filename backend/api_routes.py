from fastapi import APIRouter
from pydantic import BaseModel
import ml_models

router = APIRouter()

class PredictRequest(BaseModel):
    weekStatus: str
    dayOfWeek: str
    loadType: str
    hour: int
    nsm: int
    powerFactor: float
    reactivePower: float

@router.get("/overview")
def get_overview():
    kpis = ml_models.get_kpis()
    trend = ml_models.get_trend_data()
    distribution = ml_models.get_distribution_data()
    return {"kpis": kpis, "trend": trend, "distribution": distribution}

@router.get("/analytics")
def get_analytics():
    dow = ml_models.get_day_of_week_data()
    return {"dayOfWeek": dow}

@router.get("/clustering")
def get_clustering():
    scatter, profiles = ml_models.get_clustering_data()
    return {"scatter": scatter, "profiles": profiles}

@router.post("/predict")
def predict(request: PredictRequest):
    # Convert Pydantic model to dictionary for prediction
    params = {
        "WeekStatus": request.weekStatus,
        "Day_Of_Week": request.dayOfWeek,
        "Load_Type": request.loadType,
        "Hour": request.hour,
        "NSM": request.nsm,
        "PowerFactor": request.powerFactor,
        "ReactivePower": request.reactivePower
    }
    result = ml_models.predict_energy(params)
    return result

@router.post("/recommend")
def recommend(constraints: dict):
    # Simplified recommendation engine
    # In reality, this would search the df for valid windows
    # Here we'll just return a mock response that depends on maxEnergy
    max_energy = float(constraints.get('maxEnergy', 100))
    if max_energy < 20:
        return {"results": []}
        
    return {"results": [
        {"id": 1, "hour": "02:00", "loadType": "Light Load", "estUsage": 25.4, "estCO2": 10.6, "powerFactor": 95.2},
        {"id": 2, "hour": "03:00", "loadType": "Light Load", "estUsage": 26.1, "estCO2": 11.2, "powerFactor": 94.8}
    ]}
