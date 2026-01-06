import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GlowButton } from "@/components/ui/glow-button";
import { CityMap, CityMapLocation } from "@/components/CityMap";
import { BookingForm } from "@/components/BookingFormPortal";

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
  const [submittedBranches, setSubmittedBranches] = useState<Set<string>>(new Set());

  const startBooking = (b: any) => {
    onOpenChange(false);
    setTimeout(() => setBooking(b), 0);
  };

  const getBranchKey = (b: any) => `${b.city}-${b.address}`;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-[#0B121B] text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#00f0ff] text-2xl">
              География работы
            </DialogTitle>
          </DialogHeader>

          <div className="flex gap-2 mb-4">
            <GlowButton
              size="sm"
              variant={view === "list" ? "primary" : "outline"}
              onClick={() => setView("list")}
            >
              📋 Список
            </GlowButton>
            <GlowButton
              size="sm"
              variant={view === "map" ? "primary" : "outline"}
              onClick={() => setView("map")}
            >
              🗺️ Карта
            </GlowButton>
          </div>

          {view === "list" ? (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {branches.map((b, i) => {
                const key = getBranchKey(b);
                const submitted = submittedBranches.has(key);

                return (
                  <div
                    key={i}
                    className="p-4 bg-[#161F30] rounded-lg border border-[#00f0ff]/10 hover:border-[#00f0ff]/30 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-[#00f0ff] mb-2">
                          {b.city}
                        </h4>
                        <div className="text-sm text-gray-300 mb-1">
                          📍 {b.address}
                        </div>
                        <div className="text-sm text-gray-300">
                          📞 {submitted ? (
                            <a href={`tel:${b.phone}`} className="text-[#00f0ff] hover:underline">
                              {b.phone}
                            </a>
                          ) : (
                            <span className="text-gray-500">+7 (XXX) XXX-XX-XX</span>
                          )}
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        {submitted ? (
                          <div className="text-center">
                            <div className="text-[#00f0ff] font-bold mb-1">
                              ✅ Заявка отправлена
                            </div>
                            <div className="text-xs text-gray-400">
                              Контакты открыты
                            </div>
                          </div>
                        ) : (
                          <GlowButton
                            size="sm"
                            onClick={() => startBooking(b)}
                          >
                            Записаться
                          </GlowButton>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-[500px] rounded-lg overflow-hidden">
              <CityMap
                submittedBranches={submittedBranches}
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
            const key = getBranchKey(booking);
            setSubmittedBranches(prev => new Set(prev).add(key));
            setBooking(null);
            // Открываем модальное окно снова, чтобы показать контакты
            onOpenChange(true);
          }}
        />
      )}
    </>
  );
};
