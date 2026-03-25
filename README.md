🛡️ SafeHaven – Secure Domestic Violence Detection & Alert System
📌 Overview

SafeHaven is a secure and scalable system designed to detect and respond to domestic violence situations using a mobile application and real-time communication services. The system enables users to send alerts, share critical information, and receive immediate assistance through integrated services.

The project focuses on user safety, real-time response, and secure data handling using modern technologies.

🎯 Problem Statement

Domestic violence is a critical issue where victims often lack immediate access to help. Traditional systems fail to provide:

Instant emergency alerts
Secure communication channels
Real-time location or distress reporting

SafeHaven addresses these gaps by providing a smart, secure, and responsive alert system.

🚀 Key Features
📱 Mobile-based emergency alert system
🔐 Secure user authentication
📍 Real-time alert triggering
📩 SMS / Call alerts using integrated services
🔔 Push notifications for quick response
🛡️ Encrypted data transmission for privacy and safety
🛠️ Tech Stack
📱 Frontend (Mobile App)
React Native / Flutter
⚙️ Backend
Node.js (Express) / Django
🗄️ Database
MySQL
🔐 Security
JWT Authentication
SSL Encryption
AES Data Encryption
🔗 APIs & Services
Firebase (Authentication & Notifications)
Twilio (SMS & Call Alerts)
⚙️ System Architecture
User registers/login via secure authentication (JWT + Firebase)
In emergency, user triggers alert from mobile app
Backend processes request and verifies user
Alert is sent via:
SMS / Call (Twilio)
Push Notification (Firebase)
Data is securely transmitted using encryption protocols
📂 Project Structure
SafeHaven/
│── frontend/        # Mobile App (React Native / Flutter)
│── backend/         # Server (Node.js / Django)
│── database/        # MySQL scripts
│── README.md
│── SafeHaven_Presentation.pptx
🚀 Getting Started
1. Clone Repository
git clone https://github.com/your-username/SafeHaven.git
cd SafeHaven
2. Backend Setup
cd backend
npm install
npm start

(or for Django)

python manage.py runserver
3. Frontend Setup
cd frontend
npm install
npm start
📊 Presentation (PPT)

📎 The project presentation is included in this repository:

👉 SafeHaven_Presentation.pptx

📌 It Covers:
Problem Statement
Proposed Solution
System Architecture
Tech Stack
Features
Future Scope
🎯 Use Cases
Personal safety applications
Emergency response systems
Women safety solutions
Smart city safety integration
🔮 Future Scope
Live location tracking
AI-based threat detection
Wearable device integration
Government emergency service integration
👨‍💻 Author
Shruti Shejul
📜 License

This project is developed for academic and educational purposes.
