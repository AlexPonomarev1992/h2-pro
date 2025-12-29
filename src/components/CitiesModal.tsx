import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GlowButton } from "@/components/ui/glow-button";
import { CityMap, CityMapLocation } from "@/components/CityMap";
import { BookingForm } from "@/components/BookingForm";

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
  const [booking, setBooking] = useState<any>(null);
  const [submittedKey, setSubmittedKey] = useState<string | null>(null);

  const startBooking = (b: any) => {
    onOpenChange(false);
    setTimeout(() => setBooking(b), 0);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-[#0B121B] text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#00f0ff]">
              География работы
            </DialogTitle>
          </DialogHeader>

          <div className="flex gap-2 mb-4">
            <GlowButton
              size="sm"
              variant={view === "list" ? "primary" : "outline"}
              onClick={() => setView("list")}
            >
              Список
            </GlowButton>
            <GlowButton
              size="sm"
              variant={view === "map" ? "primary" : "outline"}
              onClick={() => setView("map")}
            >
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
                    className="p-4 bg-[#161F30] rounded-lg flex justify-between"
                  >
                    <div>
                      <b>{b.city}</b>
                      <div className="text-sm">{b.address}</div>
                      <div className="text-sm">
                        📞 {submitted ? b.phone : "+7 (XXX) XXX-XX-XX"}
                      </div>
                    </div>

                    {submitted ? (
                      <b className="text-[#00f0ff]">
                        Запись создана
                      </b>
                    ) : (
                      <GlowButton
                        size="sm"
                        onClick={() => startBooking(b)}
                      >
                        Записаться
                      </GlowButton>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-[500px]">
              <CityMap
                submittedKey={submittedKey}
                onBooking={(c: CityMapLocation) =>
                  startBooking({
                    city: c.name,
                    address: c.address,
                    phone: c.phone,
                  })
                }
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {booking && (
        <BookingForm
          city={booking.city}
          address={booking.address}
          phone={booking.phone}
          onClose={() => setBooking(null)}
          onSuccess={() => {
            setSubmittedKey(
              `${booking.city}-${booking.address}`
            );
            setBooking(null);
          }}
        />
      )}
    </>
  );
};
