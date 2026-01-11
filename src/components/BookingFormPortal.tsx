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
  telegramId,
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

          console.log('📝 Отправка заявки:', {
            city,
            telegramId,
            clientName: fd.get("name"),
          });

          try {
            // 1. Создаем контакт в Битрикс24
            const contactRes = await fetch(
              "https://h2pro.bitrix24.ru/rest/1/xmv4aig8i7ug15lw/crm.contact.add.json",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  fields: {
                    NAME: fd.get("name"),
                    PHONE: [{ VALUE: fd.get("phone"), VALUE_TYPE: "WORK" }],
                  },
                }),
              }
            );
            const contactData = await contactRes.json();
            const contactId = contactData.result;

            // 2. Создаем сделку в Битрикс24
            await fetch(
              "https://h2pro.bitrix24.ru/rest/1/xmv4aig8i7ug15lw/crm.deal.add.json",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  fields: {
                    TITLE: `Заявка: ${city}`,
                    CONTACT_ID: contactId,
                    CATEGORY_ID: 9,
                    COMMENTS: `Город: ${city}\nАдрес: ${address}\nТелефон: ${phone}\nАвто: ${fd.get("carBrand")}\nTG ID: ${telegramId || 'не указан'}`,
                    SOURCE_ID: "WEB",
                  },
                }),
              }
            );

            // 3. Отправляем в Telegram (напрямую)
            if (telegramId) {
              const BOT_TOKEN = "8428469179:AAGA6K_qz0IjDUS6w9LCEY6lrYddz1P1JGA";
              const message = `🔔 <b>Новая заявка на установку!</b>\n\n` +
                              `📍 <b>Город:</b> ${city}\n` +
                              `🏢 <b>Сервис:</b> ${address}\n\n` +
                              `👤 <b>Клиент:</b> ${fd.get("name")}\n` +
                              `📞 <b>Телефон:</b> ${fd.get("phone")}\n` +
                              `🚗 <b>Автомобиль:</b> ${fd.get("carBrand")}\n\n` +
                              `⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

              try {
                const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: telegramId,
                    text: message,
                    parse_mode: 'HTML'
                  })
                });
                const tgData = await tgRes.json();
                if (!tgData.ok) console.error('TG API Error:', tgData.description);
              } catch (tgErr) {
                console.error('TG Network Error:', tgErr);
              }
            }

            onSuccess();
          } catch (error) {
            console.error("Критическая ошибка:", error);
            alert("Произошла ошибка. Попробуйте еще раз.");
          }
        }}
      >
        <h3 className="text-xl font-bold text-[#00f0ff] mb-4">Запись на установку</h3>

        <div className="space-y-3 mb-4 text-sm text-gray-400">
          <div><span className="text-white font-semibold">Город:</span> {city}</div>
          <div><span className="text-white font-semibold">Адрес:</span> 📍 {address}</div>
        </div>

        <input name="name" required placeholder="Ваше имя" className="w-full mb-3 p-3 bg-[#0F1621] border border-[#00f0ff]/20 rounded text-white focus:border-[#00f0ff] outline-none" />
        <input name="phone" required type="tel" placeholder="+7 (999) 000-00-00" className="w-full mb-3 p-3 bg-[#0F1621] border border-[#00f0ff]/20 rounded text-white focus:border-[#00f0ff] outline-none" />
        <input name="carBrand" required placeholder="Марка автомобиля" className="w-full mb-4 p-3 bg-[#0F1621] border border-[#00f0ff]/20 rounded text-white focus:border-[#00f0ff] outline-none" />

        <div className="flex gap-3">
          <GlowButton type="submit" className="flex-1">Отправить заявку</GlowButton>
          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-400 hover:text-white">Отмена</button>
        </div>
      </form>
    </div>
  );
};
