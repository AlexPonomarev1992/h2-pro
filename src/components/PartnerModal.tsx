import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GlowButton } from "@/components/ui/glow-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OptimizedImage from "@/components/ui/OptimizedImage";
import BitrixForm from "@/components/ui/BitrixForm";
import { Check, Users, Award, TrendingUp } from "lucide-react";
interface PartnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const PartnerModal = ({
  open,
  onOpenChange
}: PartnerModalProps) => {
  const scrollToForm = () => {
    const formElement = document.getElementById("partner-form");
    formElement?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-background to-background-secondary border-primary/20">
        <DialogHeader className="pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <p className="text-xl text-muted-foreground mt-4">
                Присоединяйтесь к быстрорастущему рынку водородных технологий и зарабатывайте вместе с нами
              </p>
              <GlowButton variant="primary" size="lg" onClick={scrollToForm} className="mt-6">
                Оставить заявку
              </GlowButton>
            </div>
            <div className="flex justify-center lg:justify-end">
              <OptimizedImage 
                src="/lovable-uploads/1ae7a584-fca3-4462-ab47-b931fb3146a3.png"
                alt="H2PRO специалист с инструментами"
                className="w-full max-w-md h-auto rounded-xl shadow-card-dark"
                width={400}
                height={300}
                lazy={true}
                quality={75}
                placeholder="blur"
              />
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-12">
          {/* Why H2PRO Section */}
          <section className="bg-gradient-card p-8 rounded-xl border border-border shadow-card-dark">
            <h3 className="text-3xl font-bold text-foreground mb-6 text-center">
              Почему выгодно
            </h3>
            <p className="text-lg text-muted-foreground text-left leading-relaxed">
              H2PRO легко устанавливается, не требует дорогого оборудования и доступна почти в любом автосервисе. 
              Наша франшиза включает обучение, маркетинг, клиентов в вашем городе и бонусы партнёрской программы.
            </p>
          </section>

          {/* Partnership Tiers */}
          <section>
            <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
              Три категории партнёрства
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tier 1 */}
              <Card className="bg-gradient-card border-border shadow-card-dark">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-foreground">Стандарт</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["5 комплектов генераторов H2PRO", "Обучение по монтажу и продажам", "Клиенты в вашем городе", "Маркетинговые материалы", "Онлайн/телефон поддержка"].map((feature, index) => <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>)}
                </CardContent>
              </Card>

              {/* Tier 2 - Highlighted */}
              <Card className="bg-gradient-button border-primary shadow-neon relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Популярный
                </Badge>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-primary-foreground">Бизнес</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["25 комплектов генераторов H2PRO", "Всё из категории Стандарт", "Рекламный пакет для региона", "Персональный лендинг", "Автоматизация заявок", "Брендированный мерч"].map((feature, index) => <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-primary-foreground flex-shrink-0" />
                      <span className="text-primary-foreground">{feature}</span>
                    </div>)}
                </CardContent>
              </Card>

              {/* Tier 3 */}
              <Card className="bg-gradient-card border-border shadow-card-dark">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-foreground">Премиум</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["150 комплектов генераторов H2PRO", "Всё из категории Бизнес", "Персональный менеджер", "Совместные рекламные кампании", "Клиенты корпоративного уровня", "Максимальная прибыль и стабильность"].map((feature, index) => <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>)}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Extra Benefits */}
          <section>
            <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
              Что ещё получает партнёр
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-card border-border shadow-card-dark text-center">
                <CardContent className="p-6">
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-foreground mb-2">Мерч и бренд</h4>
                  <p className="text-muted-foreground">Фирменный мерч, стенды и материалы</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border shadow-card-dark text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-foreground mb-2">Гайды и обучение</h4>
                  <p className="text-muted-foreground">Подробные инструкции и вебинары</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border shadow-card-dark text-center">
                <CardContent className="p-6">
                  <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-foreground mb-2">Маркетинг</h4>
                  <p className="text-muted-foreground">Готовые промо-ролики и рекламные кампании</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-card p-8 rounded-xl border border-border shadow-card-dark text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Готовы присоединиться?
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Заполните форму — мы свяжемся с вами и расскажем детали
            </p>
            <GlowButton variant="primary" size="lg" onClick={scrollToForm}>
              Оставить заявку
            </GlowButton>
          </section>

          {/* Contact Form */}
          <section id="partner-form" className="bg-gradient-card p-8 rounded-xl border border-border shadow-card-dark">
            <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
              Оставить заявку
            </h3>
            <div className="max-w-md mx-auto">
              <BitrixForm className="w-full" />
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>;
};
export default PartnerModal;