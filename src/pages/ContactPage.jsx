import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Mail, MessageSquare, Sparkles, Send, Check } from 'lucide-react';

const STATIC_BLUR_SPOTS = [
  {
    id: 'spot-1',
    x: 22,
    y: 28,
    size: 520,
    color: 'rgba(236, 72, 153, 0.35)',
    blurAmount: 120,
    animationDelay: 0,
    animationDuration: 6
  },
  {
    id: 'spot-2',
    x: 72,
    y: 24,
    size: 460,
    color: 'rgba(217, 70, 239, 0.3)',
    blurAmount: 110,
    animationDelay: 1.2,
    animationDuration: 7
  },
  {
    id: 'spot-3',
    x: 16,
    y: 68,
    size: 420,
    color: 'rgba(147, 51, 234, 0.28)',
    blurAmount: 105,
    animationDelay: 0.6,
    animationDuration: 6.5
  },
  {
    id: 'spot-4',
    x: 78,
    y: 70,
    size: 560,
    color: 'rgba(139, 92, 246, 0.32)',
    blurAmount: 130,
    animationDelay: 1.6,
    animationDuration: 7.2
  },
  {
    id: 'spot-5',
    x: 48,
    y: 16,
    size: 380,
    color: 'rgba(236, 72, 153, 0.26)',
    blurAmount: 95,
    animationDelay: 0.8,
    animationDuration: 5.8
  },
  {
    id: 'spot-6',
    x: 54,
    y: 82,
    size: 480,
    color: 'rgba(192, 132, 252, 0.25)',
    blurAmount: 115,
    animationDelay: 2,
    animationDuration: 6.8
  },
  {
    id: 'spot-7',
    x: 10,
    y: 42,
    size: 340,
    color: 'rgba(217, 70, 239, 0.22)',
    blurAmount: 90,
    animationDelay: 1.1,
    animationDuration: 6.2
  },
  {
    id: 'spot-8',
    x: 88,
    y: 44,
    size: 360,
    color: 'rgba(236, 72, 153, 0.24)',
    blurAmount: 100,
    animationDelay: 0.4,
    animationDuration: 5.6
  },
  {
    id: 'spot-9',
    x: 34,
    y: 84,
    size: 300,
    color: 'rgba(147, 51, 234, 0.2)',
    blurAmount: 85,
    animationDelay: 1.4,
    animationDuration: 6.4
  },
  {
    id: 'spot-10',
    x: 64,
    y: 8,
    size: 320,
    color: 'rgba(139, 92, 246, 0.26)',
    blurAmount: 90,
    animationDelay: 2.4,
    animationDuration: 6.1
  },
  {
    id: 'spot-11',
    x: 4,
    y: 18,
    size: 260,
    color: 'rgba(192, 132, 252, 0.18)',
    blurAmount: 80,
    animationDelay: 0.2,
    animationDuration: 5.4
  },
  {
    id: 'spot-12',
    x: 94,
    y: 80,
    size: 280,
    color: 'rgba(217, 70, 239, 0.2)',
    blurAmount: 88,
    animationDelay: 1.8,
    animationDuration: 6.6
  }
];

const ContactPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Prevent flash - wait for content to load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const blurSpots = STATIC_BLUR_SPOTS;

  return (
    <div className="relative min-h-screen">
      {/* Full viewport blur overlay with Coming Soon message - ONE unified overlay */}
      {isLoaded && (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-40">
        {/* Base backdrop blur */}
        <div
          className="absolute inset-0 bg-slate-900/20"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        />
        
        {/* Static blur spots across entire viewport */}
        {blurSpots.map(spot => (
          <div
            key={spot.id}
            className="absolute animate-none md:animate-float"
            style={{
              left: `${spot.x}%`,
              top: `${spot.y}%`,
              width: `${spot.size}px`,
              height: `${spot.size}px`,
              background: `radial-gradient(circle, ${spot.color} 0%, transparent 70%)`,
              filter: `blur(${spot.blurAmount}px)`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${spot.animationDelay}s`,
              animationDuration: `${spot.animationDuration}s`
            }}
          />
        ))}
        
        {/* Coming Soon Message with circular blur background */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {/* Circular blur sized just for the Coming Soon message */}
          <div
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px]"
            style={{
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, rgba(147, 51, 234, 0.5) 30%, rgba(217, 70, 239, 0.4) 60%, transparent 100%)',
              filter: 'blur(80px)',
              transform: 'translate(-50%, -50%)'
            }}
          />
          
          {/* Coming Soon text on top */}
          <div className="relative z-10 text-center animate-fadeInUp">
            <Sparkles className="w-20 h-20 text-blue-400 mx-auto mb-6 animate-pulseGlow" />
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]">
              Coming Soon
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              We're setting up our contact system
            </p>
            <p className="text-gray-400">
              Check back soon to get in touch!
            </p>
          </div>
        </div>
      </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-3xl mx-auto relative">
          {/* Header */}
          <div className="text-center mb-12 animate-fadeInUp">
            <Sparkles className={`w-12 h-12 ${theme.text || 'text-blue-400'} mx-auto mb-6 animate-pulseGlow`} />
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-300">
              Have questions, suggestions, or just want to say hi? We'd love to hear from you!
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className={`glass-effect rounded-2xl p-8 border ${theme.border || 'border-white/10'} text-center hover-lift stagger-item`}>
              <Mail className={`w-10 h-10 ${theme.text || 'text-blue-400'} mx-auto mb-4`} />
              <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
              <p className="text-gray-400 mb-4">Drop us a line anytime</p>
              <a
                href="mailto:hello@delishhealthyfood.com"
                className={`${theme.text || 'text-blue-400'} hover:underline`}
              >
                hello@delishhealthyfood.com
              </a>
            </div>

            <div className={`glass-effect rounded-2xl p-8 border ${theme.border || 'border-white/10'} text-center hover-lift stagger-item`} style={{ animationDelay: '0.1s' }}>
              <MessageSquare className={`w-10 h-10 ${theme.text || 'text-blue-400'} mx-auto mb-4`} />
              <h3 className="text-xl font-bold text-white mb-2">Feedback</h3>
              <p className="text-gray-400 mb-4">Share your thoughts</p>
              <a
                href="mailto:feedback@delishhealthyfood.com"
                className={`${theme.text || 'text-blue-400'} hover:underline`}
              >
                feedback@delishhealthyfood.com
              </a>
            </div>
          </div>

          {/* Message Form */}
          <div className={`glass-effect rounded-2xl p-8 border ${theme.border || 'border-white/10'} animate-fadeInUp`} style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Send className={`w-6 h-6 ${theme.text || 'text-blue-400'}`} />
              Send Us a Message
            </h2>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-300 mb-2 font-medium">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${theme.border || 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors-smooth`}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${theme.border || 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors-smooth`}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">Message</label>
                <textarea
                  rows="6"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${theme.border || 'border-white/10'} text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors-smooth resize-none`}
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              {submitted && (
                <div className={`p-4 rounded-lg ${theme.highlight || 'bg-green-900/30'} border border-green-500/20 flex items-center gap-3 animate-fadeInUp`}>
                  <Check className="w-5 h-5 text-green-400" />
                  <p className="text-green-400 font-medium">Thank you! Your message has been sent successfully.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitted}
                className={`w-full px-6 py-3 rounded-lg ${theme.highlight || 'bg-blue-900/40'} border ${theme.border || 'border-blue-500/20'} ${theme.text || 'text-blue-400'} font-semibold hover-lift transition-all-smooth flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {submitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <p className="text-gray-400">
              We typically respond within 24-48 hours during business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
