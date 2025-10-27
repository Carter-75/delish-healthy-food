import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Heart, Target, TrendingUp, Users, Sparkles } from 'lucide-react';

const AboutPage = () => {
  const { theme } = useTheme();

  const features = [
    {
      icon: Target,
      title: 'Fitness Focused',
      description: 'Every recipe is designed with your fitness goals in mind, providing high-protein meals that fuel your workouts and recovery.'
    },
    {
      icon: Heart,
      title: 'Nutritionally Balanced',
      description: 'We calculate precise macros for each recipe, helping you track your nutrition intake with confidence.'
    },
    {
      icon: TrendingUp,
      title: 'Easy to Follow',
      description: 'Step-by-step instructions make cooking simple, even for beginners. No complex techniques required.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Recipes are tested and loved by our fitness community, ensuring great taste and results.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeInUp">
          <Sparkles className={`w-12 h-12 ${theme.text || 'text-blue-400'} mx-auto mb-6 animate-pulseGlow`} />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About Delish Healthy Food
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Your ultimate destination for delicious, protein-packed recipes that support your fitness journey.
          </p>
        </div>

        {/* Mission Statement */}
        <div className={`glass-effect rounded-2xl p-8 border ${theme.border || 'border-white/10'} 
          mb-12 animate-fadeInUp`} style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            We believe that eating healthy doesn't mean sacrificing flavor. Our mission is to provide 
            you with delicious, high-protein recipes that make it easy to stick to your fitness goals 
            while enjoying every bite. Whether you're building muscle, losing weight, or simply 
            maintaining a healthy lifestyle, our recipes are crafted to support your journey.
          </p>
        </div>

        {/* Features Grid */}
        <h2 className="text-3xl font-bold text-white text-center mb-8 animate-fadeInUp" 
          style={{ animationDelay: '0.3s' }}>
          Why Choose Us
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`glass-effect rounded-xl p-6 border ${theme.border || 'border-white/10'} 
                  hover-lift stagger-item`}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className={`inline-flex p-3 rounded-xl ${theme.highlight || 'bg-blue-900/30'} 
                  border ${theme.border || 'border-blue-500/20'} mb-4`}>
                  <Icon className={`w-6 h-6 ${theme.text || 'text-blue-400'}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className={`glass-effect rounded-2xl p-8 border ${theme.border || 'border-white/10'} 
          text-center animate-fadeInUp`} style={{ animationDelay: '0.8s' }}>
          <h2 className="text-2xl font-bold text-white mb-4">Start Your Journey Today</h2>
          <p className="text-gray-300 mb-6">
            Browse our collection of protein-packed recipes and discover your new favorites!
          </p>
          <a
            href="/"
            className={`inline-block px-8 py-3 rounded-xl ${theme.highlight || 'bg-blue-900/40'} 
              border ${theme.border || 'border-blue-500/20'} ${theme.text || 'text-blue-400'} 
              font-semibold hover-lift transition-all-smooth`}
          >
            Explore Recipes
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
