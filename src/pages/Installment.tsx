import React, { useState } from "react"
import { Link } from "react-router-dom"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { ArrowLeft, Clock, TrendingUp, RussianRuble, CheckCircle2, Wallet, Building2 } from "lucide-react"
import { GlowButton } from "@/components/ui/glow-button"
import h2proYellowLogo from "@/assets/h2pro-yellow-logo.png"
import inpocketLogo from "@/assets/inpocket-logo.png"
import AnimatedPartnerCard from "@/components/ui/AnimatedPartnerCard"
import ProductsModal from "@/components/ProductsModal"

const Installment = () => {
  const [productsModalOpen, setProductsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Вернуться на главную
            </Link>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                  <Wallet className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">Рассрочка</span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground">
                  Беспроцентная рассрочка от партнера inPocket
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground">
                  Установи генератор сейчас — а плати потом!
                </p>

                <p className="text-base md:text-lg text-primary font-semibold">
                  Лучшее решение для бизнес партнеров и франчайзи!
                </p>

                <GlowButton variant="primary" size="lg" onClick={() => setProductsModalOpen(true)}>
                  Оформить рассрочку
                </GlowButton>
              </div>

              {/* Partner Logos */}
              <AnimatedPartnerCard className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-yellow-500/20 blur-3xl rounded-full"></div>
                <div className="relative flex flex-col items-center gap-4 md:gap-8 p-6 md:p-12 rounded-3xl bg-card/50 border border-border backdrop-blur-sm">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">Партнерство</p>
                  </div>
                  <div className="flex items-center justify-center gap-4 md:gap-8">
                    <img 
                      src={h2proYellowLogo} 
                      alt="H2PRO" 
                      className="h-8 md:h-14 w-auto object-contain"
                    />
                    <div className="text-2xl md:text-4xl text-primary font-bold">×</div>
                    <img 
                      src={inpocketLogo} 
                      alt="inPocket" 
                      className="h-24 md:h-40 w-auto object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Выгодная рассрочка без переплат</p>
                  </div>
                </div>
              </AnimatedPartnerCard>
            </div>
          </div>
        </section>

        {/* Benefits Cards */}
        <section className="py-20 px-4 bg-card/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Преимущества рассрочки inPocket
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Clock className="w-16 h-16 text-primary" />,
                  title: "24/7",
                  subtitle: "онлайн-поддержка",
                  description: "Персональный куратор всегда на связи"
                },
                {
                  icon: <TrendingUp className="w-16 h-16 text-green-400" />,
                  title: "90%",
                  subtitle: "одобрение",
                  description: "Высокий процент одобрения от банков-партнеров"
                },
                {
                  icon: <RussianRuble className="w-16 h-16 text-yellow-400" />,
                  title: "До 1 млн.",
                  subtitle: "лимит одобрения",
                  description: "Одобрение на крупную сумму для вашего бизнеса"
                },
                {
                  icon: <Building2 className="w-16 h-16 text-blue-400" />,
                  title: "10+ банков",
                  subtitle: "быстрый ответ",
                  description: "Быстрый ответ от более 10 банков-партнеров"
                }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border-2 border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-glow-lg space-y-6 text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                  
                  <div className="relative flex justify-center">{benefit.icon}</div>
                  
                  <div className="relative space-y-2">
                    <h3 className="text-4xl font-bold text-foreground">{benefit.title}</h3>
                    <p className="text-lg font-semibold text-primary">{benefit.subtitle}</p>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Как это работает?
              </h2>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    step: "1",
                    title: "Выбираете генератор",
                    description: "Подберите подходящую модель для вашего автомобиля"
                  },
                  {
                    step: "2",
                    title: "Оформляете заявку",
                    description: "Заполните онлайн-заявку на рассрочку"
                  },
                  {
                    step: "3",
                    title: "Получаете одобрение",
                    description: "Быстрое решение от банков-партнеров"
                  },
                  {
                    step: "4",
                    title: "Устанавливаете и экономите",
                    description: "Генератор установлен, а вы платите частями"
                  }
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-2xl font-bold text-background shadow-glow">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-1/2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Benefits */}
        <section className="py-20 px-4 bg-card/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Почему выгодно?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Беспроцентная рассрочка — платите только стоимость генератора",
                "Быстрое оформление онлайн без визита в офис",
                "Минимум документов для одобрения",
                "Гибкие условия погашения",
                "Экономия на топливе начинается сразу после установки",
                "Специальные условия для бизнес-клиентов и франчайзи"
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Готовы начать экономить?
            </h2>
            
            <p className="text-xl text-muted-foreground">
              Оформите рассрочку и установите водородный генератор H2PRO уже сегодня
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <GlowButton variant="primary" size="lg" onClick={() => setProductsModalOpen(true)}>
                Оформить заявку
              </GlowButton>
              <Link to="/#products">
                <GlowButton variant="outline" size="lg">
                  Смотреть все модели
                </GlowButton>
              </Link>
            </div>

            <div className="pt-8 text-sm text-muted-foreground">
              <p>* Условия рассрочки предоставляются банками-партнерами inPocket</p>
            </div>
          </div>
        </section>
      </main>

      <ProductsModal open={productsModalOpen} onOpenChange={setProductsModalOpen} />

      <Footer />
    </div>
  )
}

export default Installment
