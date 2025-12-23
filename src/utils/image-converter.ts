/**
 * Advanced image optimization and conversion utilities
 * Handles WebP/AVIF conversion, responsive sizing, and blur placeholders
 */

export interface ImageOptimizationConfig {
  quality: {
    webp: number;
    avif: number;
    jpeg: number;
  };
  sizes: number[];
  enableBlurPlaceholder: boolean;
  enableProgressive: boolean;
}

export const DEFAULT_OPTIMIZATION_CONFIG: ImageOptimizationConfig = {
  quality: {
    webp: 85,
    avif: 75,
    jpeg: 90
  },
  sizes: [256, 512, 768, 1024, 1920],
  enableBlurPlaceholder: true,
  enableProgressive: true
};

/**
 * Generate optimized image URLs for different formats and sizes
 */
export const generateOptimizedImages = (
  originalSrc: string,
  config: ImageOptimizationConfig = DEFAULT_OPTIMIZATION_CONFIG
) => {
  const baseName = originalSrc.replace(/\.[^/.]+$/, "");
  const extension = originalSrc.split('.').pop()?.toLowerCase();
  
  const optimized = {
    webp: config.sizes.map(size => ({
      src: `${baseName}-${size}.webp`,
      width: size,
      type: 'image/webp'
    })),
    avif: config.sizes.map(size => ({
      src: `${baseName}-${size}.avif`, 
      width: size,
      type: 'image/avif'
    })),
    fallback: {
      src: originalSrc,
      type: `image/${extension === 'jpg' ? 'jpeg' : extension}`
    }
  };

  return optimized;
};

/**
 * Create responsive srcSet string for picture element
 */
export const createSrcSet = (images: Array<{src: string; width: number}>) => {
  return images.map(img => `${img.src} ${img.width}w`).join(', ');
};

/**
 * Generate blur placeholder as base64 SVG
 */
export const generateBlurPlaceholder = (
  width: number = 64,
  height: number = 64,
  color: string = '#f1f5f9'
): string => {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${color}" opacity="0.2"/>
      <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height)/4}" fill="${color}" opacity="0.1"/>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Calculate optimal image size based on container and device
 */
export const calculateOptimalSize = (
  containerWidth: number,
  devicePixelRatio: number = window.devicePixelRatio || 1,
  availableSizes: number[] = DEFAULT_OPTIMIZATION_CONFIG.sizes
): number => {
  const targetWidth = containerWidth * devicePixelRatio;
  
  // Find the smallest size that's larger than target
  const optimalSize = availableSizes.find(size => size >= targetWidth);
  
  // If no size is large enough, use the largest available
  return optimalSize || availableSizes[availableSizes.length - 1];
};

/**
 * Detect WebP and AVIF support
 */
export const detectImageSupport = (): Promise<{webp: boolean; avif: boolean}> => {
  return new Promise((resolve) => {
    const webp = new Image();
    const avif = new Image();
    
    let webpSupported = false;
    let avifSupported = false;
    let checksCompleted = 0;
    
    const checkComplete = () => {
      checksCompleted++;
      if (checksCompleted === 2) {
        resolve({ webp: webpSupported, avif: avifSupported });
      }
    };
    
    webp.onload = webp.onerror = () => {
      webpSupported = webp.height === 2;
      checkComplete();
    };
    
    avif.onload = avif.onerror = () => {
      avifSupported = avif.height === 2;
      checkComplete();
    };
    
    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=';
  });
};

/**
 * Preload critical images with format detection
 */
export const preloadOptimizedImage = async (
  src: string,
  priority: 'high' | 'low' = 'high',
  sizes: string = '(max-width: 768px) 100vw, 50vw'
) => {
  const support = await detectImageSupport();
  const optimizedImages = generateOptimizedImages(src);
  
  let targetSrc = src;
  
  if (support.avif && optimizedImages.avif.length > 0) {
    targetSrc = optimizedImages.avif[0].src;
  } else if (support.webp && optimizedImages.webp.length > 0) {
    targetSrc = optimizedImages.webp[0].src;
  }
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = targetSrc;
  link.crossOrigin = 'anonymous';
  
  if (priority === 'high') {
    link.fetchPriority = 'high';
  }
  
  document.head.appendChild(link);
};