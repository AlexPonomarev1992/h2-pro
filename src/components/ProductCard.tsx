import React, { memo, useState } from 'react';
import { GlowButton } from "@/components/ui/glow-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/ui/ProductImage";
import { Check, Car, Truck, Leaf, Settings, Tractor } from "lucide-react";
import CreditModal from "@/components/CreditModal";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  afterPrice: string;
  image: string;
  features: string[];
  dimensions: string;
  popular: boolean;
}

interface ProductCardProps {
  product: Product;
  index: number;
  onOrderClick: () => void;
}

const ProductCard = memo(({ product, index, onOrderClick }: ProductCardProps) => {
  const [creditModalOpen, setCreditModalOpen] = useState(false);

  const cardClassName = `bg-gradient-card border-border shadow-card-dark hover:shadow-neon transition-all duration-300 hover:scale-105 fade-in relative ${
    product.popular ? 'ring-2 ring-primary' : ''
  }`;

  const engineLabel = product.id === 1 ? 'ДО 2 Л' : product.id === 2 ? '2-6 Л' : '6-12 Л';

  const vehicleIcons = () => {
    if (product.id === 1) {
      return (
        <>
          <Car className="w-6 h-6 text-primary mx-auto mb-1" />
          <span className="text-xs text-muted-foreground">Седан</span>
        </>
      );
    }
    if (product.id === 2) {
      return (
        <>
          <div className="flex justify-center space-x-1 mb-1">
            <Car className="w-5 h-5 text-primary" />
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">Седан/Джип</span>
        </>
      );
    }
    return (
      <>
        <div className="flex justify-center space-x-1 mb-1">
          <Truck className="w-5 h-5 text-primary" />
          <Tractor className="w-5 h-5 text-primary" />
        </div>
        <span className="text-xs text-muted-foreground">Груз/Спецтехника</span>
      </>
    );
  };

  return (
    <Card className={`${cardClassName} h-full flex flex-col`} style={{ animationDelay: `${index * 0.2}s` }}>
      {product.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-button text-primary-foreground px-4 py-1">
          ПОПУЛЯРНЫЙ
        </Badge>
      )}
      
      <CardHeader className="text-center">
        <div className="w-full h-48 mx-auto mb-4 overflow-hidden rounded-lg relative">
          <ProductImage 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute top-2 right-2 bg-gradient-to-r from-primary to-secondary text-background text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            {engineLabel}
          </div>
          <div className="absolute top-12 right-2 bg-gradient-to-r from-primary to-secondary text-background text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            Рассрочка - 0%
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">{product.name}</CardTitle>
        <CardDescription className="text-muted-foreground">{product.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 flex-1">
        {/* Price */}
        <div className="text-center">
          <span className="text-3xl font-bold text-neon-primary">{product.price}</span>
          <p className="text-muted-foreground">без НДС</p>
          <p className="text-muted-foreground">{product.afterPrice}</p>
        </div>

        {/* Key Benefits Icons */}
        <div className="flex justify-center space-x-6 pt-4 border-t border-border">
          <div className="text-center">
            {vehicleIcons()}
          </div>
          <div className="text-center">
            <Leaf className="w-6 h-6 text-secondary mx-auto mb-1" />
            <span className="text-xs text-muted-foreground">Эко</span>
          </div>
          <div className="text-center">
            <Settings className="w-6 h-6 text-primary mx-auto mb-1" />
            <span className="text-xs text-muted-foreground">Надёжность</span>
          </div>
        </div>

        {/* Dimensions */}
        <div className="bg-muted/50 p-3 rounded-lg">
          <h4 className="font-semibold text-foreground mb-2">Габариты:</h4>
          <p className="text-sm text-muted-foreground">{product.dimensions}</p>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Преимущества:</h4>
          <ul className="space-y-2">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="pt-6 mt-auto flex-col gap-3">
        <GlowButton 
          variant={product.popular ? "hero" : "primary"} 
          size="lg" 
          className="w-full text-sm font-medium" 
          onClick={onOrderClick}
        >
          Заказать установку
        </GlowButton>
        <GlowButton 
          variant="outline" 
          size="lg" 
          className="w-full text-sm font-medium" 
          onClick={() => setCreditModalOpen(true)}
        >
          Купить в рассрочку
        </GlowButton>
      </CardFooter>

      <CreditModal
        open={creditModalOpen}
        onOpenChange={setCreditModalOpen}
        productId={product.id}
        productName={product.name}
        productPrice={product.priceValue}
      />
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;