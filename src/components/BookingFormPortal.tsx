import { GlowButton } from "@/components/ui/glow-button";
import { useState } from "react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Защита от повторной отправки
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    const fd = new FormData(e.currentTarget);

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

      // 3. Работа с Telegram
      const BOT_TOKEN = "8428469179:AAGA6K_qz0IjDUS6w9LCEY6lrYddz1P1JGA";
      const ADMIN_ID = "7934547575";
      
      const message = `🔔 <b>Новая заявка на установку!</b>\n\n` +
                      `📍 <b>Город:</b> ${city}\n` +
                      `🏢 <b>Сервис:</b> ${address}\n\n` +
                      `👤 <b>Клиент:</b> ${fd.get("name")}\n` +
                      `📞 <b>Телефон:</b> ${fd.get("phone")}\n` +
                      `🚗 <b>Автомобиль:</b> ${fd.get("carBrand")}\n\n` +
                      `⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

      // Функция для отправки
      const sendTg = async (chatId: string) => {
        try {
          const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: 'HTML'
            })
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (err) {
          console.error(`Ошибка отправки на ${chatId}:`, err);
        }
      };

      // Отправляем только один раз - либо ответственному, либо админу
      if (telegramId && telegramId !== ADMIN_ID) {
        await sendTg(telegramId);
        // Дублируем админу
        await sendTg(ADMIN_ID);
      } else {
        // Если нет ответственного или это сам админ - отправляем только админу
        await sendTg(ADMIN_ID);
      }

      onSuccess();
    } catch (error) {
      console.error("Критическая ошибка:", error);
      alert("Произошла ошибка. Попробуйте еще раз.");
      setIsSubmitting(false); // Разблокируем кнопку только при ошибке
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <form
        className="bg-[#0B121B] border border-[#00f0ff]/30 rounded-xl w-full max-w-md p-6"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl font-bold text-[#00f0ff] mb-4">Запись на установку</h3>

        <div className="space-y-3 mb-4 text-sm text-gray-400">
          <div><span className="text-white font-semibold">Город:</span> {city}</div>
          <div><span className="text-white font-semibold">Адрес:</span> 📍 {address}</div>
        </div>

        <input 
          name="name" 
          required 
          placeholder="Ваше имя" 
          className="w-full mb-3 p-3 bg-[#0F1621] border border-[#00f0ff]/20 rounded text-white focus:border-[#00f0ff] outline-none"
          disabled={isSubmitting}
        />
        <input 
          name="phone" 
          required 
          type="tel" 
          placeholder="+7 (999) 000-00-00" 
          className="w-full mb-3 p-3 bg-[#0F1621] border border-[#00f0ff]/20 rounded text-white focus:border-[#00f0ff] outline-none"
          disabled={isSubmitting}
        />
        <input 
          name="carBrand" 
          required 
          placeholder="Марка автомобиля" 
          className="w-full mb-4 p-3 bg-[#0F1621] border border-[#00f0ff]/20 rounded text-white focus:border-[#00f0ff] outline-none"
          disabled={isSubmitting}
        />

        <div className="flex gap-3">
          <GlowButton 
            type="submit" 
            className="flex-1" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправка..." : "Отправить заявку"}
          </GlowButton>
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50"
            disabled={isSubmitting}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};
