import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Mail, MessageSquare, Sparkles, Send, Check } from 'lucide-react';

const ContactPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    // For now, we'll just show a success message
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

  return (
    <div className="relative min-h-screen">
      {/* Radial blur background effect - multiple layers for smooth gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Center blur spot - strongest */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] 
          bg-gradient-radial from-blue-500/30 via-purple-500/20 to-transparent rounded-full blur-[120px] animate-pulseGlow" />
        
        {/* Secondary blur spots - medium intensity */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] 
          bg-gradient-radial from-violet-500/20 via-indigo-500/10 to-transparent rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] 
          bg-gradient-radial from-pink-500/20 via-purple-500/10 to-transparent rounded-full blur-[100px] animate-float" 
          style={{ animationDelay: '1.5s' }} />
        
        {/* Edge blur spots - subtle */}
        <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] 
          bg-gradient-radial from-cyan-500/15 to-transparent rounded-full blur-[80px] animate-float" 
          style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] 
          bg-gradient-radial from-fuchsia-500/15 to-transparent rounded-full blur-[80px] animate-float" 
          style={{ animationDelay: '2s' }} />
        
        {/* Ambient blur - very subtle, covers more area */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-[60px]" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-3xl mx-auto">
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
          <div className={`glass-effect rounded-2xl p-8 border ${theme.border || 'border-white/10'} 
            text-center hover-lift stagger-item`}>
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

          <div className={`glass-effect rounded-2xl p-8 border ${theme.border || 'border-white/10'} 
            text-center hover-lift stagger-item`} style={{ animationDelay: '0.1s' }}>
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
        <div className={`glass-effect rounded-2xl p-8 border ${theme.border || 'border-white/10'} 
          animate-fadeInUp`} style={{ animationDelay: '0.2s' }}>
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
                className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${theme.border || 'border-white/10'} 
                  text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 
                  transition-colors-smooth`}
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
                className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${theme.border || 'border-white/10'} 
                  text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 
                  transition-colors-smooth`}
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
                className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${theme.border || 'border-white/10'} 
                  text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 
                  transition-colors-smooth resize-none`}
                placeholder="Tell us what's on your mind..."
              />
            </div>

            {submitted && (
              <div className={`p-4 rounded-lg ${theme.highlight || 'bg-green-900/30'} border border-green-500/20 
                flex items-center gap-3 animate-fadeInUp`}>
                <Check className="w-5 h-5 text-green-400" />
                <p className="text-green-400 font-medium">Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitted}
              className={`w-full px-6 py-3 rounded-lg ${theme.highlight || 'bg-blue-900/40'} 
                border ${theme.border || 'border-blue-500/20'} ${theme.text || 'text-blue-400'} 
                font-semibold hover-lift transition-all-smooth flex items-center justify-center gap-2
                disabled:opacity-50 disabled:cursor-not-allowed`}
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
  );
};

export default ContactPage;
