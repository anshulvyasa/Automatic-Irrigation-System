🌿 Automatic Irrigation System
Automatic-Irrigation-System is a smart, IoT-enabled irrigation controller designed to automate plant watering based on real-time soil moisture analysis.

The primary goal is to conserve water and reduce manual labor by ensuring the water pump activates only when the soil is dry and deactivates immediately after optimal moisture levels are restored.

🚀 Key Features
✅ Automated Watering: Smart pump activation based on real-time soil moisture sensor data.

✅ Threshold Logic: Configurable moisture thresholds to prevent over-watering or under-watering.

✅ Real-time Monitoring: Continuous tracking of soil conditions.

✅ Manual Override: Existing/Planned capability to manually toggle the water pump.

✅ Scalable Architecture: Clean code structure designed for easy integration of new sensors (e.g., temperature, humidity) or automation rules.

🔮 Roadmap
[ ] Full Separation of Concerns: Decouple Automatic and Manual logic for a cleaner software architecture.

[ ] Cloud Integration: Data logging to cloud platforms (AWS IoT/Firebase).

[ ] Mobile App: Remote control via a companion app.

🛠️ Hardware Requirements
To build this system, you will need the following components:

Microcontroller: ESP32 or Arduino Board.

Sensors: Capacitive or Resistive Soil Moisture Sensor.

Actuator: 5V Relay Module (to control the pump).

Power: External power supply for the pump.

Water Pump: Submersible or diaphragm pump.

📦 Installation & Setup
Follow these steps to get the project running locally.

1️⃣ Clone the Repository
Bash

git clone https://github.com/anshulvyasa/Automatic-Irrigation-System.git
cd Automatic-Irrigation-System
2️⃣ Install Dependencies (For UI/Node.js Scripts)
If you are using the dashboard, backend logging, or helper scripts included in this repo, install the necessary node packages:

Bash

npm install
3️⃣ Hardware Configuration
Sensor: Connect the Soil Moisture Sensor to the designated Analog/Digital input pin on your board.

Relay: Connect the Relay Module control pin to a digital output pin.

Pump: Wire the Water Pump through the relay (Common & NO - Normally Open) and connect it to the external power source.

Calibration: Test your sensor in dry air vs. water to determine the correct threshold values in the code.

4️⃣ Upload & Run
🔹 Option A: Using ESP32 / Arduino IDE
Open the .ino or main firmware file in Arduino IDE / PlatformIO.

Select your Board (e.g., DOIT ESP32 DEVKIT V1) and correct COM Port.

Update the MOISTURE_THRESHOLD variable in the code.

Click Upload to flash the firmware.

🔹 Option B: Using Node.js (Dashboard/Simulation)
If running the web interface or simulation scripts:

Bash

npm run dev