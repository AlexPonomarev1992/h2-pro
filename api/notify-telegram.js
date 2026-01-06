// api/notify-telegram.js
// Этот файл нужно создать в папке /api/ вашего проекта

export default async function handler(req, res) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { telegramId, city, address, clientName, clientPhone, carBrand } = req.body;
  
  // Проверяем обязательные поля
  if (!telegramId || !city || !clientName) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['telegramId', 'city', 'clientName']
    });
  }

  // Получаем токен бота из переменных окружения
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!BOT_TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN is not set in environment variables');
    return res.status(500).json({ error: 'Bot token not configured' });
  }

  // Формируем красивое сообщение
  const message = `🔔 <b>Новая заявка на установку!</b>

📍 <b>Город:</b> ${city}
🏢 <b>Сервис:</b> ${address || 'не указан'}

👤 <b>Клиент:</b> ${clientName}
📞 <b>Телефон:</b> ${clientPhone || 'не указан'}
🚗 <b>Автомобиль:</b> ${carBrand || 'не указан'}

⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

  try {
    // Отправляем сообщение через Telegram Bot API
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramId,
          text: message,
          parse_mode: 'HTML'
        })
      }
    );

    const data = await response.json();
    
    if (!data.ok) {
      console.error('Telegram API error:', data);
      throw new Error(data.description || 'Failed to send Telegram message');
    }

    return res.status(200).json({ 
      success: true,
      message: 'Notification sent successfully'
    });
    
  } catch (error) {
    console.error('Telegram notification error:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to send notification'
    });
  }
}

// Для локальной разработки можно добавить CORS
export const config = {
  api: {
    bodyParser: true,
  },
};
