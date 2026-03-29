
import React, { useState } from 'react';
import { MessageSquare, Send, Bot, User } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI air quality assistant. How can I help you today?", sender: 'bot' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = { id: Date.now(), text: inputMessage, sender: 'user' };
      setMessages([...messages, newMessage]);
      
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: "Thank you for your question! I can help you with air quality information, health recommendations, and interpreting AQI data. What specific information would you like to know?",
          sender: 'bot'
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
      
      setInputMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Assistant
          </h1>
          <p className="text-gray-600 text-lg">
            Get instant answers about air quality, health recommendations, and environmental insights.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center gap-3">
            <MessageSquare size={24} />
            <h3 className="text-xl font-semibold">Airify Assistant</h3>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500' 
                      : 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                  }`}>
                    {message.sender === 'user' ? <User className="text-white" size={16} /> : <Bot className="text-white" size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about air quality, health tips, or AQI data..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-2"
              >
                <Send size={16} />
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-left hover:shadow-lg transition-all duration-200 border border-indigo-100">
            <h4 className="font-semibold text-gray-800 mb-2">What does AQI mean?</h4>
            <p className="text-gray-600 text-sm">Learn about Air Quality Index and how to interpret the values.</p>
          </button>
          <button className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-left hover:shadow-lg transition-all duration-200 border border-purple-100">
            <h4 className="font-semibold text-gray-800 mb-2">Health recommendations</h4>
            <p className="text-gray-600 text-sm">Get personalized health advice based on current air quality.</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
