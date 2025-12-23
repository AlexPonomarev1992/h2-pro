import React, { memo, useCallback, useMemo } from "react";
import ProductCard from "@/components/ProductCard";

const ProductsSection = memo(() => {
  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contacts');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, []);
  const products = useMemo(() => [{
    id: 1,
    name: "Compact 90",
    description: "Для легковых автомобилей с объемом двигателя до 2 литров",
    price: "63 000 ₽",
    priceValue: 63000,
    afterPrice: "Установка 15 000 ₽",
    image: "/lovable-uploads/df392fd9-4a6c-4c1b-9aa0-b84b2d8aadf8.png",
    features: ["Экономия топлива до 20%", "Простая установка", "Гарантия 1 год"],
    dimensions: "250 мм × 71 мм × 160 мм",
    popular: false
  }, {
    id: 2,
    name: "Standard 120",
    description: "Универсальное решение для автомобилей с объемом двигателя от 2-6 литров",
    price: "84 000 ₽",
    priceValue: 84000,
    afterPrice: "Установка 15 000 ₽",
    image: "/lovable-uploads/5e8d3917-74cb-49f9-9993-525e9e23b0fe.png",
    features: ["Экономия топлива до 15%", "Простая установка", "Гарантия 1 год"],
    dimensions: "280 мм × 90 мм × 170 мм",
    popular: true
  }, {
    id: 3,
    name: "Professional 240",
    description: "Для грузового и промышленного оборудования с объемом от 6-12 литров",
    price: "137 000 ₽",
    priceValue: 137000,
    afterPrice: "Установка 30 000 ₽",
    image: "/lovable-uploads/1adb3232-56ab-43eb-aeec-e6ac97a48c99.png",
    features: ["Экономия топлива до 45%", "Простая установка", "Гарантия 1 год"],
    dimensions: "280 мм × 200 мм × 170 мм",
    popular: false
  }], []);
  return (
    <section className="w-full py-20 bg-transparent relative overflow-hidden" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Наши продукты
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Водородные генераторы для любого типа транспорта
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onOrderClick={scrollToContact}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

ProductsSection.displayName = 'ProductsSection';

export default ProductsSection;
