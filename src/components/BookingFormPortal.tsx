import { GlowButton } from "@/components/ui/glow-button";

interface BookingFormProps {
  city: string;
  address: string;
  phone: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const BookingForm = ({
  city,
  address,
  phone,
  onClose,
  onSuccess,
}: BookingFormProps) => {
  return (
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
                    { VALUE: fd.get("phone"), VALUE_TYPE: "WORK" },
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
                  TITLE: `Заявка: ${city}`,
                  CONTACT_ID: contact.result,
                  CATEGORY_ID: 9,
                  COMMENTS: `Адрес: ${address}\nТелефон сервиса: ${phone}`,
                  SOURCE_ID:
                    "WZda1ec0cc-c091-4839-9864-0b6bbd1b21bf",
                },
              }),
            }
          );

          onSuccess();
        }}
      >
        <h3 className="text-xl font-bold text-[#00f0ff] mb-4">
          Запись: {city}
        </h3>

        <div className="text-sm text-gray-400 mb-4">
          📍 {address}
        </div>

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
            onClick={onClose}
            className="text-gray-400"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};
