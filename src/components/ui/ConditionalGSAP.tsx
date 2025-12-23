import { lazy, Suspense } from 'react';
import { useConditionalEffects } from '@/hooks/useConditionalEffects';

// Ленивый импорт ScrollFloat компонента
const ScrollFloat = lazy(() => import('./ScrollFloat'));

interface ConditionalGSAPProps {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  fallbackClassName?: string;
}

export const ConditionalGSAP = ({
  children,
  fallbackClassName = "text-3xl font-bold",
  ...scrollFloatProps
}: ConditionalGSAPProps) => {
  const { shouldLoadGSAP } = useConditionalEffects();

  // Если GSAP не загружен, показываем простой заголовок
  if (!shouldLoadGSAP) {
    return (
      <h2 
        className={fallbackClassName}
        data-gsap // Маркер для Intersection Observer
      >
        {children}
      </h2>
    );
  }

  return (
    <Suspense 
      fallback={
        <h2 className={fallbackClassName}>
          {children}
        </h2>
      }
    >
      <ScrollFloat {...scrollFloatProps}>
        {children}
      </ScrollFloat>
    </Suspense>
  );
};