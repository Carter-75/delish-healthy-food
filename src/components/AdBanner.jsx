import React, { useEffect, useRef, useState } from 'react';

const AdBanner = ({ className = '' }) => {
  const adRef = useRef(null);
  const [status, setStatus] = useState('idle');

  const client = import.meta.env.VITE_ADSENSE_CLIENT_ID;
  const slot = import.meta.env.VITE_ADSENSE_SLOT_ID;
  const testMode = import.meta.env.VITE_ADSENSE_TEST_MODE;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!client || !slot) {
      console.error('Ad banner configuration missing. Set VITE_ADSENSE_CLIENT_ID and VITE_ADSENSE_SLOT_ID to enable ads.');
      setStatus('disabled');
      return;
    }

    if (!adRef.current) {
      return;
    }

    setStatus('loading');

    window.adsbygoogle = window.adsbygoogle || [];

    const scriptId = 'adsbygoogle-init-script';
    const existingScript = document.getElementById(scriptId);

    const handleScriptLoad = () => {
      if (!adRef.current) {
        setStatus('error');
        return;
      }

      try {
        window.adsbygoogle.push({});
        setStatus('ready');
      } catch (error) {
        console.error('Ad banner rendering failed. Verify your AdSense slot configuration.', error);
        setStatus('error');
      }
    };

    const handleScriptError = () => {
      console.error('Ad banner script failed to load. Confirm the AdSense client ID and network availability.');
      setStatus('error');
    };

    if (existingScript) {
      handleScriptLoad();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    script.crossOrigin = 'anonymous';
    script.addEventListener('load', handleScriptLoad);
    script.addEventListener('error', handleScriptError);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', handleScriptLoad);
      script.removeEventListener('error', handleScriptError);
    };
  }, [client, slot]);

  const isReady = status === 'ready';
  const containerClasses = [isReady ? 'relative z-10' : 'hidden', className].filter(Boolean).join(' ');

  return (
    <section className={containerClasses} aria-hidden={isReady ? undefined : 'true'} aria-label={isReady ? 'Advertisement' : undefined}>
      <div className="container mx-auto px-4">
        <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm p-4">
          <span className="sr-only">Advertisement</span>
          <ins
            ref={adRef}
            className="adsbygoogle block w-full h-36"
            style={{ display: 'block' }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
            {...(testMode ? { 'data-adtest': testMode } : {})}
          />
        </div>
      </div>
    </section>
  );
};

export default AdBanner;
