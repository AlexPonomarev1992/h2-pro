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

const MAPBOX_TOKEN =
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
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [65, 55],
      zoom: 3,
    });

    mapRef.current = map;

    cities.forEach((city) => {
      const key = `${city.name}-${city.address}`;
      const isSubmitted = submittedKey === key;

      const popupHtml = `
        <div style="
          background:#0B121B;
          padding:12px;
          border-radius:8px;
          min-width:220px;
          color:#fff;
          font-family:system-ui;
        ">
          <div style="font-weight:700;color:#00f0ff;margin-bottom:4px">
            ${city.name}
          </div>

          <div style="font-size:13px;color:#9ca3af;margin-bottom:6px">
            📍 ${city.address}
          </div>

          <div style="font-weight:bold;margin-bottom:10px">
            📞 ${isSubmitted ? city.phone : "+7 (XXX) XXX-XX-XX"}
          </div>

          ${
            isSubmitted
              ? `<div style="color:#00f0ff;font-weight:700">
                   Запись создана
                 </div>`
              : `<button
                   data-booking="1"
                   style="
                     width:100%;
                     padding:8px;
                     border-radius:6px;
                     background:linear-gradient(90deg,#00f0ff,#0072ff);
                     color:#000;
                     font-weight:700;
                     border:none;
                     cursor:pointer;
                   "
                 >
                   Записаться
                 </button>`
          }
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 24 }).setHTML(popupHtml);

      const marker = new mapboxgl.Marker()
        .setLngLat(city.coordinates)
        .setPopup(popup)
        .addTo(map);

      popup.on("open", () => {
        const popupEl = popup.getElement();
        const btn = popupEl.querySelector(
          'button[data-booking="1"]'
        ) as HTMLButtonElement | null;

        if (btn) {
          btn.onclick = () => onBooking(city);
        }
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [onBooking, submittedKey]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full min-h-[500px] rounded-xl border border-white/10"
    />
  );
};
