import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';
import { Post, Comment } from '../../types';
import CommentSection from './CommentSection';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike(post.id);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.user.profilePicture}
            alt={post.user.fullName}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{post.user.fullName}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>@{post.user.username}</span>
              <span>•</span>
              <span>{formatTime(post.createdAt)}</span>
            </div>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 text-base leading-relaxed">{post.content}</p>
      </div>

      {/* Post Media */}
      {post.mediaUrls.length > 0 && (
        <div className="px-4 pb-4">
          <div className={`grid gap-2 rounded-xl overflow-hidden ${
            post.mediaUrls.length === 1 ? 'grid-cols-1' :
            post.mediaUrls.length === 2 ? 'grid-cols-2' :
            'grid-cols-2'
          }`}>
            {post.mediaUrls.map((url, index) => (
              <div key={index} className="relative aspect-video bg-gray-100">
                {post.mediaType === 'image' ? (
                  <img
                    src={url}
                    alt="Post media"
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
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 py-2 px-3 rounded-full transition-all duration-200 ${
                isLiked
                  ? 'text-red-500 bg-red-50 hover:bg-red-100'
                  : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart
                size={20}
                className={`transition-transform duration-200 ${
                  isLiked ? 'fill-current scale-110' : ''
                }`}
              />
              <span className="font-medium">{likesCount}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 py-2 px-3 rounded-full text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              <MessageCircle size={20} />
              <span className="font-medium">{post.comments}</span>
            </button>
            
            <button className="flex items-center gap-2 py-2 px-3 rounded-full text-gray-600 hover:text-green-500 hover:bg-green-50 transition-all duration-200">
              <Share size={20} />
            </button>
          </div>
          
          <button className="p-2 text-gray-600 hover:text-yellow-500 hover:bg-yellow-50 rounded-full transition-all duration-200">
            <Bookmark size={20} />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <CommentSection
          postId={post.id}
          onComment={onComment}
        />
      )}
    </div>
  );
};

export default PostCard;