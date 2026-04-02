import React, { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Mail, MessageSquare, Twitter, Globe, Sparkles, Send } from 'lucide-react';
import Seo from '../components/Seo';

const ContactItem = ({ icon: Icon, title, value, href, delay }) => (
  <a 
    href={href}
    className="glass-card rounded-[2rem] p-10 flex flex-col items-center text-center space-y-6 animate-fadeInUp border-white/5 hover:border-brand-500/30 group"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-600 transition-all-smooth">
      <Icon className="w-7 h-7 text-brand-400 group-hover:text-white transition-colors" />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-black text-white font-serif">{title}</h3>
      <p className="text-slate-400 font-bold text-sm tracking-tight">{value}</p>
    </div>
  </a>
);

const ContactPage = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('default');
    window.scrollTo(0, 0);
  }, [setTheme]);

  return (
    <div className="pb-32">
      <Seo 
        title="Contact Us - Delish Healthy Food"
        description="Get in touch with the Delish Healthy Food team for recipe inquiries or feedback."
      />

      {/* Hero Section */}
      <div className="relative pt-24 pb-20 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 bg-slate-900/50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 blur-[120px] rounded-full animate-pulse" />
        
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-widest animate-fadeInDown">
            <MessageSquare className="w-3 h-3" />
            <span>Get In Touch</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white font-serif leading-tight tracking-tight animate-fadeInUp">
            Connect With the <br /><span className="text-brand-500 italic">Masters</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            Have a recipe suggestion, a technical question, or just want to share your progress? We're here to listen and help you optimize your culinary journey.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ContactItem 
          icon={Mail}
          title="Email Us"
          value="hello@delishmastery.com"
          href="mailto:hello@delishmastery.com"
          delay={0.2}
        />
        <ContactItem 
          icon={Twitter}
          title="Twitter / X"
          value="@DelishMastery"
          href="#"
          delay={0.3}
        />
        <ContactItem 
          icon={Globe}
          title="Support Hub"
          value="support.delishmastery.com"
          href="#"
          delay={0.4}
        />
      </div>

      {/* Simple Form Section - Visual Only */}
      <div className="container mx-auto px-4 max-w-4xl mt-32">
        <div className="glass-card rounded-[3rem] p-12 lg:p-20 space-y-12 border-brand-500/10">
          <div className="text-center space-y-4">
             <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
               Send a <span className="text-brand-500 italic">Direct Message</span>
             </h2>
             <p className="text-slate-500 font-medium">Responses typically within 24-48 business hours.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-500 ml-4">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-brand-500/50 outline-none text-white transition-all-smooth"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-500 ml-4">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-brand-500/50 outline-none text-white transition-all-smooth"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-500 ml-4">Your Message</label>
              <textarea 
                rows="5"
                placeholder="Describe your inquiry..."
                className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl focus:border-brand-500/50 outline-none text-white transition-all-smooth resize-none"
              ></textarea>
            </div>
          </div>

          <button className="w-full py-5 bg-brand-600 hover:bg-brand-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all-smooth flex items-center justify-center gap-3">
             <Send className="w-5 h-5" />
             <span>Send Message</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
