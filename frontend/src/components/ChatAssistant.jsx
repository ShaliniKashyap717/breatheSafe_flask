import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, Send, X, Bot, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const INITIAL_MESSAGE = {
    text: "Hello! I'm your BreatheSafe Assistant. I can help you understand your air quality history and provide personalized health guidance. How can I help?",
    sender: 'ai',
    sources: 0
  };

  const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Open chat and show initial message
  const handleOpenChat = () => {
    setIsOpen(true);
    if (showInitialMessage && messages.length === 0) {
      setMessages([INITIAL_MESSAGE]);
      setShowInitialMessage(false);
    }
  };

  // Send message to backend
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = {
      text: input,
      sender: 'user',
      sources: 0
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Call backend API
      const response = await axios.post(`${API_URL}/api/chat`, {
        message: input
      });

      // Add AI response to chat
      const aiMessage = {
        text: response.data.data?.response || response.data.response,
        sender: 'ai',
        sources: response.data.data?.sources_found || response.data.sources_found || 0
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);

      // Add error message
      const errorMessage = {
        text: error.response?.data?.message || 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        sources: 0,
        isError: true
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Close chat
  const handleCloseChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={handleOpenChat}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 z-40 ${
          isOpen
            ? 'bg-teal-600 hover:bg-teal-700'
            : 'bg-teal-600 hover:bg-teal-700 hover:scale-110'
        }`}
        aria-label="Open chat assistant"
      >
        <MessageSquare size={24} className="text-white" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-full max-w-md h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50 md:w-96">
          {/* Header */}
          <div className="bg-teal-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-semibold">BreatheSafe Assistant</h3>
            </div>
            <button
              onClick={handleCloseChat}
              className="hover:bg-teal-700 p-1 rounded transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-teal-600 text-white rounded-br-none'
                      : message.isError
                      ? 'bg-red-100 text-red-800 rounded-bl-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.sender === 'ai' ? (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                          ul: ({ node, ...props }) => (
                            <ul className="list-disc list-inside mb-2" {...props} />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol className="list-decimal list-inside mb-2" {...props} />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong className="font-bold" {...props} />
                          ),
                          em: ({ node, ...props }) => (
                            <em className="italic" {...props} />
                          ),
                          a: ({ node, ...props }) => (
                            <a
                              className="text-teal-600 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                              {...props}
                            />
                          )
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{message.text}</p>
                  )}
                </div>
              </div>

              {/* Source Badge */}
              {message.sender === 'ai' && message.sources > 0 && (
                <div className="flex justify-start pl-4">
                  <span className="text-xs text-gray-500 italic">
                    Based on {message.sources} past health log{message.sources > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
                    <span
                      className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="border-t bg-white p-4 rounded-b-lg flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={loading}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:bg-gray-100 text-sm"
              aria-label="Chat message input"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
              aria-label="Send message"
            >
              {loading ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
