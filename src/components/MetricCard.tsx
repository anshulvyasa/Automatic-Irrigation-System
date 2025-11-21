import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "stable";
  variant?: "default" | "warning" | "danger";
}

export const MetricCard = ({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  variant = "default",
}: MetricCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "warning":
        return "border-warning/30 bg-warning/5";
      case "danger":
        return "border-destructive/30 bg-destructive/5";
      default:
        return "border-border";
    }
  };

  return (
    <Card className={cn("p-4 transition-all hover:shadow-md", getVariantStyles())}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-metric-label font-medium">{label}</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-metric-value">{value}</span>
            {unit && <span className="text-sm text-muted-foreground ml-1">{unit}</span>}
          </div>
        </div>
        {trend && (
          <div
            className={cn(
              "text-xs font-medium px-2 py-1 rounded",
              trend === "up" && "bg-success/10 text-success",
              trend === "down" && "bg-destructive/10 text-destructive",
              trend === "stable" && "bg-muted text-muted-foreground"
            )}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
          </div>
        )}
      </div>
    </Card>
  );
};
