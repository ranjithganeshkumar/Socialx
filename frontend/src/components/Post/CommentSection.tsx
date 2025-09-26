import React, { useState } from 'react';
import { Send, Heart } from 'lucide-react';
import { Comment } from '../../types';

interface CommentSectionProps {
  postId: string;
  onComment: (postId: string, content: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, onComment }) => {
  const [comment, setComment] = useState('');
  
  // Mock comments data
  const comments: Comment[] = [
    {
      id: '1',
      postId,
      userId: '2',
      user: {
        id: '2',
        username: 'sarahsmith',
        email: 'sarah@example.com',
        fullName: 'Sarah Smith',
        profilePicture: 'https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&w=150',
        bio: '',
        followers: 890,
        following: 234,
        createdAt: '2023-01-20T10:00:00Z',
        isOnline: true,
      },
      content: 'This is absolutely amazing! 🔥',
      likes: 12,
      isLiked: false,
      createdAt: '2024-01-15T14:30:00Z',
    },
    {
      id: '2',
      postId,
      userId: '3',
      user: {
        id: '3',
        username: 'mikejohnson',
        email: 'mike@example.com',
        fullName: 'Mike Johnson',
        profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
        bio: '',
        followers: 456,
        following: 123,
        createdAt: '2023-02-10T10:00:00Z',
        isOnline: false,
      },
      content: 'Totally agree! Keep up the great work 👏',
      likes: 8,
      isLiked: true,
      createdAt: '2024-01-15T15:45:00Z',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(postId, comment);
      setComment('');
    }
  };

  return (
    <div className="border-t border-gray-100 bg-gray-50">
      {/* Existing Comments */}
      <div className="px-4 py-3 max-h-80 overflow-y-auto">
        <div className="space-y-3">
          {comments.map((commentItem) => (
            <div key={commentItem.id} className="flex items-start gap-3">
              <img
                src={commentItem.user.profilePicture}
                alt={commentItem.user.fullName}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 bg-white rounded-xl px-3 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-gray-900">
                    {commentItem.user.fullName}
                  </span>
                  <span className="text-xs text-gray-500">2h</span>
                </div>
                <p className="text-sm text-gray-800">{commentItem.content}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    className={`flex items-center gap-1 text-xs transition-colors ${
                      commentItem.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart size={14} className={commentItem.isLiked ? 'fill-current' : ''} />
                    {commentItem.likes}
                  </button>
                  <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
            alt="Your profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 relative">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-blue-500 disabled:text-gray-400 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;