import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
} from "@/components/ui/dialog";
import { GlowButton } from "@/components/ui/glow-button";
import { MapPin, Phone, Map } from "lucide-react";
import { CityMap, CityMapLocation } from "@/components/CityMap";

const branches = [
  {
    city: "Краснодар",
    address: "ул. Красная, 120",
    phone: "+7 (900) 123-45-67",
  },
  {
    city: "Краснодар",
    address: "ул. Дальняя, 4",
    phone: "+7 (900) 765-43-21",
  },
  {
    city: "Чебоксары",
    address: "пр. Ленина, 25",
    phone: "+7 (917) 111-22-33",
  },
];

export const CitiesModal = ({ open, onOpenChange }: any) => {
  const [view, setView] = useState<"list" | "map">("list");

  const [booking, setBooking] = useState<{
    city: string;
    address: string;
    phone: string;
  } | null>(null);

  const [submittedKey, setSubmittedKey] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>

      <DialogContent className="bg-[#0B121B] text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-[#00f0ff] flex items-center gap-2">
            <MapPin /> География работы
          </DialogTitle>
        </DialogHeader>

        {/* переключатель */}
        <div className="flex gap-2 mb-4">
          <GlowButton
            variant={view === "list" ? "primary" : "outline"}
            size="sm"
            onClick={() => setView("list")}
            className="flex-1"
          >
            Список
          </GlowButton>
          <GlowButton
            variant={view === "map" ? "primary" : "outline"}
            size="sm"
            onClick={() => setView("map")}
            className="flex-1"
          >
            <Map className="w-4 h-4 mr-2" />
            Карта
          </GlowButton>
        </div>

        {view === "list" ? (
          <div className="space-y-3">
            {branches.map((b, i) => {
              const key = `${b.city}-${b.address}`;
              const submitted = submittedKey === key;

              return (
                <div
                  key={i}
                  className="p-4 bg-[#161F30] rounded-lg flex justify-between items-center"
                >
                  <div>
                    <div className="font-semibold">{b.city}</div>
                    <div className="text-sm text-gray-400">
                      📍 {b.address}
                    </div>
                    <div className="text-sm">
                      <Phone className="inline w-3 h-3" />{" "}
                      {submitted ? b.phone : "+7 (XXX) XXX-XX-XX"}
                    </div>
                  </div>

                  {submitted ? (
                    <div className="text-[#00f0ff] font-bold">
                      Запись создана
                    </div>
                  ) : (
                    <GlowButton
                      size="sm"
                      onClick={() => setBooking(b)}
                    >
                      Записаться
                    </GlowButton>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-[500px] rounded-lg overflow-hidden border">
            <CityMap
              submittedKey={submittedKey}
              onBooking={(city: CityMapLocation) =>
                setBooking({
                  city: city.name,
                  address: city.address,
                  phone: city.phone,
                })
              }
            />
          </div>
        )}
      </DialogContent>

      {/* ФОРМА — ВНУТРИ DialogPortal */}
      {booking && (
        <DialogPortal>
          <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <form
              className="bg-[#0B121B] border border-[#00f0ff]/30 rounded-xl w-full max-w-md p-6"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);

                const contact = await fetch(
                  "https://h2pro.bitrix24.ru/rest/1/xmv4aig8i7ug15lw/crm.contact.add.json",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      fields: {
                        NAME: fd.get("name"),
                        PHONE: [
                          {
                            VALUE: fd.get("phone"),
                            VALUE_TYPE: "WORK",
                          },
                        ],
                      },
                    }),
                  }
                ).then((r) => r.json());

                await fetch(
                  "https://h2pro.bitrix24.ru/rest/1/xmv4aig8i7ug15lw/crm.deal.add.json",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      fields: {
                        TITLE: `Заявка: ${booking.city}`,
                        CONTACT_ID: contact.result,
                        CATEGORY_ID: 9,
                        COMMENTS: `Адрес: ${booking.address}\nТелефон сервиса: ${booking.phone}`,
                        SOURCE_ID:
                          "WZda1ec0cc-c091-4839-9864-0b6bbd1b21bf",
                      },
                    }),
                  }
                );

                setSubmittedKey(
                  `${booking.city}-${booking.address}`
                );
                setBooking(null);
              }}
            >
              <h3 className="text-xl font-bold text-[#00f0ff] mb-4">
                Запись: {booking.city}
              </h3>

              <input
                name="name"
                required
                placeholder="Ваше имя"
                className="w-full mb-3 p-2 bg-[#0F1621] border border-border rounded text-white"
              />

              <input
                name="phone"
                required
                placeholder="+7 (999) 000-00-00"
                className="w-full mb-4 p-2 bg-[#0F1621] border border-border rounded text-white"
              />

              <div className="flex gap-2">
                <GlowButton type="submit" className="flex-1">
                  Получить номер
                </GlowButton>
                <button
                  type="button"
                  onClick={() => setBooking(null)}
                  className="text-gray-400"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </DialogPortal>
      )}
    </Dialog>
  );
};
