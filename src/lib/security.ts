import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string safe for rendering
 */
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    // Allow common HTML tags for blog content
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'strong', 'em', 'u', 'i', 'b',
      'ul', 'ol', 'li',
      'blockquote', 'code', 'pre',
      'a', 'img',
      'div', 'span'
    ],
    ALLOWED_ATTR: [
      'href', 'title', 'target', 'rel',
      'src', 'alt', 'width', 'height',
      'class', 'id'
    ],
    // Remove scripts and other dangerous elements
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed'],
    FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover'],
    // Keep relative URLs but sanitize them
    ALLOW_DATA_ATTR: false,
    // Remove unknown protocols
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  });
};

/**
 * Validates and sanitizes user input for safe storage/display
 * @param input - The user input to sanitize
 * @returns Sanitized string
 */
export const sanitizeUserInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  }).trim();
};

/**
 * Rate limiting helper for client-side (UI feedback only)
 * @param key - Unique key for the action
 * @param windowMs - Time window in milliseconds
 * @param maxAttempts - Maximum attempts allowed
 * @returns true if action is allowed, false if rate limited
 */
export const checkRateLimit = (key: string, windowMs: number = 60000, maxAttempts: number = 5): boolean => {
  const now = Date.now();
  const attempts = JSON.parse(localStorage.getItem(`rate_limit_${key}`) || '[]');
  
  // Remove old attempts outside the window
  const validAttempts = attempts.filter((attempt: number) => now - attempt < windowMs);
  
  if (validAttempts.length >= maxAttempts) {
    return false;
  }
  
  // Add current attempt
  validAttempts.push(now);
  localStorage.setItem(`rate_limit_${key}`, JSON.stringify(validAttempts));
  
  return true;
};

/**
 * Secure token storage utilities
 */
export const tokenStorage = {
  setToken: (token: string) => {
    // For now, use localStorage but mark as insecure
    // TODO: Implement httpOnly cookies on backend
    localStorage.setItem('auth_token', token);
    
    // Set expiration time (24 hours)
    const expiration = Date.now() + (24 * 60 * 60 * 1000);
    localStorage.setItem('auth_token_exp', expiration.toString());
  },
  
  getToken: (): string | null => {
    const token = localStorage.getItem('auth_token');
    const expiration = localStorage.getItem('auth_token_exp');
    
    if (!token || !expiration) {
      return null;
    }
    
    // Check if token is expired
    if (Date.now() > parseInt(expiration)) {
      tokenStorage.removeToken();
      return null;
    }
    
    return token;
  },
  
  removeToken: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token_exp');
  },
  
  isTokenExpired: (): boolean => {
    const expiration = localStorage.getItem('auth_token_exp');
    if (!expiration) return true;
    
    return Date.now() > parseInt(expiration);
  }
};
