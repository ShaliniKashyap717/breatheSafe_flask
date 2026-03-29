import React, { useState } from 'react';
import { MessageSquare, Users, ThumbsUp, Reply, Send, Plus, Search } from 'lucide-react';

const Forum = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "Best indoor plants for air purification?",
      author: "GreenThumb23",
      category: "Air Quality Solutions",
      replies: 24,
      likes: 18,
      lastActivity: "2 hours ago",
      content: "I'm looking for recommendations on which plants are most effective for improving indoor air quality. Any experiences to share?",
      messages: [
        {
          id: 1,
          author: "PlantLover",
          content: "Snake plants and spider plants are excellent choices! They're low maintenance too.",
          timestamp: "1 hour ago",
          likes: 5
        },
        {
          id: 2,
          author: "AirQualityExpert",
          content: "Don't forget about peace lilies - they're great for removing formaldehyde and benzene.",
          timestamp: "45 minutes ago",
          likes: 3
        }
      ]
    },
    {
      id: 2,
      title: "Impact of air pollution on children's health",
      author: "ConcernedParent",
      category: "Health and Pollution",
      replies: 31,
      likes: 42,
      lastActivity: "4 hours ago",
      content: "As a parent, I'm worried about how air pollution affects my kids. What protective measures can we take?",
      messages: [
        {
          id: 1,
          author: "PediatricNurse",
          content: "Air purifiers in bedrooms and limiting outdoor activities during high pollution days helps a lot.",
          timestamp: "3 hours ago",
          likes: 8
        }
      ]
    },
    {
      id: 3,
      title: "DIY air quality monitor project",
      author: "TechEnthusiast",
      category: "Technology",
      replies: 15,
      likes: 28,
      lastActivity: "6 hours ago",
      content: "Has anyone built their own air quality monitoring device? Looking for sensor recommendations and code examples.",
      messages: []
    }
  ]);

  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '', category: '' });
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Discussions', count: 89 },
    { id: 'solutions', name: 'Air Quality Solutions', count: 34 },
    { id: 'health', name: 'Health and Pollution', count: 28 },
    { id: 'sustainable', name: 'Sustainable Living', count: 21 },
    { id: 'technology', name: 'Technology', count: 6 }
  ];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = activeCategory === 'all' || 
                           (activeCategory === 'solutions' && discussion.category === 'Air Quality Solutions') ||
                           (activeCategory === 'health' && discussion.category === 'Health and Pollution') ||
                           (activeCategory === 'sustainable' && discussion.category === 'Sustainable Living') ||
                           (activeCategory === 'technology' && discussion.category === 'Technology');
    
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedDiscussion) {
      const message = {
        id: selectedDiscussion.messages.length + 1,
        author: "Current User",
        content: newMessage,
        timestamp: "Just now",
        likes: 0
      };
      
      setDiscussions(discussions.map(d => 
        d.id === selectedDiscussion.id 
          ? { ...d, messages: [...d.messages, message], replies: d.replies + 1 }
          : d
      ));
      
      setSelectedDiscussion({
        ...selectedDiscussion,
        messages: [...selectedDiscussion.messages, message]
      });
      
      setNewMessage('');
    }
  };

  const handleCreateDiscussion = (e) => {
    e.preventDefault();
    const discussion = {
      id: discussions.length + 1,
      title: newDiscussion.title,
      author: "Current User",
      category: newDiscussion.category,
      content: newDiscussion.content,
      replies: 0,
      likes: 0,
      lastActivity: "Just now",
      messages: []
    };
    
    setDiscussions([discussion, ...discussions]);
    setNewDiscussion({ title: '', content: '', category: '' });
    setShowNewDiscussion(false);
  };

  if (selectedDiscussion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedDiscussion(null)}
            className="mb-6 text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Discussions
          </button>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{selectedDiscussion.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>by {selectedDiscussion.author}</span>
                  <span>{selectedDiscussion.category}</span>
                  <span>{selectedDiscussion.lastActivity}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <ThumbsUp size={16} />
                  {selectedDiscussion.likes}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Reply size={16} />
                  {selectedDiscussion.replies}
                </span>
              </div>
            </div>
            <p className="text-gray-700">{selectedDiscussion.content}</p>
          </div>

          {/* Messages */}
          <div className="space-y-4 mb-6">
            {selectedDiscussion.messages.map((message) => (
              <div key={message.id} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {message.author.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium text-gray-800">{message.author}</span>
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                  </div>
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600">
                    <ThumbsUp size={14} />
                    {message.likes}
                  </button>
                </div>
                <p className="text-gray-700">{message.content}</p>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Join the conversation</h3>
            <form onSubmit={handleSendMessage}>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share your thoughts..."
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none mb-4"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center"
              >
                <Send size={16} className="mr-2" />
                Reply
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Discussion Forum
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect with the community, share knowledge, and discuss air quality topics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl mb-6">
              <button
                onClick={() => setShowNewDiscussion(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center mb-6"
              >
                <Plus size={18} className="mr-2" />
                New Discussion
              </button>

              <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      activeCategory === category.id
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 shadow-xl mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search discussions..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* New Discussion Form */}
            {showNewDiscussion && (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Start a New Discussion</h2>
                <form onSubmit={handleCreateDiscussion} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={newDiscussion.title}
                      onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                      placeholder="What would you like to discuss?"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newDiscussion.category}
                      onChange={(e) => setNewDiscussion({...newDiscussion, category: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="Air Quality Solutions">Air Quality Solutions</option>
                      <option value="Health and Pollution">Health and Pollution</option>
                      <option value="Sustainable Living">Sustainable Living</option>
                      <option value="Technology">Technology</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                      value={newDiscussion.content}
                      onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                      placeholder="Share your thoughts and start the conversation..."
                      rows="6"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                    >
                      Create Discussion
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewDiscussion(false)}
                      className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Discussions List */}
            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  onClick={() => setSelectedDiscussion(discussion)}
                  className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-purple-600 transition-colors">
                        {discussion.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <span>by {discussion.author}</span>
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          {discussion.category}
                        </span>
                        <span>{discussion.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{discussion.content}</p>
                  
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <Reply size={16} />
                      {discussion.replies} replies
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <ThumbsUp size={16} />
                      {discussion.likes} likes
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <Users size={16} />
                      Active discussion
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
