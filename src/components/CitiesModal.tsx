import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import { GlowButton } from "@/components/ui/glow-button";
import { MapPin, MessageCircle, Map, Car, Truck, Phone, X, Loader2 } from "lucide-react";
import { CityMap } from "@/components/CityMap";

// Твой массив данных
const cityLocations = [
  { name: "Краснодар", address: "ул. Красная, 120", serviceType: "both", phone: "+7 (900) 123-45-67" },
  { name: "Краснодар", address: "ул. Дальняя, 4", serviceType: "passenger", phone: "+7 (900) 765-43-21" },
  { name: "Чебоксары", address: "пр. Ленина, 25", serviceType: "passenger", phone: "+7 (917) 111-22-33" },
  { name: "Осинники Новокузнецк", address: "ул. Победы, 10", serviceType: "truck", phone: "+7 (905) 333-44-55" },
  { name: "Петропавловск Казахстан", address: "ул. Конституции, 44", serviceType: "both", phone: "+7 (701) 555-66-77" },
  { name: "Уфа", address: "ул. Октября, 15", serviceType: "both", phone: "+7 (937) 000-11-22" },
  { name: "Иркутск", address: "ул. Байкальская, 202", serviceType: "truck", phone: "+7 (914) 222-33-44" },
  { name: "Набережные Челны", address: "пр. Мира, 88", serviceType: "both", phone: "+7 (927) 444-55-66" },
  { name: "Новосибирск", address: "ул. Ватутина, 31", serviceType: "passenger", phone: "+7 (913) 777-88-99" },
  { name: "Новосибирск", address: "ул. Кирова, 113", serviceType: "both", phone: "+7 (913) 000-99-88" },
  { name: "Тюмень", address: "ул. Республики, 160", serviceType: "both", phone: "+7 (922) 111-00-99" },
  { name: "Екатеринбург", address: "ул. Малышева, 51", serviceType: "both", phone: "+7 (900) 555-00-11" },
  { name: "Электросталь", address: "ул. Советская, 12", serviceType: "passenger", phone: "+7 (926) 333-22-11" },
  { name: "Хабаровск", address: "ул. Муравьева-Амурского, 5", serviceType: "both", phone: "+7 (914) 555-44-33" },
  { name: "Самара", address: "ул. Ново-Садовая, 106", serviceType: "truck", phone: "+7 (927) 222-11-00" },
  { name: "Ижевск", address: "ул. Пушкинская, 268", serviceType: "passenger", phone: "+7 (912) 888-77-66" },
  { name: "Глазов", address: "ул. Кирова, 40", serviceType: "passenger", phone: "+7 (912) 000-11-22" },
  { name: "Киров", address: "ул. Ленина, 80", serviceType: "both", phone: "+7 (922) 555-66-77" },
  { name: "Ухта", address: "пр. Ленина, 37", serviceType: "truck", phone: "+7 (904) 111-22-33" },
  { name: "Стерлитамак", address: "ул. Мира, 18", serviceType: "both", phone: "+7 (937) 555-44-33" },
  { name: "Ханты-Мансийск", address: "ул. Мира, 1", serviceType: "passenger", phone: "+7 (902) 888-99-00" },
  { name: "Щёлково", address: "ул. Центральная, 1", serviceType: "both", phone: "+7 (925) 000-11-22" },
  { name: "Санкт-Петербург", address: "Придорожная аллея, 8", serviceType: "both", phone: "+7 (812) 111-22-33" },
  { name: "Санкт-Петербург", address: "ул. Салова, 57", serviceType: "truck", phone: "+7 (812) 333-44-55" },
  { name: "Казань", address: "ул. Пушкина, 10", serviceType: "both", phone: "+7 (987) 222-33-44" },
  { name: "Казань", address: "пр. Ямашева, 46", serviceType: "passenger", phone: "+7 (987) 555-66-77" },
  { name: "Сургут", address: "ул. Мира, 52", serviceType: "truck", phone: "+7 (922) 444-55-66" },
  { name: "Челябинск", address: "пр. Ленина, 21", serviceType: "both", phone: "+7 (908) 111-22-33" },
  { name: "Нижнеудинск", address: "ул. Ленина, 40", serviceType: "truck", phone: "+7 (950) 111-22-33" },
  { name: "Улан-Удэ", address: "ул. Бабушкина, 25", serviceType: "both", phone: "+7 (902) 555-44-33" },
  { name: "Новороссийск", address: "ул. Советов, 10", serviceType: "passenger", phone: "+7 (918) 444-33-22" },
  { name: "Махачкала", address: "пр. Акушинского, 15", serviceType: "both", phone: "+7 (988) 111-22-33" },
  { name: "Евпатория", address: "ул. Интернациональная, 100", serviceType: "both", phone: "+7 (978) 000-11-22" },
  { name: "Пермь", address: "ул. Ленина, 60", serviceType: "truck", phone: "+7 (342) 222-33-44" },
  { name: "Барнаул", address: "пр. Ленина, 50", serviceType: "both", phone: "+7 (385) 111-22-33" },
  { name: "Когалым", address: "ул. Дружбы Народов, 15", serviceType: "passenger", phone: "+7 (346) 555-66-77" },
];

