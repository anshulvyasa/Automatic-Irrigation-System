import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface Event {
  id: string;
  type: "telemetry" | "command" | "alert" | "info";
  message: string;
  timestamp: string;
}

interface EventLogProps {
  events: Event[];
}

export const EventLog = ({ events }: EventLogProps) => {
  const getEventIcon = (type: Event["type"]) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "command":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "telemetry":
        return <Activity className="h-4 w-4 text-accent" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getEventBadge = (type: Event["type"]) => {
    const variants = {
      alert: "bg-warning/10 text-warning border-warning/20",
      command: "bg-success/10 text-success border-success/20",
      telemetry: "bg-accent/10 text-accent border-accent/20",
      info: "bg-muted text-muted-foreground",
    };
    return variants[type];
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Events & Logs</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="flex gap-3 pb-3 border-b border-border last:border-0">
              <div className="mt-1">{getEventIcon(event.type)}</div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-foreground">{event.message}</p>
                  <Badge variant="outline" className={getEventBadge(event.type)}>
                    {event.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
