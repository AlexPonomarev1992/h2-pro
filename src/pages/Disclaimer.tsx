import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Disclaimer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-20">
      {/* Fixed Close Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50 bg-background border-border shadow-lg hover:bg-muted"
        onClick={() => navigate('/')}
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-card border border-border rounded-lg p-8 shadow-card-dark">
          <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
            Дисклеймер (отказ от ответственности)
          </h1>
          
          <div className="space-y-6 text-foreground">
            <div>
              <p className="text-muted-foreground mb-6 text-center">
                <strong>ИП ПОПКОВ АЛЕКСЕЙ ВЛАДИМИРОВИЧ</strong>
              </p>
              
              <p className="mb-6">
                Вся информация о продукции, размещенная на сайте https://h2-pro.ru, носит справочно-информационный характер и не является гарантией достижения конкретных результатов.
              </p>
            </div>

            <div>
              <p className="mb-4">
                Показатели эффективности (экономия топлива, снижение выбросов, увеличение мощности, продление ресурса двигателя и масла и др.) основаны на результатах испытаний и данных эксплуатации оборудования, но могут существенно различаться в зависимости от:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>марки, модели и технического состояния автомобиля;</li>
                <li>объема и типа двигателя;</li>
                <li>стиля вождения;</li>
                <li>качества топлива и моторных жидкостей;</li>
                <li>правильности установки и эксплуатации оборудования.</li>
              </ul>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <p className="text-lg font-semibold mb-4 text-primary">
                Важное предупреждение:
              </p>
              <p className="mb-4">
                Фактические результаты применения оборудования H2PRO могут отличаться от заявленных.
              </p>
              <p>
                Компания не несёт ответственности за прямые или косвенные убытки, вызванные использованием или невозможностью использования оборудования, если такие убытки связаны с нарушением инструкции по установке и эксплуатации, либо с индивидуальными особенностями автомобиля.
              </p>
            </div>

            <div>
              <p className="mb-4">
                Для получения объективной информации о возможных показателях именно для вашего автомобиля рекомендуется консультация со специалистами ИП ПОПКОВА А.В. или аккредитованными партнёрами.
              </p>
              
              <p>
                Размещение информации о продукции на сайте https://h2-pro.ru не является публичной офертой (ст. 437 ГК РФ). Условия приобретения оборудования и услуг определяются в Публичной оферте.
              </p>
            </div>

            <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6 text-center">
              <p className="font-semibold">
                Свяжитесь с нами для получения персональной консультации:
              </p>
              <p className="mt-2">
                Телефон: +7 (909) 853-04-68<br/>
                E-mail: h2profficial@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;