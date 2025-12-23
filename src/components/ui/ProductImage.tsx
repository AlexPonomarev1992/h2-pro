import OptimizedImage from './OptimizedImageNew';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

// Карта оптимизаций для продуктовых изображений
const PRODUCT_IMAGE_OPTIMIZATIONS = {
  '/lovable-uploads/df392fd9-4a6c-4c1b-9aa0-b84b2d8aadf8.png': {
    placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTUxODIzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzQwZmZhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkgyUFJPPC90ZXh0Pjwvc3ZnPg==',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  },
  '/lovable-uploads/5e8d3917-74cb-49f9-9993-525e9e23b0fe.png': {
    placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTUxODIzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzQwZmZhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkgyUFJPPC90ZXh0Pjwvc3ZnPg==',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  },
  '/lovable-uploads/1adb3232-56ab-43eb-aeec-e6ac97a48c99.png': {
    placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTUxODIzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzQwZmZhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkgyUFJPPC90ZXh0Pjwvc3ZnPg==',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  },
  '/lovable-uploads/5a5e974c-b194-48df-b77d-259cd11599f2.png': {
    placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTUxODIzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzQwZmZhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkgyUFJPPC90ZXh0Pjwvc3ZnPg==',
    sizes: '(max-width: 768px) 100vw, 50vw',
  },
};

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
}) => {
  const optimization = PRODUCT_IMAGE_OPTIMIZATIONS[src as keyof typeof PRODUCT_IMAGE_OPTIMIZATIONS];

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      sizes={optimization?.sizes || '(max-width: 768px) 100vw, 50vw'}
      priority={priority}
      placeholder="blur"
      fallback={optimization?.placeholder}
    />
  );
};