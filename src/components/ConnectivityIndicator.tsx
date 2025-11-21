import { Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectivityIndicatorProps {
  status: "connected" | "connecting" | "disconnected";
  lastSeen?: string;
}

export const ConnectivityIndicator = ({ status, lastSeen }: ConnectivityIndicatorProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "connected":
        return "text-success";
      case "connecting":
        return "text-warning";
      case "disconnected":
        return "text-destructive";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "connected":
        return "Connected";
      case "connecting":
        return "Connecting...";
      case "disconnected":
        return "Disconnected";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={cn("relative", getStatusColor())}>
        {status === "disconnected" ? (
          <WifiOff className="h-5 w-5" />
        ) : (
          <Wifi className="h-5 w-5" />
        )}
        {status === "connected" && (
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-success rounded-full animate-pulse" />
        )}
      </div>
      <div className="flex flex-col">
        <span className={cn("text-sm font-medium", getStatusColor())}>
          {getStatusText()}
        </span>
        {lastSeen && (
          <span className="text-xs text-muted-foreground">
            Last seen: {new Date(lastSeen).toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
};
