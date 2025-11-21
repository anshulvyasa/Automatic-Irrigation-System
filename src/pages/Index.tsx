import { useState, useEffect } from "react";
import { ConnectivityIndicator } from "@/components/ConnectivityIndicator";
import { MetricCard } from "@/components/MetricCard";
import { SoilMoistureGauge } from "@/components/SoilMoistureGauge";
import { PumpControl } from "@/components/PumpControl";
import { MoistureChart } from "@/components/MoistureChart";
import { EventLog } from "@/components/EventLog";
import { QuickActions } from "@/components/QuickActions";
import { Thermometer, Droplets, Battery, Wifi } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data generator for demo
const generateMockChartData = (hours: number) => {
  const data = [];
  const now = new Date();
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      moisture: Math.floor(35 + Math.random() * 20 + Math.sin(i / 3) * 10),
    });
  }
  return data;
};

const Index = () => {
  // Mock telemetry state
  const [deviceId] = useState("esp32-001");
  const [connectivity, setConnectivity] = useState<"connected" | "connecting" | "disconnected">("connected");
  const [telemetry, setTelemetry] = useState({
    soil_moisture: 42,
    temp_c: 28.5,
    humidity: 61,
    battery_v: 3.85,
    rssi: -62,
    pump_state: "OFF" as "ON" | "OFF",
    timestamp: new Date().toISOString(),
  });

  const [mode, setMode] = useState<"manual" | "auto">("manual");
  const [moistureThreshold, setMoistureThreshold] = useState(35);
  const [runtime] = useState("00:00:00");

  const [events] = useState([
    { id: "1", type: "telemetry" as const, message: "Telemetry update received", timestamp: new Date().toISOString() },
    { id: "2", type: "command" as const, message: "Pump turned OFF", timestamp: new Date(Date.now() - 300000).toISOString() },
    { id: "3", type: "alert" as const, message: "Moisture below threshold (38%)", timestamp: new Date(Date.now() - 600000).toISOString() },
    { id: "4", type: "info" as const, message: "Device connected to MQTT", timestamp: new Date(Date.now() - 900000).toISOString() },
  ]);

  const chartData24h = generateMockChartData(24);
  const chartData7d = generateMockChartData(168);

  const sparklineData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));

  // Mock MQTT connection simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate telemetry updates
      setTelemetry(prev => ({
        ...prev,
        soil_moisture: Math.max(0, Math.min(100, prev.soil_moisture + (Math.random() - 0.5) * 2)),
        temp_c: 28 + Math.random() * 2,
        humidity: 60 + Math.random() * 5,
        timestamp: new Date().toISOString(),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePumpToggle = (state: "ON" | "OFF") => {
    setTelemetry(prev => ({ ...prev, pump_state: state }));
    // In real implementation: publishMqttCommand({ command: state === "ON" ? "pump_on" : "pump_off" })
    console.log("MQTT Command:", { command: state === "ON" ? "pump_on" : "pump_off" });
  };

  const handleModeChange = (newMode: "manual" | "auto") => {
    setMode(newMode);
    if (newMode === "auto") {
      // In real implementation: publishMqttCommand({ command: "set_auto", moisture_threshold: moistureThreshold })
      console.log("MQTT Command:", { command: "set_auto", moisture_threshold: moistureThreshold });
    }
  };

  const handleThresholdChange = (threshold: number) => {
    setMoistureThreshold(threshold);
  };

  const getBatteryVariant = () => {
    if (telemetry.battery_v < 3.5) return "danger";
    if (telemetry.battery_v < 3.7) return "warning";
    return "default";
  };

  const batteryPercent = Math.round(((telemetry.battery_v - 3.3) / (4.2 - 3.3)) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Smart Irrigation</h1>
              </div>
              <Select value={deviceId}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="esp32-001">esp32-001</SelectItem>
                  <SelectItem value="esp32-002">esp32-002</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ConnectivityIndicator status={connectivity} lastSeen={telemetry.timestamp} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Live Telemetry */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Gauge */}
            <SoilMoistureGauge value={telemetry.soil_moisture} sparklineData={sparklineData} />

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                icon={Thermometer}
                label="Temperature"
                value={telemetry.temp_c.toFixed(1)}
                unit="°C"
              />
              <MetricCard
                icon={Droplets}
                label="Humidity"
                value={telemetry.humidity}
                unit="%"
              />
              <MetricCard
                icon={Battery}
                label="Battery"
                value={`${telemetry.battery_v.toFixed(2)}V (${batteryPercent}%)`}
                variant={getBatteryVariant()}
              />
              <MetricCard
                icon={Wifi}
                label="Signal"
                value={telemetry.rssi}
                unit="dBm"
              />
            </div>

            {/* Pump Control */}
            <PumpControl
              pumpState={telemetry.pump_state}
              mode={mode}
              moistureThreshold={moistureThreshold}
              onPumpToggle={handlePumpToggle}
              onModeChange={handleModeChange}
              onThresholdChange={handleThresholdChange}
              runtime={runtime}
            />
          </div>

          {/* Right Column - History & Controls */}
          <div className="space-y-6">
            <MoistureChart data24h={chartData24h} data7d={chartData7d} />
            <QuickActions />
            <EventLog events={events} />
          </div>
        </div>
      </main>

      {/* MQTT Integration Info */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-muted/50 rounded-lg p-6 text-sm">
          <h3 className="font-semibold mb-2">MQTT Integration</h3>
          <div className="space-y-1 text-muted-foreground">
            <p><strong>Telemetry:</strong> device/{deviceId}/telemetry</p>
            <p><strong>Commands:</strong> device/{deviceId}/command</p>
            <p><strong>Status:</strong> device/{deviceId}/status</p>
            <p className="mt-2 text-xs">Configure AWS IoT Core certificates in edge function. Default telemetry: 60s.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
