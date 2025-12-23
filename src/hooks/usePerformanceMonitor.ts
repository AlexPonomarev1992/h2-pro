import { useEffect } from 'react';

export const usePerformanceMonitor = (enabled: boolean = false) => {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Мониторинг Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // Core Web Vitals
        if (entry.entryType === 'largest-contentful-paint') {
          console.log(`LCP: ${entry.startTime.toFixed(2)}ms`);
        }
        
        if (entry.entryType === 'first-input') {
          console.log(`FID: ${(entry as any).processingStart - entry.startTime}ms`);
        }
        
        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          console.log(`CLS: ${(entry as any).value}`);
        }

        // Resource loading times
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          if (resource.name.includes('three') || resource.name.includes('gsap') || resource.name.includes('ogl')) {
            console.log(`Heavy resource loaded: ${resource.name.split('/').pop()} - ${resource.duration.toFixed(2)}ms`);
          }
        }
      });
    });

    // Подписываемся на различные типы метрик
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'resource'] });
    } catch (e) {
      console.warn('Performance Observer not fully supported');
    }

    // Измеряем время до интерактивности
    const measureTTI = () => {
      performance.mark('tti-start');
      
      setTimeout(() => {
        performance.mark('tti-end');
        performance.measure('TTI', 'tti-start', 'tti-end');
        
        const ttiMeasure = performance.getEntriesByName('TTI')[0];
        if (ttiMeasure) {
          console.log(`TTI: ${ttiMeasure.duration.toFixed(2)}ms`);
        }
      }, 0);
    };

    measureTTI();

    return () => {
      observer.disconnect();
    };
  }, [enabled]);
};