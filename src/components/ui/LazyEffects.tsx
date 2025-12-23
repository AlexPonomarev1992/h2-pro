import { lazy, Suspense } from 'react';

// Критически оптимизированные ленивые импорты с полным разделением
const DynamicAurora = lazy(() => import('./DynamicAurora'));
const LightningEffect = lazy(() => import('./LightningEffect').then(module => ({ default: module.LightningEffect })));
const LeavesEffect = lazy(() => import('./LeavesEffect').then(module => ({ default: module.LeavesEffect })));
const MoneyEffect = lazy(() => import('./MoneyEffect').then(module => ({ default: module.MoneyEffect })));

interface LazyEffectsProps {
  showAurora?: boolean;
  lightningActive?: boolean;
  leavesActive?: boolean;
  moneyActive?: boolean;
  onLightningComplete?: () => void;
  onLeavesComplete?: () => void;
  onMoneyComplete?: () => void;
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
}

export const LazyEffects = ({
  showAurora = false,
  lightningActive = false,
  leavesActive = false,
  moneyActive = false,
  onLightningComplete = () => {},
  onLeavesComplete = () => {},
  onMoneyComplete = () => {},
  colorStops = ['#40ffaa', '#4079ff', '#40ffaa'],
  amplitude = 1.5,
  blend = 0.3,
  speed = 0.5,
}: LazyEffectsProps) => {
  return (
    <Suspense fallback={null}>
      {showAurora && (
        <DynamicAurora 
          colorStops={colorStops} 
          amplitude={amplitude} 
          blend={blend} 
          speed={speed} 
        />
      )}
      {lightningActive && (
        <LightningEffect 
          isActive={lightningActive} 
          onComplete={onLightningComplete} 
        />
      )}
      {leavesActive && (
        <LeavesEffect 
          isActive={leavesActive} 
          onComplete={onLeavesComplete} 
        />
      )}
      {moneyActive && (
        <MoneyEffect 
          isActive={moneyActive} 
          onComplete={onMoneyComplete} 
        />
      )}
    </Suspense>
  );
};