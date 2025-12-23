import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { GlowButton } from "@/components/ui/glow-button";
import { Calendar, CheckCircle2 } from "lucide-react";

interface CreditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: number;
  productName: string;
  productPrice: number;
}

const CREDIT_LINKS: Record<number, { three: string; six: string }> = {
  1: {
    three: "https://portal.simpleloan.ru/_sl/5FFWAksVUnncmAAjig3yic/",
    six: "https://portal.simpleloan.ru/_sl/PHmy2ohP636hkLx96cgaZ9/"
  },
  2: {
    three: "https://portal.simpleloan.ru/_sl/jDEgZy5FDK7z4sWHHHKhzj/",
    six: "https://portal.simpleloan.ru/_sl/WoJHbixzhXsH7XoapC9ZTw/"
  },
  3: {
    three: "https://portal.simpleloan.ru/_sl/55XHaNzq3hHz6MbZ6qeDS5/",
    six: "https://portal.simpleloan.ru/_sl/PXyNLcmRYdVUUNuQCAHgPB/"
  }
};

const CreditModal: React.FC<CreditModalProps> = ({
  open,
  onOpenChange,
  productId,
  productName,
  productPrice
}) => {
  const [selectedTerm, setSelectedTerm] = useState<'three' | 'six' | ''>('');

  const handleSubmit = () => {
    if (!selectedTerm) return;
    
    const link = CREDIT_LINKS[productId]?.[selectedTerm];
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
      onOpenChange(false);
      setSelectedTerm('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gradient-card border border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
            Оформление рассрочки
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {productName} • Выберите срок рассрочки и подайте заявку онлайн
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Benefits */}
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle2 className="w-4 h-4" />
              <span>Одобрение за 5 минут</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle2 className="w-4 h-4" />
              <span>Без переплаты</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle2 className="w-4 h-4" />
              <span>Онлайн оформление</span>
            </div>
          </div>

          {/* Term Selection */}
          <RadioGroup value={selectedTerm} onValueChange={(value) => setSelectedTerm(value as 'three' | 'six')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 3 Months Option */}
              <Label
                htmlFor="three"
                className={`relative cursor-pointer rounded-lg border-2 p-6 transition-all duration-300 ${
                  selectedTerm === 'three'
                    ? 'border-primary bg-primary/5 shadow-glow-primary'
                    : 'border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="three" id="three" className="mt-1" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-xl font-bold text-foreground">3 месяца</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Быстрое погашение рассрочки
                    </p>
                  </div>
                </div>
              </Label>

              {/* 6 Months Option */}
              <Label
                htmlFor="six"
                className={`relative cursor-pointer rounded-lg border-2 p-6 transition-all duration-300 ${
                  selectedTerm === 'six'
                    ? 'border-primary bg-primary/5 shadow-glow-primary'
                    : 'border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="six" id="six" className="mt-1" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-xl font-bold text-foreground">6 месяцев</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Комфортные ежемесячные платежи
                    </p>
                  </div>
                </div>
              </Label>
            </div>
          </RadioGroup>

          {/* Submit Button */}
          <GlowButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleSubmit}
            disabled={!selectedTerm}
          >
            Отправить заявку
          </GlowButton>

          <p className="text-xs text-center text-muted-foreground">
            Нажимая кнопку, вы будете перенаправлены на сайт партнера inPocket для оформления рассрочки. После отправления заявки с вами свяжется менеджер для уточнения деталей заявки.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreditModal;
