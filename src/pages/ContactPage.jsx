import React, { useState, useMemo } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Mail, MessageSquare, Sparkles, Send, Check } from 'lucide-react';

const ContactPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

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

  // Generate randomized blur spots - more in center, fewer and smaller towards edges
  const blurSpots = useMemo(() => {
    const spots = [];
    const centerX = 50;
    const centerY = 50;
    
    // Generate 40 random blur spots
    for (let i = 0; i < 40; i++) {
      // Random position
      const x = Math.random() * 120 - 10; // -10% to 110% (extends beyond viewport)
      const y = Math.random() * 120 - 10;
      
      // Calculate distance from center (0 to ~70)
      const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      
      // Probability decreases with distance (skip some spots far from center)
      const probabilityThreshold = Math.max(0, 1 - (distanceFromCenter / 80));
      if (Math.random() > probabilityThreshold) continue;
      
      // Size decreases with distance (100px to 800px, smaller when farther)
      const maxSize = 800 - (distanceFromCenter * 8);
      const size = Math.max(100, maxSize + (Math.random() * 200 - 100));
      
      // Opacity decreases with distance (0.05 to 0.35)
      const opacity = Math.max(0.05, 0.35 - (distanceFromCenter / 100));
      
      // Blur amount decreases with distance (40px to 140px)
      const blurAmount = Math.max(40, 140 - (distanceFromCenter * 1.2));
      
      // Random color - more pink/purple as requested
      const colors = [
        `rgba(236, 72, 153, ${opacity})`, // pink
        `rgba(217, 70, 239, ${opacity})`, // fuchsia
        `rgba(147, 51, 234, ${opacity})`, // purple
        `rgba(192, 132, 252, ${opacity})`, // light purple
        `rgba(139, 92, 246, ${opacity})`, // violet
        `rgba(59, 130, 246, ${opacity * 0.7})`, // blue (less frequent)
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      spots.push({
        id: i,
        x,
        y,
        size,
        color,
        blurAmount,
        animationDelay: Math.random() * 3
      });
    }
    
    return spots;
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Full viewport blur overlay - covers entire page, not just content */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-40">
        {/* Base backdrop blur */}
        <div className="absolute inset-0 bg-slate-900/20" style={{ backdropFilter: 'blur(8px)' }}></div>
        
        {/* Randomized blur spots scattered across entire viewport */}
        {blurSpots.map(spot => (
          <div
            key={spot.id}
            className="absolute animate-float"
            style={{
              left: `${spot.x}%`,
              top: `${spot.y}%`,
              width: `${spot.size}px`,
              height: `${spot.size}px`,
              background: `radial-gradient(circle, ${spot.color} 0%, transparent 70%)`,
              filter: `blur(${spot.blurAmount}px)`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${spot.animationDelay}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

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

          {/* Coming Soon Message - overlaid on top */}
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="relative text-center animate-fadeInUp">
              <Sparkles className="w-20 h-20 text-pink-400 mx-auto mb-6 animate-pulseGlow" />
              <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
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
      </div>
    </div>
  );
};

export default ContactPage;
