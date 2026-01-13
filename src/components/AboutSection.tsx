import React, { memo, useState } from "react";
import { GlowButton } from "@/components/ui/glow-button";
import { ProductImage } from "@/components/ui/ProductImage";
import TechDetailsModal from "@/components/TechDetailsModal";
import PartnerModal from "@/components/PartnerModal";
import ProductsSection from "@/components/ProductsSection";
import InstallationStepsSection from "@/components/InstallationStepsSection";
import CertificatesGallery from "@/components/CertificatesGallery";
import { CitiesModal } from "@/components/CitiesModal";
import { useGlobalState } from "@/contexts/GlobalStateContext";
import { Globe, Leaf, Zap, Award, MapPin } from "lucide-react";

const AboutSection = memo(() => {
  const { modals, toggleTechModal, togglePartnerModal } = useGlobalState();
  const [isCitiesModalOpen, setIsCitiesModalOpen] = useState(false);

  return (
    <section className="py-20 bg-background-secondary relative overflow-hidden" id="about">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            О компании H2PRO
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Лидер в области водородных технологий для автомобильного транспорта
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Product Image */}
          <div className="order-1 lg:order-2">
            <ProductImage 
              src="/lovable-uploads/5a5e974c-b194-48df-b77d-259cd11599f2.png" 
              alt="H2PRO механик с продуктами" 
              className="w-full h-auto rounded-xl shadow-card-dark" 
            />
          </div>

          {/* Mission Text */}
          <div className="space-y-8 order-2 lg:order-1">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Наша миссия
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Мы создаем революционные водородные генераторы, которые помогают автовладельцам 
                экономить топливо до 45% и заботиться об экологии. Наша технология уже помогла 
                тысячам клиентов по всему СНГ.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Экологичность</h4>
                  <p className="text-muted-foreground text-sm">Снижение вредных выбросов до 80%</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Эффективность</h4>
                  <p className="text-muted-foreground text-sm">Увеличение мощности двигателя до 30%</p>
                </div>
              </div>
            </div>

            <GlowButton variant="primary" size="lg" className="scale-[1.2] mx-auto block md:mx-0 md:inline-block" onClick={toggleTechModal}>
              Подробнее о технологии
            </GlowButton>
          </div>
        </div>

        {/* Products Section */}
        <ProductsSection />

        {/* Installation Steps Section */}
        <InstallationStepsSection />

        {/* Partners Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            Партнерам
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Products */}
            <div className="bg-gradient-card rounded-xl border border-border shadow-card-dark overflow-hidden">
              <div className="aspect-square">
                <img 
                  src="/lovable-uploads/df392fd9-4a6c-4c1b-9aa0-b84b2d8aadf8.png" 
                  alt="H2PRO водородные генераторы" 
                  className="w-full h-full object-cover" 
                  loading="lazy" 
                />
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-foreground mb-2">Готовые продукты</h4>
                <p className="text-muted-foreground text-sm mb-3">
                  Полная линейка сертифицированных водородных генераторов с партнерскими ценами и техподдержкой.
                </p>
              </div>
            </div>

            {/* Card 2 - Tools */}
            <div className="bg-gradient-card rounded-xl border border-border shadow-card-dark overflow-hidden">
              <div className="aspect-square">
                <img 
                  src="/lovable-uploads/8d9e9324-6809-4c8e-96c0-b8a85161b93f.png" 
                  alt="H2PRO инструменты для установки" 
                  className="w-full h-full object-cover" 
                  loading="lazy" 
                />
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-foreground mb-2">Инструменты</h4>
                <p className="text-muted-foreground text-sm mb-3">
                  Профессиональный набор для установки с диагностическим оборудованием и методическими пособиями.
                </p>
              </div>
            </div>

            {/* Card 3 - Partnership */}
            <div className="bg-gradient-card rounded-xl border border-border shadow-card-dark overflow-hidden">
              <div className="aspect-square">
                <img 
                  src="/lovable-uploads/21fe2c15-56a5-499d-a0c0-c56596db7bdf.png" 
                  alt="H2PRO партнерская программа" 
                  className="w-full h-full object-cover" 
                  loading="lazy" 
                />
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-foreground mb-2">Партнерство</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Откройте точку установки в вашем городе с эксклюзивными правами и полной поддержкой.
                </p>
                <GlowButton variant="secondary" size="sm" onClick={togglePartnerModal} className="w-full">
                  Стать партнером
                </GlowButton>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 fade-in mb-12 sm:mb-20">
          <div className="bg-gradient-card p-4 sm:p-8 rounded-xl border border-border shadow-card-dark text-center">
            <Award className="w-8 h-8 sm:w-12 sm:h-12 text-primary mx-auto mb-2 sm:mb-4" />
            <h3 className="text-2xl sm:text-4xl font-bold text-neon-primary mb-1 sm:mb-2">1000+</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Довольных клиентов</p>
          </div>

          <div className="bg-gradient-card p-4 sm:p-8 rounded-xl border border-border shadow-card-dark text-center">
            <Globe className="w-8 h-8 sm:w-12 sm:h-12 text-secondary mx-auto mb-2 sm:mb-4" />
            <h3 className="text-2xl sm:text-4xl font-bold text-neon-secondary mb-1 sm:mb-2">26 городов в СНГ</h3>
            <GlowButton 
              variant="outline" 
              size="sm" 
              onClick={() => setIsCitiesModalOpen(true)}
              className="mt-2"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Все города присутствия
            </GlowButton>
          </div>

          <div className="bg-gradient-card p-4 sm:p-8 rounded-xl border border-border shadow-card-dark text-center">
            <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-primary mx-auto mb-2 sm:mb-4" />
            <h3 className="text-2xl sm:text-4xl font-bold text-neon-primary mb-1 sm:mb-2 whitespace-nowrap text-center pr-2">до 45%</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Экономия топлива</p>
          </div>

          <div className="bg-gradient-card p-4 sm:p-8 rounded-xl border border-border shadow-card-dark text-center">
            <Leaf className="w-8 h-8 sm:w-12 sm:h-12 text-secondary mx-auto mb-2 sm:mb-4" />
            <h3 className="text-2xl sm:text-4xl font-bold text-neon-secondary mb-1 sm:mb-2">1 год</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Гарантии</p>
          </div>
        </div>

        {/* Certificates and Lab Tests */}
        <div className="bg-gradient-card p-8 rounded-xl border border-border shadow-card-dark fade-in">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-8 text-center">
            <span className="text-neon-primary">Сертификаты качества и лабораторные испытания</span>
          </h3>
          <CertificatesGallery />
        </div>
      </div>
      
      <TechDetailsModal open={modals.techModalOpen} onOpenChange={toggleTechModal} />
      <PartnerModal open={modals.partnerModalOpen} onOpenChange={togglePartnerModal} />
      <CitiesModal open={isCitiesModalOpen} onOpenChange={setIsCitiesModalOpen} />
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
