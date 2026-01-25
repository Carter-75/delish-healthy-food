import { useEffect } from 'react';

const applyMeta = (name, content) => {
  if (!content) return;
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const applyProperty = (property, content) => {
  if (!content) return;
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const Seo = ({
  title,
  description,
  canonicalPath,
  image,
  type = 'website'
}) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    applyMeta('description', description);
    applyProperty('og:title', title || document.title);
    applyProperty('og:description', description);
    applyProperty('og:type', type);

    const canonicalUrl = canonicalPath
      ? `${window.location.origin}${canonicalPath}`
      : window.location.origin + window.location.pathname;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    if (image) {
      const imageUrl = image.startsWith('http')
        ? image
        : `${window.location.origin}${image}`;
      applyProperty('og:image', imageUrl);
      applyProperty('twitter:image', imageUrl);
    }

    applyProperty('og:url', canonicalUrl);
    applyMeta('twitter:card', image ? 'summary_large_image' : 'summary');
    applyMeta('twitter:title', title || document.title);
    applyMeta('twitter:description', description);
  }, [title, description, canonicalPath, image, type]);

  return null;
};

export default Seo;
