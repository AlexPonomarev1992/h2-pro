
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Cog, Shield, Leaf, Droplets, Clock } from "lucide-react"
import { useState } from "react"
import Calculator from "@/components/ui/calculator"

const BenefitsSection = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)

  const benefits = [
    {
      icon: TrendingUp,
      title: "Экономия топлива",
      range: "до 45%",
      description: "Значительное снижение расхода топлива",
      color: "text-primary"
    },
    {
      icon: Cog,
      title: "Увеличение мощности ДВС",
      range: "до 30%",
      description: "Повышение производительности двигателя",
      color: "text-secondary"
    },
    {
      icon: Shield,
      title: "Увеличение рабочего ресурса ДВС",
      range: "от 100% до 300%",
      description: "Продление срока службы двигателя, форсунок, свечей",
      color: "text-primary"
    },
    {
      icon: Leaf,
      title: "Сокращение вредных выбросов",
      range: "на 80%",
      description: "Снижение воздействия на окружающую среду",
      color: "text-secondary"
    },
    {
      icon: Droplets,
      title: "Снижение расхода масла",
      range: "от 60% до 100%",
      description: "Экономия на обслуживании двигателя",
      color: "text-primary"
    },
    {
      icon: Clock,
      title: "Увеличение ресурса масла",
      range: "от 30% до 80%",
      description: "Продление интервалов замены масла",
      color: "text-secondary"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Доказанная<br />эффективность
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Результаты тестирования водородных генераторов H2PRO
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <Card 
                key={index}
                className="bg-gradient-card border-border shadow-card-dark hover:shadow-neon transition-all duration-300 hover:scale-105 fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className={`w-8 h-8 ${benefit.color}`} />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  
                  <div className="text-2xl font-bold text-neon-primary mb-2">
                    {benefit.range}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-card p-8 rounded-xl border border-border shadow-card-dark max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Хотите узнать точные показатели для вашего автомобиля?
            </h3>
            <p className="text-muted-foreground mb-6">
              Получите персональный расчёт экономии и окупаемости
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsCalculatorOpen(true)}
                className="px-8 py-3 bg-gradient-button text-primary-foreground rounded-lg font-semibold hover:shadow-neon transition-all duration-300"
              >
                Рассчитать авто
              </button>
              <button 
                onClick={() => {
                  const aiConsultant = document.querySelector('[data-ai-consultant]');
                  if (aiConsultant) {
                    aiConsultant.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  } else {
                    const contactSection = document.getElementById('contacts');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted/20 transition-all duration-300"
              >
                Задать вопрос
              </button>
            </div>
          </div>
        </div>
      </div>

      <Calculator 
        open={isCalculatorOpen} 
        onOpenChange={setIsCalculatorOpen} 
      />
    </section>
  )
}

export default BenefitsSection