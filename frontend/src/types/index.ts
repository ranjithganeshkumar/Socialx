export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  profilePicture?: string;
  bio?: string;
  followers: number;
  following: number;
  createdAt: string;
  isOnline: boolean;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  mediaUrls: string[];
  mediaType: 'image' | 'video' | 'none';
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
}

export interface Event {
  id: string;
  creatorId: string;
  creator: User;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  imageUrl?: string;
  attendees: number;
  isAttending: boolean;
  category: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'message' | 'event';
  content: string;
  isRead: boolean;
  createdAt: string;
}