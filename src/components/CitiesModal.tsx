import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GlowButton } from "@/components/ui/glow-button";
import { CityMap } from "@/components/CityMap";
import { BookingForm } from "@/components/BookingFormPortal";

const branches = [
  { city: "Грузия, г.Кутаиси", address: "ул.Эристави, 2 переулок, дом 2 т.", phone: "995597820023", telegramId: "53364728" },
  { city: "Евпатория", address: "ул. Дмитрия Ульянова 92", phone: "+7 (978) 685-14-76", telegramId: "5279470366" },
  { city: "Екатеринбург", address: "ул. Артинская, 24", phone: "+7 (922) 181-43-58", telegramId: "955435796" },
  { city: "Екатеринбург", address: "10-ая Самородная, д. 5, помещение 11", phone: "8-800-350-28-47", telegramId: "798903140" },
  { city: "Иркутск", address: "ул. Ширямова, 2в", phone: "+7 (924) 606-05-08", telegramId: "763565170" },
  { city: "Иркутск", address: "Иркутская область", phone: "+7 (924) 604-80-00", telegramId: "266883093" },
  { city: "Иркутск", address: "Иркутск", phone: "+7 (908) 779-99-96", telegramId: "5304518224" },
  { city: "Казань", address: "ул. Михаила Миля, 1/9", phone: "+7 (987) 223-97-76", telegramId: "7704973682" },
  { city: "Казань", address: "ул. Патриса Лумумбы, 61", phone: "+7 (919) 682-84-46", telegramId: "" },
  { city: "Кемерово", address: "Выезд", phone: "+79039850324", telegramId: "1893902933" },
  { city: "Краснодар", address: "ул. Куренная, 7", phone: "+7 (967) 309-16-19", telegramId: "1959086300" },
  { city: "Ленинск- Кузнецк", address: "Выезд", phone: "+79039850324", telegramId: "1893902933" },
  { city: "Луганск (ЛНР)", address: "ул. 26 Бакинских комиссаров, 126Б", phone: "79592660150", telegramId: "5297447550" },
  { city: "Луганск (ЛНР)", address: "ул. 30 лет победы, 45", phone: "79592660150", telegramId: "5297447550" },
  { city: "Магнитогорск", address: "ул. Люгарина, 128", phone: "+7 (967) 867-00-00", telegramId: "5483054" },
  { city: "Махачкала", address: "просп. Али-Гаджи Акушинского, 88. Автосервис PitStop", phone: "+7 (989) 871-87-00", telegramId: "8423657334" },
  { city: "Махачкала", address: "ул. Космодромная, 64", phone: "+7 (906) 222-74-81", telegramId: "5206721475" },
  { city: "Московская область, Климовск", address: "м-он ул. Серпуховская, 1", phone: "79852428555", telegramId: "1477552859" },
  { city: "Набережные Челны", address: "40 лет Победы, 72Б, 45 бокс", phone: "+7 (927) 456-38-88", telegramId: "343148963" },
  { city: "Назрань", address: "ул. Асият Тутаевой, 65", phone: "+7 (928) 699-59-77", telegramId: "5752924871" },
  { city: "Нальчик", address: "ул. Ахохова 167а", phone: "+7 (938) 077-11-22", telegramId: "1217057167" },
  { city: "Новокузнецк", address: "ул. Тореза, 123Б", phone: "+7 (904) 379-40-38", telegramId: "5931774035" },
  { city: "Новокузнецк", address: "ул. Полевая, 29", phone: "+7 (923) 633-96-53", telegramId: "" },
  { city: "Новоузенск", address: "Улица Комбрига Шилина, 12", phone: "+7 (903) 045-15-11", telegramId: "1650806364" },
  { city: "Орск, Оренбургская область", address: "улица Левитана, 3", phone: "+7 79058487771", telegramId: "971471372" },
  { city: "Осинники", address: "проезд Магистральный, 10", phone: "+7 (905) 967-19-38", telegramId: "1893902933" },
  { city: "Пермь", address: "ул. Промышленная, 76", phone: "+7 (902) 839-50-70", telegramId: "1061659897" },
  { city: "Прокопьевск", address: "ул. Есенина, 5, терраса-2, Гараж-17а", phone: "8-950-267-62-33", telegramId: "8466548973" },
  { city: "Самара", address: "Ракитовское шоссе, 90а", phone: "+7 (937) 201-49-49", telegramId: "286734596" },
  { city: "Самовец", address: "ул. Советская, 23г", phone: "+7 (920) 544-47-46", telegramId: "1430838538" },
  { city: "Санкт-Петербург", address: "Ломоносов, гаражи КАС-9", phone: "89117724900", telegramId: "1304289325" },
  { city: "Саратовская область, рп. Татищево", address: "улица Лапшова 68/2", phone: "+79020422125", telegramId: "1197528943" },
  { city: "Симферополь", address: "СНТ Ивушка, ул. Озерная, 56", phone: "79787344198", telegramId: "514485300" },
  { city: "Сургут", address: "Базовая 7 строение 8", phone: "89227978222", telegramId: "5269039730" },
  { city: "Сургут", address: "ул. Щепеткина, 54/1", phone: "89227978222", telegramId: "5269039730" },
  { city: "Ташкент", address: "Узбекистан", phone: "998 91 192 99 23", telegramId: "3961733" },
  { city: "Таштагол", address: "Выезд", phone: "+79039850324", telegramId: "1893902933" },
  { city: "Томск", address: "ул. Герцена, 61 стр. 1", phone: "+7 (983) 232-00-04", telegramId: "8496366363" },
  { city: "Тюмень", address: "ул. Физкультурная 40", phone: "+7 (922) 254-62-26", telegramId: "1082092676" },
  { city: "Тюмень", address: "СНТ Солнечная поляна, ул. Вишневая, 77", phone: "79963221026", telegramId: "497994250" },
  { city: "Улан-Удэ", address: "пр. Строителей, 72", phone: "+7 (924) 395-45-35", telegramId: "647317841" },
  { city: "Челябинск", address: "ул. Туруханская, 47а", phone: "+7 (982) 276-42-44", telegramId: "1033967347" },
  { city: "Шумерля", address: "ул. Богдана Хмельницкого, 59", phone: "+7 (960) 309-55-57", telegramId: "478390513" },
  { city: "Электросталь", address: "ул. Красная, 11 (Сервис S-LINE)", phone: "+7 (901) 797-01-41", telegramId: "6172146992" }
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
                onBooking={(c: any) =>
                  startBooking({
                    city: c.name,
                    address: c.address,
                    phone: c.phone,
                    telegramId: c.telegramId,
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
            onOpenChange(true);
          }}
        />
      )}
    </>
  );
};
