import React from 'react';

const SEOSchema = () => {
  // Organization Schema
  const organizationSchema = {
    "@type": "Organization",
    "@id": "https://h2pro.ru/#organization",
    "name": "H2PRO",
    "url": "https://h2pro.ru",
    "logo": {
      "@type": "ImageObject",
      "url": "https://h2pro.ru/assets/h2pro-logo.png",
      "width": "250",
      "height": "100"
    },
    "description": "Производство и продажа водородных генераторов для автомобилей. Экономия топлива до 45%. Официальный производитель HHO систем в России и СНГ.",
    "email": "h2profficial@gmail.com",
    "telephone": "+7-909-853-04-68",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RU"
    }
  };

  // LocalBusiness Schema
  const localBusinessSchema = {
    "@type": "LocalBusiness",
    "@id": "https://h2pro.ru/#localbusiness",
    "name": "H2PRO - Водородные генераторы для экономии топлива",
    "image": "https://h2pro.ru/assets/h2pro-logo.png",
    "telephone": "+7-909-853-04-68",
    "email": "h2profficial@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RU"
    },
    "priceRange": "63000-137000 RUB",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  // Products Data
  const products = [
    {
      id: 1,
      name: "Compact 90",
      description: "Водородный генератор для легковых автомобилей с объемом двигателя до 2 литров. Экономия топлива до 20%.",
      price: 63000,
      image: "/lovable-uploads/df392fd9-4a6c-4c1b-9aa0-b84b2d8aadf8.png",
      features: ["Экономия топлива до 20%", "Простая установка", "Гарантия 1 год"],
      dimensions: "250 мм × 71 мм × 160 мм"
    },
    {
      id: 2,
      name: "Standard 120",
      description: "Универсальное решение для автомобилей с объемом двигателя от 2-6 литров. Экономия топлива до 15%.",
      price: 84000,
      image: "/lovable-uploads/5e8d3917-74cb-49f9-9993-525e9e23b0fe.png",
      features: ["Экономия топлива до 15%", "Простая установка", "Гарантия 1 год"],
      dimensions: "280 мм × 90 мм × 170 мм"
    },
    {
      id: 3,
      name: "Professional 240",
      description: "Для грузового и промышленного оборудования с объемом от 6-12 литров. Экономия топлива до 45%.",
      price: 137000,
      image: "/lovable-uploads/1adb3232-56ab-43eb-aeec-e6ac97a48c99.png",
      features: ["Экономия топлива до 45%", "Простая установка", "Гарантия 1 год"],
      dimensions: "280 мм × 200 мм × 170 мм"
    }
  ];

  // Product Schemas
  const productSchemas = products.map((product) => ({
    "@type": "Product",
    "@id": `https://h2pro.ru/#product-${product.id}`,
    "name": `H2PRO ${product.name}`,
    "description": product.description,
    "image": `https://h2pro.ru${product.image}`,
    "brand": {
      "@type": "Brand",
      "name": "H2PRO"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://h2pro.ru/#products",
      "priceCurrency": "RUB",
      "price": product.price,
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "H2PRO"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Габариты",
        "value": product.dimensions
      },
      {
        "@type": "PropertyValue",
        "name": "Экономия топлива",
        "value": product.features[0]
      },
      {
        "@type": "PropertyValue",
        "name": "Гарантия",
        "value": product.features[2]
      }
    ]
  }));

  // FAQ Schema
  const faqSchema = {
    "@type": "FAQPage",
    "@id": "https://h2pro.ru/#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Как работает водородный генератор H2PRO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Водородный генератор H2PRO работает так: внутри электролизёра вода распадается на водород и кислород под действием электрического тока. Эта смесь газов (HHO) подаётся в двигатель через воздухозаборник. Водород повышает октановое число топлива, улучшает его сгорание и увеличивает мощность двигателя. В результате расход бензина или дизеля снижается, а мотор работает чище и эффективнее."
        }
      },
      {
        "@type": "Question",
        "name": "Насколько реально экономится топливо?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Экономия топлива зависит от модели генератора и типа автомобиля. Compact 90 даёт до 20% экономии на легковых авто, Standard 120 – до 15% на универсальных машинах, а Professional 240 – до 45% на грузовиках и спецтехнике. Точные цифры зависят от вашего стиля вождения, объёма двигателя и режима эксплуатации."
        }
      },
      {
        "@type": "Question",
        "name": "Безопасна ли установка водородного генератора?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, система абсолютно безопасна. Водород вырабатывается в малых количествах и сразу же используется двигателем — не накапливается в баке. Генератор работает от бортовой сети 12/24 В, что исключает риски. Все наши устройства имеют сертификаты соответствия и прошли лабораторные испытания."
        }
      },
      {
        "@type": "Question",
        "name": "Требуется ли специальное обслуживание?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Обслуживание минимальное. Раз в 2-3 недели нужно доливать дистиллированную воду и периодически проверять чистоту фильтров. Никаких сложных процедур, всё можно сделать самому за пару минут."
        }
      },
      {
        "@type": "Question",
        "name": "Можно ли установить на любой автомобиль?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, водородные генераторы H2PRO подходят для большинства автомобилей: легковых, внедорожников, грузовиков, автобусов и спецтехники. Главное — правильно подобрать модель под объём двигателя."
        }
      },
      {
        "@type": "Question",
        "name": "Как быстро окупается система?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Срок окупаемости зависит от пробега. Если вы ездите много (например, такси или грузоперевозки), система окупится за 6-12 месяцев. При среднем пробеге — за 1,5-2 года. Чем больше ездите, тем быстрее возвращаются вложения."
        }
      },
      {
        "@type": "Question",
        "name": "Влияет ли система на гарантию автомобиля?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Нет, установка генератора не нарушает заводскую гарантию, если она выполнена профессионально. Система работает как дополнительный узел и не изменяет конструкцию двигателя. Мы рекомендуем ставить её в сертифицированных центрах."
        }
      },
      {
        "@type": "Question",
        "name": "Какой срок службы у генератора?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "При правильном использовании и регулярном обслуживании водородный генератор H2PRO служит 5-7 лет и более. Некоторые компоненты (например, электроды) можно заменить, продлевая срок эксплуатации."
        }
      },
      {
        "@type": "Question",
        "name": "Можно ли установить систему на новый автомобиль?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, систему можно установить и на новый автомобиль. Она не требует вмешательства в конструкцию и работает как дополнительный узел, не влияя на гарантию завода. При этом двигатель получает более чистое сгорание топлива, что снижает износ уже с первых километров."
        }
      },
      {
        "@type": "Question",
        "name": "Можно ли приобрести в рассрочку?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, мы работаем с агрегатором inPocket, который отправляет заявку на одобрение сразу в несколько банков. После заявки с вами свяжется менеджер для уточнения деталей."
        }
      },
      {
        "@type": "Question",
        "name": "Сколько стоит установка и обслуживание?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Установка и обслуживание зависят от типа вашего автомобиля - легковой, грузовой или спецтехника. Сама система не требует сложного сервиса: достаточно доливать воду и иногда проверять фильтры. А вот точный расчёт стоимости именно для вашей машины можно узнать через наш калькулятор - он сразу покажет цену установки и будущую экономию."
        }
      }
    ]
  };

  // ItemList Schema
  const itemListSchema = {
    "@type": "ItemList",
    "@id": "https://h2pro.ru/#products-list",
    "name": "Водородные генераторы H2PRO",
    "description": "Линейка водородных генераторов для автомобилей",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "@id": `https://h2pro.ru/#product-${product.id}`,
        "name": `H2PRO ${product.name}`,
        "url": "https://h2pro.ru/#products"
      }
    }))
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": "https://h2pro.ru/#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://h2pro.ru/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Продукты",
        "item": "https://h2pro.ru/#products"
      }
    ]
  };

  // WebSite Schema
  const websiteSchema = {
    "@type": "WebSite",
    "@id": "https://h2pro.ru/#website",
    "url": "https://h2pro.ru",
    "name": "H2PRO - Водородные генераторы для экономии топлива",
    "description": "Водородные генераторы H2PRO для автомобилей. Экономия топлива до 45%. Установка в 33 городах СНГ. Гарантия качества.",
    "publisher": {
      "@id": "https://h2pro.ru/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://h2pro.ru/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Combine all schemas using @graph
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      localBusinessSchema,
      websiteSchema,
      ...productSchemas,
      faqSchema,
      itemListSchema,
      breadcrumbSchema
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 0)
      }}
    />
  );
};

export default SEOSchema;
