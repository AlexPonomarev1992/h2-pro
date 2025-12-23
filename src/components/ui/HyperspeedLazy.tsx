import { lazy, Suspense } from 'react';

// Критически оптимизированная ленивая загрузка с device detection
const DynamicHyperspeed = lazy(() => import('./DynamicHyperspeed'));

interface HyperspeedLazyProps {
  effectOptions?: any;
}

const HyperspeedLazy = ({ effectOptions }: HyperspeedLazyProps) => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-gradient-hero opacity-50" />
    }>
      <DynamicHyperspeed effectOptions={effectOptions} />
    </Suspense>
  );
};

export default HyperspeedLazy;