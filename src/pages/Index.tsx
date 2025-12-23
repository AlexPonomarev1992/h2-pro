import React, { memo, lazy, Suspense } from "react"
import Navigation from "@/components/Navigation"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import BenefitsSection from "@/components/BenefitsSection"
import FAQSection from "@/components/FAQSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"
import SEOSchema from "@/components/SEOSchema"
import { ConditionalEffects } from "@/components/ui/ConditionalEffects"
import { EffectsLoadingIndicator } from "@/components/ui/EffectsLoadingIndicator"
import { GlobalStateProvider } from "@/contexts/GlobalStateContext"
import { EffectsProvider } from "@/contexts/EffectsContext"
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor"
import { useImagePerformanceMonitor } from "@/hooks/useImagePerformanceMonitor"

// Ленивая загрузка анимированного курсора для ПК
const SplashCursor = lazy(() => import("@/components/ui/SplashCursor"))

const Index = memo(() => {
  // Мониторинг производительности (только в dev mode)
  usePerformanceMonitor(import.meta.env.DEV);
  useImagePerformanceMonitor(import.meta.env.DEV);

  return (
    <GlobalStateProvider>
      <EffectsProvider>
        <SEOSchema />
        <div className="min-h-screen bg-gradient-hero relative">
          {/* Hyperspeed эффект загружается условно */}
          <div className="hidden md:block fixed inset-0 pointer-events-none z-0">
            <ConditionalEffects showHyperspeed={true} />
          </div>
          
          <div className="relative z-10">
            <Navigation />
            <main>
              <HeroSection />
              <AboutSection />
              <BenefitsSection />
              <FAQSection />
              <ContactSection />
            </main>
            <Footer />
          </div>
          
          {/* Индикатор загрузки эффектов */}
          <EffectsLoadingIndicator />
        </div>
      </EffectsProvider>
    </GlobalStateProvider>
  );
});

Index.displayName = 'Index';

export default Index;
