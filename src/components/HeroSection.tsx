import React, { memo, useCallback, useMemo, lazy, Suspense } from "react";
import { GlowButton } from "@/components/ui/glow-button";
import GradientText from "@/components/ui/GradientText";
import { ConditionalEffects } from "@/components/ui/ConditionalEffects";
import { OptimizedLogo } from "@/components/ui/OptimizedLogo";
import CalculatorModal from "@/components/ui/calculator";
import { useGlobalState } from "@/contexts/GlobalStateContext";
import { useEffects } from "@/contexts/EffectsContext";
import { ArrowRight, Zap, Leaf, Wallet, Calculator } from "lucide-react";

const SplashCursor = lazy(() => import("@/components/ui/SplashCursor"));

const HeroSection = memo(() => {
  const { modals, toggleCalculator } = useGlobalState();
  const { effects, deactivateLightning, deactivateLeaves, deactivateMoney } = useEffects();

  // Мемоизированные обработчики
  const scrollToContacts = useCallback(() => {
    const contactSection = document.getElementById('contacts');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Мемоизированные массивы градиентов
  const gradientColors = useMemo(() => ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'], []);
  const auroraColors = useMemo(() => ['#40ffaa', '#4079ff', '#40ffaa'], []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* SplashCursor - только на Hero секции, только ПК */}
      <div className="hidden md:block absolute inset-0 pointer-events-none z-[1]">
        <Suspense fallback={null}>
          <SplashCursor />
        </Suspense>
      </div>
      
      {/* Conditional Effects - загружаются только после взаимодействия */}
      <div className="hidden md:block absolute inset-0">
        <ConditionalEffects 
          showAurora={true}
          colorStops={auroraColors} 
          amplitude={1.5} 
          blend={0.3} 
          speed={0.5}
          lightningActive={effects.lightningActive}
          leavesActive={effects.leavesActive}
          moneyActive={effects.moneyActive}
          onLightningComplete={deactivateLightning}
          onLeavesComplete={deactivateLeaves}
          onMoneyComplete={deactivateMoney}
        />
      </div>
      
      {/* Mobile gradient background */}
      <div className="md:hidden absolute inset-0 bg-gradient-hero" />
      
      {/* Subtle overlay to enhance readability */}
      <div className="absolute inset-0 bg-background/30" />

      {/* Floating Elements */}
      <div className="hidden md:block absolute top-20 right-10 animate-float" style={{
      animationDelay: "0.5s"
    }}>
        <Wallet className="w-14 h-14 text-primary/30" />
      </div>
      
      <div className="hidden md:block absolute bottom-20 right-10 animate-float" style={{
      animationDelay: "1s"
    }}>
        <Leaf className="w-16 h-16 text-secondary/30" />
      </div>
      

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Content */}
        <div className="space-y-8 fade-in">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center mb-8 mt-16">
            <OptimizedLogo size="hero" priority={true} />
          </div>

          {/* Main Headline */}
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            <GradientText colors={gradientColors} animationSpeed={6} className="inline-block">
              ТОПЛИВО БУДУЩЕГО
            </GradientText>
          </h2>

          <p className="text-base md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed -mt-6 md:-mt-4 whitespace-nowrap md:whitespace-normal">
            Водородные генераторы для автомобилей
          </p>
          
          <div className="flex flex-row gap-2 md:gap-8 justify-center items-start mt-8 px-4">
            <div className="flex items-center gap-1 md:gap-4">
              <div className="w-6 h-6 md:w-12 md:h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Wallet className="w-3 h-3 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">ЭКОНОМИЯ</p>
                <p className="text-sm md:text-xl font-bold text-neon-primary">до 45%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 md:gap-4">
              <div className="w-6 h-6 md:w-12 md:h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <Leaf className="w-3 h-3 md:w-6 md:h-6 text-secondary" />
              </div>
              <div className="text-left">
                <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">ЭКО</p>
                <p className="text-sm md:text-xl font-bold text-neon-secondary">до  80%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 md:gap-4">
              <div className="w-6 h-6 md:w-12 md:h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Zap className="w-3 h-3 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">МОЩНОСТЬ</p>
                <p className="text-sm md:text-xl font-bold text-neon-primary">до +30%</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 scale-90 sm:scale-100">
            <GlowButton 
              variant="hero" 
              size="xl" 
              className="group"
              onClick={scrollToContacts}
            >
              Заказать установку
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </GlowButton>
            <GlowButton variant="outline" size="xl" onClick={toggleCalculator}>
              <Calculator className="mr-2 w-5 h-5" />
              Рассчитать свое авто
            </GlowButton>
          </div>

          {/* Stats - ИЗМЕНЕНО: удален блок с рассрочкой */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-card p-6 rounded-lg border border-border shadow-card-dark">
              <h3 className="text-3xl font-bold text-neon-primary">1000+</h3>
              <p className="text-muted-foreground">Довольных клиентов</p>
            </div>
            <div className="bg-gradient-card p-6 rounded-lg border border-border shadow-card-dark">
              <h3 className="text-3xl font-bold text-neon-secondary">33</h3>
              <p className="text-muted-foreground">город в СНГ</p>
            </div>
            <div className="bg-gradient-card p-6 rounded-lg border border-border shadow-card-dark">
              <h3 className="text-3xl font-bold text-neon-primary">1 год</h3>
              <p className="text-muted-foreground">Гарантия</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      
      {/* Calculator Modal */}
      <CalculatorModal open={modals.calculatorOpen} onOpenChange={toggleCalculator} />
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
