import { useConditionalEffects } from '@/hooks/useConditionalEffects';

export const EffectsLoadingIndicator = () => {
  const { shouldLoadEffects, userInteracted } = useConditionalEffects();

  // Показываем индикатор только если пользователь не взаимодействовал
  if (userInteracted || shouldLoadEffects) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span>Нажмите или прокрутите для полного эффекта</span>
      </div>
    </div>
  );
};