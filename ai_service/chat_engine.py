import os
import google.generativeai as genai
from dotenv import load_dotenv
import logging

load_dotenv()
logger = logging.getLogger(__name__)


class ChatEngine:
    def __init__(self, memory_manager):
        """Initialize chat engine with memory manager."""
        self.memory_manager = memory_manager
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = genai.GenerativeModel("gemini-1.5-pro")
        
        self.system_prompt = (
            "You are the BreatheSafe Assistant, a compassionate and knowledgeable AI "
            "specialized in air quality health guidance. Your responses must be:\n"
            "1. Concise and actionable (3-5 sentences max)\n"
            "2. Medical-grade accurate (cite reputable sources when possible)\n"
            "3. Empathetic and supportive in tone\n"
            "4. Focused on practical health recommendations\n\n"
            "Important: If you have access to the user's health history below, prioritize "
            "personalized advice based on their specific patterns. If no history is available, "
            "acknowledge this and provide general air quality health guidance.\n"
        )

    def _search_context(self, user_id: str, user_query: str, top_k: int = 3) -> list:
        """Search Pinecone for top K similar logs filtered by userId as hard filter."""
        query_embedding = self.memory_manager._generate_embedding(user_query)
        
        results = self.memory_manager.index.query(
            vector=query_embedding,
            top_k=top_k,
            filter={"userId": {"$eq": user_id}},
            include_metadata=True
        )
        
        return results.get("matches", [])

    def _format_context(self, matches: list) -> str:
        """Format retrieved logs as context string with narrative summaries."""
        if not matches:
            return "[No specific health history found in BreatheSafe records]"
        
        context_parts = ["Your Health History:"]
        for idx, match in enumerate(matches, 1):
            metadata = match.get("metadata", {})
            text_summary = metadata.get("text_summary", metadata.get("text", ""))
            similarity_score = match.get("score", 0)
            
            context_parts.append(
                f"{idx}. {text_summary}\n   [Relevance: {similarity_score:.2f}]"
            )
        
        return "\n".join(context_parts)

    def generate_response(self, user_id: str, user_query: str) -> tuple:
        """Generate RAG-based response using Gemini 1.5 Pro with enhanced prompting.
        
        Returns:
            tuple: (response_text, sources_count)
        """
        try:
            matches = self._search_context(user_id, user_query)
            context = self._format_context(matches)
            sources_count = len(matches)
            
            has_history = "[No specific history found in records]" not in context
            history_note = "" if has_history else "\n[Note: Providing general guidance as no personal history is available.]"
            
            prompt = (
                f"{self.system_prompt}\n"
                f"---\n"
                f"{context}\n"
                f"---\n"
                f"User Query: {user_query}"
                f"{history_note}\n\n"
                f"Provide a helpful, personalized response:"
            )
            
            response = self.model.generate_content(prompt)
            return response.text, sources_count
        except Exception as e:
            logger.error(f"Error generating response: {str(e)}")
            raise
