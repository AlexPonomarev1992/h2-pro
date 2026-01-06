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
  { city: "Электросталь", address: "ул. Красная, 11 (Сервис S-LINE)", phone: "+7 (901) 797-01-41", telegramId: "6172146992" },
  { city: "Набережные Челны", address: "40 лет Победы, 72Б, 45 бокс", phone: "+7 (927) 456-38-88", telegramId: "343148963" },
  { city: "Магнитогорск", address: "ул. Люгарина, 128", phone: "+7 (967) 867-00-00", telegramId: "5483054" },
  { city: "Санкт-Петербург", address: "Ломоносов, гаражи КАС-9", phone: "+7 (911) 772-49-01", telegramId: "1304289325" },
  { city: "Махачкала", address: "пр. Казбекова, 84", phone: "+7 (989) 871-87-00", telegramId: "8423657334" },
  { city: "Самара", address: "Ракитовское шоссе, 90а", phone: "+7 (937) 201-49-49", telegramId: "286734596" },
  { city: "Иркутск", address: "ул. Ширямова, 2в", phone: "+7 (924) 606-05-08", telegramId: "" },
  { city: "Тюмень", address: "Частный гараж", phone: "+7 (922) 254-62-26", telegramId: "1082092676" },
  { city: "Екатеринбург", address: "ул. Артинская, 24", phone: "+7 (922) 181-43-58", telegramId: "955435796" },
  { city: "Краснодар", address: "ул. Дмитрия Ульянова, 92", phone: "+7 (978) 685-14-76", telegramId: "" },
  { city: "Пермь", address: "ул. Промышленная, 76", phone: "+7 (902) 839-50-70", telegramId: "1061659897" },
  { city: "Краснодар", address: "ул. Куренная, 7", phone: "+7 (967) 309-16-19", telegramId: "1959086300" },
  { city: "Иркутск", address: "Иркутская область", phone: "+7 (924) 604-80-00", telegramId: "266883093" },
  { city: "Иркутск", address: "Иркутск", phone: "+7 (908) 779-99-96", telegramId: "5304518224" },
  { city: "Осинники", address: "проезд Магистральный, 10", phone: "+7 (905) 967-19-38", telegramId: "1893902933" },
  { city: "Улан-Удэ", address: "пр. Строителей, 72", phone: "+7 (924) 395-45-35", telegramId: "647317841" },
  { city: "Новокузнецк", address: "ул. Тореза, 123Б", phone: "+7 (904) 379-40-38", telegramId: "" },
  { city: "Новокузнецк", address: "ул. Полевая, 29", phone: "+7 (923) 633-96-53", telegramId: "" },
  { city: "Казань", address: "ул. Михаила Миля, 1/9", phone: "+7 (987) 223-97-76", telegramId: "7704973682" },
  { city: "Казань", address: "ул. Патриса Лумумбы, 61", phone: "+7 (919) 682-84-46", telegramId: "" },
  { city: "Челябинск", address: "ул. Туруханская, 47а", phone: "+7 (982) 276-42-44", telegramId: "1033967347" },
  { city: "Томск", address: "ул. Герцена, 61 стр. 1", phone: "+7 (983) 232-00-04", telegramId: "" },
  { city: "Махачкала", address: "ул. Космодромная, 64", phone: "+7 (906) 222-74-81", telegramId: "" },
  { city: "Вичуга", address: "Ивановская область", phone: "+7 (980) 685-03-51", telegramId: "" },
  { city: "Самовец", address: "ул. Советская, 23г", phone: "+7 (920) 544-47-46", telegramId: "" },
  { city: "Назрань", address: "ул. Асият Тутаевой, 65", phone: "+7 (928) 699-59-77", telegramId: "5752924871" },
  { city: "Шумерля", address: "ул. Богдана Хмельницкого, 59", phone: "+7 (960) 309-55-57", telegramId: "" }
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
          telegramId={booking.telegramId}
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
