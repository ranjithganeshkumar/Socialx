SocialX

SocialX is a simple social media platform built with React (frontend) and Spring Boot + PostgreSQL (backend).
It currently supports user authentication (login & signup) and is Dockerized for easy deployment.
This version is deployed on an AWS EC2 instance.

🚀 Tech Stack

Frontend: React (Vite), TailwindCSS 

Backend: Spring Boot (Java)

Database: PostgreSQL

Containerization: Docker & Docker Compose

Hosting: AWS EC2

✨ Features

🔑 User Signup

🔐 User Login (JWT authentication if implemented)

🐳 Dockerized setup for backend, frontend, and database

☁️ Hosted on AWS EC2

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

2. Run with Docker on Local Machine (Optional)
docker compose up --build


This will start:

Frontend on http://localhost:5173

Backend API on http://localhost:8085

PostgreSQL Database on port 5432

🖥️ Deployment on EC2

SSH into your EC2 instance:

ssh -i "socailx1.pem" ec2-user@your-ec2-ip


Clone the repo on EC2 (if not already):

git clone https://github.com/ranjithganeshkumar/Socialx.git
cd socialx


Run Docker Compose:

docker compose up --build -d


Frontend: http://ec2-your-ip:5173

Backend API: http://ec2-your-ip:8085

PostgreSQL: inside Docker container

Check running containers:

docker ps


Stop containers:

docker compose down

🛠️ Environment Variables
Frontend .env
# Local development
VITE_API_URL=http://localhost:8085

# EC2 Deployment
VITE_API_URL=http://ec2-your-ip:8085


In React code:

const API_URL = import.meta.env.VITE_API_URL || "http://ec2-your-ip:8085";

Backend (application.properties or .yml)
spring.datasource.url=jdbc:postgresql://localhost:5432/socialx
spring.datasource.username=postgres
spring.datasource.password=*******

📌 Roadmap

->Profile management

->Post creation & feed

->Likes & comments

->Friend requests / follow system
