import React, { useState } from 'react';
import { TrendingUp, Users } from 'lucide-react';
import PostCard from '../Post/PostCard';
import { Post } from '../../types';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      userId: '2',
      user: {
        id: '2',
        username: 'sarahsmith',
        email: 'sarah@example.com',
        fullName: 'Sarah Smith',
        profilePicture: 'https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&w=150',
        bio: 'Digital Artist & Designer',
        followers: 890,
        following: 234,
        createdAt: '2023-01-20T10:00:00Z',
        isOnline: true,
      },
      content: 'Just finished working on this amazing new project! The creative process has been incredible and I can\'t wait to share more details soon. What do you all think about this approach? 🎨✨',
      mediaUrls: ['https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800'],
      mediaType: 'image',
      likes: 142,
      comments: 23,
      isLiked: false,
      createdAt: '2024-01-15T14:30:00Z',
    },
    {
      id: '2',
      userId: '3',
      user: {
        id: '3',
        username: 'mikejohnson',
        email: 'mike@example.com',
        fullName: 'Mike Johnson',
        profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
        bio: 'Tech Entrepreneur',
        followers: 1456,
        following: 523,
        createdAt: '2023-02-10T10:00:00Z',
        isOnline: false,
      },
      content: 'Beautiful sunset from my office today! Sometimes you need to take a moment to appreciate the small things in life. Hope everyone is having a great week! 🌅',
      mediaUrls: ['https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800'],
      mediaType: 'image',
      likes: 89,
      comments: 12,
      isLiked: true,
      createdAt: '2024-01-15T18:45:00Z',
    },
    {
      id: '3',
      userId: '4',
      user: {
        id: '4',
        username: 'alexchen',
        email: 'alex@example.com',
        fullName: 'Alex Chen',
        profilePicture: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
        bio: 'UI/UX Designer',
        followers: 2341,
        following: 892,
        createdAt: '2023-03-05T10:00:00Z',
        isOnline: true,
      },
      content: 'Working on some exciting new user interface concepts. The future of design is looking bright! What are your thoughts on minimalist vs detailed interfaces?',
      mediaUrls: [],
      mediaType: 'none',
      likes: 67,
      comments: 18,
      isLiked: false,
      createdAt: '2024-01-15T12:20:00Z',
    },
  ]);

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleComment = (postId: string, content: string) => {
    if (content.trim()) {
      console.log('Adding comment to post:', postId, content);
      // Update posts with new comment count
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, comments: post.comments + 1 }
            : post
        )
      );
    }
  };

  const handleLoadMore = () => {
    console.log('Loading more posts...');
    // Implement load more functionality
    // You would typically fetch more posts from your API here
  };

  return (
    <div className="space-y-6">
      {/* Feed Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Your Feed</h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <TrendingUp size={16} />
              Trending
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              <Users size={16} />
              Following
            </button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
            <div className="text-sm text-blue-700">New Posts</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-sm text-green-700">Active Friends</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">5</div>
            <div className="text-sm text-purple-700">New Messages</div>
          </div>
        </div>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={handleLike}
          onComment={handleComment}
        />
      ))}

      {/* Load More */}
      <div className="text-center py-8">
        <button 
          onClick={handleLoadMore}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">
          Load More Posts
        </button>
      </div>
    </div>
  );
};

export default Feed;