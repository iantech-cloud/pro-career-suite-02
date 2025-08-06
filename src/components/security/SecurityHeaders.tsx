import { useEffect } from 'react';

// Component to set security headers via meta tags
export const SecurityHeaders = () => {
  useEffect(() => {
    // Set security-related meta tags
    const setMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Content Security Policy (basic)
    setMetaTag('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' data:; " +
      "connect-src 'self' https:;"
    );

    // X-Frame-Options
    setMetaTag('X-Frame-Options', 'DENY');

    // X-Content-Type-Options
    setMetaTag('X-Content-Type-Options', 'nosniff');

    // X-XSS-Protection
    setMetaTag('X-XSS-Protection', '1; mode=block');

    // Referrer Policy
    setMetaTag('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Permissions Policy
    setMetaTag('Permissions-Policy', 
      'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    );
  }, []);

  return null; // This component doesn't render anything
};