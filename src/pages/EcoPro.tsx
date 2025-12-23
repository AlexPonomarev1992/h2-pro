import React from "react"
import { Link } from "react-router-dom"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Leaf, TreePine, Heart, ArrowLeft, CloudOff, ArrowRight, Sparkles } from "lucide-react"
import { GlowButton } from "@/components/ui/glow-button"
import OptimizedImage from "@/components/ui/OptimizedImage"
import ecoProHero from "@/assets/eco-pro-hero.jpg"
import ecoProTeam from "@/assets/eco-pro-team.jpg"

const EcoPro = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contacts')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#contacts'
    }
  }

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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                  <Leaf className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">Экологическая программа</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  Eco Pro: Меньше дыма — Больше зелени
                </h1>
                
                <p className="text-xl text-muted-foreground">
                  С покупки каждого генератора мы сажаем <span className="text-primary font-bold">5 деревьев</span> в России и СНГ
                </p>

                <div className="flex flex-wrap gap-4">
                  <GlowButton variant="primary" size="lg" onClick={scrollToContact}>
                    Участвовать в программе
                  </GlowButton>
                  <Link to="/#products">
                    <GlowButton variant="outline" size="lg">
                      Смотреть генераторы
                    </GlowButton>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-primary/20 blur-3xl rounded-full"></div>
                <OptimizedImage 
                  src={ecoProHero} 
                  alt="Eco Pro - Экологическая программа H2PRO" 
                  className="relative rounded-2xl shadow-2xl"
                  lazy={false}
                  priority={true}
                  placeholder="blur"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4 bg-card/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative order-2 md:order-1">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-primary/20 blur-3xl rounded-full"></div>
                <OptimizedImage 
                  src={ecoProTeam} 
                  alt="Команда H2PRO высаживает деревья в Набережных Челнах" 
                  className="relative rounded-2xl shadow-2xl"
                  placeholder="blur"
                  quality={85}
                />
              </div>

              {/* Text */}
              <div className="space-y-8 text-left order-1 md:order-2">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/30">
                  <TreePine className="w-6 h-6 text-green-400" />
                  <span className="text-green-400 font-semibold text-lg">Наша история</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  С чего всё началось
                </h2>

                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    В начале октября в <span className="text-primary font-semibold">Набережных Челнах</span> наша команда высадила 
                    <span className="text-primary font-bold"> 50 деревьев</span> — не ради красивых слов, 
                    а чтобы реально внести свой вклад 🌳
                  </p>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Так началась наша экологическая программа: <span className="text-primary font-bold">с каждой установки</span> мы сажаем 
                    ещё <span className="text-primary font-bold">пять деревьев</span> в вашем городе.
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Каждая установка — не просто экономия топлива, а <span className="text-primary font-semibold">шаг к чище воздуху</span> и 
                    новым зелёным точкам на карте России.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formula Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-primary font-medium">Наша миссия</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Простая формула
                </h2>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                {/* Меньше дыма */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full group-hover:bg-red-500/30 transition-all duration-300"></div>
                  <div className="relative flex flex-col items-center gap-6 px-10 py-8 rounded-3xl bg-gradient-to-br from-red-500/10 to-red-600/5 border-2 border-red-500/30 hover:border-red-500/50 transition-all duration-300 hover:scale-105 hover:shadow-glow-lg">
                    <CloudOff className="w-16 h-16 text-red-400 group-hover:animate-pulse" />
                    <span className="text-2xl md:text-3xl font-bold text-red-400">Меньше дыма</span>
                    <p className="text-sm text-red-300/70">До 80-90% выбросов CO₂</p>
                  </div>
                </div>
                
                {/* Стрелка */}
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full animate-pulse"></div>
                  <ArrowRight className="relative w-12 h-12 md:w-16 md:h-16 text-primary animate-float" />
                </div>
                
                {/* Больше зелени */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full group-hover:bg-green-500/30 transition-all duration-300"></div>
                  <div className="relative flex flex-col items-center gap-6 px-10 py-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-green-600/5 border-2 border-green-500/30 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-glow-lg">
                    <TreePine className="w-16 h-16 text-green-400 group-hover:animate-pulse" />
                    <span className="text-2xl md:text-3xl font-bold text-green-400">Больше зелени</span>
                    <p className="text-sm text-green-300/70">+5 деревьев с каждой установки</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 px-4 bg-card/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Двойная польза
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Leaf className="w-12 h-12 text-green-400" />,
                  title: "Чистый воздух",
                  description: "Снижение выбросов CO₂ на до 80-90% от каждого автомобиля с H2PRO"
                },
                {
                  icon: <TreePine className="w-12 h-12 text-primary" />,
                  title: "Новые деревья",
                  description: "5 деревьев высаживается в вашем регионе с каждой установки генератора"
                },
                {
                  icon: <Heart className="w-12 h-12 text-red-400" />,
                  title: "Забота о будущем",
                  description: "Реальный вклад в экологию России и стран СНГ"
                }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow-lg space-y-4"
                >
                  <div className="flex justify-center">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-center text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground text-center">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Присоединяйтесь к программе Eco Pro
            </h2>
            
            <p className="text-xl text-muted-foreground">
              Установите водородный генератор H2PRO и помогите нам озеленить Россию
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <GlowButton variant="primary" size="lg" onClick={scrollToContact}>
                Заказать генератор
              </GlowButton>
              <Link to="/#products">
                <GlowButton variant="outline" size="lg">
                  Узнать больше
                </GlowButton>
              </Link>
            </div>

            <div className="pt-8 text-sm text-muted-foreground">
              <p>* Деревья высаживаются в регионах РФ и СНГ в течении сезона посадки</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default EcoPro
