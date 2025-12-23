import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GlowButton } from "@/components/ui/glow-button";
import { MapPin, MessageCircle, Map } from "lucide-react";
import { CityMap } from "@/components/CityMap";

const cities = [
  "Краснодар",
  "Чебоксары",
  "Осинники Новокузнецк",
  "Петропавловск Казахстан",
  "Уфа",
  "Иркутск",
  "Набережные Челны",
  "Новосибирск",
  "Тюмень",
  "Екатеринбург",
  "Электросталь",
  "Хабаровск",
  "Самара",
  "Ижевск",
  "Глазов",
  "Киров",
  "Ухта",
  "Стерлитамак",
  "Ханты-Мансийск",
  "Щёлково, Мос. Обл. Село Петровское",
  "Санкт-Петербург",
  "Казань",
  "Сургут",
  "Челябинск",
  "Нижнеудинск Иркутская обл.",
  "Улан-Удэ",
  "Новороссийск",
  "Махачкала",
  "Евпатория",
  "Пермь",
  "Барнаул",
  "Когалым"
];

interface CitiesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CitiesModal = ({ open, onOpenChange }: CitiesModalProps) => {
  const [showMap, setShowMap] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            География работы H2PRO
          </DialogTitle>
          <DialogDescription>
            Наши партнёры-установщики работают в 33 городах СНГ
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex gap-2 mb-4">
          <GlowButton
            variant={!showMap ? "primary" : "outline"}
            size="sm"
            onClick={() => setShowMap(false)}
            className="flex-1"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Список городов
          </GlowButton>
          <GlowButton
            variant={showMap ? "primary" : "outline"}
            size="sm"
            onClick={() => setShowMap(true)}
            className="flex-1"
          >
            <Map className="w-4 h-4 mr-2" />
            Карта
          </GlowButton>
        </div>
        
        {!showMap ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {cities.map((city, index) => (
            <div
              key={index}
              onClick={() => setSelectedCity(selectedCity === city ? null : city)}
              className="cursor-pointer"
            >
              <div
                className={`flex flex-col gap-2 p-3 rounded-lg bg-background-secondary border transition-all ${
                  selectedCity === city 
                    ? 'border-primary shadow-lg' 
                    : 'border-border hover:border-primary'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground font-medium">{city}</span>
                </div>
                {selectedCity === city && (
                  <GlowButton
                    variant="primary"
                    size="sm"
                    className="w-full animate-fade-in"
                    asChild
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenChange(false);
                    }}
                  >
                    <a href="/#contacts">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Записаться
                    </a>
                  </GlowButton>
                )}
              </div>
            </div>
          ))}
        </div>
        ) : (
          <div className="mb-6">
            <CityMap onClose={() => onOpenChange(false)} />
          </div>
        )}
        
        <div className="border-t border-border pt-6">
          <GlowButton 
            variant="hero" 
            size="lg" 
            className="w-full"
            asChild
          >
            <a href="/#contacts">
              <MessageCircle className="w-5 h-5 mr-2" />
              Записаться на установку
            </a>
          </GlowButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
