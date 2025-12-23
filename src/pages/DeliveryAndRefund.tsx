import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DeliveryAndRefund = () => {
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
            Условия доставки и возврата
          </h1>
          
          <div className="space-y-6 text-foreground">
            <div>
              <p className="text-muted-foreground mb-6 text-center">
                <strong>ИП ПОПКОВ АЛЕКСЕЙ ВЛАДИМИРОВИЧ</strong>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">1. Доставка</h2>
              <p className="mb-2">1.1. Доставка оборудования осуществляется по всей территории РФ и в страны СНГ.</p>
              <p className="mb-2">1.2. Стоимость и сроки доставки зависят от региона и транспортной компании.</p>
              
              <p className="mb-2">1.3. Возможные варианты доставки:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>самовывоз из партнёрского центра;</li>
                <li>курьерская служба;</li>
                <li>транспортные компании.</li>
              </ul>
              
              <p className="mb-2">1.4. Доставка осуществляется после подтверждения заказа и оплаты.</p>
              <p>1.5. В момент получения оборудования Покупатель обязан проверить комплектность и отсутствие повреждений.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. Возврат и обмен</h2>
              <p className="mb-2">2.1. Покупатель вправе отказаться от товара надлежащего качества в течение 7 календарных дней с момента получения (ст. 26.1 Закона РФ «О защите прав потребителей»).</p>
              
              <p className="mb-2">2.2. Возврат возможен, если оборудование:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>не использовалось;</li>
                <li>сохранён товарный вид, пломбы, упаковка и комплектующие;</li>
                <li>имеется документ, подтверждающий факт покупки.</li>
              </ul>
              
              <p>2.3. Возврат денежных средств производится в течение 10 рабочих дней с момента поступления товара на склад Компании.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. Возврат товара ненадлежащего качества</h2>
              <p className="mb-2">3.1. Если в течение гарантийного срока выявлен заводской брак, Покупатель вправе:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>потребовать замену на аналогичный товар;</li>
                <li>вернуть товар и потребовать возврат денежных средств;</li>
                <li>потребовать безвозмездного устранения недостатков.</li>
              </ul>
              
              <p>3.2. Гарантийные обязательства действуют только при условии соблюдения инструкции по эксплуатации и правильной установки.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Порядок возврата</h2>
              <p className="mb-2">4.1. Для возврата товара необходимо направить заявление на e-mail: h2profficial@gmail.com с указанием:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>ФИО;</li>
                <li>номера заказа;</li>
                <li>причины возврата.</li>
              </ul>
              
              <p className="mb-2">4.2. Транспортные расходы при возврате товара надлежащего качества оплачивает Покупатель.</p>
              <p>4.3. При возврате товара ненадлежащего качества расходы несёт Компания.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">5. Контакты</h2>
              <p>
                <strong>ИП ПОПКОВ АЛЕКСЕЙ ВЛАДИМИРОВИЧ</strong><br/>
                ИНН: 163902897843<br/>
                ОГРНИП: 321169000157701<br/>
                Юридический адрес: г. Набережные Челны, ул. Железнодорожников, д. 59, кв. 42<br/>
                Фактический адрес: г. Казань, ул. Габдуллы Тукая, д. 64<br/>
                Телефон: +7 (909) 853-04-68<br/>
                E-mail: h2profficial@gmail.com<br/>
                Сайт: https://h2-pro.ru
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAndRefund;