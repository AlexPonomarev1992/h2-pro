import React, { useState, useRef, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { 
  generateOptimizedImages, 
  createSrcSet, 
  generateBlurPlaceholder,
  calculateOptimalSize,
  detectImageSupport,
  DEFAULT_OPTIMIZATION_CONFIG
} from '@/utils/image-converter';

interface AdvancedOptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'skeleton' | 'none';
  aspectRatio?: string;
  onLoad?: () => void;
  onError?: () => void;
  blurDataURL?: string;
}

const AdvancedOptimizedImage: React.FC<AdvancedOptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  quality = 85,
  placeholder = 'blur',
  aspectRatio,
  onLoad,
  onError,
  blurDataURL
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSupport, setImageSupport] = useState<{webp: boolean; avif: boolean} | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate optimized image variants
  const optimizedImages = useMemo(() => 
    generateOptimizedImages(src, {
      ...DEFAULT_OPTIMIZATION_CONFIG,
      quality: { ...DEFAULT_OPTIMIZATION_CONFIG.quality, webp: quality }
    }),
    [src, quality]
  );

  // Generate blur placeholder if not provided
  const blurPlaceholder = useMemo(() => 
    blurDataURL || generateBlurPlaceholder(64, 64, 'hsl(var(--muted))'),
    [blurDataURL]
  );

  useEffect(() => {
    // Detect format support
    detectImageSupport().then(setImageSupport);
  }, []);

  useEffect(() => {
    if (priority) {
      // Load immediately for priority images
      return;
    }

    // Set up Intersection Observer for lazy loading
    if (!imgRef.current || typeof window === 'undefined') return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const dataSrc = img.dataset.src;
            if (dataSrc) {
              img.src = dataSrc;
              img.removeAttribute('data-src');
            }
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div className={cn(
        "bg-muted flex items-center justify-center rounded",
        "min-h-[100px] text-muted-foreground",
        className
      )}>
        <span className="text-sm">Изображение недоступно</span>
      </div>
    );
  }

  const imageClasses = cn(
    "transition-all duration-500 ease-out",
    {
      "opacity-0 scale-95 blur-sm": !isLoaded,
      "opacity-100 scale-100 blur-0": isLoaded,
    },
    className
  );

  // Create the main image element
  const imageElement = (
    <img
      ref={imgRef}
      src={priority ? src : undefined}
      data-src={priority ? undefined : src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={imageClasses}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );

  return (
    <div 
      className={cn("relative overflow-hidden", className)} 
      style={{ aspectRatio }}
    >
      {/* Blur placeholder */}
      {!isLoaded && placeholder === 'blur' && (
        <img
          src={blurPlaceholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-md"
          aria-hidden="true"
        />
      )}

      {/* Skeleton placeholder */}
      {!isLoaded && placeholder === 'skeleton' && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
      )}

      {/* Modern picture element with format detection */}
      {imageSupport && (
        <picture>
          {/* AVIF source */}
          {imageSupport.avif && (
            <source
              srcSet={createSrcSet(optimizedImages.avif)}
              sizes={sizes}
              type="image/avif"
            />
          )}
          
          {/* WebP source */}
          {imageSupport.webp && (
            <source
              srcSet={createSrcSet(optimizedImages.webp)}
              sizes={sizes}
              type="image/webp"
            />
          )}
          
          {/* Fallback source */}
          <source
            srcSet={`${src} 1x`}
            type={optimizedImages.fallback.type}
          />
          
          {imageElement}
        </picture>
      )}

      {/* Fallback for when format detection is not ready */}
      {!imageSupport && imageElement}
      
      {/* Loading indicator for priority images */}
      {priority && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default AdvancedOptimizedImage;