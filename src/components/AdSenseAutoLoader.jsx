import { useEffect } from 'react';

const AdSenseAutoLoader = () => {
  const client = import.meta.env.VITE_ADSENSE_CLIENT_ID;
  const testMode = import.meta.env.VITE_ADSENSE_TEST_MODE;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!client) {
      console.error('AdSense auto ads skipped. Set VITE_ADSENSE_CLIENT_ID to enable automatic ads.');
      return;
    }

    window.adsbygoogle = window.adsbygoogle || [];

    const scriptId = 'adsbygoogle-auto-init';
    const existingScript = document.getElementById(scriptId);

    const initializeAutoAds = () => {
      try {
        window.adsbygoogle.push({
          google_ad_client: client,
          enable_page_level_ads: true,
        });
      } catch (error) {
        console.error('AdSense auto ads initialization failed. Verify the client ID.', error);
      }
    };

    if (existingScript) {
      initializeAutoAds();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    script.crossOrigin = 'anonymous';
    script.dataset.adClient = client;
    if (testMode) {
      script.dataset.adtest = testMode;
    }
    script.addEventListener('load', initializeAutoAds);
    script.addEventListener('error', () => {
      console.error('AdSense auto ads script failed to load. Check the client ID and network state.');
    });
    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', initializeAutoAds);
    };
  }, [client, testMode]);

  return null;
};

export default AdSenseAutoLoader;
