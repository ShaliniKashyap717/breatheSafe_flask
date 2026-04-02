from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from memory_manager import MemoryManager
from chat_engine import ChatEngine

load_dotenv()

app = FastAPI()

# Initialize services
memory_manager = MemoryManager()
chat_engine = ChatEngine(memory_manager)


class HealthLog(BaseModel):
    userId: str
    aqi: float
    risk: str
    location: str


class ChatQuery(BaseModel):
    userId: str
    query: str


@app.post("/sync")
async def sync_health_log(log: HealthLog):
    """Receive and store health logs in Pinecone."""
    try:
        memory_manager.sync_log(
            user_id=log.userId,
            aqi=log.aqi,
            risk=log.risk,
            location=log.location
        )
        return {"status": "success", "message": "Health log synced"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/chat")
async def chat(query: ChatQuery):
    """Handle user queries with RAG-based responses."""
    try:
        response = chat_engine.generate_response(
            user_id=query.userId,
            user_query=query.query
        )
        return {"status": "success", "response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
