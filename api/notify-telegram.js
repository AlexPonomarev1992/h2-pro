export default async function handler(req, res) {
  // Добавляем CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка preflight запроса
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { telegramId, city, address, clientName, clientPhone, carBrand } = req.body;
  
  console.log('Received request:', { telegramId, city, clientName });
  
  if (!telegramId || !city || !clientName) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      received: { telegramId, city, clientName }
    });
  }

  const BOT_TOKEN = "8428469179:AAGA6K_qz0IjDUS6w9LCEY6lrYddz1P1JGA";
  
  if (!BOT_TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN not set');
    return res.status(500).json({ error: 'Bot token not configured' });
  }

  const message = `🔔 <b>Новая заявка на установку!</b>

📍 <b>Город:</b> ${city}
🏢 <b>Сервис:</b> ${address || 'не указан'}

👤 <b>Клиент:</b> ${clientName}
📞 <b>Телефон:</b> ${clientPhone || 'не указан'}
🚗 <b>Автомобиль:</b> ${carBrand || 'не указан'}

⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

  try {
    console.log('Sending to Telegram, chat_id:', telegramId);
    
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
    
    console.log('Telegram API response:', data);
    
    if (!data.ok) {
      console.error('Telegram API error:', data);
      return res.status(400).json({ 
        error: data.description,
        telegramError: data
      });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Notification sent successfully'
    });
    
  } catch (error) {
    console.error('Error sending notification:', error);
    return res.status(500).json({ 
      error: error.message,
      stack: error.stack
    });
  }
}
