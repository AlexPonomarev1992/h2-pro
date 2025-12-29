import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GlowButton } from "@/components/ui/glow-button";
import { MapPin, Phone } from "lucide-react";
import { CityMap } from "@/components/CityMap";

const branches = [
  { name: "Краснодар", address: "ул. Красная, 120", phone: "+7 (900) 123-45-67" },
  { name: "Краснодар", address: "ул. Дальняя, 4", phone: "+7 (900) 765-43-21" },
  { name: "Чебоксары", address: "пр. Ленина, 25", phone: "+7 (917) 111-22-33" },
];

export const CitiesModal = ({ open, onOpenChange }: any) => {
  const [bookingBranch, setBookingBranch] = useState<any>(null);
  const [submittedKey, setSubmittedKey] = useState<string | null>(null);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-[#0B121B] text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#00f0ff] flex gap-2">
              <MapPin /> Города присутствия
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {branches.map((b, i) => {
              const key = `${b.name}-${b.address}`;
              const submitted = submittedKey === key;

              return (
                <div key={i} className="p-4 bg-[#161F30] rounded-lg flex justify-between items-center">
                  <div>
                    <b>{b.name}</b>
                    <div className="text-sm text-gray-400">📍 {b.address}</div>
                    <div className="text-sm">
                      <Phone className="inline w-3 h-3" />{" "}
                      {submitted ? b.phone : "+7 (XXX) XXX-XX-XX"}
                    </div>
                  </div>

                  {submitted ? (
                    <div className="text-[#00f0ff] font-bold">Запись создана</div>
                  ) : (
                    <GlowButton size="sm" onClick={() => setBookingBranch(b)}>
                      Записаться
                    </GlowButton>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 h-[400px] rounded-lg overflow-hidden border">
            <CityMap />
          </div>
        </DialogContent>
      </Dialog>

      {bookingBranch && (
        <BookingForm
          branch={bookingBranch}
          onClose={() => setBookingBranch(null)}
          onSuccess={() => {
            setSubmittedKey(`${bookingBranch.name}-${bookingBranch.address}`);
            setBookingBranch(null);
          }}
        />
      )}
    </>
  );
};

function BookingForm({ branch, onClose, onSuccess }: any) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <form
        className="bg-[#0B121B] p-6 rounded-xl w-full max-w-md border border-[#00f0ff]/30"
        onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);

          const contact = await fetch("https://h2pro.bitrix24.ru/rest/1/xmv4aig8i7ug15lw/crm.contact.add.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fields: { NAME: fd.get("name"), PHONE: [{ VALUE: fd.get("phone"), VALUE_TYPE: "WORK" }] },
            }),
          }).then(r => r.json());

          await fetch("https://h2pro.bitrix24.ru/rest/1/xmv4aig8i7ug15lw/crm.deal.add.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fields: {
                TITLE: `Заявка: ${branch.name}`,
                CONTACT_ID: contact.result,
                CATEGORY_ID: 9,
                COMMENTS: `Адрес: ${branch.address}`,
              },
            }),
          });

          onSuccess();
        }}
      >
        <h3 className="text-xl font-bold text-[#00f0ff] mb-4">Запись: {branch.name}</h3>
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
