import React, { memo } from 'react';
import { Search, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';
import { Card, CardContent } from '@/components/ui/card';

const InstallationStepsSection = memo(() => {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Подбор H2 генератора",
      description: "Подберем идеальное решение именно для вашего автомобиля",
      highlight: "для вашего"
    },
    {
      icon: MapPin,
      number: "02", 
      title: "Выбор сервиса",
      description: "Выбираем проверенный сервис в вашем городе",
      highlight: "в вашем городе"
    },
    {
      icon: CheckCircle,
      number: "03",
      title: "Установка",
      description: "Профессиональная настройка оборудования для максимального результата",
      highlight: "максимального результата"
    }
  ];

  return (
    <section className="py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-neon-primary">Три шага</span> до будущего
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            От консультации до запуска — весь процесс займет всего несколько дней
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index}
                className="relative fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Connecting Line - Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary via-primary/50 to-transparent transform translate-x-1/2 z-0" />
                )}
                
                {/* Connecting Line - Mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute left-1/2 top-full w-0.5 h-6 bg-gradient-to-b from-primary to-primary/30 transform -translate-x-1/2 z-0" />
                )}

                <Card className="bg-gradient-card border border-border shadow-card-dark hover:shadow-neon transition-all duration-500 hover:scale-105 relative z-10 h-full">
                  {/* Number Sticker */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-button rounded-full flex items-center justify-center shadow-glow-primary z-20">
                    <span className="text-sm font-bold text-primary-foreground">
                      {step.number}
                    </span>
                  </div>
                  
                  <CardContent className="p-4 text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-neon-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description.split(step.highlight)[0]}
                      <span className="text-neon-secondary font-medium">
                        {step.highlight}
                      </span>
                      {step.description.split(step.highlight)[1]}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Guarantee Block */}
        <div className="bg-gradient-card border border-border rounded-xl p-6 shadow-card-dark fade-in text-center mb-6">
          <div className="w-16 h-16 bg-gradient-button rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-primary">
            <ShieldCheck className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mb-3">
            <span className="text-neon-primary">100% Гарантия</span> результата
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground">
              Не увидели результата — 
              <span className="text-neon-secondary font-medium"> мы вернем деньги</span>
            </p>
            
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-neon-primary" />
              <span className="text-primary font-medium text-sm">Официальная гарантия 1 год</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center fade-in">
          <GlowButton 
            variant="hero" 
            size="lg"
            className="text-lg px-8 py-3"
            onClick={() => {
              const contactSection = document.getElementById('contacts');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Получить консультацию
          </GlowButton>
          <p className="text-muted-foreground mt-3 text-sm">
            Бесплатная консультация по выбору генератора
          </p>
        </div>
      </div>
    </section>
  );
});

InstallationStepsSection.displayName = 'InstallationStepsSection';

export default InstallationStepsSection;