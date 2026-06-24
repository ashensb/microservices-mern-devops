# Microservices MERN Application with Docker & DevOps Pipeline

A production-ready microservices architecture built using the MERN stack, fully containerized and orchestrated using Docker and Docker Compose. This project demonstrates service isolation, inter-container communication, and volume persistence in a local multi-container mesh.

---

## 🏗️ Architecture & Component Design

The system is split into **5 isolated containers** that communicate seamlessly over a bridge network:

1. **`frontend`** (React + Vite + Tailwind CSS): The presentation layer running on port `3000`.
2. **`product-service`** (Node.js + Express): Microservice handling product operations on port `5001`.
3. **`order-service`** (Node.js + Express): Microservice handling transactional orders on port `5002`.
4. **`product-db`** (MongoDB Instance): Isolated database dedicated to the Product service.
5. **`order-db`** (MongoDB Instance): Isolated database dedicated to the Order service.

---

## 🛠️ Prerequisites & Requirements

To clone and run this application cluster, you do **not** need Node.js or MongoDB installed locally. You only need:

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows, Mac, or Linux)
* [Git](https://git-scm.com/) Installed

---

## 🚀 How to Run (Quick Start)

Follow these 3 simple steps to spin up the entire microservices cluster inside your Docker environment:

### Step 1: Clone the Repository
Open your terminal and clone this project to your local machine:
```bash
git clone [https://github.com/ashensb/microservices-mern-devops.git](https://github.com/ashensb/microservices-mern-devops.git)
cd microservices-mern-devops

### Step 2: Boot the Cluster using Docker Compose
      docker-compose up --build

### Step 3: Access the Live Cluster Network
Once the logs stabilize and show successful database connections, open your browser and visit:

🌐 Frontend Marketplace Dashboard: http://localhost:3000

📦 Product Service API Instance: http://localhost:5001/api/products

🛒 Order Service API Instance: http://localhost:5002/api/orders