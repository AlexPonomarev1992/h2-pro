import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export interface CityMapLocation {
  name: string;
  address: string;
  phone: string;
  telegramId?: string;
  coordinates: [number, number];
}

interface CityMapProps {
  onBooking: (city: CityMapLocation) => void;
  submittedBranches: Set<string>;
}

mapboxgl.accessToken =
  "pk.eyJ1IjoibWF0b3Jpbml2YW4iLCJhIjoiY21oamFoYWIwMTllcDJwcTZmeHQ3aXRkdyJ9.Z_Pirq2egAM9Kkro8sI0cA";

const cities: CityMapLocation[] = [
  { name: "Электросталь", address: "ул. Красная, 11 (Сервис S-LINE)", phone: "+7 (901) 797-01-41", telegramId: "6172146992", coordinates: [38.4464, 55.7887] },
  { name: "Набережные Челны", address: "40 лет Победы, 72Б, 45 бокс", phone: "+7 (927) 456-38-88", telegramId: "343148963", coordinates: [52.4136, 55.7431] },
  { name: "Магнитогорск", address: "ул. Люгарина, 128", phone: "+7 (967) 867-00-00", telegramId: "5483054", coordinates: [58.9707, 53.4115] },
  { name: "Санкт-Петербург", address: "Ломоносов, гаражи КАС-9", phone: "+7 (911) 772-49-01", telegramId: "1304289325", coordinates: [29.7720, 59.9061] },
  { name: "Махачкала", address: "пр. Казбекова, 84", phone: "+7 (989) 871-87-00", telegramId: "8423657334", coordinates: [47.5022, 42.9849] },
  { name: "Самара", address: "Ракитовское шоссе, 90а", phone: "+7 (937) 201-49-49", telegramId: "286734596", coordinates: [50.1155, 53.1956] },
  { name: "Иркутск", address: "ул. Ширямова, 2в", phone: "+7 (924) 606-05-08", telegramId: "", coordinates: [104.3050, 52.2869] },
  { name: "Тюмень", address: "Частный гараж", phone: "+7 (922) 254-62-26", telegramId: "1082092676", coordinates: [65.5343, 57.1530] },
  { name: "Екатеринбург", address: "ул. Артинская, 24", phone: "+7 (922) 181-43-58", telegramId: "955435796", coordinates: [60.6122, 56.8389] },
  { name: "Краснодар", address: "ул. Дмитрия Ульянова, 92", phone: "+7 (978) 685-14-76", telegramId: "", coordinates: [38.9769, 45.0355] },
  { name: "Пермь", address: "ул. Промышленная, 76", phone: "+7 (902) 839-50-70", telegramId: "1061659897", coordinates: [56.2502, 58.0296] },
  { name: "Краснодар", address: "ул. Куренная, 7", phone: "+7 (967) 309-16-19", telegramId: "1959086300", coordinates: [38.9940, 45.0448] },
  { name: "Иркутск", address: "Иркутская область", phone: "+7 (924) 604-80-00", telegramId: "266883093", coordinates: [104.2964, 52.2978] },
  { name: "Иркутск", address: "Иркутск", phone: "+7 (908) 779-99-96", telegramId: "5304518224", coordinates: [104.2610, 52.2819] },
  { name: "Осинники", address: "проезд Магистральный, 10", phone: "+7 (905) 967-19-38", telegramId: "1893902933", coordinates: [87.3448, 53.6167] },
  { name: "Улан-Удэ", address: "пр. Строителей, 72", phone: "+7 (924) 395-45-35", telegramId: "647317841", coordinates: [107.6086, 51.8272] },
  { name: "Новокузнецк", address: "ул. Тореза, 123Б", phone: "+7 (904) 379-40-38", telegramId: "", coordinates: [87.1099, 53.7557] },
  { name: "Новокузнецк", address: "ул. Полевая, 29", phone: "+7 (923) 633-96-53", telegramId: "", coordinates: [87.1334, 53.7581] },
  { name: "Казань", address: "ул. Михаила Миля, 1/9", phone: "+7 (987) 223-97-76", telegramId: "7704973682", coordinates: [49.1221, 55.7887] },
  { name: "Казань", address: "ул. Патриса Лумумбы, 61", phone: "+7 (919) 682-84-46", telegramId: "", coordinates: [49.1443, 55.7943] },
  { name: "Челябинск", address: "ул. Туруханская, 47а", phone: "+7 (982) 276-42-44", telegramId: "1033967347", coordinates: [61.4291, 55.1644] },
  { name: "Томск", address: "ул. Герцена, 61 стр. 1", phone: "+7 (983) 232-00-04", telegramId: "", coordinates: [84.9745, 56.4977] },
  { name: "Махачкала", address: "ул. Космодромная, 64", phone: "+7 (906) 222-74-81", telegramId: "", coordinates: [47.4978, 42.9746] },
  { name: "Вичуга", address: "Ивановская область", phone: "+7 (980) 685-03-51", telegramId: "", coordinates: [41.9191, 57.2119] },
  { name: "Самовец", address: "ул. Советская, 23г", phone: "+7 (920) 544-47-46", telegramId: "", coordinates: [39.8845, 55.0794] },
  { name: "Назрань", address: "ул. Асият Тутаевой, 65", phone: "+7 (928) 699-59-77", telegramId: "5752924871", coordinates: [44.7697, 43.2256] },
  { name: "Шумерля", address: "ул. Богдана Хмельницкого, 59", phone: "+7 (960) 309-55-57", telegramId: "", coordinates: [46.4142, 55.5000] }
];

