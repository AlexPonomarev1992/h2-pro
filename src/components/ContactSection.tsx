import { useState } from "react";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { CitiesModal } from "@/components/CitiesModal";
import { GlowButton } from "@/components/ui/glow-button";

const ContactSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section 
        className="min-h-screen bg-gradient-to-b from-background-secondary to-background flex items-center justify-center py-20 px-4 md:px-8 relative overflow-hidden" 
        id="contacts"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        
        <div className="max-w-4xl w-full relative z-10">
          {/* Заголовок */}
          <div className="text-center mb-8 md:mb-12 fade-in">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Начните экономить топливо
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Запишитесь на установку в один клик
            </p>
          </div>

          {/* Главная кнопка записи */}
          <div className="bg-gradient-to-r from-primary via-primary to-secondary p-1 rounded-2xl md:rounded-3xl mb-8 md:mb-12 hover:shadow-glow-primary transition-all duration-300 fade-in">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-background hover:bg-background-secondary rounded-2xl md:rounded-3xl p-8 md:p-12 transition-all group"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                <MapPin className="w-12 h-12 md:w-16 md:h-16 text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
                
                <div className="text-center md:text-left">
                  <div className="text-2xl md:text-4xl font-bold text-foreground mb-2">
                    Выбрать ближайший сервис
                  </div>
                  <div className="text-base md:text-xl text-muted-foreground">
                    27 городов • Карта и список сервисов
                  </div>
                </div>
                
                <ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-primary group-hover:translate-x-2 transition-transform flex-shrink-0 hidden md:block" />
              </div>
            </button>
          </div>

          {/* Контакты */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 fade-in">
            {/* Телефон */}
            <a 
              href="tel:+79098530468" 
              className="bg-gradient-card border border-border rounded-xl md:rounded-2xl p-6 md:p-8 hover:shadow-glow-primary hover:border-primary transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 group-hover:bg-primary/30 p-3 md:p-4 rounded-xl transition-colors">
                  <Phone className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-muted-foreground text-xs md:text-sm mb-1">Позвонить</div>
                  <div className="text-lg md:text-2xl font-bold text-neon-primary truncate">
                    +7 (909) 853-04-68
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Работаем 24/7
                  </div>
                </div>
              </div>
            </a>

            {/* Email */}
            <a 
              href="mailto:h2profficial@gmail.com" 
              className="bg-gradient-card border border-border rounded-xl md:rounded-2xl p-6 md:p-8 hover:shadow-glow-secondary hover:border-secondary transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-secondary/20 group-hover:bg-secondary/30 p-3 md:p-4 rounded-xl transition-colors">
                  <Mail className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-muted-foreground text-xs md:text-sm mb-1">Написать</div>
                  <div className="text-base md:text-xl font-bold text-foreground truncate">
                    h2profficial@gmail.com
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Ответим в течение 2 часов
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Статистика */}
          <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 fade-in">
            <div className="text-center p-4 bg-gradient-card border border-border rounded-xl hover:border-primary transition-colors">
              <div className="text-2xl md:text-3xl font-bold text-neon-primary">1000+</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Клиентов</div>
            </div>
            <div className="text-center p-4 bg-gradient-card border border-border rounded-xl hover:border-primary transition-colors">
              <div className="text-2xl md:text-3xl font-bold text-neon-primary">27</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Городов</div>
            </div>
            <div className="text-center p-4 bg-gradient-card border border-border rounded-xl hover:border-primary transition-colors">
              <div className="text-2xl md:text-3xl font-bold text-neon-primary">до 45%</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Экономия</div>
            </div>
            <div className="text-center p-4 bg-gradient-card border border-border rounded-xl hover:border-primary transition-colors">
              <div className="text-2xl md:text-3xl font-bold text-neon-primary">1 год</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Гарантия</div>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно выбора города */}
      <CitiesModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default ContactSection;
