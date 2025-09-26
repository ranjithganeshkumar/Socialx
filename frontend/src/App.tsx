import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Feed from "./components/Feed/Feed";
import MessagesList from "./components/Messages/MessagesList";
import ProfileCard from "./components/Profile/ProfileCard";
import FriendSuggestions from "./components/Friends/FriendSuggestions";
import EventCard from "./components/Events/EventCard";
import CreatePost from "./components/Post/CreatePost";
import { Event } from "./types";

function App() {
  const { user, isLoading, isAuthenticated, login, logout, signup } = useAuth();
  const [activeTab, setActiveTab] = useState("home");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const mockEvents: Event[] = [
    {
      id: "1",
      creatorId: "2",
      creator: {
        id: "2",
        username: "sarahsmith",
        email: "sarah@example.com",
        fullName: "Sarah Smith",
        profilePicture: "https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&w=150",
        bio: "Digital Artist & Designer",
        followers: 890,
        following: 234,
        createdAt: "2023-01-20T10:00:00Z",
        isOnline: true,
      },
      title: "Tech Conference 2024",
      description: "Join us for the biggest tech event of the year!",
      location: "San Francisco, CA",
      startDate: "2024-03-15T09:00:00Z",
      endDate: "2024-03-17T18:00:00Z",
      imageUrl: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800",
      attendees: 1247,
      isAttending: false,
      category: "Technology",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
          {authMode === "login" ? (
            <LoginForm onLogin={login} onSwitchToSignup={() => setAuthMode("signup")} isLoading={isLoading} />
          ) : (
            <SignupForm onSignup={signup} onSwitchToLogin={() => setAuthMode("login")} isLoading={isLoading} />
          )}
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Feed />;
      case "profile":
        return <ProfileCard user={user} isOwnProfile={true} />;
      case "messages":
        return <MessagesList />;
      case "events":
        return mockEvents.map((event) => <EventCard key={event.id} event={event} onAttend={() => {}} />);
      case "friends":
        return <FriendSuggestions />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={logout} />
      <Header user={user} onCreatePost={() => setShowCreatePost(true)} onLogout={logout} />

      <main className="ml-64 pt-20 p-6">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </main>

      {showCreatePost && (
        <CreatePost user={user} onClose={() => setShowCreatePost(false)} onCreatePost={() => {}} />
      )}
    </div>
  );
}

export default App;
