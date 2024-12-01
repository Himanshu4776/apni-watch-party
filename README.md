# Apni Watch Party

A collaborative streaming platform for watching videos with friends, anytime, anywhere.

## Features

- Create Watch Parties: Start a virtual room to stream and watch videos with friends in real-time.
-	Low Latency Streaming: Enjoy smooth playback with minimal delay, even during group streaming sessions.
-	Upload and Share Videos: Host videos directly on the platform for instant access.
-	Scalable Architecture: Supports multiple concurrent users for a seamless experience.
-	Batch Processing: Optimized for high-speed data transfer during video uploads and sharing.

## Check it out live here:
### https://youtu.be/2DFPnxcuPxo?si=J-J4FWTBgvqJZRY7

## Tech Stack
- Java 17
- Spring Boot 3.3.5
- React
- TypeScript
- MySQL

## 🌟 How It Works
1.	Users create a room on the platform.
2.	Videos are uploaded to the platform or selected for streaming.
3.	Friends join the room via a unique link, and playback is synchronized in real time.
4.	The platform uses event-driven architecture for notifying users and ensuring a seamless experience.

## Getting Started

### Prerequisites
- JDK 17 or higher
- Maven 3.6+
- MySQL 8.0+

### 🖥️ Setup Instructions

#### Backend
1.	Clone the repository:
```
git clone https://github.com/Himanshu4776/apni-watch-party.git
cd apni-watch-party/backend
```
2.	Configure the database:
	•	Update the application.properties file with your MySQL credentials.
3.	Build and run the backend:
```
./mvnw spring-boot:run
```

#### Frontend
1.	Navigate to the frontend directory:
 ``` cd ../frontend ```
2. Install Dependencies
 ``` npm i ```
3. Start the server
``` npm run dev ```

#### Contributing:
1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

