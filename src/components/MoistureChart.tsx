import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { useState } from "react";

interface MoistureChartProps {
  data24h: Array<{ time: string; moisture: number }>;
  data7d?: Array<{ time: string; moisture: number }>;
}

export const MoistureChart = ({ data24h, data7d = [] }: MoistureChartProps) => {
  const [timeRange, setTimeRange] = useState<"24h" | "7d">("24h");
  const currentData = timeRange === "24h" ? data24h : data7d;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Moisture History
        </h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={timeRange === "24h" ? "default" : "outline"}
            onClick={() => setTimeRange("24h")}
          >
            24h
          </Button>
          <Button
            size="sm"
            variant={timeRange === "7d" ? "default" : "outline"}
            onClick={() => setTimeRange("7d")}
          >
            7d
          </Button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={currentData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
          <XAxis
            dataKey="time"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Line
            type="monotone"
            dataKey="moisture"
            stroke="hsl(var(--chart-line))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
