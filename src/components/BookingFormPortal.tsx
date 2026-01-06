import { GlowButton } from "@/components/ui/glow-button";

interface BookingFormProps {
  city: string;
  address: string;
  phone: string;
  telegramId?: string;
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

          try {
            // Создаем контакт
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

            // Создаем сделку с дополнительными данными
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
                    COMMENTS: `Город: ${city}\nАдрес сервиса: ${address}\nТелефон сервиса: ${phone}\nМарка авто: ${fd.get("carBrand")}`,
                    SOURCE_ID: "WZda1ec0cc-c091-4839-9864-0b6bbd1b21bf",
                  },
                }),
              }
            );

            onSuccess();
          } catch (error) {
            console.error("Ошибка отправки:", error);
            alert("Произошла ошибка. Попробуйте еще раз.");
          }
        }}
      >
        <h3 className="text-xl font-bold text-[#00f0ff] mb-4">
          Запись на установку
        </h3>

        <div className="space-y-3 mb-4">
          <div className="text-sm text-gray-400">
            <span className="text-white font-semibold">Город:</span> {city}
          </div>
          <div className="text-sm text-gray-400">
            <span className="text-white font-semibold">Адрес:</span> 📍 {address}
          </div>
        </div>

        <input
          name="name"
          required
          placeholder="Ваше имя"
          className="w-full mb-3 p-3 bg-[#0F1621] border border-[#00f0ff]/20 rounded text-white placeholder:text-gray-500 focus:border-[#00f0ff] focus:outline-none transition-colors"
        />

        <input
          name="phone"
          required
          type="tel"
          placeholder="+7 (999) 000-00-00"
          className="w-full mb-3 p-3 bg-[#0F1621] border border-[#00f0ff]/20 rounded text-white placeholder:text-gray-500 focus:border-[#00f0ff] focus:outline-none transition-colors"
        />

        <input
          name="carBrand"
          required
          placeholder="Марка автомобиля (например: Toyota Camry)"
          className="w-full mb-4 p-3 bg-[#0F1621] border border-[#00f0ff]/20 rounded text-white placeholder:text-gray-500 focus:border-[#00f0ff] focus:outline-none transition-colors"
        />

        <div className="flex gap-3">
          <GlowButton type="submit" className="flex-1">
            Отправить заявку
          </GlowButton>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};
