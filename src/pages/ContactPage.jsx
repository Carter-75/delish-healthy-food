import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Mail, MessageSquare, Sparkles, Send } from 'lucide-react';

const ContactPage = () => {
  const { theme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-12">
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
              href="mailto:hello@delishprotein.com"
              className={`${theme.text || 'text-blue-400'} hover:underline`}
            >
              hello@delishprotein.com
            </a>
          </div>

          <div className={`glass-effect rounded-2xl p-8 border ${theme.border || 'border-white/10'} 
            text-center hover-lift stagger-item`} style={{ animationDelay: '0.1s' }}>
            <MessageSquare className={`w-10 h-10 ${theme.text || 'text-blue-400'} mx-auto mb-4`} />
            <h3 className="text-xl font-bold text-white mb-2">Feedback</h3>
            <p className="text-gray-400 mb-4">Share your thoughts</p>
            <a
              href="mailto:feedback@delishprotein.com"
              className={`${theme.text || 'text-blue-400'} hover:underline`}
            >
              feedback@delishprotein.com
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
          
          <form className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Your Name</label>
              <input
                type="text"
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
                className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${theme.border || 'border-white/10'} 
                  text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 
                  transition-colors-smooth resize-none`}
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <button
              type="submit"
              className={`w-full px-6 py-3 rounded-lg ${theme.highlight || 'bg-blue-900/40'} 
                border ${theme.border || 'border-blue-500/20'} ${theme.text || 'text-blue-400'} 
                font-semibold hover-lift transition-all-smooth flex items-center justify-center gap-2`}
            >
              <Send className="w-5 h-5" />
              Send Message
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
