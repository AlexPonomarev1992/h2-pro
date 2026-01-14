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
  { name: "Евпатория", address: "ул. Дмитрия Ульянова 92", phone: "+7 (978) 685-14-76", telegramId: "5279470366", coordinates: [33.3714, 45.211428] },
  { name: "Екатеринбург", address: "ул. Артинская, 24", phone: "+7 (922) 181-43-58", telegramId: "955435796", coordinates: [60.5839825, 56.868571] },
  { name: "Екатеринбург", address: "10-ая Самородная, д. 5, помещение 11", phone: "8-800-350-28-47", telegramId: "798903140", coordinates: [60.560949, 56.682822] },
  { name: "Иркутск", address: "ул. Ширямова, 2в", phone: "+7 (924) 606-05-08", telegramId: "763565170", coordinates: [104.355346, 52.279770] },
  { name: "Иркутск", address: "Иркутская область", phone: "+7 (924) 604-80-00", telegramId: "266883093", coordinates: [104.2810, 52.2870] },
  { name: "Иркутск", address: "Иркутск", phone: "+7 (908) 779-99-96", telegramId: "5304518224", coordinates: [104.3000, 52.2900] },
  { name: "Казань", address: "ул. Михаила Миля, 1/9", phone: "+7 (987) 223-97-76", telegramId: "7704973682", coordinates: [49.134918, 55.850247] },
  { name: "Казань", address: "ул. Патриса Лумумбы, 61", phone: "+7 (919) 682-84-46", telegramId: "", coordinates: [49.185933, 55.796213] },
  { name: "Краснодар", address: "ул. Куренная, 7", phone: "+7 (967) 309-16-19", telegramId: "1959086300", coordinates: [39.113231, 45.035388] },
  { name: "Магнитогорск", address: "ул. Люгарина, 128", phone: "+7 (967) 867-00-00", telegramId: "5483054", coordinates: [58.91274, 53.395712] },
  { name: "Махачкала", address: "пр. Казбекова, 84", phone: "+7 (989) 871-87-00", telegramId: "8423657334", coordinates: [47.401232, 42.978489] },
  { name: "Махачкала", address: "ул. Космодромная, 64", phone: "+7 (906) 222-74-81", telegramId: "5206721475", coordinates: [47.539087, 42.930089] },
  { name: "Набережные Челны", address: "40 лет Победы, 72Б, 45 бокс", phone: "+7 (927) 456-38-88", telegramId: "343148963", coordinates: [52.433998, 55.736893] },
  { name: "Назрань", address: "ул. Асият Тутаевой, 65", phone: "+7 (928) 699-59-77", telegramId: "5752924871", coordinates: [44.776615, 43.220511] },
  { name: "Новокузнецк", address: "ул. Тореза, 123Б", phone: "+7 (904) 379-40-38", telegramId: "5931774035", coordinates: [87.156678, 53.814049] },
  { name: "Новокузнецк", address: "ул. Полевая, 29", phone: "+7 (923) 633-96-53", telegramId: "", coordinates: [87.159067, 53.737543] },
  { name: "Новоузенск", address: "Улица Комбрига Шилина, 12", phone: "+7 (903) 045-15-11", telegramId: "1650806364", coordinates: [48.134419, 50.465713] },
  { name: "Осинники", address: "проезд Магистральный, 10", phone: "+7 (905) 967-19-38", telegramId: "1893902933", coordinates: [87.325462, 53.606736] },
  { name: "Кемерово", address: "Выезд", phone: "+79039850324", telegramId: "1893902933", coordinates: [87.325462, 53.606736] },
  { name: "Ленинск-Кузнецк", address: "Выезд", phone: "+79039850324", telegramId: "1893902933", coordinates: [87.325462, 53.606736] },
  { name: "Таштагол", address: "Выезд", phone: "+79039850324", telegramId: "1893902933", coordinates: [87.325462, 53.606736] },
  { name: "Пермь", address: "ул. Промышленная, 76", phone: "+7 (902) 839-50-70", telegramId: "1061659897", coordinates: [56.120846, 57.934984] },
  { name: "Прокопьевск", address: "ул. Есенина, 5, терраса-2, Гараж-17а", phone: "8-950-267-62-33", telegramId: "8466548973", coordinates: [86.616620, 53.857422] },
  { name: "Самара", address: "Ракитовское шоссе, 90а", phone: "+7 (937) 201-49-49", telegramId: "286734596", coordinates: [50.285138, 53.265224] },
  { name: "Самовец", address: "ул. Советская, 23г", phone: "+7 (920) 544-47-46", telegramId: "1430838538", coordinates: [39.943104, 52.523838] },
  { name: "Санкт-Петербург", address: "Ломоносов, гаражи КАС-9", phone: "89117724900", telegramId: "1304289325", coordinates: [29.780386, 59.895753] },
  { name: "Сургут", address: "Базовая 7 строение 8", phone: "89227978222", telegramId: "5269039730", coordinates: [73.481454, 61.257483] },
  { name: "Сургут", address: "ул. Щепеткина, 54/1", phone: "89227978222", telegramId: "5269039730", coordinates: [73.483160, 61.243869] },
  { name: "рп Татищево", address: "улица Лапшова 68/2", phone: "+79020422125", telegramId: "1197528943", coordinates: [45.598457, 51.680833] },
  { name: "Ташкент", address: "Узбекистан", phone: "998 91 192 99 23", telegramId: "3961733", coordinates: [69.279728, 41.311144] },
  { name: "Томск", address: "ул. Герцена, 61 стр. 1", phone: "+7 (983) 232-00-04", telegramId: "", coordinates: [84.986330, 56.472451] },
  { name: "Тюмень", address: "ул. Физкультурная 40", phone: "+7 (922) 254-62-26", telegramId: "1082092676", coordinates: [65.541730, 57.134916] },
  { name: "Улан-Удэ", address: "пр. Строителей, 72", phone: "+7 (924) 395-45-35", telegramId: "647317841", coordinates: [107.652298, 51.812236] },
  { name: "Челябинск", address: "ул. Туруханская, 47а", phone: "+7 (982) 276-42-44", telegramId: "1033967347", coordinates: [61.487633, 55.100700] },
  { name: "Шумерля", address: "ул. Богдана Хмельницкого, 59", phone: "+7 (960) 309-55-57", telegramId: "478390513", coordinates: [46.436783, 55.489162] },
  { name: "Электросталь", address: "ул. Красная, 11 (Сервис S-LINE)", phone: "+7 (901) 797-01-41", telegramId: "6172146992", coordinates: [38.442814, 55.805372] }
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

// SVG код синего неонового маркера в стиле h2-pro
el.innerHTML = `
  <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 16 42 16 42C16 42 32 24.8366 32 16C32 7.16344 24.8366 0 16 0Z" 
          fill="${submitted ? '#00f0ff' : '#0070ff'}" 
          style="filter: drop-shadow(0px 0px 5px ${submitted ? '#00f0ff' : '#0070ff'});"/>
    <circle cx="16" cy="16" r="6" fill="white"/>
  </svg>
`;

el.style.width = '32px';
el.style.height = '42px';
el.style.cursor = 'pointer';

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
