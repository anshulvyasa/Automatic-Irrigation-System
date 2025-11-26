# Automatic-Irrigation-System

## 🌱 Overview  
**Automatic-Irrigation-System** is a smart irrigation controller that automatically waters plants based on real-time soil moisture readings.  
The goal is to reduce manual effort and water wastage by turning the pump ON only when the soil becomes dry and turning it OFF after adequate moisture is restored.

The project also includes (or will include) a **manual override feature** that allows users to control the water pump manually.  
In the future, we plan to **fully separate the Automatic and Manual features** for better separation of concerns and cleaner architecture.

---

## 🚀 Features  
- Automatic watering using soil moisture sensor data  
- Pump/relay control based on configurable moisture thresholds  
- Real-time monitoring logic  
- Manual control mode (present or planned)  
- Clean project structure for ease of modification  
- Flexible enough to integrate new sensors or automation rules  

---

## 📦 Installation & Setup  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/anshulvyasa/Automatic-Irrigation-System.git
cd Automatic-Irrigation-System

### 2️⃣ Install Node Dependencies (if using UI / backend / helper scripts)

If the project contains JavaScript/TypeScript code for dashboard, backend, logging, or automation scripts, install the required Node packages:

```bash
npm install

### 3️⃣ Hardware Setup (For ESP32/Arduino-Based Systems)

- Connect **soil moisture sensor** to an analog or digital input pin  
- Connect **water pump** to a **relay module** securely  
- Ensure an **external power supply** for the pump  
- Modify **moisture threshold values** in the code as per your soil and plant requirements  


### 4️⃣ Upload / Run the Code

#### 🔹 Using ESP32 / Arduino IDE:
- Open the `.ino` or main firmware file  
- Select the correct **ESP32 board** and **COM port**  
- Click **Upload** to flash the code onto the device  

#### 🔹 Using Node.js scripts / UI:
If your project includes a Node.js based UI, dashboard, or helper service, run:

```bash
npm run dev
