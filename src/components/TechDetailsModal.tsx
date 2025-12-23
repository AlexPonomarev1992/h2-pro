import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GlowButton } from "@/components/ui/glow-button";
import { Droplets, Wind, Flame, Gauge, Wrench, Thermometer, Calculator, MapPin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CalculatorModal from "@/components/ui/calculator";
interface TechDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const TechDetailsModal = ({
  open,
  onOpenChange
}: TechDetailsModalProps) => {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-card border border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-4">
            <span className="text-neon-primary">Как работает</span> H2PRO
          </DialogTitle>
          <p className="text-lg text-muted-foreground text-center max-w-4xl mx-auto">
            Водород в помощь вашему двигателю: меньше расход, чище выхлоп, дольше ресурс
          </p>
        </DialogHeader>

        <div className="space-y-12 mt-8">
          {/* KPI Section */}
          

          {/* How it works */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Простыми словами</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Droplets className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Генерация HHO из воды</h3>
                <p className="text-muted-foreground">
                  Электролизёр на борту вырабатывает газ Брауна (HHO) из воды.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                  <Wind className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Добавление во впуск</h3>
                <p className="text-muted-foreground">
                  HHO подмешивается к воздух–топливной смеси перед сгоранием.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Flame className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Более полное сгорание</h3>
                <p className="text-muted-foreground">
                  Смесь сгорает полнее — меньше несгоревших остатков, ниже расход и выбросы.
                </p>
              </div>
            </div>
          </div>

          {/* What changes */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Что меняется в моторе</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-card p-6 rounded-lg border border-border shadow-card-dark">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Gauge className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Полное догорание</h3>
                <p className="text-muted-foreground text-sm">
                  В штатном режиме часть топлива не догорает. HHO помогает смеси сгореть полнее, 
                  поэтому для той же мощности требуется меньше топлива.
                </p>
              </div>
              <div className="bg-gradient-card p-6 rounded-lg border border-border shadow-card-dark">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Чистота и ресурс</h3>
                <p className="text-muted-foreground text-sm">
                  Меньше нагара и сажи — масло дольше сохраняет свойства, свечи остаются чище, 
                  узлы изнашиваются медленнее.
                </p>
              </div>
              <div className="bg-gradient-card p-6 rounded-lg border border-border shadow-card-dark">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Thermometer className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Стабильная температура</h3>
                <p className="text-muted-foreground text-sm">
                  Пар, образующийся при сгорании HHO, отводит тепло. Температура в цилиндрах 
                  ниже примерно на 2–3°C.
                </p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Эффекты по результатам эксплуатации
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center bg-gradient-card p-6 rounded-lg border border-border">
                <h3 className="text-3xl font-bold text-neon-primary mb-2">20–30%</h3>
                <p className="text-lg font-semibold text-foreground mb-1">Экономия топлива</p>
                <p className="text-sm text-muted-foreground">зависит от мотора, пробега и качества установки</p>
              </div>
              <div className="text-center bg-gradient-card p-6 rounded-lg border border-border">
                <h3 className="text-3xl font-bold text-neon-secondary mb-2">80%</h3>
                <p className="text-lg font-semibold text-foreground mb-1">Меньше выброса СО₂</p>
                <p className="text-sm text-muted-foreground">снижение углеродного следа</p>
              </div>
              <div className="text-center bg-gradient-card p-6 rounded-lg border border-border">
                <h3 className="text-3xl font-bold text-neon-primary mb-2">до 45%</h3>
                <p className="text-lg font-semibold text-foreground mb-1">Заявляемый максимум</p>
                <p className="text-sm text-muted-foreground">по данным H2PRO в отдельных сценариях</p>
              </div>
            </div>
          </div>

          {/* Why less emissions */}
          <div className="bg-gradient-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Почему снижается расход и выбросы CO₂
            </h2>
            <p className="text-muted-foreground">
              Водород ускоряет реакции окисления углеводородов: фронт пламени развивается быстрее, 
              смесь сгорает полнее. Выхлоп содержит меньше CO и HC, а расход падает за счёт 
              повышения эффективности сгорания.
            </p>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Частые вопросы</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-border">
                <AccordionTrigger className="text-foreground">
                  Что такое HHO и как он получается?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Газ Брауна (HHO) получают электролизом воды на борту автомобиля. 
                  Он подмешивается во впуск и помогает смеси сгорать полнее.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-border">
                <AccordionTrigger className="text-foreground">
                  Повлияет ли установка на гарантию/лизинг?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Оборудование ставится как внешний узел без изменения конструкции 
                  и может быть демонтировано без следов.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-border">
                <AccordionTrigger className="text-foreground">
                  Работа зимой
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Используется незамерзающая смесь (вода + 20–40% изопропанола), 
                  генератор сохраняет работоспособность до −60 °C.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-border">
                <AccordionTrigger className="text-foreground">
                  Самостоятельная установка
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Возможна, но ошибки монтажа/настройки резко снижают эффект и могут лишить гарантии. 
                  Рекомендуем установку у партнёров H2PRO.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6 bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-lg border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground">
              Готовы проверить на своём авто?
            </h2>
            <p className="text-muted-foreground">
              Если в течении 30 дней вы не увидели результат - мы вернем вам деньги!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton variant="primary" size="lg" onClick={() => setCalculatorOpen(true)}>
                <Calculator className="mr-2 w-5 h-5" />
                Рассчитать выгоду
              </GlowButton>
              <GlowButton variant="outline" size="lg" onClick={() => {
                onOpenChange(false);
                setTimeout(() => {
                  document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}>
                <MapPin className="mr-2 w-5 h-5" />
                Заказать установку
              </GlowButton>
            </div>
          </div>
        </div>
        
        <CalculatorModal open={calculatorOpen} onOpenChange={setCalculatorOpen} />
      </DialogContent>
    </Dialog>;
};
export default TechDetailsModal;