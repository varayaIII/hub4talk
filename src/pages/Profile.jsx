// src/pages/Profile.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Star,
  Award,
  Calendar,
  Globe,
  TrendingUp,
  Settings,
  LogOut,
  ArrowLeft,
  Crown,
  MessageSquare,
  Clock,
} from "lucide-react";
import RankBadge from "../components/profile/RankBadge";

// Helper function para calcular rango
function getRank(stars) {
  if (stars >= 100) return { name: "Language Commander", color: "#FFD700" };
  if (stars >= 50) return { name: "Polyglot Lieutenant", color: "#DAA520" };
  if (stars >= 25) return { name: "Fluent Sergeant", color: "#C68642" };
  if (stars >= 10) return { name: "Language Cadet", color: "#E0C3A4" };
  return { name: "Learner Recruit", color: "#9CA3AF" };
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Demo data - reemplazar con datos reales de Firestore
  const stats = {
    stars: 23,
    sessionsCompleted: 47,
    totalMinutes: 1420,
    languagesLearning: ["English", "Spanish"],
    joinedDate: "January 2025",
    favoriteTopics: ["Travel", "Movies", "Technology"],
    achievements: [
      { id: 1, name: "First Session", icon: "🎯", unlocked: true },
      { id: 2, name: "10 Hours", icon: "⏰", unlocked: true },
      { id: 3, name: "Social Butterfly", icon: "🦋", unlocked: true },
      { id: 4, name: "Polyglot", icon: "🌍", unlocked: false },
      { id: 5, name: "Week Streak", icon: "🔥", unlocked: false },
      { id: 6, name: "50 Sessions", icon: "💯", unlocked: false },
    ],
  };

  const rank = getRank(stats.stars);
  const hoursSpent = Math.floor(stats.totalMinutes / 60);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center px-4">
        <div className="text-center">
          <User className="w-16 h-16 text-[#E0C3A4] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Sign In Required
          </h2>
          <p className="text-gray-400 mb-6">
            Please sign in to view your profile
          </p>
          <button onClick={() => navigate("/")} className="btn-primary">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1419] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-[#E0C3A4] transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`}
                  alt={user.displayName}
                  className="avatar-xl mx-auto avatar-ring"
                />
                <div className="absolute -bottom-2 -right-2 p-2 bg-[#E0C3A4] rounded-full">
                  <Crown className="w-4 h-4 text-[#1b1f23]" />
                </div>
              </div>

              {/* Name */}
              <h1 className="text-2xl font-bold text-white mb-1">
                {user.displayName || "Language Learner"}
              </h1>
              <p className="text-sm text-gray-400 mb-4">{user.email}</p>

              {/* Stars */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-6 h-6 text-[#E0C3A4]" fill="#E0C3A4" />
                <span className="text-2xl font-bold text-[#E0C3A4]">
                  {stats.stars}
                </span>
                <span className="text-sm text-gray-400">Recognition Stars</span>
              </div>

              {/* Rank Badge */}
              <div className="mb-6">
                <RankBadge label={rank.name} color={rank.color} />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-[#1c232b] rounded-lg">
                  <div className="text-2xl font-bold text-white">
                    {stats.sessionsCompleted}
                  </div>
                  <div className="text-xs text-gray-400">Sessions</div>
                </div>
                <div className="p-3 bg-[#1c232b] rounded-lg">
                  <div className="text-2xl font-bold text-white">
                    {hoursSpent}h
                  </div>
                  <div className="text-xs text-gray-400">Practice Time</div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button className="btn-secondary w-full flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Stats & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Detailed Stats */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#E0C3A4]" />
                Your Progress
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#1c232b] rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#E0C3A4]/10 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-[#E0C3A4]" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {stats.sessionsCompleted}
                      </div>
                      <div className="text-xs text-gray-400">
                        Sessions Completed
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#1c232b] rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#E0C3A4]/10 rounded-lg">
                      <Clock className="w-5 h-5 text-[#E0C3A4]" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {stats.totalMinutes}
                      </div>
                      <div className="text-xs text-gray-400">
                        Minutes Practiced
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#1c232b] rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#E0C3A4]/10 rounded-lg">
                      <Globe className="w-5 h-5 text-[#E0C3A4]" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {stats.languagesLearning.length}
                      </div>
                      <div className="text-xs text-gray-400">
                        Languages Learning
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#E0C3A4]" />
                Languages I'm Learning
              </h2>
              <div className="flex flex-wrap gap-2">
                {stats.languagesLearning.map((lang, idx) => (
                  <span
                    key={idx}
                    className="badge-active"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Favorite Topics */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-[#E0C3A4]" />
                Favorite Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {stats.favoriteTopics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-[#1c232b] text-gray-300 text-sm border border-[#2A2E33]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#E0C3A4]" />
                Achievements
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {stats.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 text-center transition ${
                      achievement.unlocked
                        ? "border-[#E0C3A4] bg-[#E0C3A4]/5"
                        : "border-[#2A2E33] bg-[#1c232b] opacity-50"
                    }`}
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <div className="text-sm font-medium text-white">
                      {achievement.name}
                    </div>
                    {achievement.unlocked && (
                      <div className="text-xs text-[#E0C3A4] mt-1">
                        ✓ Unlocked
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Member Since */}
            <div className="card p-6">
              <div className="flex items-center gap-3 text-gray-400">
                <Calendar className="w-5 h-5 text-[#E0C3A4]" />
                <span>Member since {stats.joinedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}