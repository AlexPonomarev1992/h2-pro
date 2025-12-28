import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Loader2 } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';

interface CityMapProps {
  onClose?: () => void;
}

interface CityLocation {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  region: string;
  address: string; // Добавили адрес
  phone: string;   // Добавили телефон
  serviceType: 'passenger' | 'truck' | 'both'; // Тип сервиса
}
// Добавьте в начало компонента CityMap
const [showBookingForm, setShowBookingForm] = useState(false);
const [selectedCityForBooking, setSelectedCityForBooking] = useState<CityLocation | null>(null);
const [isFormSubmitted, setIsFormSubmitted] = useState(false);

// Функция, которая будет вызываться из Popup карты
const handleBookClick = (city: CityLocation) => {
  setSelectedCityForBooking(city);
  setShowBookingForm(true);
};
const cityLocations: CityLocation[] = [
  { name: "Краснодар (Центр)", coordinates: [38.9769, 45.0355], region: "Юг", address: "ул. Красная, 120", phone: "+7 (900) 123-45-67", serviceType: "both" },
  { name: "Краснодар (Север)", coordinates: [38.9800, 45.0500], region: "Юг", address: "ул. Дальняя, 4", phone: "+7 (900) 765-43-21", serviceType: "passenger" },
  { name: "Чебоксары", coordinates: [47.2479, 56.1439], region: "Приволжье", address: "пр. Ленина, 25", phone: "+7 (917) 111-22-33", serviceType: "passenger" },
  { name: "Осинники Новокузнецк", coordinates: [87.3305, 53.6174], region: "Сибирь", address: "ул. Победы, 10", phone: "+7 (905) 333-44-55", serviceType: "truck" },
  { name: "Петропавловск Казахстан", coordinates: [69.1450, 54.8667], region: "Казахстан", address: "ул. Конституции, 44", phone: "+7 (701) 555-66-77", serviceType: "both" },
  { name: "Уфа", coordinates: [55.9578, 54.7388], region: "Приволжье", address: "ул. Октября, 15", phone: "+7 (937) 000-11-22", serviceType: "both" },
  { name: "Иркутск", coordinates: [104.2964, 52.2869], region: "Сибирь", address: "ул. Байкальская, 202", phone: "+7 (914) 222-33-44", serviceType: "truck" },
  { name: "Набережные Челны", coordinates: [52.4125, 55.7430], region: "Приволжье", address: "пр. Мира, 88", phone: "+7 (927) 444-55-66", serviceType: "both" },
  { name: "Новосибирск (Левый берег)", coordinates: [82.9346, 55.0084], region: "Сибирь", address: "ул. Ватутина, 31", phone: "+7 (913) 777-88-99", serviceType: "passenger" },
  { name: "Новосибирск (Правый берег)", coordinates: [82.9500, 55.0200], region: "Сибирь", address: "ул. Кирова, 113", phone: "+7 (913) 000-99-88", serviceType: "both" },
  { name: "Тюмень", coordinates: [65.5343, 57.1522], region: "Урал", address: "ул. Республики, 160", phone: "+7 (922) 111-00-99", serviceType: "both" },
  { name: "Екатеринбург", coordinates: [60.6122, 56.8389], region: "Урал", address: "ул. Малышева, 51", phone: "+7 (900) 555-00-11", serviceType: "both" },
  { name: "Электросталь", coordinates: [38.4467, 55.7897], region: "Центр", address: "ул. Советская, 12", phone: "+7 (926) 333-22-11", serviceType: "passenger" },
  { name: "Хабаровск", coordinates: [135.0722, 48.4827], region: "Дальний Восток", address: "ул. Муравьева-Амурского, 5", phone: "+7 (914) 555-44-33", serviceType: "both" },
  { name: "Самара", coordinates: [50.1155, 53.1952], region: "Приволжье", address: "ул. Ново-Садовая, 106", phone: "+7 (927) 222-11-00", serviceType: "truck" },
  { name: "Ижевск", coordinates: [53.2045, 56.8498], region: "Приволжье", address: "ул. Пушкинская, 268", phone: "+7 (912) 888-77-66", serviceType: "passenger" },
  { name: "Глазов", coordinates: [52.6592, 58.1395], region: "Приволжье", address: "ул. Кирова, 40", phone: "+7 (912) 000-11-22", serviceType: "passenger" },
  { name: "Киров", coordinates: [49.6605, 58.6035], region: "Приволжье", address: "ул. Ленина, 80", phone: "+7 (922) 555-66-77", serviceType: "both" },
  { name: "Ухта", coordinates: [53.7968, 63.5668], region: "Север", address: "пр. Ленина, 37", phone: "+7 (904) 111-22-33", serviceType: "truck" },
  { name: "Стерлитамак", coordinates: [55.9500, 53.6241], region: "Приволжье", address: "ул. Мира, 18", phone: "+7 (937) 555-44-33", serviceType: "both" },
  { name: "Ханты-Мансийск", coordinates: [69.0019, 61.0042], region: "Урал", address: "ул. Мира, 1", phone: "+7 (902) 888-99-00", serviceType: "passenger" },
  { name: "Щёлково", coordinates: [38.0337, 55.9211], region: "Центр", address: "Село Петровское, 1", phone: "+7 (925) 000-11-22", serviceType: "both" },
  { name: "Санкт-Петербург (Север)", coordinates: [30.3351, 59.9311], region: "Северо-Запад", address: "Придорожная аллея, 8", phone: "+7 (812) 111-22-33", serviceType: "both" },
  { name: "Санкт-Петербург (Юг)", coordinates: [30.3500, 59.9100], region: "Северо-Запад", address: "ул. Салова, 57", phone: "+7 (812) 333-44-55", serviceType: "truck" },
  { name: "Казань (Вахитовский)", coordinates: [49.1221, 55.7963], region: "Приволжье", address: "ул. Пушкина, 10", phone: "+7 (987) 222-33-44", serviceType: "both" },
  { name: "Казань (Квартал)", coordinates: [49.1400, 55.8200], region: "Приволжье", address: "пр. Ямашева, 46", phone: "+7 (987) 555-66-77", serviceType: "passenger" },
  { name: "Сургут", coordinates: [73.4200, 61.2500], region: "Урал", address: "ул. Мира, 52", phone: "+7 (922) 444-55-66", serviceType: "truck" },
  { name: "Челябинск", coordinates: [61.4291, 55.1644], region: "Урал", address: "пр. Ленина, 21", phone: "+7 (908) 111-22-33", serviceType: "both" },
  { name: "Нижнеудинск", coordinates: [99.0297, 54.8981], region: "Сибирь", address: "ул. Ленина, 40", phone: "+7 (950) 111-22-33", serviceType: "truck" },
  { name: "Улан-Удэ", coordinates: [107.6086, 51.8272], region: "Сибирь", address: "ул. Бабушкина, 25", phone: "+7 (902) 555-44-33", serviceType: "both" },
  { name: "Новороссийск", coordinates: [37.7686, 44.7231], region: "Юг", address: "ул. Советов, 10", phone: "+7 (918) 444-33-22", serviceType: "passenger" },
  { name: "Махачкала", coordinates: [47.5015, 42.9849], region: "Юг", address: "пр. Акушинского, 15", phone: "+7 (988) 111-22-33", serviceType: "both" },
  { name: "Евпатория", coordinates: [33.3669, 45.1897], region: "Юг", address: "ул. Интернациональная, 100", phone: "+7 (978) 000-11-22", serviceType: "both" },
  { name: "Пермь", coordinates: [56.2502, 58.0105], region: "Приволжье", address: "ул. Ленина, 60", phone: "+7 (342) 222-33-44", serviceType: "truck" },
  { name: "Барнаул", coordinates: [83.7799, 53.3606], region: "Сибирь", address: "пр. Ленина, 50", phone: "+7 (385) 111-22-33", serviceType: "both" },
  { name: "Когалым", coordinates: [74.4806, 62.2656], region: "Урал", address: "ул. Дружбы Народов, 15", phone: "+7 (346) 555-66-77", serviceType: "passenger" },
];

