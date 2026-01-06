import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export interface CityMapLocation {
  name: string;
  address: string;
  phone: string;
  coordinates: [number, number];
}

interface CityMapProps {
  onBooking: (city: CityMapLocation) => void;
  submittedBranches: Set<string>;
}

mapboxgl.accessToken =
  "pk.eyJ1IjoibWF0b3Jpbml2YW4iLCJhIjoiY21oamFoYWIwMTllcDJwcTZmeHQ3aXRkdyJ9.Z_Pirq2egAM9Kkro8sI0cA";

const cities: CityMapLocation[] = [
  {
    name: "Краснодар",
    address: "ул. Красная, 120",
    phone: "+7 (900) 123-45-67",
    coordinates: [38.9769, 45.0355],
  },
  {
    name: "Краснодар",
    address: "ул. Дальняя, 4",
    phone: "+7 (900) 765-43-21",
    coordinates: [38.98, 45.05],
  },
  {
    name: "Чебоксары",
    address: "пр. Ленина, 25",
    phone: "+7 (917) 111-22-33",
    coordinates: [47.2479, 56.1439],
  },
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
