import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { GlowButton } from "@/components/ui/glow-button";
import { useState } from "react";
import Calculator from "@/components/ui/calculator";
import { OptimizedLogo } from "@/components/ui/OptimizedLogo";
import { CitiesModal } from "@/components/CitiesModal";
const Footer = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isCitiesModalOpen, setIsCitiesModalOpen] = useState(false);
  return (
    <footer className="bg-background-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <OptimizedLogo size="medium" />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Лидер в области водородных технологий для автомобильного транспорта. 
              Помогаем экономить топливо и заботиться об экологии.
            </p>
            
            <div className="flex space-x-4">
              <GlowButton variant="outline" size="sm" asChild>
                <a href="https://t.me/h2proo" target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>
              </GlowButton>
              <GlowButton variant="outline" size="sm" asChild>
                <a href="https://vk.com/club232496556" target="_blank" rel="noopener noreferrer">
                  VK
                </a>
              </GlowButton>
              <GlowButton variant="outline" size="sm">
                YouTube
              </GlowButton>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-foreground">Продукты</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  H2PRO Compact
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  H2PRO Standard
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  H2PRO Professional
                </a>
              </li>
            </ul>
          </div>


          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-foreground">Контакты</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-foreground font-semibold">+7(909)853-04-68</p>
                  <p className="text-muted-foreground text-sm">ответим с 08:00 - 22:00</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-secondary mt-0.5" />
                <div>
                  <p className="text-foreground font-semibold">h2profficial@gmail.com</p>
                  <p className="text-muted-foreground text-sm">Ответим в течение 2 часов</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-foreground font-semibold">Точка продаж:</p>
                  <p className="text-muted-foreground text-sm">г. Казань, ул. Габдуллы Тукая, д. 64</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cities */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-foreground">География</h3>
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm">
                Наши установщики работают в 33 городах СНГ
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-1 bg-background-secondary border border-border rounded">Краснодар</span>
                <span className="px-2 py-1 bg-background-secondary border border-border rounded">Екатеринбург</span>
                <span className="px-2 py-1 bg-background-secondary border border-border rounded">Новосибирск</span>
                <span className="px-2 py-1 bg-background-secondary border border-border rounded">Санкт-Петербург</span>
                <span className="px-2 py-1 bg-background-secondary border border-border rounded">Казань</span>
                <span className="px-2 py-1 bg-background-secondary border border-border rounded">Уфа</span>
                <span className="text-muted-foreground">и ещё 27 городов</span>
              </div>
              <GlowButton 
                variant="outline" 
                size="sm" 
                onClick={() => setIsCitiesModalOpen(true)}
                className="w-full"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Все города присутствия
              </GlowButton>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-8 border-t border-border">
          <div className="bg-gradient-card p-8 rounded-xl border border-border shadow-card-dark text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Готовы начать экономить на топливе?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Закажите бесплатную консультацию и узнайте, сколько вы сможете сэкономить с H2PRO
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton variant="hero" size="lg" asChild>
                <a href="/#contacts">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Бесплатная консультация
                </a>
              </GlowButton>
              <GlowButton variant="outline" size="lg" onClick={() => setIsCalculatorOpen(true)}>
                Рассчитать экономию
              </GlowButton>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-muted-foreground text-sm">© 2025 H2PRO. Все права защищены.</div>
          <div className="flex flex-wrap space-x-4 text-sm justify-center md:justify-end">
            <a href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
              Политика конфиденциальности
            </a>
            <a href="/user-agreement" className="text-muted-foreground hover:text-primary transition-colors">
              Пользовательское соглашение
            </a>
            <a href="/public-offer" className="text-muted-foreground hover:text-primary transition-colors">
              Публичная оферта
            </a>
            <a href="/delivery-refund" className="text-muted-foreground hover:text-primary transition-colors">
              Доставка и возврат
            </a>
            <a href="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors">
              Дисклеймер
            </a>
          </div>
        </div>
      </div>

      <Calculator open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen} />
      <CitiesModal open={isCitiesModalOpen} onOpenChange={setIsCitiesModalOpen} />
    </footer>
  );
};
export default Footer;