from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, validator
import os
from dotenv import load_dotenv
from memory_manager import MemoryManager
from chat_engine import ChatEngine

load_dotenv()

app = FastAPI()

# Initialize services
try:
    memory_manager = MemoryManager()
    chat_engine = ChatEngine(memory_manager)
except Exception as e:
    raise RuntimeError(f"Failed to initialize services: {str(e)}")


class LogData(BaseModel):
    aqi: float = Field(..., ge=0, le=500, description="Air Quality Index (0-500)")
    risk: str = Field(..., description="Risk level")
    location: str = Field(..., min_length=1, max_length=200, description="Location name")
    
    @validator('risk')
    def validate_risk(cls, v):
        valid_risks = {"low", "moderate", "high", "very_high", "hazardous"}
        if v.lower() not in valid_risks:
            raise ValueError(f"Risk must be one of {valid_risks}")
        return v.lower()


class HealthLog(BaseModel):
    user_id: str = Field(..., min_length=1, max_length=100, description="User ID")
    log_data: LogData


class ChatQuery(BaseModel):
    user_id: str = Field(..., min_length=1, max_length=100, description="User ID")
    message: str = Field(..., min_length=1, max_length=1000, description="User query")


class ChatResponse(BaseModel):
    response: str
    sources_found: int


@app.post("/sync")
async def sync_health_log(log: HealthLog):
    """Receive and store health logs in Pinecone."""
    try:
        memory_manager.sync_log(
            user_id=log.user_id,
            aqi=log.log_data.aqi,
            risk=log.log_data.risk,
            location=log.log_data.location
        )
        return {"status": "success", "message": "Health log synced"}
    except ConnectionError as e:
        raise HTTPException(
            status_code=503,
            detail=f"Pinecone connection error: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to sync health log: {str(e)}"
        )


@app.post("/chat", response_model=ChatResponse)
async def chat(query: ChatQuery):
    """Handle user queries with RAG-based responses."""
    try:
        response_text, sources_count = chat_engine.generate_response(
            user_id=query.user_id,
            user_query=query.message
        )
        return ChatResponse(response=response_text, sources_found=sources_count)
    except ConnectionError as e:
        raise HTTPException(
            status_code=503,
            detail=f"Pinecone connection error: {str(e)}"
        )
    except Exception as e:
        if "429" in str(e) or "rate limit" in str(e).lower():
            raise HTTPException(
                status_code=429,
                detail="Gemini rate limit exceeded. Please try again later."
            )
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate response: {str(e)}"
        )


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


if __name__ == "__main__":
    import importlib
    try:
        uvicorn = importlib.import_module("uvicorn")
    except ImportError:
        raise RuntimeError(
            "uvicorn is not installed; run the server with: "
            "python -m uvicorn ai_service.main:app --host 0.0.0.0 --port 8002"
        ) from None
    uvicorn.run(app, host="0.0.0.0", port=8002)
