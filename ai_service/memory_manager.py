import os
from datetime import datetime
from pinecone import Pinecone
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()


class MemoryManager:
    def __init__(self):
        """Initialize Pinecone and Gemini."""
        self.pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
        self.index_name = os.getenv("PINECONE_INDEX_NAME", "breathesafe")
        self.index = self.pc.Index(self.index_name)
        
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.embed_model = "models/text-embedding-004"

    def _generate_embedding(self, text: str) -> list:
        """Generate embedding using Gemini's text-embedding-004."""
        response = genai.embed_content(
            model=self.embed_model,
            content=text
        )
        return response["embedding"]

    def _create_log_text(self, aqi: float, risk: str, location: str) -> str:
        """Convert log JSON into a descriptive string."""
        return (
            f"Air Quality Index: {aqi}. Risk Level: {risk}. "
            f"Location: {location}."
        )

    def sync_log(self, user_id: str, aqi: float, risk: str, location: str) -> None:
        """Sync health log to Pinecone with metadata."""
        log_text = self._create_log_text(aqi, risk, location)
        embedding = self._generate_embedding(log_text)
        
        timestamp = datetime.utcnow().isoformat()
        vector_id = f"{user_id}_{timestamp}"
        
        self.index.upsert(
            vectors=[
                {
                    "id": vector_id,
                    "values": embedding,
                    "metadata": {
                        "userId": user_id,
                        "timestamp": timestamp,
                        "aqi": aqi,
                        "risk": risk,
                        "location": location,
                        "text": log_text
                    }
                }
            ]
        )
