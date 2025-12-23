import { lazy, Suspense } from 'react';
import { useConditionalEffects } from '@/hooks/useConditionalEffects';

// Ленивые импорты тяжелых эффектов
const LazyEffects = lazy(() => import('./LazyEffects').then(module => ({ default: module.LazyEffects })));
const HyperspeedLazy = lazy(() => import('./HyperspeedLazy'));

interface ConditionalEffectsProps {
  // Aurora эффект
  showAurora?: boolean;
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
  
  // Интерактивные эффекты
  lightningActive?: boolean;
  leavesActive?: boolean;
  moneyActive?: boolean;
  onLightningComplete?: () => void;
  onLeavesComplete?: () => void;
  onMoneyComplete?: () => void;
  
  // Hyperspeed эффект
  showHyperspeed?: boolean;
  hyperspeedOptions?: any;
}

export const ConditionalEffects = ({
  showAurora = false,
  colorStops = ['#40ffaa', '#4079ff', '#40ffaa'],
  amplitude = 1.5,
  blend = 0.3,
  speed = 0.5,
  lightningActive = false,
  leavesActive = false,
  moneyActive = false,
  onLightningComplete = () => {},
  onLeavesComplete = () => {},
  onMoneyComplete = () => {},
  showHyperspeed = false,
  hyperspeedOptions,
}: ConditionalEffectsProps) => {
  const { shouldLoadEffects } = useConditionalEffects();

  // Не загружаем эффекты до взаимодействия пользователя
  if (!shouldLoadEffects) {
    return (
      <>
        {/* Простой градиент-заглушка для Aurora */}
        {showAurora && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50" />
        )}
        {/* Простой градиент-заглушка для Hyperspeed */}
        {showHyperspeed && (
          <div className="fixed inset-0 bg-gradient-hero opacity-30" />
        )}
      </>
    );
  }

  return (
    <Suspense 
      fallback={
        <>
          {showAurora && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50" />
          )}
          {showHyperspeed && (
            <div className="fixed inset-0 bg-gradient-hero opacity-30" />
          )}
        </>
      }
    >
      {/* Aurora и интерактивные эффекты */}
      <LazyEffects
        showAurora={showAurora}
        colorStops={colorStops}
        amplitude={amplitude}
        blend={blend}
        speed={speed}
        lightningActive={lightningActive}
        leavesActive={leavesActive}
        moneyActive={moneyActive}
        onLightningComplete={onLightningComplete}
        onLeavesComplete={onLeavesComplete}
        onMoneyComplete={onMoneyComplete}
      />
      
      {/* Hyperspeed эффект */}
      {showHyperspeed && (
        <HyperspeedLazy effectOptions={hyperspeedOptions} />
      )}
    </Suspense>
  );
};