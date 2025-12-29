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
  submittedKey?: string | null;
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

export const CityMap = ({ onBooking, submittedKey }: CityMapProps) => {
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
      const submitted = submittedKey === key;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="color:#fff;font-family:system-ui">
          <b style="color:#00f0ff">${city.name}</b><br/>
          <small>${city.address}</small><br/><br/>
          📞 ${submitted ? city.phone : "+7 (XXX) XXX-XX-XX"}<br/><br/>
          ${
            submitted
              ? "<b style='color:#00f0ff'>Запись создана</b>"
              : "<button id='book' style='padding:6px 10px'>Записаться</button>"
          }
        </div>
      `);

      const marker = new mapboxgl.Marker()
        .setLngLat(city.coordinates)
        .setPopup(popup)
        .addTo(map);

      popup.on("open", () => {
        const btn = popup.getElement()?.querySelector(
          "#book"
        ) as HTMLButtonElement | null;
        if (btn) btn.onclick = () => onBooking(city);
      });
    });

    return () => map.remove();
  }, [onBooking, submittedKey]);

  return <div ref={ref} className="w-full h-full" />;
};
