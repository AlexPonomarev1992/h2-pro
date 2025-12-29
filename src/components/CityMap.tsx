import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Phone, MapPin } from "lucide-react";
import { GlowButton } from "@/components/ui/glow-button";

interface CityLocation {
  name: string;
  coordinates: [number, number];
  region: string;
  address: string;
  phone: string;
  serviceType: "passenger" | "truck" | "both";
}

const cityLocations: CityLocation[] = [
  { name: "Краснодар (Центр)", coordinates: [38.9769, 45.0355], region: "Юг", address: "ул. Красная, 120", phone: "+7 (900) 123-45-67", serviceType: "both" },
  { name: "Краснодар (Север)", coordinates: [38.98, 45.05], region: "Юг", address: "ул. Дальняя, 4", phone: "+7 (900) 765-43-21", serviceType: "passenger" },
  { name: "Чебоксары", coordinates: [47.2479, 56.1439], region: "Приволжье", address: "пр. Ленина, 25", phone: "+7 (917) 111-22-33", serviceType: "passenger" },
];

const MAPBOX_TOKEN = "pk.eyJ1IjoibWF0b3Jpbml2YW4iLCJhIjoiY21oamFoYWIwMTllcDJwcTZmeHQ3aXRkdyJ9.Z_Pirq2egAM9Kkro8sI0cA";

export const CityMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const [bookingCity, setBookingCity] = useState<CityLocation | null>(null);
  const [submittedCity, setSubmittedCity] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [65, 55],
      zoom: 3,
    });

    cityLocations.forEach((city) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="background:#0B121B;padding:12px;border-radius:8px;color:#fff;min-width:200px">
          <b style="color:#00f0ff">${city.name}</b>
          <div style="font-size:13px;color:#888;margin:6px 0">📍 ${city.address}</div>
          <div style="font-weight:bold;margin-bottom:10px">
            📞 ${submittedCity === city.name ? city.phone : "+7 (XXX) XXX-XX-XX"}
          </div>
          ${
            submittedCity === city.name
              ? `<div style="color:#00f0ff;font-weight:bold">Запись создана</div>`
              : `<button onclick="window.openBooking('${city.name}')" style="width:100%;padding:8px;border-radius:6px;background:linear-gradient(90deg,#00f0ff,#0072ff);font-weight:bold">Записаться</button>`
          }
        </div>
      `);

      new mapboxgl.Marker()
        .setLngLat(city.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });

    (window as any).openBooking = (name: string) => {
      const city = cityLocations.find(c => c.name === name);
      if (city) setBookingCity(city);
    };
  }, [submittedCity]);

  return (
    <>
      <div ref={mapContainer} className="w-full h-[500px] rounded-lg border border-border" />

      {bookingCity && (
        <BookingForm
          city={bookingCity}
          onClose={() => setBookingCity(null)}
          onSuccess={() => {
            setSubmittedCity(bookingCity.name);
            setBookingCity(null);
          }}
        />
      )}
    </>
  );
};

function BookingForm({
  city,
  onClose,
  onSuccess,
}: {
  city: CityLocation;
  onClose: () => void;
  onSuccess: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <form
        className="bg-[#0B121B] p-6 rounded-xl w-full max-w-md border border-[#00f0ff]/30"
        onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const name = fd.get("name");
          const phone = fd.get("phone");

          const contact = await fetch("https://h2pro.bitrix24.ru/rest/1/xmv4aig8i7ug15lw/crm.contact.add.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fields: { NAME: name, PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }] },
            }),
          }).then(r => r.json());

          await fetch("https://h2pro.bitrix24.ru/rest/1/xmv4aig8i7ug15lw/crm.deal.add.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fields: {
                TITLE: `Заявка: ${city.name}`,
                CONTACT_ID: contact.result,
                CATEGORY_ID: 9,
                COMMENTS: `Адрес: ${city.address}\nТелефон сервиса: ${city.phone}`,
              },
            }),
          });

          onSuccess();
        }}
      >
        <h3 className="text-xl font-bold text-[#00f0ff] mb-4">Запись: {city.name}</h3>
        <input name="name" required placeholder="Имя" className="w-full mb-3 p-2 bg-[#0F1621] border rounded text-white" />
        <input name="phone" required placeholder="+7 (999) 000-00-00" className="w-full mb-4 p-2 bg-[#0F1621] border rounded text-white" />
        <div className="flex gap-2">
          <GlowButton type="submit" className="flex-1">Получить номер</GlowButton>
          <button type="button" onClick={onClose} className="text-gray-400">Отмена</button>
        </div>
      </form>
    </div>
  );
}
