# 🌿 Automatic Irrigation System

![Status](https://img.shields.io/badge/Status-In%20Development-yellow) ![IoT](https://img.shields.io/badge/IoT-ESP32%20%2F%20Arduino-blue) ![License](https://img.shields.io/badge/License-MIT-green)

**Automatic-Irrigation-System** is a smart, IoT-enabled irrigation controller designed to automate plant watering based on real-time soil moisture analysis.

The primary goal is to **conserve water** and reduce manual labor by ensuring the water pump activates *only* when the soil is dry and deactivates immediately after optimal moisture levels are restored.

---

## 🚀 Key Features

* ✅ **Automated Watering:** Smart pump activation based on real-time soil moisture sensor data.
* ✅ **Threshold Logic:** Configurable moisture thresholds to prevent over-watering or under-watering.
* ✅ **Real-time Monitoring:** Continuous tracking of soil conditions.
* ✅ **Manual Override:** Existing/Planned capability to manually toggle the water pump.
* ✅ **Scalable Architecture:** Clean code structure designed for easy integration of new sensors (e.g., temperature, humidity) or automation rules.

---

## 🔮 Roadmap

- [ ] **Full Separation of Concerns:** Decouple Automatic and Manual logic for a cleaner software architecture.
- [ ] **Cloud Integration:** Data logging to cloud platforms (AWS IoT/Firebase).
- [ ] **Mobile App:** Remote control via a companion app.

---

## 🛠️ Hardware Requirements

To build this system, you will need the following components:
* **Microcontroller:** ESP32 or Arduino Board.
* **Sensors:** Capacitive or Resistive Soil Moisture Sensor.
* **Actuator:** 5V Relay Module (to control the pump).
* **Power:** External power supply for the pump (e.g., 9V/12V battery or adapter).
* **Water Pump:** Submersible or diaphragm pump.

---

## 📦 Installation & Setup

### 1️⃣ Get the Code & Run
Run the following commands to clone the repository, install dependencies, and start the project:

```bash
# Clone the repository
git clone [https://github.com/anshulvyasa/Automatic-Irrigation-System.git](https://github.com/anshulvyasa/Automatic-Irrigation-System.git)

# Navigate to the project directory
cd Automatic-Irrigation-System

# Install Node.js dependencies
npm install

# Run the development server
npm run dev