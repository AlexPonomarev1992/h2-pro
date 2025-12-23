// Image optimization configuration
export const imageConfig = {
  // Качество сжатия по умолчанию
  defaultQuality: 85,
  
  // Breakpoints для responsive images
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200,
  },
  
  // Sizes для различных типов изображений
  sizes: {
    logo: '(max-width: 768px) 80px, 120px',
    hero: '(max-width: 768px) 250px, 400px',
    card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    fullWidth: '100vw',
  },
  
  // Lazy loading настройки
  lazyLoading: {
    rootMargin: '50px 0px',
    threshold: 0.01,
  },
  
  // Fallback изображения
  fallbacks: {
    logo: '/assets/logo/h2pro-logo-fallback.png',
    placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+',
  },
};

// Утилиты для работы с изображениями
export const generateSrcSet = (basePath: string, sizes: number[]): string => {
  return sizes.map(size => `${basePath}-${size}.webp ${size}w`).join(', ');
};

export const generateSizes = (breakpoints: Array<{ width: number; size: string }>): string => {
  return breakpoints
    .map(bp => `(max-width: ${bp.width}px) ${bp.size}`)
    .join(', ');
};

export const preloadCriticalImages = (images: Array<{ src: string; as?: string }>) => {
  if (typeof window === 'undefined') return;
  
  images.forEach(({ src, as = 'image' }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = src;
    document.head.appendChild(link);
  });
};

// WebP support detection
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};