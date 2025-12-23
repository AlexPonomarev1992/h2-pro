import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
  sizes?: string;
  quality?: number;
  aspectRatio?: string;
  placeholder?: 'blur' | 'skeleton' | 'none';
  priority?: boolean;
  width?: number;
  height?: number;
}

// Image optimization mapping with WebP support
const IMAGE_OPTIMIZATIONS: Record<string, {
  webp?: string;
  avif?: string;
  sizes: number[];
  blurPlaceholder?: string;
}> = {
  '/lovable-uploads/IMG_6735-2.PNG': {
    webp: '/assets/h2pro-logo-optimized.webp',
    sizes: [64, 128, 256, 512],
    blurPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjZjFmNWY5IiBvcGFjaXR5PSIwLjIiLz4KPHN2Zz4K'
  },
};

const createOptimizedSrcSet = (src: string, quality: number = 85): string => {
  const optimization = IMAGE_OPTIMIZATIONS[src];
  if (!optimization?.webp) return src;

  return optimization.sizes
    .map(size => `${optimization.webp!.replace('.webp', `-${size}.webp`)} ${size}w`)
    .join(', ');
};

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  lazy = true,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  aspectRatio,
  placeholder = 'blur',
  priority = false,
  width,
  height
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const optimization = IMAGE_OPTIMIZATIONS[src];
  
  useEffect(() => {
    if (priority || !lazy) {
      loadImage();
    } else {
      setupLazyLoading();
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, priority, lazy]);

  const loadImage = () => {
    if (optimization?.webp) {
      setCurrentSrc(optimization.webp.replace('.webp', '-512.webp'));
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
  };

  const handleError = () => {
    setHasError(true);
    if (currentSrc.includes('.webp')) {
      setCurrentSrc(src); // Fallback to original
    }
  };

  if (hasError) {
    return (
      <div className={cn("bg-muted flex items-center justify-center rounded", className)}>
        <span className="text-muted-foreground text-sm">Изображение недоступно</span>
      </div>
    );
  }

  const imageClasses = cn(
    "transition-all duration-500 ease-out w-full h-full object-cover",
    {
      "opacity-0 scale-95": !isLoaded,
      "opacity-100 scale-100": isLoaded,
    }
  );

  const imageElement = (
    <img
      ref={imgRef}
      src={currentSrc || (!lazy ? src : undefined)}
      srcSet={optimization ? createOptimizedSrcSet(src, quality) : undefined}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={imageClasses}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );

  // Modern picture element with WebP support
  if (optimization?.webp && typeof window !== 'undefined') {
    return (
      <div 
        className={cn("relative overflow-hidden", className)} 
        style={{ aspectRatio }}
      >
        {/* Blur placeholder */}
        {!isLoaded && optimization.blurPlaceholder && placeholder === 'blur' && (
          <img
            src={optimization.blurPlaceholder}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm"
            aria-hidden="true"
          />
        )}
        
        {/* Skeleton placeholder */}
        {!isLoaded && placeholder === 'skeleton' && (
          <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
        )}

        <picture>
          <source
            srcSet={createOptimizedSrcSet(src, quality)}
            sizes={sizes}
            type="image/webp"
          />
          <source
            srcSet={`${src} 1x`}
            type="image/png"
          />
          {imageElement}
        </picture>
      </div>
    );
  }

  return (
    <div 
      className={cn("relative overflow-hidden", className)} 
      style={{ aspectRatio }}
    >
      {!isLoaded && placeholder === 'skeleton' && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
      )}
      {imageElement}
    </div>
  );
};

export default OptimizedImage;