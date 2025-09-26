SocialX

A simple social media platform built with React (frontend) and Spring Boot + PostgreSQL (backend).
Currently supports user authentication (login & signup) and comes with Docker support for easy deployment.

🚀 Tech Stack

Frontend: React (Vite), TailwindCSS (if used)

Backend: Spring Boot (Java)

Database: PostgreSQL

Containerization: Docker & Docker Compose

Build Tools: Maven, npm/yarn

✨ Features

🔑 User Signup

🔐 User Login (JWT authentication if implemented)

🐳 Dockerized setup for backend, frontend, and database

📂 Project Structure
SocialX/
│
├── frontend/         # React frontend
├── backend/          # Spring Boot backend
├── docker-compose.yml
└── README.md

⚙️ Setup & Installation
1. Clone the repository
git clone https://github.com/ranjithganeshkumar/Socialx.git
cd socialx

2. Run with Docker

Make sure Docker & Docker Compose are installed. Then run:

docker compose up --build


This will start:

Frontend on http://localhost:5173

Backend API on http://localhost:8085

PostgreSQL Database on port 5432

3. Run locally without Docker (optional)
Backend
cd backend
./mvnw spring-boot:run

Frontend
cd frontend
npm install
npm run dev

🛠️ Environment Variables

Create a .env file in the frontend and set your API base URL:

VITE_API_URL=http://localhost:8085


In the backend (application.properties or yml):

spring.datasource.url=jdbc:postgresql://localhost:5432/socialx
spring.datasource.username=postgres
spring.datasource.password=yourpassword

📌 Roadmap

-> Profile management

-> Post creation & feed

-> Likes & comments

-> Friend requests / follow system
