// src/pages/CreateRoom.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createRoom } from "../services/firebase";
import {
  Globe,
  Users,
  MessageSquare,
  ArrowLeft,
  Sparkles,
  Info,
  AlertCircle,
} from "lucide-react";

const LANGUAGES = [
  "English", "Spanish", "French", "German", "Italian",
  "Portuguese", "Japanese", "Korean", "Chinese", "Arabic",
  "Russian", "Hindi", "Turkish", "Dutch", "Swedish",
];

const LEVELS = [
  { value: "beginner", label: "Beginner", description: "Just starting out" },
  { value: "elementary", label: "Elementary", description: "Basic conversations" },
  { value: "intermediate", label: "Intermediate", description: "Comfortable speaking" },
  { value: "advanced", label: "Advanced", description: "Near native level" },
];

const TOPICS = [
  "General Conversation",
  "Travel & Culture",
  "Movies & TV Shows",
  "Music",
  "Food & Cooking",
  "Sports",
  "Technology",
  "Books & Reading",
  "Gaming",
  "Business & Career",
  "Science & Nature",
  "Daily Life",
  "News & Current Events",
];

export default function CreateRoom() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    language: "",
    level: "",
    topic: "",
    description: "",
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.language) {
      newErrors.language = "Please select a language";
    }
    if (!formData.level) {
      newErrors.level = "Please select a level";
    }
    if (!formData.topic || formData.topic.trim().length < 3) {
      newErrors.topic = "Topic must be at least 3 characters";
    }
    if (formData.description && formData.description.length > 200) {
      newErrors.description = "Description is too long (max 200 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const roomId = await createRoom({
        ...formData,
        topic: formData.topic.trim(),
        description: formData.description.trim(),
      });

      console.log("✅ Room created:", roomId);
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error("❌ Error creating room:", error);
      setErrors({
        submit: error.message || "Failed to create room. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-[#E0C3A4] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Sign In Required
          </h2>
          <p className="text-gray-400 mb-6">
            You need to be signed in to create a room
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn-primary"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1419] pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-400 hover:text-[#E0C3A4] transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#E0C3A4]/10 rounded-xl">
              <Sparkles className="w-8 h-8 text-[#E0C3A4]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Create a New Room
              </h1>
              <p className="text-gray-400 mt-1">
                Set up your language practice session
              </p>
            </div>
          </div>

          {/* Info Banner */}
          <div className="flex gap-3 p-4 bg-[#E0C3A4]/5 border border-[#E0C3A4]/20 rounded-lg">
            <Info className="w-5 h-5 text-[#E0C3A4] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              <p className="font-medium text-[#E0C3A4] mb-1">
                Create the perfect practice space
              </p>
              <p className="text-gray-400">
                Choose your language, level, and topic. Other learners will be
                able to find and join your room.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card p-6 space-y-6">
            {/* Language */}
            <div className="form-group">
              <label className="form-label">
                <Globe className="w-4 h-4 inline mr-2" />
                Language *
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className={`form-select ${
                  errors.language ? "border-red-500" : ""
                }`}
              >
                <option value="">Select a language</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              {errors.language && (
                <p className="form-error">{errors.language}</p>
              )}
            </div>

            {/* Level */}
            <div className="form-group">
              <label className="form-label">
                <Users className="w-4 h-4 inline mr-2" />
                Your Level *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LEVELS.map((level) => (
                  <label
                    key={level.value}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition ${
                      formData.level === level.value
                        ? "border-[#E0C3A4] bg-[#E0C3A4]/5"
                        : "border-[#2A2E33] hover:border-[#E0C3A4]/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="level"
                      value={level.value}
                      checked={formData.level === level.value}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-white">
                        {level.label}
                      </div>
                      <div className="text-xs text-gray-400">
                        {level.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.level && <p className="form-error">{errors.level}</p>}
            </div>

            {/* Topic */}
            <div className="form-group">
              <label className="form-label">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Topic *
              </label>
              <div className="space-y-3">
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className={`form-select ${
                    errors.topic ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a topic or enter custom below</option>
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                  <option value="custom">Custom Topic...</option>
                </select>

                {(formData.topic === "custom" || !TOPICS.includes(formData.topic)) && (
                  <input
                    type="text"
                    name="topic"
                    value={formData.topic === "custom" ? "" : formData.topic}
                    onChange={handleChange}
                    placeholder="Enter your custom topic..."
                    maxLength={50}
                    className={`form-input ${
                      errors.topic ? "border-red-500" : ""
                    }`}
                  />
                )}
              </div>
              {errors.topic && <p className="form-error">{errors.topic}</p>}
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add more details about what you'd like to discuss or practice..."
                rows={4}
                maxLength={200}
                className={`form-textarea ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description ? (
                  <p className="form-error">{errors.description}</p>
                ) : (
                  <p className="form-hint">
                    Help others understand what to expect in your room
                  </p>
                )}
                <span className="text-xs text-gray-500">
                  {formData.description.length}/200
                </span>
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="flex gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{errors.submit}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn-secondary flex-1"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Room
                </>
              )}
            </button>
          </div>
        </form>

        {/* Tips */}
        <div className="mt-8 p-6 bg-[#12181d] border border-[#1b2229] rounded-xl">
          <h3 className="text-lg font-semibold text-[#E0C3A4] mb-4">
            💡 Tips for a Great Session
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2">
              <span className="text-[#E0C3A4]">•</span>
              <span>Choose a topic you're comfortable discussing</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#E0C3A4]">•</span>
              <span>Be patient and supportive with other learners</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#E0C3A4]">•</span>
              <span>Don't worry about making mistakes - that's how we learn!</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#E0C3A4]">•</span>
              <span>Have fun and make new friends around the world</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}