import React, { useState } from 'react';
import { Search, MoreVertical, Phone, Video } from 'lucide-react';
import { Conversation, Message } from '../../types';

const MessagesList: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Mock conversations data
  const conversations: Conversation[] = [
    {
      id: '1',
      participants: [
        {
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
        }
      ],
      lastMessage: {
        id: '1',
        senderId: '2',
        receiverId: '1',
        content: 'Hey! How are you doing?',
        isRead: false,
        createdAt: '2024-01-15T14:30:00Z',
      },
      unreadCount: 2,
    },
    {
      id: '2',
      participants: [
        {
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
        }
      ],
      lastMessage: {
        id: '2',
        senderId: '1',
        receiverId: '3',
        content: 'Thanks for the help!',
        isRead: true,
        createdAt: '2024-01-15T13:15:00Z',
      },
      unreadCount: 0,
    },
  ];

  const mockMessages: Message[] = [
    {
      id: '1',
      senderId: '2',
      receiverId: '1',
      content: 'Hey! How are you doing?',
      isRead: false,
      createdAt: '2024-01-15T14:30:00Z',
    },
    {
      id: '2',
      senderId: '1',
      receiverId: '2',
      content: 'Hi Sarah! I\'m doing great, thanks for asking. How about you?',
      isRead: true,
      createdAt: '2024-01-15T14:32:00Z',
    },
    {
      id: '3',
      senderId: '2',
      receiverId: '1',
      content: 'I\'m good too! Just working on some new projects. Would love to catch up soon!',
      isRead: false,
      createdAt: '2024-01-15T14:35:00Z',
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl border-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={conversation.participants[0].profilePicture}
                    alt={conversation.participants[0].fullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.participants[0].isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conversation.participants[0].fullName}
                    </h3>
                    <span className="text-xs text-gray-500">2h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage.content}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={conversations.find(c => c.id === selectedConversation)?.participants[0].profilePicture}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {conversations.find(c => c.id === selectedConversation)?.participants[0].fullName}
                  </h3>
                  <p className="text-sm text-green-500">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <Phone size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <Video size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === '1' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.senderId === '1'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderId === '1' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      14:35
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-full border-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
              <p>Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesList;