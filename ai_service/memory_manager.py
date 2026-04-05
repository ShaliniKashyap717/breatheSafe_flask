import os
from datetime import datetime
from pinecone import Pinecone, ServerlessSpec
import google.generativeai as genai
from dotenv import load_dotenv
import logging

load_dotenv()
logger = logging.getLogger(__name__)


class MemoryManager:
    def __init__(self):
        """Initialize Pinecone with 768 dimensions and Gemini."""
        try:
            self.pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
            self.index_name = os.getenv("PINECONE_INDEX_NAME", "breathesafe")
            
            # Initialize index with 768 dimensions if it doesn't exist
            if self.index_name not in self.pc.list_indexes().names():
                self.pc.create_index(
                    name=self.index_name,
                    dimension=768,
                    metric="cosine",
                    spec=ServerlessSpec(cloud="aws", region="us-east-1")
                )
            
            self.index = self.pc.Index(self.index_name)
            genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
            self.embed_model = "models/text-embedding-004"
        except Exception as e:
            logger.error(f"Failed to initialize MemoryManager: {str(e)}")
            raise ConnectionError(f"Pinecone initialization failed: {str(e)}")

    def _generate_embedding(self, text: str) -> list:
        """Generate embedding using Gemini's text-embedding-004."""
        try:
            response = genai.embed_content(
                model=self.embed_model,
                content=text
            )
            return response["embedding"]
        except Exception as e:
            logger.error(f"Embedding generation failed: {str(e)}")
            raise

    def _get_recommendation(self, risk: str, aqi: float) -> str:
        """Generate health recommendation based on risk level and AQI."""
        recommendations = {
            "low": "Continue normal outdoor activities. Air quality is good.",
            "moderate": "Sensitive groups should consider limiting prolonged outdoor exertion.",
            "high": "Reduce outdoor activities. Wear an N95 mask if you must go outside.",
            "very_high": "Avoid outdoor activities. Stay indoors with air filtration if possible.",
            "hazardous": "Do not go outside. Keep windows closed and use air purifiers indoors."
        }
        return recommendations.get(risk.lower(), "Monitor air quality updates regularly.")

    def _create_narrative(self, aqi: float, risk: str, location: str, timestamp: str) -> str:
        """Create a narrative string from raw health log data."""
        from datetime import datetime as dt
        
        # Parse timestamp to readable date
        try:
            date_obj = dt.fromisoformat(timestamp)
            date_str = date_obj.strftime("%B %d, %Y at %I:%M %p")
        except:
            date_str = timestamp
        
        recommendation = self._get_recommendation(risk, aqi)
        
        narrative = (
            f"On {date_str}, at {location}, the Air Quality Index (AQI) was {aqi}. "
            f"The air quality was rated as {risk}. "
            f"Recommendation: {recommendation}"
        )
        return narrative

    def sync_log(self, user_id: str, aqi: float, risk: str, location: str) -> None:
        """Sync health log to Pinecone with metadata."""
        try:
            timestamp = datetime.utcnow().isoformat()
            narrative = self._create_narrative(aqi, risk, location, timestamp)
            embedding = self._generate_embedding(narrative)
            
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
                            "text_summary": narrative
                        }
                    }
                ]
            )
        except Exception as e:
            logger.error(f"Failed to sync log: {str(e)}")
            raise
