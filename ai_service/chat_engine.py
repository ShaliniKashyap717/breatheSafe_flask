import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()


class ChatEngine:
    def __init__(self, memory_manager):
        """Initialize chat engine with memory manager."""
        self.memory_manager = memory_manager
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = genai.GenerativeModel("gemini-pro")

    def _search_context(self, user_id: str, user_query: str, top_k: int = 3) -> list:
        """Search Pinecone for top K similar logs filtered by userId."""
        query_embedding = self.memory_manager._generate_embedding(user_query)
        
        results = self.memory_manager.index.query(
            vector=query_embedding,
            top_k=top_k,
            filter={"userId": {"$eq": user_id}},
            include_metadata=True
        )
        
        return results.get("matches", [])

    def _format_context(self, matches: list) -> str:
        """Format retrieved logs as context string."""
        if not matches:
            return "No previous health records found."
        
        context_parts = []
        for match in matches:
            metadata = match.get("metadata", {})
            context_parts.append(
                f"- {metadata.get('text', '')} (Recorded: {metadata.get('timestamp', 'N/A')})"
            )
        
        return "\n".join(context_parts)

    def generate_response(self, user_id: str, user_query: str) -> str:
        """Generate RAG-based response using Gemini."""
        matches = self._search_context(user_id, user_query)
        context = self._format_context(matches)
        
        prompt = (
            f"You are the BreatheSafe Assistant. Based on this history:\n"
            f"{context}\n\n"
            f"Answer the following query: {user_query}"
        )
        
        response = self.model.generate_content(prompt)
        return response.text