const regions = ["Все", "Центр", "Северо-Запад", "Юг", "Приволжье", "Урал", "Сибирь", "Дальний Восток", "Север", "Казахстан"];

export const CityMap = ({ onClose }: CityMapProps = {}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>("Все");
  const MAPBOX_TOKEN = 'pk.eyJ1IjoibWF0b3Jpbml2YW4iLCJhIjoiY21oamFoYWIwMTllcDJwcTZmeHQ3aXRkdyJ9.Z_Pirq2egAM9Kkro8sI0cA';

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/navigation-night-v1',
        center: [65, 55], // Center on Russia
        zoom: 3,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Wait for map to load
      map.current.on('load', () => {
        setIsLoading(false);
      });

      // Add markers for each city with fade-in animation
      cityLocations.forEach((city, index) => {
        const el = document.createElement('div');
        el.className = 'city-marker';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.cursor = 'pointer';
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.5s ease-in-out';
        el.title = ''; // Remove default tooltip
        
        // Create inner element for the image to avoid positioning conflicts
        const innerEl = document.createElement('div');
        innerEl.style.width = '100%';
        innerEl.style.height = '100%';
        innerEl.style.backgroundImage = 'url(/assets/marker.png)';
        innerEl.style.backgroundSize = 'contain';
        innerEl.style.backgroundRepeat = 'no-repeat';
        innerEl.style.backgroundPosition = 'center';
        innerEl.style.transition = 'transform 0.2s ease-out';
        innerEl.title = ''; // Remove default tooltip
            // ДОБАВЬТЕ ЭТУ СТРОКУ:
        innerEl.style.mixBlendMode = 'screen'; 
            // И это для усиления свечения (опционально):
        innerEl.style.filter = 'drop-shadow(0 0 5px #00f0ff)';
        
        el.appendChild(innerEl);
        
        // Hover effect on inner element to avoid positioning issues
        el.addEventListener('mouseenter', () => {
          innerEl.style.transform = 'scale(1.2)';
        });
        el.addEventListener('mouseleave', () => {
          innerEl.style.transform = 'scale(1)';
        });

        // Добавьте этот вспомогательный объект перед popup
const serviceTypeLabels = {
  passenger: "🚗 Только легковые",
  truck: "🚛 Только грузовые",
  both: "🛠 Легковые и грузовые"
};

const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
  `<div style="padding: 12px; min-width: 200px; font-family: sans-serif; background: #0B121B; color: #fff; border-radius: 8px;">
    <div style="font-weight: 700; color: #00f0ff; margin-bottom: 4px; font-size: 16px;">${city.name}</div>
    <div style="font-size: 13px; color: #888; margin-bottom: 4px;">📍 ${city.address}</div>
    
    <div id="phone-container-${index}" style="font-size: 14px; color: #fff; margin-bottom: 12px; font-weight: bold;">
      📞 ${isFormSubmitted ? city.phone : '+7 (XXX) XXX-XX-XX'}
    </div>

    <button 
      id="book-button-${index}"
      style="
        display: block;
        width: 100%;
        padding: 10px;
        background: ${isFormSubmitted ? 'transparent' : 'linear-gradient(90deg, #00f0ff, #0072ff)'};
        color: ${isFormSubmitted ? '#00f0ff' : '#000'};
        border: ${isFormSubmitted ? '1px solid #00f0ff' : 'none'};
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
      "
    >
      ${isFormSubmitted ? 'Запись создана' : 'Записаться на сервис'}
    </button>
  </div>`
);

        // Add event listener for the button after popup opens
        popup.on('open', () => {
          const button = document.getElementById(`book-button-${index}`);
          if (button) {
            button.addEventListener('click', () => {
              if (onClose) {
                onClose();
              }
              // Small delay to allow modal to close before scrolling
              setTimeout(() => {
                const contactsSection = document.getElementById('contacts');
                if (contactsSection) {
                  contactsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 300);
            });
          }
        });

        const marker = new mapboxgl.Marker(el)
          .setLngLat(city.coordinates)
          .setPopup(popup)
          .addTo(map.current!);

        markers.current.push(marker);
        
        // Fade in with staggered delay
        setTimeout(() => {
          el.style.opacity = '0.7';
        }, index * 50 + 300);
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setIsLoading(false);
    }

    return () => {
      if (map.current) {
        markers.current.forEach(marker => marker.remove());
        markers.current = [];
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Filter markers by region
  useEffect(() => {
    cityLocations.forEach((city, index) => {
      const marker = markers.current[index];
      if (marker) {
        const element = marker.getElement();
        if (selectedRegion === "Все" || city.region === selectedRegion) {
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        }
      }
    });
  }, [selectedRegion]);

  const filteredCitiesCount = selectedRegion === "Все" 
    ? cityLocations.length 
    : cityLocations.filter(city => city.region === selectedRegion).length;

 return (
    <>
      <div className="space-y-4">
        {/* Region Filter */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">
            Фильтр по регионам ({filteredCitiesCount} {filteredCitiesCount === 1 ? 'город' : filteredCitiesCount < 5 ? 'города' : 'городов'})
          </p>
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <GlowButton
                key={region}
                variant={selectedRegion === region ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </GlowButton>
            ))}
          </div>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[500px]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background-secondary rounded-lg border border-border z-10">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground">Загрузка карты...</p>
              </div>
            </div>
          )}
          <div
            ref={mapContainer}
            className="w-full h-full rounded-lg border border-border shadow-lg"
            style={{ 
              filter: 'brightness(0.7) contrast(1.2)', // Опционально: делает стандартную карту темнее
              background: '#0B121B' 
            }}
          />
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && selectedCityForBooking && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0B121B] border border-[#00f0ff]/30 p-6 rounded-xl w-full max-w-md shadow-[0_0_30px_rgba(0,240,255,0.1)] animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-[#00f0ff] mb-4">Запись: {selectedCityForBooking.name}</h3>
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              setIsFormSubmitted(true);
              localStorage.setItem('form_submitted', 'true'); // Сохраняем статус, чтобы номер не скрывался после перезагрузки
              setShowBookingForm(false);
              alert("Заявка отправлена! Теперь номера телефонов на карте открыты.");
            }}>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Ваш город</label>
                <input 
                  type="text" 
                  defaultValue={selectedCityForBooking.name}
                  className="w-full bg-[#0F1621] border border-border p-2 rounded text-white focus:border-[#00f0ff] outline-none"
                />
              </div>
              <input placeholder="Имя" required className="w-full bg-[#0F1621] border border-border p-2 rounded text-white focus:border-[#00f0ff] outline-none" />
              <input placeholder="Телефон" type="tel" required className="w-full bg-[#0F1621] border border-border p-2 rounded text-white focus:border-[#00f0ff] outline-none" />
              
              <div className="flex gap-2 pt-2">
                <GlowButton variant="primary" className="flex-1" type="submit">
                  Получить номер сервиса
                </GlowButton>
                <button 
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="px-4 text-gray-400 hover:text-white transition-colors"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
