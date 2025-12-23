import { useEffect, useCallback, useRef } from 'react';

const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const useThrottledScroll = (callback: (scrollY: number) => void, throttleMs = 100) => {
  const callbackRef = useRef(callback);
  
  // Обновляем ref при изменении callback
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const throttledCallback = useCallback(
    throttle(() => {
      callbackRef.current(window.scrollY);
    }, throttleMs),
    [throttleMs]
  );

  useEffect(() => {
    window.addEventListener('scroll', throttledCallback, { passive: true });
    return () => window.removeEventListener('scroll', throttledCallback);
  }, [throttledCallback]);
};