import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GlowButton } from "@/components/ui/glow-button";
import { MapPin, Phone, Map } from "lucide-react";
import { CityMap } from "@/components/CityMap";
import { BookingFormPortal } from "@/components/BookingFormPortal";

const branches = [
  { city: "Краснодар", address: "ул. Красная, 120", phone: "+7 (900) 123-45-67" },
  { city: "Краснодар", address: "ул. Дальняя, 4", phone: "+7 (900) 765-43-21" },
  { city: "Чебоксары", address: "пр. Ленина, 25", phone: "+7 (917) 111-22-33" },
];

export const CitiesModal = ({ open, onOpenChange }: any) => {
  const [view, setView] = useState<"list" | "map">("list");
  const [booking, setBooking] = useState<any>(null);
  const [submittedKey, setSubmittedKey] = useState<string | null>(null);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
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
                onBooking={(city) => setBooking(city)}
                submittedKey={submittedKey}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {booking && (
        <BookingFormPortal
          title={booking.city ?? booking.name}
          address={booking.address}
          phone={booking.phone}
          onClose={() => setBooking(null)}
          onSuccess={() => {
            setSubmittedKey(
              `${booking.city ?? booking.name}-${booking.address}`
            );
            setBooking(null);
          }}
        />
      )}
    </>
  );
};
