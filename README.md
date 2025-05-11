# VueSymfonyBoilerplate (VSB)

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-green?logo=vue.js&logoColor=white)
![Symfony](https://img.shields.io/badge/Symfony-7.0-black?logo=symfony&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.0-blue?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwindcss&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-1.1-pink?logo=bun&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3.0-yellow?logo=vue.js&logoColor=white)
![Vue Router](https://img.shields.io/badge/Vue%20Router-4.5-orange?logo=vue.js&logoColor=white)
![Doctrine](https://img.shields.io/badge/Doctrine-ORM-blue?logo=php&logoColor=white)

**VueSymfonyBoilerplate (VSB)** is a production-ready foundation for building modern web applications with a strict separation between frontend and backend. Unlike traditional Symfony-UI integrations, this boilerplate features:

- 🧩 **Fully decoupled architecture**: Vue 3 frontend and Symfony 7 API operate as independent services
- 🔄 **API-first design**: Clean RESTful communication between layers
- 🚀 **Modern development experience**: Bun runtime + TypeScript + Hot Module Replacement
- 🔒 **Enterprise-ready security**: Pre-configured JWT authentication with refresh tokens
- 📦 **Zero-config Docker setup**: Includes PostgreSQL, Nginx reverse proxy, and Adminer

Perfect for teams implementing microservices architecture or developers wanting complete control over frontend/backend boundaries.

---

## 🚀 Key Features

- **Decoupled Architecture**: Independent frontend/backend services communicating via API
- Modern Frontend Stack: Vue 3 + TypeScript + Pinia + TailwindCSS
- Robust Backend: Symfony 7 + Doctrine ORM + PostgreSQL
- Production-Ready Setup: Dockerized environment with Nginx reverse proxy
- JWT Authentication: Pre-configured with refresh token support
- Bun Runtime: Faster JavaScript tooling

## 📂 Project Structure

```text
VueSymfonyBoilerplate/
├── backend/            # Symfony 7 API application
├── frontend/           # Vue 3 + TypeScript frontend
├── .docker/            # Docker configurations
│   ├── backend/
│   └── nginx/
├── docker-compose.yaml # Main Docker configuration
```

## 🛠️ Tech Stack

| Component       | Technology                          |
|-----------------|-------------------------------------|
| **Frontend**    | Vue 3, TypeScript, Axios, Pinia, Vue-Router, Tailwind  |
| **Backend**     | Symfony 7, Doctrine ORM, PHP 8.3    |
| **Database**    | PostgreSQL                          |
| **Runtime**     | Bun (Frontend), PHP-FPM (Backend)   |
| **Auth**        | JWT + Refresh Tokens                |
| **Infra**       | Docker, Nginx Reverse Proxy         |

## ⚙️ Prerequisites

- Docker & Docker Compose
- (Optional) Symfony CLI for local development

## 🏁 Getting Started

### 1. Start the Application

```bash
docker-compose up --build
```

### 2. Access Services

| Service          | URL                              |
|------------------|----------------------------------|
| Frontend         | http://localhost:3000           |
| Backend API      | http://localhost:3000/api       |
| Adminer (DB GUI) | http://localhost:3000/adminer   |

## 🔐 Authentication Setup

### 1. Generate JWT Keys

```bash
docker exec -it vsb-backend php bin/console lexik:jwt:generate-keypair
```

### 2. Run Database Migrations

```bash
docker exec -it vsb-backend php bin/console doctrine:migrations:migrate
```

> **Demo Available**: Authentication demo at `/demo` route

## 🐳 Common Docker Commands

### Backend Operations

```bash
# Clear Symfony cache
docker exec -it vsb-backend php bin/console cache:clear

# Install dependencies
docker exec -it vsb-backend composer install

# Run new migration
docker exec -it vsb-backend php bin/console make:migration
```

### Frontend Operations

```bash
# Install packages
docker exec -it vsb-frontend bun install

# Start dev server
docker exec -it vsb-frontend bun dev

# Build for production
docker exec -it vsb-frontend bun build
```

## 🔄 Reverse Proxy Configuration

Pre-configured Nginx handles:
- Frontend routing (`/`)
- Backend API routing (`/api`)
- Static assets serving
- CORS headers management

## 📜 License

MIT License - See [LICENSE](LICENSE) file for details