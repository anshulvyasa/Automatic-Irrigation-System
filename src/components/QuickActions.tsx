import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, TestTube, RefreshCw, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const QuickActions = () => {
  const { toast } = useToast();

  const handleForcePump = () => {
    toast({
      title: "Pump Activated",
      description: "Force running pump for 30 seconds",
    });
  };

  const handleTestPump = () => {
    toast({
      title: "Test Started",
      description: "Running pump test sequence",
    });
  };

  const handleRestart = () => {
    toast({
      title: "Restart Command Sent",
      description: "Device will restart in a few moments",
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col gap-2"
          onClick={handleForcePump}
        >
          <Zap className="h-5 w-5" />
          <span className="text-sm">Force Pump (30s)</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col gap-2"
          onClick={handleTestPump}
        >
          <TestTube className="h-5 w-5" />
          <span className="text-sm">Test Pump</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col gap-2"
          onClick={handleRestart}
        >
          <RefreshCw className="h-5 w-5" />
          <span className="text-sm">Restart Device</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
          <Settings className="h-5 w-5" />
          <span className="text-sm">Settings</span>
        </Button>
      </div>
    </Card>
  );
};
