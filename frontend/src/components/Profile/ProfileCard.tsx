import React, { useState } from "react";
import { Calendar, Edit, MessageSquare, UserPlus } from "lucide-react";
import { User } from "../../types";

interface ProfileCardProps {
  user: User;
  isOwnProfile?: boolean;
  onProfileUpdated?: (updated: User) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  isOwnProfile = false,
  onProfileUpdated,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [bio, setBio] = useState(user.bio || "");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // --- EDIT PROFILE ---
  const handleSaveProfile = async () => {
    if (!user?.id) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("bio", bio);
    if (file) formData.append("profilePicture", file);

    try {
      const res = await fetch(`http://localhost:8080/api/profile/${user.id}/edit`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Profile update failed");
      const updated = await res.json();
      onProfileUpdated?.(updated);
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // --- FOLLOW USER ---
  const handleFollow = async () => {
    try {
      // Example API (you’ll need to create this in Spring Boot)
      const res = await fetch(`http://localhost:8080/api/users/${user.id}/follow`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Follow failed");
      alert(`You are now following ${user.fullName}`);
    } catch {
      alert("Error following user");
    }
  };

  // --- MESSAGE USER ---
  const handleMessage = () => {
    alert(`Open chat with ${user.fullName}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"></div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="flex items-end justify-between -mt-16 mb-4">
          <div className="relative">
            <img
              src={user.profilePicture}
              alt={user.fullName}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          {isOwnProfile && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <Edit size={16} />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        {/* --- EDIT FORM --- */}
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              className="w-full border rounded-lg px-3 py-2"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <div className="flex gap-3">
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {user.fullName}
              </h1>
              <p className="text-gray-500 mb-2">@{user.username}</p>
              {user.bio && (
                <p className="text-gray-700 leading-relaxed mb-3">{user.bio}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>
                    Joined{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {user.following}
                </div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {user.followers}
                </div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">42</div>
                <div className="text-sm text-gray-500">Posts</div>
              </div>
            </div>

            {/* Actions */}
            {!isOwnProfile && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleFollow}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <UserPlus size={16} />
                  Follow
                </button>
                <button
                  onClick={handleMessage}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <MessageSquare size={16} />
                  Message
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
