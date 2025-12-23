import { useState, useEffect, useCallback } from 'react';
import { getCachedDeviceCapabilities } from '@/utils/deviceCapabilities';

interface ConditionalEffectsState {
  shouldLoadEffects: boolean;
  shouldLoadGSAP: boolean;
  userInteracted: boolean;
}

export const useConditionalEffects = () => {
  const [state, setState] = useState<ConditionalEffectsState>({
    shouldLoadEffects: false,
    shouldLoadGSAP: false,
    userInteracted: false,
  });

  const enableEffects = useCallback(() => {
    setState(prev => ({
      ...prev,
      shouldLoadEffects: true,
      userInteracted: true,
    }));
  }, []);

  const enableGSAP = useCallback(() => {
    setState(prev => ({
      ...prev,
      shouldLoadGSAP: true,
    }));
  }, []);

  useEffect(() => {
    // Критическая проверка device capabilities
    const capabilities = getCachedDeviceCapabilities();
    
    // Проверяем предпочтения пользователя
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !capabilities.shouldLoadEffects) {
      return;
    }

    // Адаптивный таймер в зависимости от производительности устройства
    const delayTime = capabilities.performanceLevel === 'high' ? 1000 : 
                     capabilities.performanceLevel === 'medium' ? 2000 : 4000;
    
    const delayedLoadTimer = setTimeout(() => {
      enableEffects();
    }, delayTime);

    // Слушатели пользовательского взаимодействия
    const interactionEvents = ['click', 'scroll', 'touchstart', 'keydown'];
    
    const handleUserInteraction = () => {
      enableEffects();
      clearTimeout(delayedLoadTimer);
      
      // Удаляем слушатели после первого взаимодействия
      interactionEvents.forEach(event => {
        window.removeEventListener(event, handleUserInteraction);
      });
    };

    // Добавляем слушатели
    interactionEvents.forEach(event => {
      window.addEventListener(event, handleUserInteraction, { passive: true, once: true });
    });

    // Intersection Observer для GSAP эффектов (когда пользователь прокручивает)
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          enableGSAP();
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '50px',
    });

    // Ищем элементы, которые могут использовать GSAP
    const scrollElements = document.querySelectorAll('[data-gsap]');
    scrollElements.forEach(el => observer.observe(el));

    return () => {
      clearTimeout(delayedLoadTimer);
      observer.disconnect();
      interactionEvents.forEach(event => {
        window.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [enableEffects, enableGSAP]);

  return state;
};