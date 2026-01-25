import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Shield, Sparkles, Info } from 'lucide-react';
import Seo from '../components/Seo';

const PrivacyPolicyPage = () => {
  const { theme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-12">
      <Seo
        title="Privacy Policy - Delish Healthy Food"
        description="Read how Delish Healthy Food collects and uses data, cookies, and advertising information."
        canonicalPath="/privacy"
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fadeInUp">
          <Shield className={`w-12 h-12 ${theme.text || 'text-blue-400'} mx-auto mb-6 animate-pulseGlow`} />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-300 text-lg">
            Your privacy matters. This page explains what data we collect and how it is used.
          </p>
        </div>

        <div className={`glass-effect rounded-2xl p-8 border ${theme.border || 'border-white/10'} space-y-10`}>
          <section>
            <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <Info className={`w-5 h-5 ${theme.text || 'text-blue-400'}`} />
              Overview
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Delish Healthy Food provides recipe content and nutrition information. We do not sell your personal
              information. We use standard analytics and advertising tools to keep the site running and to improve
              the experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Data We Collect</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Basic usage data such as pages viewed, device type, and approximate location derived from IP address.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Cookie and device identifiers used by analytics and advertising partners, including Google.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Information you provide if you email us directly.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Advertising (Google AdSense)</h2>
            <p className="text-gray-300 leading-relaxed">
              We use Google AdSense to show ads. Third parties, including Google, may use cookies or web beacons to
              serve ads based on a user’s visits to this and other websites. You can learn more about how Google uses
              data here: <a className={`${theme.text || 'text-blue-400'} underline`} href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">How Google uses data when you use our partners’ sites or apps</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Cookies</h2>
            <p className="text-gray-300 leading-relaxed">
              Cookies help us understand site performance and show relevant ads. You can control cookies through your
              browser settings. Blocking cookies may reduce site functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Children’s Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              This site is not directed to children under 13. We do not knowingly collect personal information from
              children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Contact</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have questions about this policy, email us at <a className={`${theme.text || 'text-blue-400'} underline`} href="mailto:cartermoyer75@gmail.com">cartermoyer75@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Updates</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this policy from time to time. Changes will appear on this page.
            </p>
          </section>
        </div>

        <div className="mt-10 text-center text-gray-400 text-sm flex items-center justify-center gap-2">
          <Sparkles className={`w-4 h-4 ${theme.text || 'text-blue-400'}`} />
          Last updated: January 25, 2026
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
