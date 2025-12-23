import React from 'react';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from './OptimizedImageNew';
import originalLogo from '@/assets/logo/h2pro-original-logo.png';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'hero';
  className?: string;
  priority?: boolean;
  clickable?: boolean;
}

const LOGO_CONFIGS = {
  small: {
    className: 'h-10 w-auto',
    src: originalLogo,
    sizes: '(max-width: 768px) 80px, 120px',
  },
  medium: {
    className: 'h-12 w-auto',
    src: originalLogo,
    sizes: '(max-width: 768px) 96px, 144px',
  },
  large: {
    className: 'h-16 w-auto',
    src: originalLogo,
    sizes: '(max-width: 768px) 128px, 192px',
  },
  hero: {
    className: 'h-[17rem] w-auto',
    src: originalLogo,
    sizes: '(max-width: 768px) 250px, 400px',
    style: {
      filter: 'drop-shadow(0 0 5px rgba(64, 255, 170, 0.6)) drop-shadow(0 0 10px rgba(64, 121, 255, 0.4)) drop-shadow(0 0 15px rgba(64, 255, 170, 0.3))'
    }
  },
} as const;

export const OptimizedLogo: React.FC<LogoProps> = ({
  size = 'medium',
  className,
  priority = false,
  clickable = true,
}) => {
  const config = LOGO_CONFIGS[size];
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickable) {
      navigate('/');
      // Прокручиваем в самое начало страницы
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const logoElement = (
    <OptimizedImage
      src={config.src}
      alt="H2PRO Logo"
      className={`${config.className} ${className || ''}`}
      sizes={config.sizes}
      priority={priority}
      style={'style' in config ? config.style : undefined}
    />
  );

  if (clickable) {
    return (
      <button
        onClick={handleClick}
        className="focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg transition-transform hover:scale-105 cursor-pointer"
        aria-label="Перейти на главную страницу"
      >
        {logoElement}
      </button>
    );
  }

  return logoElement;
};