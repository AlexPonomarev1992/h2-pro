import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  fallback?: string;
  placeholder?: 'blur' | 'empty';
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

// Карта оптимизированных изображений
const OPTIMIZED_IMAGES: Record<string, { webp?: string; fallback?: string; sizes?: string[] }> = {
  // Логотип H2PRO в разных размерах
  '/lovable-uploads/IMG_6735-2.PNG': {
    webp: '/assets/logo/h2pro-optimized',
    sizes: ['512', '1024'],
  },
  // Другие изображения можно добавить здесь
};

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  quality = 85,
  fallback,
  placeholder = 'empty',
  style,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Определяем оптимизированные источники
  const optimizedConfig = OPTIMIZED_IMAGES[src];
  
  useEffect(() => {
    if (priority) {
      // Для приоритетных изображений загружаем сразу
      loadImage();
    } else {
      // Для неприоритетных используем Intersection Observer
      setupLazyLoading();
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, priority]);

  const loadImage = () => {
    if (optimizedConfig?.webp) {
      // Пробуем загрузить WebP версию
      const webpSrc = `${optimizedConfig.webp}-512.webp`; // Начинаем с минимального размера
      setCurrentSrc(webpSrc);
    } else {
      setCurrentSrc(src);
    }
  };

  const setupLazyLoading = () => {
    if (!imgRef.current || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      loadImage();
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage();
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
      }
    );

    observerRef.current.observe(imgRef.current);
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    
    // Если WebP не загрузился, пробуем fallback
    if (currentSrc.includes('.webp') && optimizedConfig) {
      setCurrentSrc(fallback || src);
    } else {
      onError?.();
    }
  };

  // Создаем srcSet для responsive images
  const createSrcSet = () => {
    if (!optimizedConfig?.webp || !optimizedConfig.sizes) {
      return undefined;
    }

    return optimizedConfig.sizes
      .map((size) => `${optimizedConfig.webp}-${size}.webp ${size}w`)
      .join(', ');
  };

  const imgClasses = cn(
    'transition-opacity duration-300',
    {
      'opacity-0': !isLoaded && !hasError,
      'opacity-100': isLoaded || hasError,
    },
    className
  );

  // Создаем базовый элемент img
  const imageElement = (
    <img
      ref={imgRef}
      src={currentSrc || (priority ? src : undefined)}
      srcSet={createSrcSet()}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      style={style}
      className={imgClasses}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );

  // Если поддерживается <picture>, используем его для WebP
  if (optimizedConfig?.webp && typeof window !== 'undefined') {
    return (
      <picture>
        <source
          srcSet={createSrcSet()}
          sizes={sizes}
          type="image/webp"
        />
        <source
          srcSet={`${src} 1x`}
          type="image/png"
        />
        {imageElement}
      </picture>
    );
  }

  return imageElement;
};

export default OptimizedImage;