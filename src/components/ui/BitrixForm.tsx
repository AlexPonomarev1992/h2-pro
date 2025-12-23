import { useEffect, useRef } from 'react';

interface BitrixFormProps {
  formId?: string;
  className?: string;
}

declare global {
  interface Window {
    BX24?: any;
  }
}

const BitrixForm = ({ formId = "inline/3/at0ece", className }: BitrixFormProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://cdn-ru.bitrix24.ru/b35193194/crm/form/loader_3.js?${Math.floor(Date.now() / 180000)}`;
    script.setAttribute('data-b24-form', formId);
    script.setAttribute('data-skip-moving', 'true');

    const initForm = () => {
      if (containerRef.current && !containerRef.current.querySelector('script[data-b24-form]')) {
        containerRef.current.appendChild(script);
        scriptLoadedRef.current = true;
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initForm);
    } else {
      initForm();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', initForm);
    };
  }, [formId]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ minHeight: '400px' }}
    />
  );
};

export default BitrixForm;