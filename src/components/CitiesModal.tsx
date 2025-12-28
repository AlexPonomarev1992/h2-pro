import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GlowButton } from "@/components/ui/glow-button";
import { MapPin, MessageCircle, Map, Car, Truck, Phone } from "lucide-react";
import { CityMap } from "@/components/CityMap";

// Тот самый массив с адресами (сокращенная версия для примера, используй полный из прошлых шагов)
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
  { name: "Щёлково, Мос. Обл. Село Петровское", address: "ул. Центральная, 1", serviceType: "both", phone: "+7 (925) 000-11-22" },
  { name: "Санкт-Петербург", address: "Придорожная аллея, 8", serviceType: "both", phone: "+7 (812) 111-22-33" },
  { name: "Санкт-Петербург", address: "ул. Салова, 57", serviceType: "truck", phone: "+7 (812) 333-44-55" },
  { name: "Казань", address: "ул. Пушкина, 10", serviceType: "both", phone: "+7 (987) 222-33-44" },
  { name: "Казань", address: "пр. Ямашева, 46", serviceType: "passenger", phone: "+7 (987) 555-66-77" },
  { name: "Сургут", address: "ул. Мира, 52", serviceType: "truck", phone: "+7 (922) 444-55-66" },
  { name: "Челябинск", address: "пр. Ленина, 21", serviceType: "both", phone: "+7 (908) 111-22-33" },
  { name: "Нижнеудинск Иркутская обл.", address: "ул. Ленина, 40", serviceType: "truck", phone: "+7 (950) 111-22-33" },
  { name: "Улан-Удэ", address: "ул. Бабушкина, 25", serviceType: "both", phone: "+7 (902) 555-44-33" },
  { name: "Новороссийск", address: "ул. Советов, 10", serviceType: "passenger", phone: "+7 (918) 444-33-22" },
  { name: "Махачкала", address: "пр. Акушинского, 15", serviceType: "both", phone: "+7 (988) 111-22-33" },
  { name: "Евпатория", address: "ул. Интернациональная, 100", serviceType: "both", phone: "+7 (978) 000-11-22" },
  { name: "Пермь", address: "ул. Ленина, 60", serviceType: "truck", phone: "+7 (342) 222-33-44" },
  { name: "Барнаул", address: "пр. Ленина, 50", serviceType: "both", phone: "+7 (385) 111-22-33" },
  { name: "Когалым", address: "ул. Дружбы Народов, 15", serviceType: "passenger", phone: "+7 (346) 555-66-77" },
];

// Получаем список уникальных названий городов для сетки
const uniqueCityNames = Array.from(new Set(cityLocations.map(loc => loc.name)));

interface CitiesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CitiesModal = ({ open, onOpenChange }: CitiesModalProps) => {
  const [showMap, setShowMap] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-[#0B121B] border-[#00E5FF]/30 text-white">
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
          <GlowButton
            variant={!showMap ? "primary" : "outline"}
            size="sm"
            onClick={() => setShowMap(false)}
            className="flex-1"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Список городов
          </GlowButton>
          <GlowButton
            variant={showMap ? "primary" : "outline"}
            size="sm"
            onClick={() => setShowMap(true)}
            className="flex-1"
          >
            <Map className="w-4 h-4 mr-2" />
            Карта
          </GlowButton>
        </div>
        
        {!showMap ? (
          <div className="grid grid-cols-1 gap-3 mb-6">
            {uniqueCityNames.map((cityName, index) => {
              const isExpanded = selectedCity === cityName;
              const branches = cityLocations.filter(loc => loc.name === cityName);

              return (
                <div key={index} className="flex flex-col">
                  {/* Кнопка города */}
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

                  {/* Раскрывающийся список филиалов */}
                  {isExpanded && (
                    <div className="mt-2 ml-4 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      {branches.map((branch, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-[#161F30] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="text-[#00E5FF] text-sm font-medium mb-1 flex items-center gap-2">
                              {branch.type === 'truck' ? <Truck className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                              {branch.type === 'both' ? 'Грузовой и легковой сервис' : branch.type === 'truck' ? 'Грузовой сервис' : 'Легковой сервис'}
                            </div>
                            <div className="text-gray-300 text-sm">📍 {branch.address}</div>
                            <div className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                               <Phone className="w-3 h-3" /> {branch.phone}
                            </div>
                          </div>
                          
                          <GlowButton
                            variant="primary"
                            size="sm"
                            asChild
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenChange(false);
                            }}
                          >
                            <a href="/#contacts">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Записаться
                            </a>
                          </GlowButton>
                        </div>
                      ))}
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
          <GlowButton 
            variant="hero" 
            size="lg" 
            className="w-full"
            asChild
          >
            <a href="/#contacts">
              <MessageCircle className="w-5 h-5 mr-2" />
              Стать партнером в своем городе
            </a>
          </GlowButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
