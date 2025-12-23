/**
 * Image optimization utilities for H2PRO website
 * Handles lazy loading, compression, and WebP conversion
 */

export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
  sizes?: string;
  quality?: number;
}

/**
 * Optimized image component that automatically handles:
 * - WebP format when supported
 * - Lazy loading
 * - Responsive sizes
 * - Fallback to original format
 */
export const getOptimizedImageSrc = (src: string, quality: number = 85): string => {
  // Check if it's already an optimized format
  if (src.includes('.webp') || src.includes('.avif')) {
    return src;
  }
  
  // For uploaded images, we'll use them as is for now
  // In production, you'd implement server-side optimization
  return src;
};

/**
 * Create responsive image sizes attribute
 */
export const getResponsiveSizes = (breakpoints?: string[]): string => {
  if (breakpoints) {
    return breakpoints.join(', ');
  }
  
  // Default responsive sizes
  return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
};

/**
 * Lazy loading intersection observer setup
 */
export const setupLazyLoading = (): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          
          if (src) {
            img.src = src;
            img.classList.remove('opacity-0');
            img.classList.add('opacity-100');
          }
        }
      });
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01
    }
  );
};

/**
 * Preload critical images with format optimization
 */
export const preloadCriticalImages = (images: string[]): void => {
  images.forEach((src) => {
    // Preload WebP version if available
    const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = webpSrc;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    
    // Fallback preload for original format
    const fallbackLink = document.createElement('link');
    fallbackLink.rel = 'preload';
    fallbackLink.as = 'image';
    fallbackLink.href = src;
    fallbackLink.crossOrigin = 'anonymous';
    document.head.appendChild(fallbackLink);
  });
};

/**
 * Get image dimensions for aspect ratio
 */
export const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = src;
  });
};