# Smart Irrigation Dashboard - MQTT Integration Guide

## Overview
This dashboard connects to an ESP32-based irrigation system via AWS IoT Core MQTT broker.

## AWS IoT Core Configuration

### Topics Structure
- **Telemetry (Device → Cloud)**: `device/{deviceId}/telemetry`
- **Commands (Cloud → Device)**: `device/{deviceId}/command`
- **Status/Last Will**: `device/{deviceId}/status`

### Telemetry Payload Format
```json
{
  "deviceId": "esp32-001",
  "timestamp": "2025-11-21T14:00:00Z",
  "soil_moisture": 42,
  "temp_c": 28.5,
  "humidity": 61,
  "battery_v": 3.85,
  "rssi": -62,
  "pump_state": "OFF"
}
```

### Command Payload Format
```json
// Turn pump ON
{ "command": "pump_on" }

// Turn pump OFF
{ "command": "pump_off" }

// Set auto mode with threshold
{
  "command": "set_auto",
  "moisture_threshold": 35
}
```

## Setup Instructions

### 1. AWS IoT Core Setup
1. Create a Thing in AWS IoT Core for your ESP32 device
2. Generate and download device certificates:
   - Device certificate (*.pem.crt)
   - Private key (*.pem.key)
   - Root CA certificate
3. Create IoT Policy with permissions for:
   - `iot:Connect`
   - `iot:Publish` on `device/*/telemetry` and `device/*/status`
   - `iot:Subscribe` on `device/*/command`
   - `iot:Receive` on `device/*/command`
4. Attach policy to certificate

### 2. Frontend Integration
The dashboard uses MQTT over WebSocket. To integrate:

```typescript
import mqtt from 'mqtt';

// Connect to AWS IoT Core
const client = mqtt.connect('wss://YOUR_IOT_ENDPOINT.iot.REGION.amazonaws.com/mqtt', {
  clientId: 'dashboard-' + Math.random().toString(16).slice(2, 8),
  // Add authentication headers for AWS IoT
});

// Subscribe to telemetry
client.subscribe('device/esp32-001/telemetry', (err) => {
  if (!err) console.log('Subscribed to telemetry');
});

// Handle incoming messages
client.on('message', (topic, message) => {
  if (topic.includes('telemetry')) {
    const data = JSON.parse(message.toString());
    // Update UI with telemetry data
  }
});

// Publish commands
const sendCommand = (command: string) => {
  client.publish('device/esp32-001/command', JSON.stringify({ command }));
};
```

### 3. Edge Function (Recommended)
For production, create a Supabase Edge Function to handle MQTT connections securely:

```typescript
// supabase/functions/mqtt-relay/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  // Handle WebSocket upgrade and relay to AWS IoT Core
  // Store credentials in Supabase secrets
  const iotEndpoint = Deno.env.get('AWS_IOT_ENDPOINT');
  // Implement secure MQTT relay logic
});
```

## Recommended Settings

### Telemetry Frequency
- **Default**: 60 seconds
- **Adjustable via UI**: 10s / 30s / 60s
- Lower frequency = more data, higher battery consumption

### Auto Mode Configuration
- **Moisture Threshold**: 35% (adjustable 0-100%)
- **Pump Runtime**: Maximum 30 minutes per activation
- **Cooldown Period**: 5 minutes between activations

### Alert Thresholds
- **Low Moisture**: < 30%
- **Low Battery**: < 3.5V
- **Connection Timeout**: 2 minutes

## ESP32 Implementation Notes

### Required Libraries
- PubSubClient (MQTT)
- WiFiClientSecure (TLS)
- ArduinoJson (JSON parsing)

### Sample ESP32 Code Structure
```cpp
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// AWS IoT Core endpoint
const char* mqtt_server = "YOUR_ENDPOINT.iot.REGION.amazonaws.com";
const int mqtt_port = 8883;

// Load certificates from SPIFFS
const char* root_ca = "...";
const char* certificate = "...";
const char* private_key = "...";

WiFiClientSecure net;
PubSubClient client(net);

void publishTelemetry() {
  StaticJsonDocument<256> doc;
  doc["deviceId"] = "esp32-001";
  doc["timestamp"] = getISOTimestamp();
  doc["soil_moisture"] = readSoilMoisture();
  doc["temp_c"] = readTemperature();
  // ... add other sensors
  
  char buffer[256];
  serializeJson(doc, buffer);
  client.publish("device/esp32-001/telemetry", buffer);
}

void callback(char* topic, byte* payload, unsigned int length) {
  StaticJsonDocument<128> doc;
  deserializeJson(doc, payload, length);
  
  const char* command = doc["command"];
  if (strcmp(command, "pump_on") == 0) {
    digitalWrite(PUMP_PIN, HIGH);
  } else if (strcmp(command, "pump_off") == 0) {
    digitalWrite(PUMP_PIN, LOW);
  }
}
```

## Security Best Practices
1. Never commit certificates to repository
2. Store certificates in ESP32 SPIFFS or use AWS IoT credential provider
3. Use Supabase Edge Functions to proxy MQTT connections
4. Implement certificate rotation policy
5. Enable CloudWatch logs for monitoring

## Troubleshooting

### Connection Issues
- Verify IoT endpoint URL
- Check certificate expiration
- Ensure policy permissions are correct
- Verify network connectivity

### Data Not Updating
- Check telemetry frequency setting
- Verify MQTT subscription topics
- Check device battery level
- Review CloudWatch logs

## Data Retention
- Telemetry stored in database: 30 days (configurable)
- Events log: 7 days
- Charts: 24h real-time, 7d aggregated

## Performance Optimization
- Use QoS 0 for telemetry (fire and forget)
- Use QoS 1 for commands (at least once delivery)
- Batch telemetry updates if sampling rate < 30s
- Implement local caching for offline resilience
