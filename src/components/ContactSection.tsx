import { GlowButton } from "@/components/ui/glow-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageCircle } from "lucide-react";
import BitrixForm from "@/components/ui/BitrixForm";
const ContactSection = () => {
  return <section className="py-20 bg-background-secondary relative overflow-hidden" id="contacts">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Свяжитесь с нами
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Готовы ответить на ваши вопросы и записать на установку
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bitrix24 Contact Form */}
          <Card className="bg-gradient-card border-border shadow-card-dark fade-in">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Форма обратной связи
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Заполните форму и мы свяжемся с вами в течение 30 минут
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BitrixForm className="w-full" />
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8 fade-in">
            {/* Phone */}
            <Card className="bg-gradient-card border-border shadow-card-dark hover:shadow-glow-primary transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">Телефон</CardTitle>
                    <CardDescription className="text-muted-foreground">Звоните прямо сейчас</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-neon-primary mb-2">+7(909)853-04-68</p>
                <p className="text-muted-foreground">Работаем 24/7</p>
                <GlowButton variant="outline" size="sm" className="mt-4">
                  Позвонить сейчас
                </GlowButton>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="bg-gradient-card border-border shadow-card-dark hover:shadow-glow-secondary transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">Email</CardTitle>
                    <CardDescription className="text-muted-foreground">Напишите нам</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-foreground mb-2">h2profficial@gmail.com</p>
                <p className="text-muted-foreground">Ответим в течение 2 часов</p>
                <GlowButton variant="outline" size="sm" className="mt-4" asChild>
                  <a href="mailto:h2profficial@gmail.com?subject=Запрос информации H2PRO">
                    Написать письмо
                  </a>
                </GlowButton>
              </CardContent>
            </Card>

            {/* Messengers */}
            

            {/* AI Chat Widget */}
            <Card className="bg-gradient-button border-primary shadow-glow-primary" data-ai-consultant>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-foreground">AI Консультант</h3>
                    <p className="text-primary-foreground/80">Получите ответы мгновенно</p>
                  </div>
                </div>
                <p className="text-primary-foreground/90 mb-4">
                  Наш ИИ-помощник ответит на вопросы о продукции, установке и обслуживании
                </p>
                
                <GlowButton variant="secondary" size="lg" className="w-full">
                  Начать чат с ИИ
                </GlowButton>
              </CardContent>
            </Card>

            {/* Office Location */}
            
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;