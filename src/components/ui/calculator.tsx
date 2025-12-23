import React, { useState, useMemo, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Info } from 'lucide-react';

interface CalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const fuelPrices: Record<string, number> = {
  ai92: 62.37,
  ai95: 66.47,
  ai98: 84.80,
  gas: 31.00,
  diesel: 74.01
};

const generatorPricing = {
  compact90: {
    name: "Compact 90 (до 2 л)",
    savingPct: { min: 0.20, max: 0.25 },
    prices: { retail: 63000, lite: 48000, optimum: 43000, ultra: 38000 }
  },
  standard120: {
    name: "Standard 120 (2-6 л)",
    savingPct: { min: 0.15, max: 0.20 },
    prices: { retail: 84000, lite: 59000, optimum: 54000, ultra: 49000 }
  },
  professional240: {
    name: "Professional 240 (от 6 л)",
    savingPct: { min: 0.15, max: 0.25 },
    prices: { retail: 137000, lite: 99000, optimum: 94000, ultra: 89000 }
  }
};

const pricingTiers = {
  retail: "Розница (1 шт)",
  lite: "Лайт (10-19 шт)",
  optimum: "Оптимум (20-49 шт)",
  ultra: "Ультра (50-99 шт)"
};

const Calculator: React.FC<CalculatorProps> = ({ open, onOpenChange }) => {
  const [fuelType, setFuelType] = useState('ai92');
  const [customFuelPrice, setCustomFuelPrice] = useState(fuelPrices.ai92.toString());
  const [distance, setDistance] = useState('15000');
  const [distancePeriod, setDistancePeriod] = useState<'year' | 'month'>('year');
  const [consumption, setConsumption] = useState(8);
  const [generatorModel, setGeneratorModel] = useState<keyof typeof generatorPricing>('standard120');
  const [pricingTier, setPricingTier] = useState<keyof typeof pricingTiers>('retail');

  // Update fuel price when fuel type changes
  useEffect(() => {
    setCustomFuelPrice(fuelPrices[fuelType].toString());
  }, [fuelType]);

  const calculations = useMemo(() => {
    const pricePerLiter = parseFloat(customFuelPrice) || fuelPrices[fuelType];
    const co2PerLiter = fuelType === 'diesel' ? 2.68 : 
                       fuelType === 'gas' ? 2.00 : 2.31;
    const distanceNum = typeof distance === 'string' ? parseFloat(distance) || 0 : distance;
    const baselineLiters = distanceNum * consumption / 100;
    
    const { savingPct } = generatorPricing[generatorModel];
    
    const savedLitersMin = baselineLiters * savingPct.min;
    const savedLitersMax = baselineLiters * savingPct.max;
    
    const moneySavedMin = savedLitersMin * pricePerLiter;
    const moneySavedMax = savedLitersMax * pricePerLiter;
    
    const co2AvoidedMin = savedLitersMin * co2PerLiter;
    const co2AvoidedMax = savedLitersMax * co2PerLiter;

    // Generator price and payback
    const generatorPrice = generatorPricing[generatorModel].prices[pricingTier];
    const avgTotalSavings = (moneySavedMin + moneySavedMax) / 2;
    // Convert to monthly savings based on period
    const avgMonthlySavings = distancePeriod === 'year' ? avgTotalSavings / 12 : avgTotalSavings;
    const paybackMonths = avgMonthlySavings > 0 ? Math.ceil(generatorPrice / avgMonthlySavings) : 0;

    return {
      savedLitersMin,
      savedLitersMax,
      moneySavedMin,
      moneySavedMax,
      co2AvoidedMin,
      co2AvoidedMax,
      generatorPrice,
      paybackMonths
    };
  }, [fuelType, customFuelPrice, distance, consumption, generatorModel, pricingTier, distancePeriod]);

  const presetDistances = distancePeriod === 'year' ? [15000, 30000, 100000] : [1000, 2500, 5000];

  const selectedGenerator = generatorPricing[generatorModel];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Калькулятор экономии
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Generator Model and Pricing Tier */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Модель генератора</Label>
                <Select value={generatorModel} onValueChange={(v) => setGeneratorModel(v as keyof typeof generatorPricing)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact90">Compact 90 (до 2 л)</SelectItem>
                    <SelectItem value="standard120">Standard 120 (2-6 л)</SelectItem>
                    <SelectItem value="professional240">Professional 240 (от 6 л)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Label className="text-sm font-medium">Количество</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="inline-flex items-center justify-center">
                        <Info className="h-4 w-4 text-muted-foreground cursor-help hover:text-primary transition-colors" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-4" align="end">
                      <p className="text-sm mb-3">
                        Это партнёрские условия и цены для оптовых закупок. Чем больше количество — тем выгоднее цена за единицу.
                      </p>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          const contactSection = document.getElementById('contacts');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                            onOpenChange(false);
                          }
                        }}
                      >
                        Получить предложение
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
                <Select value={pricingTier} onValueChange={(v) => setPricingTier(v as keyof typeof pricingTiers)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Розница (1 шт)</SelectItem>
                    <SelectItem value="lite">Лайт (10-19 шт)</SelectItem>
                    <SelectItem value="optimum">Оптимум (20-49 шт)</SelectItem>
                    <SelectItem value="ultra">Ультра (50-99 шт)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Fuel Type and Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Тип топлива</Label>
              <Select value={fuelType} onValueChange={setFuelType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai92">АИ-92</SelectItem>
                  <SelectItem value="ai95">АИ-95</SelectItem>
                  <SelectItem value="ai98">АИ-98</SelectItem>
                  <SelectItem value="gas">Газ</SelectItem>
                  <SelectItem value="diesel">Дизель</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium">Цена за литр (₽)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={customFuelPrice}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d.,]/g, '').replace(',', '.');
                  setCustomFuelPrice(value);
                }}
                onFocus={(e) => e.target.select()}
                placeholder="Цена за литр"
              />
            </div>
          </div>


          {/* Distance */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Пробег (км)</Label>
              <RadioGroup
                value={distancePeriod}
                onValueChange={(v) => {
                  setDistancePeriod(v as 'year' | 'month');
                  setDistance(v === 'year' ? '15000' : '1500');
                }}
                className="flex gap-3"
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="year" id="period-year" className="h-3 w-3" />
                  <Label htmlFor="period-year" className="text-xs cursor-pointer">в год</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="month" id="period-month" className="h-3 w-3" />
                  <Label htmlFor="period-month" className="text-xs cursor-pointer">в месяц</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                inputMode="numeric"
                value={distance}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d]/g, '');
                  setDistance(value);
                }}
                onFocus={(e) => {
                  e.target.select();
                }}
                placeholder="Введите километры"
              />
              <div className="flex gap-2">
                {presetDistances.map((preset) => (
                  <Button
                    key={preset}
                    variant="outline"
                    size="sm"
                    onClick={() => setDistance(preset.toString())}
                    className="text-xs"
                  >
                    {preset.toLocaleString('ru-RU')}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Consumption */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Расход: {consumption.toFixed(1)} л / 100 км</Label>
            <Slider
              value={[consumption]}
              onValueChange={(value) => setConsumption(value[0])}
              min={3}
              max={50}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-3">
                <h3 className="font-semibold text-primary text-xs mb-1">Экономия топлива</h3>
                <p className="text-lg font-bold">
                  {calculations.savedLitersMin.toFixed(1)}–{calculations.savedLitersMax.toFixed(1)} л
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/20">
              <CardContent className="p-3">
                <h3 className="font-semibold text-secondary text-xs mb-1">Экономия денег</h3>
                <p className="text-lg font-bold">
                  {Math.round(calculations.moneySavedMin).toLocaleString('ru-RU')}–{Math.round(calculations.moneySavedMax).toLocaleString('ru-RU')} ₽
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-3">
                <h3 className="font-semibold text-xs mb-1">CO₂ не в атмосфере</h3>
                <p className="text-lg font-bold">
                  {calculations.co2AvoidedMin.toFixed(0)}–{calculations.co2AvoidedMax.toFixed(0)} кг
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 border-amber-500/20">
              <CardContent className="p-3">
                <h3 className="font-semibold text-amber-600 dark:text-amber-400 text-xs mb-1">Стоимость</h3>
                <p className="text-lg font-bold">
                  {calculations.generatorPrice.toLocaleString('ru-RU')} ₽
                </p>
                {calculations.paybackMonths > 0 && (
                  <p className="text-[10px] text-muted-foreground">
                    Окупаемость ~{calculations.paybackMonths} мес.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Button */}
          <Button 
            className="w-full mt-4" 
            size="default"
            onClick={() => {
              const contactSection = document.getElementById('contacts');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                onOpenChange(false);
              }
            }}
          >
            Оформить установку
          </Button>

          {/* Notes */}
          <p className="text-[10px] text-muted-foreground mt-2 leading-tight">
            Экономия по моделям: Compact 90 — 20–25%; Standard 120 — 15–20%; Professional 240 — 15–25%. 
            Факторы CO₂: бензин 2.31 кг/л, газ 2.00 кг/л, дизель 2.68 кг/л.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Calculator;
