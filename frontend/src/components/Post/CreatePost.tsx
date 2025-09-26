import React, { useState } from 'react';
import { X, Image, Video, Calendar, MapPin, Smile } from 'lucide-react';
import { User } from '../../types';

interface CreatePostProps {
  user: User;
  onClose: () => void;
  onCreatePost: (content: string, mediaUrls: string[], mediaType: 'image' | 'video' | 'none') => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ user, onClose, onCreatePost }) => {
  const [content, setContent] = useState('');
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'none'>('none');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() || mediaUrls.length > 0) {
      onCreatePost(content, mediaUrls, mediaType);
      onClose();
    }
  };

  const handleAddMedia = (type: 'image' | 'video') => {
    // Mock media URLs for demo
    const mockUrls = type === 'image' 
      ? [
          'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      : ['https://www.w3schools.com/html/mov_bbb.mp4'];
    
    setMediaUrls(mockUrls);
    setMediaType(type);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Create Post</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            {/* User Info */}
            <div className="p-4 flex items-center gap-3">
              <img
                src={user.profilePicture}
                alt={user.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>

            {/* Text Area */}
            <div className="px-4 pb-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                className="w-full h-32 resize-none border-none outline-none text-lg placeholder-gray-400"
                autoFocus
              />
            </div>

            {/* Media Preview */}
            {mediaUrls.length > 0 && (
              <div className="px-4 pb-4">
                <div className="relative">
                  <div className={`grid gap-2 rounded-xl overflow-hidden ${
                    mediaUrls.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                  }`}>
                    {mediaUrls.map((url, index) => (
                      <div key={index} className="relative aspect-video bg-gray-100">
                        {mediaType === 'image' ? (
                          <img
                            src={url}
                            alt="Media preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            src={url}
                            className="w-full h-full object-cover"
                            controls
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMediaUrls([]);
                      setMediaType('none');
                    }}
                    className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            {/* Media Options */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAddMedia('image')}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                  title="Add Image"
                >
                  <Image size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => handleAddMedia('video')}
                  className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors"
                  title="Add Video"
                >
                  <Video size={20} />
                </button>
                <button
                  type="button"
                  className="p-2 text-purple-500 hover:bg-purple-50 rounded-full transition-colors"
                  title="Add Location"
                >
                  <MapPin size={20} />
                </button>
                <button
                  type="button"
                  className="p-2 text-yellow-500 hover:bg-yellow-50 rounded-full transition-colors"
                  title="Add Emoji"
                >
                  <Smile size={20} />
                </button>
                <button
                  type="button"
                  className="p-2 text-orange-500 hover:bg-orange-50 rounded-full transition-colors"
                  title="Schedule Post"
                >
                  <Calendar size={20} />
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {280 - content.length} characters remaining
                </span>
                <button
                  type="submit"
                  disabled={!content.trim() && mediaUrls.length === 0}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;