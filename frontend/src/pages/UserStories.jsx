import React, { useState } from 'react';
import { FileText, Heart, MessageCircle, Share2, Plus, User, Calendar } from 'lucide-react';

const UserStories = () => {
  const [stories, setStories] = useState([
    {
      id: 1,
      author: "Saloni",
      title: "How I Reduced My Household Air Pollution by 60%",
      content: "Living in Jaipur, I was concerned about indoor air quality. I invested in air purifiers, switched to natural cleaning products, and added plants throughout my home. The results were amazing - my air quality monitor showed a 60% improvement in just 3 months.",
      likes: 45,
      comments: 12,
      timestamp: "2024-01-15T08:30:00Z",
      category: "Home Solutions",
      readTime: "3 min read"
    },
    {
      id: 2,
      author: "Man Singh",
      title: "Creating a Community Garden to Combat Local Pollution",
      content: "Our neighborhood had a vacant lot that was collecting dust and debris. We organized with local residents to transform it into a community garden. Not only did it improve air quality, but it also brought our community together.",
      likes: 32,
      comments: 8,
      timestamp: "2024-01-14T15:45:00Z",
      category: "Community Action",
      readTime: "4 min read"
    },
    {
      id: 3,
      author: "Ruchika",
      title: "The Health Impact of Air Quality on My Family",
      content: "As a doctor and mother, I've seen firsthand how air quality affects health. My daughter's asthma improved significantly after we moved to a cleaner area and implemented air quality monitoring at home.",
      likes: 78,
      comments: 23,
      timestamp: "2024-01-13T12:20:00Z",
      category: "Health & Wellness",
      readTime: "5 min read"
    }
  ]);

  const [newStory, setNewStory] = useState({
    title: '',
    content: '',
    category: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [likedStories, setLikedStories] = useState([]);

  const categories = [
    "Home Solutions",
    "Community Action", 
    "Health & Wellness",
    "Transportation",
    "Technology",
    "Policy & Advocacy"
  ];

  const handleSubmitStory = (e) => {
    e.preventDefault();
    const story = {
      id: stories.length + 1,
      author: "Current User", // In real app, this would come from auth
      title: newStory.title,
      content: newStory.content,
      category: newStory.category,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString(),
      readTime: Math.ceil(newStory.content.split(' ').length / 200) + " min read"
    };
    
    setStories([story, ...stories]);
    setNewStory({ title: '', content: '', category: '' });
    setShowForm(false);
  };

  const toggleLike = (storyId) => {
    if (likedStories.includes(storyId)) {
      setLikedStories(likedStories.filter(id => id !== storyId));
      setStories(stories.map(story => 
        story.id === storyId ? { ...story, likes: story.likes - 1 } : story
      ));
    } else {
      setLikedStories([...likedStories, storyId]);
      setStories(stories.map(story => 
        story.id === storyId ? { ...story, likes: story.likes + 1 } : story
      ));
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Home Solutions": "bg-blue-100 text-blue-700",
      "Community Action": "bg-green-100 text-green-700",
      "Health & Wellness": "bg-purple-100 text-purple-700",
      "Transportation": "bg-yellow-100 text-yellow-700",
      "Technology": "bg-cyan-100 text-cyan-700",
      "Policy & Advocacy": "bg-red-100 text-red-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            User Stories
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Share your experiences with air quality issues and solutions. 
            Learn from others and inspire positive change in your community.
          </p>
        </div>

        {/* Add Story Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center mx-auto"
          >
            <Plus size={18} className="mr-2" />
            Share Your Story
          </button>
        </div>

        {/* Story Form */}
        {showForm && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Share Your Experience</h2>
            <form onSubmit={handleSubmitStory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Story Title *
                </label>
                <input
                  type="text"
                  value={newStory.title}
                  onChange={(e) => setNewStory({...newStory, title: e.target.value})}
                  placeholder="Give your story a compelling title..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={newStory.category}
                  onChange={(e) => setNewStory({...newStory, category: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Story *
                </label>
                <textarea
                  value={newStory.content}
                  onChange={(e) => setNewStory({...newStory, content: e.target.value})}
                  placeholder="Share your experience, solutions, challenges, and insights..."
                  rows="8"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  Publish Story
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Stories List */}
        <div className="space-y-6">
          {stories.map((story) => (
            <div key={story.id} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              {/* Story Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{story.author}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={14} />
                      {new Date(story.timestamp).toLocaleDateString()}
                      <span>•</span>
                      <span>{story.readTime}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(story.category)}`}>
                  {story.category}
                </span>
              </div>

              {/* Story Content */}
              <h2 className="text-xl font-bold text-gray-800 mb-3">{story.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{story.content}</p>

              {/* Story Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => toggleLike(story.id)}
                  className={`flex items-center gap-2 transition-colors duration-200 ${
                    likedStories.includes(story.id) 
                      ? 'text-red-500' 
                      : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Heart 
                    size={18} 
                    fill={likedStories.includes(story.id) ? 'currentColor' : 'none'} 
                  />
                  <span className="text-sm font-medium">{story.likes}</span>
                </button>

                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                  <MessageCircle size={18} />
                  <span className="text-sm font-medium">{story.comments}</span>
                </button>

                <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors duration-200">
                  <Share2 size={18} />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserStories;
