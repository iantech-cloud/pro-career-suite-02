import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  type?: string;
}

export const SEOHead = ({
  title = "OneSocialStack - AI-Powered Career Success Platform",
  description = "Transform your professional career with AI-powered CV builder, social media scheduler, and remote job search. Build professional resumes, manage social content, and discover opportunities.",
  keywords = "CV builder, resume builder, social media scheduler, job search, remote jobs, career tools, AI resume, professional development, LinkedIn scheduler, Twitter scheduler",
  ogTitle,
  ogDescription,
  ogImage = "/og-image.png",
  canonical,
  type = "website"
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:image', ogImage, true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', ogTitle || title);
    updateMetaTag('twitter:description', ogDescription || description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    } else {
      // Set current page as canonical by default
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', window.location.href);
    }

    // Structured data for organization
    try {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "OneSocialStack",
        "url": window.location.origin,
        "logo": `${window.location.origin}/logo.png`,
        "description": description,
        "foundingDate": "2024",
        "sameAs": [
          "https://twitter.com/onesocialstack",
          "https://linkedin.com/company/onesocialstack"
        ],
        "serviceType": ["CV Builder", "Social Media Management", "Job Search"]
      };

      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    } catch (error) {
      console.warn('Failed to set structured data:', error);
    }

  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonical, type]);

  return null;
};