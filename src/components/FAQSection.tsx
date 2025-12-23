import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
const FAQSection = () => {
  const faqs = [{
    question: "Как работает водородный генератор H2PRO?",
    answer: "Водородный генератор H2PRO работает так: внутри электролизёра из воды вырабатывается газ (смесь водорода и кислорода). Этот газ подаётся во впускной коллектор двигателя вместе с воздухом. В результате топливо сгорает чище и полнее, уменьшается нагар, двигатель работает мягче, расход снижается до 45%, износ деталей падает на 20–30%, а выбросы CO₂ сокращаются на 50–80%."
  }, {
    question: "Сколько времени занимает установка?",
    answer: "Установка водородного генератора занимает в среднем от 4 до 6 часов для легкового авто и до 1 рабочего дня для грузовиков и спецтехники. Точное время зависит от модели двигателя и условий монтажа."
  }, {
    question: "Безопасна ли система для автомобиля?",
    answer: "Да, система безопасна. Водород в H2PRO не хранится в баллонах, а вырабатывается в малых количествах прямо во время работы двигателя и сразу подаётся во впуск. Защиту обеспечивают гидрозамок и обратные клапаны, которые исключают обратное пламя. При правильной установке риск для авто отсутствует - наоборот, двигатель работает чище и мягче."
  }, {
    question: "На сколько снижается расход топлива?",
    answer: "Расход топлива снижается до 45% - точная цифра зависит от объёма двигателя, пробега и условий эксплуатации."
  }, {
    question: "Нужно ли специальное обслуживание?",
    answer: "Специального обслуживания не требуется. Нужно лишь регулярно доливать воду (и незамерзающую смесь зимой) и раз в несколько месяцев проверять фильтры и соединения. Всё остальное оборудование работает автоматически."
  }, {
    question: "Пойдет ли система для моего автомобиля?",
    answer: "Система подходит для большинства автомобилей легковых, и грузовых. Главное, чтобы двигатель был технически исправен и объём находился в рабочем диапазоне генератора. Устанавливается как на бензин, так и на дизель, а также на машины с газовым оборудованием."
  }, {
    question: "Какая гарантия на оборудование?",
    answer: "Гарантия на оборудование H2PRO составляет 1 год при условии правильной установки и соблюдения рекомендаций по эксплуатации."
  }, {
    question: "Влияет ли система на прохождение техосмотра?",
    answer: "Система не мешает прохождению техосмотра. Она не меняет конструкцию автомобиля и не требует переделки штатных узлов. Наоборот, за счёт более полного сгорания топлива снижаются выбросы, а значит, показатели выхлопа становятся чище и пройти диагностику проще."
  }, {
    question: "Можно ли установить систему на новый автомобиль?",
    answer: "Да, систему можно установить и на новый автомобиль. Она не требует вмешательства в конструкцию и работает как дополнительный узел, не влияя на гарантию завода. При этом двигатель получает более чистое сгорание топлива, что снижает износ уже с первых километров."
  }, {
    question: "Можно ли приобрести в рассрочку?",
    answer: "Да, мы работаем с агрегатором inPocket, который отправляет заявку на одобрение сразу в несколько банков. После заявки с вами свяжется менеджер для уточнения деталей."
  }, {
    question: "Сколько стоит установка и обслуживание?",
    answer: "Установка и обслуживание зависят от типа вашего автомобиля - легковой, грузовой или спецтехника. Сама система не требует сложного сервиса: достаточно доливать воду и иногда проверять фильтры. А вот точный расчёт стоимости именно для вашей машины можно узнать через наш калькулятор - он сразу покажет цену установки и будущую экономию."
  }];
  return <section className="py-20 bg-background relative overflow-hidden" id="faq">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 rounded-sm">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <HelpCircle className="w-12 h-12 text-primary" />
            <h2 className="md:text-5xl font-bold text-foreground text-2xl">
              Частые вопросы
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ответы на самые популярные вопросы о водородных генераторах H2PRO
          </p>
        </div>

        <div className="bg-gradient-card rounded-xl border border-border shadow-card-dark p-6 fade-in">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                <AccordionTrigger className="px-6 py-4 text-left hover:text-primary hover:no-underline">
                  <span className="text-foreground font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-center fade-in">
          <div className="bg-gradient-card p-8 rounded-xl border border-border shadow-card-dark">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Не нашли ответ на свой вопрос?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Наши специалисты готовы ответить на любые вопросы о водородных технологиях, 
              установке и обслуживании оборудования.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contacts" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-button text-primary-foreground rounded-lg font-semibold hover:shadow-neon transition-all duration-300 hover:scale-105">
                Задать вопрос специалисту
              </a>
              <a href="tel:+79098530468" className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary bg-transparent text-primary rounded-lg font-semibold hover:bg-primary/10 hover:shadow-glow-primary transition-all duration-300">
                Позвонить сейчас
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default FAQSection;