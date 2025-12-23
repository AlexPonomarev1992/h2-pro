import { useEffect } from 'react';

export const useImagePerformanceMonitor = (enabled: boolean = false) => {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // Проверяем, что это ресурс изображения
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;
          
          if (resourceEntry.initiatorType === 'img') {
          // Логируем метрики загрузки изображений
          const metrics = {
            name: resourceEntry.name.split('/').pop(),
            size: resourceEntry.transferSize,
            duration: resourceEntry.duration,
            startTime: resourceEntry.startTime,
            // Определяем, является ли изображение критическим
            isCritical: resourceEntry.name.includes('logo') || resourceEntry.startTime < 1000,
          };

          console.group(`📸 Image Performance: ${metrics.name}`);
          console.log(`Size: ${(metrics.size / 1024).toFixed(2)}KB`);
          console.log(`Load time: ${metrics.duration.toFixed(2)}ms`);
          console.log(`Critical: ${metrics.isCritical ? '✅' : '❌'}`);
          console.log(`Started at: ${metrics.startTime.toFixed(2)}ms`);
          
          // Предупреждения о производительности
          if (metrics.size > 100 * 1024) { // > 100KB
            console.warn(`⚠️ Large image detected: ${(metrics.size / 1024).toFixed(2)}KB`);
          }
          
          if (metrics.duration > 500) { // > 500ms
            console.warn(`⚠️ Slow image load: ${metrics.duration.toFixed(2)}ms`);
          }
          
          console.groupEnd();
          }
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.warn('Performance Observer for images not supported');
    }

    // Отчет о Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log(`🎯 LCP (Image): ${entry.startTime.toFixed(2)}ms`);
        if (entry.startTime > 2500) {
          console.warn('⚠️ LCP is too slow (>2.5s). Consider optimizing critical images.');
        }
      });
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP Observer not supported');
    }

    return () => {
      observer.disconnect();
      lcpObserver.disconnect();
    };
  }, [enabled]);
};