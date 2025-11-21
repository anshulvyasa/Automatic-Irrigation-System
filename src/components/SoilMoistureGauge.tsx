import { Card } from "@/components/ui/card";
import { Droplets } from "lucide-react";

interface SoilMoistureGaugeProps {
  value: number; // 0-100
  sparklineData?: number[];
}

export const SoilMoistureGauge = ({ value, sparklineData = [] }: SoilMoistureGaugeProps) => {
  const getColorForValue = (val: number) => {
    if (val < 30) return "text-destructive";
    if (val < 50) return "text-warning";
    return "text-success";
  };

  const getGaugeColor = (val: number) => {
    if (val < 30) return "#ef4444";
    if (val < 50) return "#f59e0b";
    return "#22c55e";
  };

  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <Droplets className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Soil Moisture</h3>
        </div>

        <div className="relative w-48 h-48 mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="hsl(var(--gauge-track))"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke={getGaugeColor(value)}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{ filter: "drop-shadow(0 0 8px currentColor)" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-bold ${getColorForValue(value)}`}>
              {value}
            </span>
            <span className="text-sm text-muted-foreground">% moisture</span>
          </div>
        </div>

        {sparklineData.length > 0 && (
          <div className="w-full">
            <div className="h-12 flex items-end gap-0.5">
              {sparklineData.map((val, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/20 rounded-t"
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">Last hour</p>
          </div>
        )}
      </div>
    </Card>
  );
};
