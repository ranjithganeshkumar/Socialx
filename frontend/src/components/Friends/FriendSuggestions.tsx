import React, { useState } from 'react';
import { UserPlus, X } from 'lucide-react';
import { User } from '../../types';

const FriendSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<User[]>([
    {
      id: '4',
      username: 'alexchen',
      email: 'alex@example.com',
      fullName: 'Alex Chen',
      profilePicture:
        'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'UI/UX Designer at TechCorp',
      followers: 2341,
      following: 892,
      createdAt: '2023-03-05T10:00:00Z',
      isOnline: true,
    },
    {
      id: '5',
      username: 'emilydavis',
      email: 'emily@example.com',
      fullName: 'Emily Davis',
      profilePicture:
        'https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Photography enthusiast',
      followers: 1567,
      following: 423,
      createdAt: '2023-04-12T10:00:00Z',
      isOnline: false,
    },
    {
      id: '6',
      username: 'davidwilson',
      email: 'david@example.com',
      fullName: 'David Wilson',
      profilePicture:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Software Engineer | Open Source Contributor',
      followers: 3456,
      following: 1234,
      createdAt: '2023-02-28T10:00:00Z',
      isOnline: true,
    },
  ]);

  const handleAddFriend = (userId: string) => {
    setSuggestions((prev) => prev.filter((user) => user.id !== userId));
    console.log('Friend added:', userId);
  };

  const handleDismiss = (userId: string) => {
    setSuggestions((prev) => prev.filter((user) => user.id !== userId));
    console.log('Suggestion dismissed:', userId);
  };

  const handleSeeMore = () => {
    console.log('Loading more friend suggestions...');
    // You can fetch and append more suggestions here
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Friend Suggestions</h2>

      <div className="space-y-4">
        {suggestions.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
          >
            <div className="relative">
              <img
                src={user.profilePicture}
                alt={user.fullName}
                className="w-14 h-14 rounded-full object-cover"
              />
              {user.isOnline && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
              <p className="text-sm text-gray-500 mb-1">@{user.username}</p>
              {user.bio && (
                <p className="text-xs text-gray-600 truncate">{user.bio}</p>
              )}
              <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                <span>{user.followers} followers</span>
                <span>{user.following} following</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAddFriend(user.id)}
                className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:shadow-lg transition-all duration-200 transform hover:scale-110"
                title="Add Friend"
              >
                <UserPlus size={16} />
              </button>
              <button
                onClick={() => handleDismiss(user.id)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
                title="Dismiss"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSeeMore}
        className="w-full mt-6 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-xl transition-colors"
      >
        See More Suggestions
      </button>
    </div>
  );
};

export default FriendSuggestions;
