// src/pages/Support.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Coffee,
  Heart,
  Star,
  Zap,
  Check,
  ArrowLeft,
  Gift,
  Crown,
  Sparkles,
  Users,
  MessageSquare,
  Trophy,
} from "lucide-react";

const DONATION_TIERS = [
  {
    id: "coffee",
    name: "Buy me a Coffee",
    amount: 3,
    icon: Coffee,
    color: "from-amber-500 to-orange-500",
    features: [
      "Support development",
      "Our eternal gratitude",
      "Good karma points",
    ],
    popular: false,
  },
  {
    id: "supporter",
    name: "Monthly Supporter",
    amount: 5,
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    features: [
      "All Coffee perks",
      "Supporter badge",
      "Priority support",
      "Early access to features",
    ],
    popular: true,
  },
  {
    id: "champion",
    name: "Language Champion",
    amount: 10,
    icon: Crown,
    color: "from-purple-500 to-indigo-500",
    features: [
      "All Supporter perks",
      "Exclusive Champion badge",
      "Custom profile colors",
      "Ad-free experience",
      "Extended session time",
    ],
    popular: false,
  },
];

const FEATURES = [
  {
    icon: Users,
    title: "Growing Community",
    description: "Help us reach more language learners worldwide",
  },
  {
    icon: Zap,
    title: "Better Features",
    description: "Fund new features and improvements",
  },
  {
    icon: MessageSquare,
    title: "Server Costs",
    description: "Keep the platform fast and reliable",
  },
  {
    icon: Trophy,
    title: "Free for All",
    description: "Maintain free access for everyone",
  },
];

const TESTIMONIALS = [
  {
    name: "Maria Garcia",
    role: "Monthly Supporter",
    avatar: "https://i.pravatar.cc/150?img=47",
    text: "Hub4Talk helped me improve my English. Supporting them was an easy decision!",
  },
  {
    name: "Ahmed Ali",
    role: "Language Champion",
    avatar: "https://i.pravatar.cc/150?img=59",
    text: "The best language practice platform I've used. Worth every penny!",
  },
  {
    name: "Sophie Martin",
    role: "Coffee Supporter",
    avatar: "https://i.pravatar.cc/150?img=32",
    text: "Love the community here. Happy to support this amazing project!",
  },
];

export default function Support() {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState("supporter");
  const [customAmount, setCustomAmount] = useState("");

  const handleSupport = (tierId) => {
    // Aquí implementarías la integración con Stripe/PayPal
    console.log("Supporting with tier:", tierId);
    alert(`Thank you for choosing ${tierId}! Payment integration coming soon.`);
  };

  const handleCustomDonation = () => {
    const amount = parseFloat(customAmount);
    if (amount >= 1) {
      console.log("Custom donation:", amount);
      alert(`Thank you for your $${amount} donation! Payment integration coming soon.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1419]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#12181d] to-[#0f1419] border-b border-[#1b2229]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#E0C3A4] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E76F51] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-400 hover:text-[#E0C3A4] transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E0C3A4]/10 border border-[#E0C3A4]/20 mb-6">
              <Heart className="w-4 h-4 text-[#E0C3A4]" />
              <span className="text-sm font-medium text-[#E0C3A4]">
                Support Hub4Talk
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Help Us Keep
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E0C3A4] to-[#E76F51]">
                Language Learning Free
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8">
              Your support helps us build a better platform for language
              learners worldwide. Every contribution makes a difference!
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-sm text-gray-500">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">25+</div>
                <div className="text-sm text-gray-500">Languages</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">150+</div>
                <div className="text-sm text-gray-500">Daily Sessions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Tiers */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            Choose Your Support Level
          </h2>
          <p className="text-gray-400">
            All contributions help us improve and grow the platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {DONATION_TIERS.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedTier === tier.id
                    ? "border-[#E0C3A4] shadow-lg shadow-[#E0C3A4]/20 scale-105"
                    : "border-[#1b2229] hover:border-[#E0C3A4]/50"
                } ${tier.popular ? "md:scale-105" : ""}`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#E0C3A4] text-[#1b1f23] text-xs font-bold">
                      <Star className="w-3 h-3" fill="currentColor" />
                      POPULAR
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Icon with gradient */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Tier info */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold text-[#E0C3A4]">
                      ${tier.amount}
                    </span>
                    {tier.id !== "coffee" && (
                      <span className="text-sm text-gray-500">/month</span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-300"
                      >
                        <Check className="w-4 h-4 text-[#E0C3A4] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSupport(tier.id);
                    }}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      selectedTier === tier.id
                        ? "bg-[#E0C3A4] text-[#1b1f23] hover:bg-[#d5b78f]"
                        : "bg-[#1c232b] text-gray-300 hover:bg-[#242c35]"
                    }`}
                  >
                    {tier.id === "coffee" ? "Buy Now" : "Subscribe"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Amount */}
        <div className="card p-6 max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#E0C3A4]/10 rounded-lg">
              <Gift className="w-5 h-5 text-[#E0C3A4]" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Custom Amount</h3>
              <p className="text-xs text-gray-400">
                Choose your own contribution
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                type="number"
                min="1"
                step="0.01"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter amount"
                className="form-input pl-8"
              />
            </div>
            <button
              onClick={handleCustomDonation}
              disabled={!customAmount || parseFloat(customAmount) < 1}
              className="btn-primary px-6"
            >
              Donate
            </button>
          </div>
        </div>
      </div>

      {/* Why Support Section */}
      <div className="bg-[#12181d] border-y border-[#1b2229] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">
              Why Support Hub4Talk?
            </h2>
            <p className="text-gray-400">
              Your contribution directly impacts these areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="card p-6 text-center hover:scale-105 transition-transform"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E0C3A4]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#E0C3A4]" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            What Supporters Say
          </h2>
          <p className="text-gray-400">
            Join our community of supporters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div key={idx} className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="avatar-sm"
                />
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-[#E0C3A4]">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400 italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#12181d] border-t border-[#1b2229] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Is Hub4Talk really free?",
                a: "Yes! Hub4Talk is completely free to use. Supporter contributions help us keep it that way for everyone.",
              },
              {
                q: "Can I cancel my subscription?",
                a: "Absolutely. You can cancel anytime from your account settings. No questions asked.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and various regional payment methods through our secure payment processor.",
              },
              {
                q: "How will my contribution be used?",
                a: "Your support goes directly to server costs, development, new features, and keeping the platform free for all users.",
              },
              {
                q: "Do I get a receipt?",
                a: "Yes! You'll receive an email receipt for every contribution, which you can use for tax purposes if applicable in your country.",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="card p-5 cursor-pointer group"
              >
                <summary className="font-semibold text-white flex items-center justify-between">
                  {faq.q}
                  <Sparkles className="w-4 h-4 text-[#E0C3A4] group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-3 text-sm text-gray-400 pl-1">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="card p-8 bg-gradient-to-br from-[#E0C3A4]/5 to-[#E76F51]/5 border-[#E0C3A4]/20">
          <Heart className="w-12 h-12 text-[#E0C3A4] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">
            Every Contribution Counts
          </h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Whether it's a coffee or a monthly subscription, your support helps
            us create a better learning experience for language enthusiasts
            worldwide. Thank you for being part of our journey!
          </p>
          <button
            onClick={() => handleSupport("supporter")}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Become a Supporter
          </button>
        </div>
      </div>
    </div>
  );
}