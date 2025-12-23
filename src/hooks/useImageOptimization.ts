import { useState, useEffect, useCallback, useMemo } from 'react';
import { detectImageSupport, generateOptimizedImages, preloadOptimizedImage } from '@/utils/image-converter';

interface UseImageOptimizationProps {
  src: string;
  priority?: boolean;
  preload?: boolean;
  quality?: number;
}

interface ImageOptimizationState {
  isLoaded: boolean;
  hasError: boolean;
  optimizedSrc: string;
  placeholderSrc: string;
  isSupported: {
    webp: boolean;
    avif: boolean;
  } | null;
}

export const useImageOptimization = ({
  src,
  priority = false,
  preload = false,
  quality = 85
}: UseImageOptimizationProps) => {
  const [state, setState] = useState<ImageOptimizationState>({
    isLoaded: false,
    hasError: false,
    optimizedSrc: src,
    placeholderSrc: '',
    isSupported: null
  });

  // Generate optimized versions
  const optimizedImages = useMemo(() => 
    generateOptimizedImages(src, {
      quality: { webp: quality, avif: quality - 10, jpeg: quality + 5 },
      sizes: [256, 512, 768, 1024, 1920],
      enableBlurPlaceholder: true,
      enableProgressive: true
    }),
    [src, quality]
  );

  // Detect format support
  useEffect(() => {
    detectImageSupport().then((support) => {
      setState(prev => ({
        ...prev,
        isSupported: support
      }));
    });
  }, []);

  // Update optimized source based on support
  useEffect(() => {
    if (!state.isSupported) return;

    let optimizedSrc = src;
    
    if (state.isSupported.avif && optimizedImages.avif.length > 0) {
      optimizedSrc = optimizedImages.avif.find(img => img.width === 512)?.src || optimizedImages.avif[0].src;
    } else if (state.isSupported.webp && optimizedImages.webp.length > 0) {
      optimizedSrc = optimizedImages.webp.find(img => img.width === 512)?.src || optimizedImages.webp[0].src;
    }

    setState(prev => ({
      ...prev,
      optimizedSrc
    }));
  }, [state.isSupported, optimizedImages, src]);

  // Preload if needed
  useEffect(() => {
    if (preload || priority) {
      preloadOptimizedImage(src, priority ? 'high' : 'low');
    }
  }, [src, preload, priority]);

  const handleLoad = useCallback(() => {
    setState(prev => ({
      ...prev,
      isLoaded: true,
      hasError: false
    }));
  }, []);

  const handleError = useCallback(() => {
    setState(prev => ({
      ...prev,
      hasError: true,
      optimizedSrc: src // Fallback to original
    }));
  }, [src]);

  const getResponsiveSrcSet = useCallback(() => {
    if (!state.isSupported) return undefined;

    const sources = [];
    
    if (state.isSupported.avif) {
      sources.push(...optimizedImages.avif.map(img => `${img.src} ${img.width}w`));
    } else if (state.isSupported.webp) {
      sources.push(...optimizedImages.webp.map(img => `${img.src} ${img.width}w`));
    }
    
    return sources.length > 0 ? sources.join(', ') : undefined;
  }, [state.isSupported, optimizedImages]);

  return {
    ...state,
    handleLoad,
    handleError,
    getResponsiveSrcSet,
    formatSupport: state.isSupported
  };
};

export default useImageOptimization;