import React, { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { ChefHat, Heart, Shield, Sparkles, Target, Zap } from 'lucide-react';
import Seo from '../components/Seo';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <div 
    className="glass-card rounded-[2rem] p-10 space-y-6 animate-fadeInUp border-white/5"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center">
      <Icon className="w-7 h-7 text-brand-400" />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-black text-white font-serif">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const AboutPage = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('default');
    window.scrollTo(0, 0);
  }, [setTheme]);

  return (
    <div className="pb-32">
      <Seo 
        title="About Us - Delish Healthy Food"
        description="Learn about our mission to provide high-protein, delicious recipes for fitness enthusiasts."
      />

      {/* Hero Section */}
      <div className="relative pt-24 pb-20 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 bg-slate-900/50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 blur-[120px] rounded-full animate-pulse" />
        
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-widest animate-fadeInDown">
            <Sparkles className="w-3 h-3" />
            <span>Our Philosophy</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white font-serif leading-tight tracking-tight animate-fadeInUp">
            Fueling Your <span className="text-brand-500 italic">Ambition</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            Delish Healthy Food was born from a simple belief: high-performance nutrition shouldn't taste like a compromise. We curate the world's most effective high-protein recipes to help you build, recover, and excel.
          </p>
        </div>
      </div>

      {/* Philosophy Grid */}
      <div className="container mx-auto px-4 max-w-7xl mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          icon={Target}
          title="Goal Focused"
          description="Every recipe is macro-optimized to ensure you hit your targets without the guesswork."
          delay={0.2}
        />
        <FeatureCard 
          icon={ChefHat}
          title="Chef Crafted"
          description="We prioritize culinary excellence, proving that healthy eating can be the best part of your day."
          delay={0.3}
        />
        <FeatureCard 
          icon={Heart}
          title="Clean Sourcing"
          description="Integrity matters. We focus on whole, nutrient-dense ingredients that your body will love."
          delay={0.4}
        />
        <FeatureCard 
          icon={Shield}
          title="Scientifically Backed"
          description="Our balances of protein, fats, and carbs are designed based on modern fitness nutrition standards."
          delay={0.5}
        />
        <FeatureCard 
          icon={Zap}
          title="Instant Access"
          description="Quick instructions and clear steps to get you from the gym to the table faster."
          delay={0.6}
        />
        <FeatureCard 
          icon={Sparkles}
          title="Constant Innovation"
          description="We are always experimenting with new flavors and global cuisines to keep your diet exciting."
          delay={0.7}
        />
      </div>

      {/* Quote Section */}
      <div className="container mx-auto px-4 max-w-5xl mt-32">
        <div className="relative p-16 glass-card rounded-[3rem] overflow-hidden border-brand-500/10 text-center space-y-8">
          <div className="absolute inset-0 bg-brand-500/[0.02] -z-10" />
          <Heart className="w-12 h-12 text-brand-500 mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif leading-tight">
            "We aren't just sharing recipes; we're building a community of people who refuse to settle for average nutrition."
          </h2>
          <div className="flex items-center justify-center gap-3 text-brand-400 font-bold uppercase tracking-widest text-xs">
            <div className="h-px w-10 bg-brand-500/40" />
            <span>The Founders</span>
            <div className="h-px w-10 bg-brand-500/40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
