import React, { useState } from 'react';
import {
  Search,
  Bell,
  MessageSquare,
  Plus,
  ChevronDown,
  LogOut,
  Settings,
  User as UserIcon,
} from 'lucide-react';
import { User } from '../../types';

interface HeaderProps {
  user: User;
  onCreatePost: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onCreatePost, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality
    }
  };

  const handleNotificationClick = () => {
    console.log('Opening notifications');
    // Implement notification functionality
  };

  const handleMessagesClick = () => {
    console.log('Opening messages');
    // Implement messages functionality
  };

  return (
    <header className="fixed top-0 left-64 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-30">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <form onSubmit={handleSearch} className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SocialX..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl border-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Create Button */}
          <button
            onClick={onCreatePost}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Plus size={18} />
            <span className="font-medium">Create</span>
          </button>

          {/* Notifications & Messages */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleNotificationClick}
              className="relative p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <button
              onClick={handleMessagesClick}
              className="relative p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <MessageSquare size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </button>
          </div>

          {/* User Menu */}
          <div className="relative pl-4 border-l border-gray-200">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 hover:bg-gray-100 rounded-xl p-2 transition-colors"
            >
              <img
                src={user.profilePicture}
                alt={user.fullName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden sm:block text-left">
                <p className="font-medium text-gray-900">{user.fullName}</p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${
                  showUserMenu ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-medium text-gray-900">{user.fullName}</p>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
                <div className="py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                    <UserIcon size={16} />
                    <span className="text-sm">View Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                    <Settings size={16} />
                    <span className="text-sm">Settings</span>
                  </button>
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
