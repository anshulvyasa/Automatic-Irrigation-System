import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, TestTube, RefreshCw, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { pubsub } from "@/App";
import { PUB_TOPIC } from "@/config";

export const QuickActions = () => {
  const { toast } = useToast();

  // Make the function async
  const handleForcePump = async () => {
    const payload = {
      command: "pump_on",
      duration: 30
    };

    try {
      // Await the publish action
      await pubsub.publish({
        topics: [PUB_TOPIC],
        message: payload
      });

      // Only show success if no error was thrown
      toast({
        title: "Pump Activated",
        description: "Force running pump for 30 seconds",
        variant: "default", // or "success" if you have that variant
      });

    } catch (error) {
      console.error("Publish failed:", error);
      // Show error toast to user
      toast({
        title: "Command Failed",
        description: "Could not connect to device.",
        variant: "destructive", // Standard Shadcn UI error style
      });
    }
  };

  const handleTestPump = async () => {
    try {
      await pubsub.publish({
        topics: [PUB_TOPIC],
        message: {
          command: "pump_on",
          duration: 2
        }
      });
      toast({
        title: "Test Started",
        description: "Running pump test sequence",
      });
    } catch (error) {
      toast({ title: "Error", description: "Failed to send test command", variant: "destructive" });
    }
  };

  const handleRestart = async () => {
    try {
      await pubsub.publish({
        topics: [PUB_TOPIC],
        message: { command: "reset" }
      });
      toast({
        title: "Restart Command Sent",
        description: "Device will restart in a few moments",
      });
    } catch (error) {
      toast({ title: "Error", description: "Failed to send restart command", variant: "destructive" });
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      {/* ... buttons remain the same ... */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col gap-2"
          onClick={handleForcePump}
        >
          <Zap className="h-5 w-5" />
          <span className="text-sm">Force Pump (30s)</span>
        </Button>
        {/* ... other buttons ... */}
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