const uniqueCityNames = Array.from(new Set(cityLocations.map(loc => loc.name)));

interface CitiesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CitiesModal = ({ open, onOpenChange }: CitiesModalProps) => {
  const [showMap, setShowMap] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
  // Состояния для записи
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [targetBranch, setTargetBranch] = useState<any>(null);
  const [submittedBranchKey, setSubmittedBranchKey] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!targetBranch) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      // 1. Создаем контакт
      const contactRes = await fetch('https://h2pro.bitrix24.ru/rest/1/xmv4aig8i7ug15lw/crm.contact.add.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: { 
            NAME: formData.get('userName'), 
            PHONE: [{ "VALUE": formData.get('userPhone'), "VALUE_TYPE": "WORK" }] 
          }
        })
      });
      const contactData = await contactRes.json();

      // 2. Создаем сделку
      await fetch('https://h2pro.bitrix24.ru/rest/1/xmv4aig8i7ug15lw/crm.deal.add.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            TITLE: `Запись из списка: ${targetBranch.name}`,
            CONTACT_ID: contactData.result,
            CATEGORY_ID: 9,
            COMMENTS: `Адрес филиала: ${targetBranch.address}`
          }
        })
      });

      setSubmittedBranchKey(`${targetBranch.name}-${targetBranch.address}`);
      setShowBookingForm(false);
    } catch (err) {
      alert("Ошибка сети при отправке");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-[#0B121B] border-[#00E5FF]/30 text-white z-[50]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-[#00E5FF]">
              <MapPin className="w-6 h-6" />
              География работы H2PRO
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Наши партнёры-установщики работают в {uniqueCityNames.length} городах СНГ
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex gap-2 mb-4">
            <GlowButton variant={!showMap ? "primary" : "outline"} size="sm" onClick={() => setShowMap(false)} className="flex-1">
              <MapPin className="w-4 h-4 mr-2" /> Список городов
            </GlowButton>
            <GlowButton variant={showMap ? "primary" : "outline"} size="sm" onClick={() => setShowMap(true)} className="flex-1">
              <Map className="w-4 h-4 mr-2" /> Карта
            </GlowButton>
          </div>
          
          {!showMap ? (
            <div className="grid grid-cols-1 gap-3 mb-6">
              {uniqueCityNames.map((cityName, index) => {
                const isExpanded = selectedCity === cityName;
                const branches = cityLocations.filter(loc => loc.name === cityName);

                return (
                  <div key={index} className="flex flex-col">
                    <div
                      onClick={() => setSelectedCity(isExpanded ? null : cityName)}
                      className={`flex items-center justify-between p-4 rounded-lg bg-[#0F172A] border transition-all cursor-pointer ${
                        isExpanded ? 'border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.1)]' : 'border-white/10 hover:border-[#00E5FF]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className={`w-5 h-5 ${isExpanded ? 'text-[#00E5FF]' : 'text-gray-500'}`} />
                        <span className="font-semibold text-lg">{cityName}</span>
                      </div>
                      <div className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                        {branches.length} {branches.length === 1 ? 'сервис' : 'сервиса'}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-2 ml-4 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
                        {branches.map((branch, idx) => {
                          const isSubmitted = submittedBranchKey === `${branch.name}-${branch.address}`;
                          return (
                            <div key={idx} className="p-4 rounded-lg bg-[#161F30] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <div className="text-[#00E5FF] text-sm font-medium mb-1 flex items-center gap-2">
                                  {branch.serviceType === 'truck' ? <Truck className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                                  {branch.serviceType === 'both' ? 'Грузовой и легковой сервис' : branch.serviceType === 'truck' ? 'Грузовой сервис' : 'Легковой сервис'}
                                </div>
                                <div className="text-gray-300 text-sm">📍 {branch.address}</div>
                                <div className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                                   <Phone className="w-3 h-3" /> 
                                   {isSubmitted ? branch.phone : '+7 (XXX) XXX-XX-XX'}
                                </div>
                              </div>
                              
                              {isSubmitted ? (
                                <div className="text-[#00E5FF] font-bold text-sm px-4 py-2 border border-[#00E5FF]/50 rounded-lg bg-[#00E5FF]/5">
                                  Запись создана
                                </div>
                              ) : (
                                <GlowButton
                                  variant="primary"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setTargetBranch(branch);
                                    setShowBookingForm(true);
                                  }}
                                >
                                  <MessageCircle className="w-4 h-4 mr-2" />
                                  Записаться
                                </GlowButton>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mb-6 h-[500px] rounded-xl overflow-hidden border border-white/10">
              <CityMap onClose={() => onOpenChange(false)} />
            </div>
          )}
          
          <div className="border-t border-white/10 pt-6">
            <GlowButton variant="hero" size="lg" className="w-full" asChild>
              <a href="/#contacts"><MessageCircle className="w-5 h-5 mr-2" />Стать партнером</a>
            </GlowButton>
          </div>
        </DialogContent>
      </Dialog>

      {/* Модальное окно записи через Портал (теперь точно сверху) */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm" />
          <div className="fixed left-[50%] top-[50%] z-[9999] w-full max-w-md translate-x-[-50%] translate-y-[-50%] p-4 outline-none">
            <div className="bg-[#0B121B] border border-[#00E5FF]/30 p-8 rounded-2xl relative shadow-[0_0_50px_rgba(0,229,255,0.15)] text-white">
              <button 
                onClick={() => setShowBookingForm(false)} 
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-2xl font-bold text-[#00f0ff] mb-6">Запись: {targetBranch?.name}</h3>
              
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm text-gray-400 ml-1">Ваше имя</label>
                  <input name="userName" required className="w-full bg-[#0F1722] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#00E5FF]" placeholder="Имя" />
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-400 ml-1">Телефон</label>
                  <input name="userPhone" type="tel" required className="w-full bg-[#0F1722] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#00E5FF]" placeholder="+7 (999) 000-00-00" />
                </div>

                {/* Инфо-блок идентичный карте */}
                <div className="bg-[#161F30]/50 border border-white/5 rounded-xl p-4 space-y-1">
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Автоматически будет указано:</div>
                  <div className="text-white font-semibold">г. {targetBranch?.name}</div>
                  <div className="text-[#00E5FF] text-sm">Сервис: {targetBranch?.address}</div>
                </div>

                <div className="flex gap-3 pt-2">
                  <GlowButton variant="primary" className="flex-1 py-4" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="animate-spin" /> : "Получить номер"}
                  </GlowButton>
                  <button type="button" onClick={() => setShowBookingForm(false)} className="px-6 text-gray-400 hover:text-white text-sm font-medium">
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DialogPortal>
      </Dialog>
    </>
  );
};
