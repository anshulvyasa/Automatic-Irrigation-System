import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Power, Clock, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PumpControlProps {
  pumpState: "ON" | "OFF";
  mode: "manual" | "auto";
  moistureThreshold: number;
  onPumpToggle: (state: "ON" | "OFF") => void;
  onModeChange: (mode: "manual" | "auto") => void;
  onThresholdChange: (threshold: number) => void;
  runtime?: string;
}

export const PumpControl = ({
  pumpState,
  mode,
  moistureThreshold,
  onPumpToggle,
  onModeChange,
  onThresholdChange,
  runtime = "00:00:00",
}: PumpControlProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingState, setPendingState] = useState<"ON" | "OFF">("OFF");
  const { toast } = useToast();

  const handlePumpToggle = () => {
    const newState = pumpState === "ON" ? "OFF" : "ON";
    setPendingState(newState);
    setShowConfirm(true);
  };

  const confirmToggle = () => {
    onPumpToggle(pendingState);
    setShowConfirm(false);
    toast({
      title: `Pump ${pendingState}`,
      description: `Irrigation pump turned ${pendingState.toLowerCase()}`,
    });
  };

  return (
    <>
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Power className="h-5 w-5" />
              Pump Control
            </h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              pumpState === "ON" 
                ? "bg-success/20 text-success" 
                : "bg-muted text-muted-foreground"
            }`}>
              {pumpState}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Button
              size="lg"
              variant={pumpState === "ON" ? "default" : "outline"}
              className={`w-32 h-32 rounded-full ${
                pumpState === "ON" 
                  ? "bg-gradient-to-br from-primary to-success shadow-glow" 
                  : ""
              }`}
              onClick={handlePumpToggle}
            >
              <div className="flex flex-col items-center gap-2">
                <Zap className={`h-8 w-8 ${pumpState === "ON" ? "animate-pulse" : ""}`} />
                <span className="text-sm font-medium">
                  {pumpState === "ON" ? "Turn OFF" : "Turn ON"}
                </span>
              </div>
            </Button>
          </div>

          {pumpState === "ON" && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Runtime: {runtime}</span>
            </div>
          )}

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Mode</label>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${mode === "manual" ? "text-foreground" : "text-muted-foreground"}`}>
                  Manual
                </span>
                <Switch
                  checked={mode === "auto"}
                  onCheckedChange={(checked) => onModeChange(checked ? "auto" : "manual")}
                />
                <span className={`text-sm ${mode === "auto" ? "text-foreground" : "text-muted-foreground"}`}>
                  Auto
                </span>
              </div>
            </div>

            {mode === "auto" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Moisture Threshold</label>
                  <span className="text-sm text-muted-foreground">{moistureThreshold}%</span>
                </div>
                <Slider
                  value={[moistureThreshold]}
                  onValueChange={(val) => onThresholdChange(val[0])}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Pump will activate when moisture drops below this level
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Pump Action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to turn the pump {pendingState}?
              {pendingState === "ON" && " This will start irrigation immediately."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmToggle}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