export const CityMap = ({ onBooking, submittedBranches }: CityMapProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const map = new mapboxgl.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [65, 55],
      zoom: 3,
    });

    cities.forEach((city) => {
      const key = `${city.name}-${city.address}`;
      const submitted = submittedBranches.has(key);

      const popup = new mapboxgl.Popup({ 
        offset: 25,
        className: 'custom-popup'
      }).setHTML(`
        <div style="
          color: #fff;
          font-family: system-ui, -apple-system, sans-serif;
          padding: 8px;
          min-width: 200px;
        ">
          <h4 style="
            color: #00f0ff;
            font-size: 16px;
            font-weight: bold;
            margin: 0 0 8px 0;
          ">${city.name}</h4>
          
          <div style="
            font-size: 13px;
            color: #d1d5db;
            margin-bottom: 4px;
          ">📍 ${city.address}</div>
          
          <div style="
            font-size: 13px;
            color: #d1d5db;
            margin-bottom: 12px;
          ">
            📞 ${submitted 
              ? `<a href="tel:${city.phone}" style="color: #00f0ff; text-decoration: none;">${city.phone}</a>` 
              : '<span style="color: #6b7280;">+7 (XXX) XXX-XX-XX</span>'
            }
          </div>
          
          ${submitted
            ? `<div style="
                color: #00f0ff;
                font-weight: bold;
                text-align: center;
                padding: 8px;
                background: rgba(0, 240, 255, 0.1);
                border-radius: 4px;
              ">✅ Заявка отправлена</div>`
            : `<button id="book" style="
                width: 100%;
                padding: 8px 12px;
                background: linear-gradient(135deg, #00f0ff 0%, #0080ff 100%);
                border: none;
                border-radius: 6px;
                color: white;
                font-weight: 600;
                cursor: pointer;
                font-size: 14px;
                transition: transform 0.2s;
              " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                Записаться
              </button>`
          }
        </div>
      `);

      // Создаем маркер с кастомным цветом
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.backgroundImage = submitted 
        ? 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)'
        : 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.backgroundSize = '100%';
      el.style.filter = submitted ? 'hue-rotate(0deg)' : 'hue-rotate(180deg)';

      const marker = new mapboxgl.Marker(el)
        .setLngLat(city.coordinates)
        .setPopup(popup)
        .addTo(map);

      popup.on("open", () => {
        const btn = popup.getElement()?.querySelector(
          "#book"
        ) as HTMLButtonElement | null;
        if (btn) {
          btn.onclick = () => onBooking(city);
        }
      });
    });

    return () => map.remove();
  }, [onBooking, submittedBranches]);

  return <div ref={ref} className="w-full h-full rounded-lg" />;
};
