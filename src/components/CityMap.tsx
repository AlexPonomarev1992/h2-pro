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
}

const cityLocations: CityLocation[] = [
  { name: "Краснодар", coordinates: [38.9769, 45.0355], region: "Юг" },
  { name: "Чебоксары", coordinates: [47.2479, 56.1439], region: "Приволжье" },
  { name: "Осинники Новокузнецк", coordinates: [87.3305, 53.6174], region: "Сибирь" },
  { name: "Петропавловск Казахстан", coordinates: [69.1450, 54.8667], region: "Казахстан" },
  { name: "Уфа", coordinates: [55.9578, 54.7388], region: "Приволжье" },
  { name: "Иркутск", coordinates: [104.2964, 52.2869], region: "Сибирь" },
  { name: "Набережные Челны", coordinates: [52.4125, 55.7430], region: "Приволжье" },
  { name: "Новосибирск", coordinates: [82.9346, 55.0084], region: "Сибирь" },
  { name: "Тюмень", coordinates: [65.5343, 57.1522], region: "Урал" },
  { name: "Екатеринбург", coordinates: [60.6122, 56.8389], region: "Урал" },
  { name: "Электросталь", coordinates: [38.4467, 55.7897], region: "Центр" },
  { name: "Хабаровск", coordinates: [135.0722, 48.4827], region: "Дальний Восток" },
  { name: "Самара", coordinates: [50.1155, 53.1952], region: "Приволжье" },
  { name: "Ижевск", coordinates: [53.2045, 56.8498], region: "Приволжье" },
  { name: "Глазов", coordinates: [52.6592, 58.1395], region: "Приволжье" },
  { name: "Киров", coordinates: [49.6605, 58.6035], region: "Приволжье" },
  { name: "Ухта", coordinates: [53.7968, 63.5668], region: "Север" },
  { name: "Стерлитамак", coordinates: [55.9500, 53.6241], region: "Приволжье" },
  { name: "Ханты-Мансийск", coordinates: [69.0019, 61.0042], region: "Урал" },
  { name: "Щёлково, Мос. Обл. Село Петровское", coordinates: [38.0337, 55.9211], region: "Центр" },
  { name: "Санкт-Петербург", coordinates: [30.3351, 59.9311], region: "Северо-Запад" },
  { name: "Казань", coordinates: [49.1221, 55.7963], region: "Приволжье" },
  { name: "Сургут", coordinates: [73.4200, 61.2500], region: "Урал" },
  { name: "Челябинск", coordinates: [61.4291, 55.1644], region: "Урал" },
  { name: "Нижнеудинск Иркутская обл.", coordinates: [99.0297, 54.8981], region: "Сибирь" },
  { name: "Улан-Удэ", coordinates: [107.6086, 51.8272], region: "Сибирь" },
  { name: "Новороссийск", coordinates: [37.7686, 44.7231], region: "Юг" },
  { name: "Махачкала", coordinates: [47.5015, 42.9849], region: "Юг" },
  { name: "Евпатория", coordinates: [33.3669, 45.1897], region: "Юг" },
  { name: "Пермь", coordinates: [56.2502, 58.0105], region: "Приволжье" },
  { name: "Барнаул", coordinates: [83.7799, 53.3606], region: "Сибирь" },
  { name: "Когалым", coordinates: [74.4806, 62.2656], region: "Урал" },
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
        style: 'mapbox://styles/mapbox/streets-v12',
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
        innerEl.style.backgroundImage = 'url(/assets/city-marker.png)';
        innerEl.style.backgroundSize = 'contain';
        innerEl.style.backgroundRepeat = 'no-repeat';
        innerEl.style.backgroundPosition = 'center';
        innerEl.style.transition = 'transform 0.2s ease-out';
        innerEl.title = ''; // Remove default tooltip
        
        el.appendChild(innerEl);
        
        // Hover effect on inner element to avoid positioning issues
        el.addEventListener('mouseenter', () => {
          innerEl.style.transform = 'scale(1.2)';
        });
        el.addEventListener('mouseleave', () => {
          innerEl.style.transform = 'scale(1)';
        });

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div style="padding: 12px;">
            <div style="font-weight: 600; color: hsl(var(--foreground)); margin-bottom: 4px; font-size: 14px;">${city.name}</div>
            <div style="font-size: 12px; color: hsl(var(--muted-foreground)); margin-bottom: 12px;">${city.region}</div>
            <button 
              id="book-button-${index}"
              style="
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 8px 16px;
                background: hsl(var(--primary));
                color: white;
                border-radius: 6px;
                font-size: 13px;
                font-weight: 500;
                text-decoration: none;
                transition: all 0.2s;
                cursor: pointer;
                border: none;
                width: 100%;
              "
              onmouseover="this.style.opacity='0.9'"
              onmouseout="this.style.opacity='1'"
            >
              Записаться на установку
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
          el.style.opacity = '1';
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
        />
      </div>
    </div>
  );
};
