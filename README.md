# VueSymfonyBoilerplate

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-green?logo=vue.js&logoColor=white)
![Symfony](https://img.shields.io/badge/Symfony-7.0-black?logo=symfony&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.0-blue?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwindcss&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-1.1-pink?logo=bun&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3.0-yellow?logo=vue.js&logoColor=white)
![Vue Router](https://img.shields.io/badge/Vue%20Router-4.5-orange?logo=vue.js&logoColor=white)
![Doctrine](https://img.shields.io/badge/Doctrine-ORM-blue?logo=php&logoColor=white)

VSB (Vue Symfony Boilerplate) is a ready-to-use boilerplate that provides a clean, pre-configured setup for developing modern web applications using a standalone Vue.js frontend and a standalone Symfony 7 API backend. Unlike traditional integrations, this boilerplate does not use the Symfony UX-Vue integration within Symfony. Instead, both frameworks operate independently, communicating via a robust API-driven architecture. This separation ensures greater flexibility, clearer separation of concerns, and easier scalability for modern full-stack development workflows.

## Project Structure

- **backend/**: Contains the Symfony backend application.
- **frontend/**: Contains the Vue.js frontend application.
- **docker-compose.yaml**: Docker configuration for running the project.
- **.docker/**: Contains Docker-related configurations, including backend and Nginx setups.

## Tech Stack

This project uses the following technologies:

- **bun**: A fast JavaScript runtime and package manager.
- **Vue 3**: A progressive JavaScript framework for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Pinia**: A state management library for Vue applications.
- **Vue Router**: The official router for Vue.js.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **Symfony 7**: A PHP framework for web applications and APIs.
- **Doctrine ORM**: An object-relational mapper for PHP.
- **PostgreSQL**: A reliable, open-source database used for Symfony backend data management.

## Prerequisites

- Docker and Docker Compose installed on your system.
- Symfony CLI installed (optional for local development).

## Getting Started

### Start the Project

To start the project, run the following command:

```bash
docker-compose up --build
```

This will build and start the Docker containers for the backend and frontend services.

## Reverse Proxy Setup

The project includes an Nginx reverse proxy to serve both the Vue frontend and Symfony backend on a single domain.

### Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:3000/api](http://localhost:3000/api)
- **Adminer**: [http://localhost:3000/adminer](http://localhost:3000/adminer)

## Authentication Setup

The project includes authentication using the **Lexik JWT Authentication Bundle** and **Gesdinet JWT Refresh Token Bundle**. To enable authentication, follow these steps:

1. **Generate JWT Keys**:
   Run the following command to generate the required private and public keys for JWT:
   ```bash
   docker exec -it vsb-backend php bin/console lexik:jwt:generate-keypair
   ```

2. **Run Database Migrations**:
   Ensure the database is up-to-date by running the migrations:
   ```bash
   docker exec -it vsb-backend php bin/console doctrine:migrations:migrate
   ```

Once these steps are completed, you can start using the authentication and refresh token features. You can find a Demo of it under /demo

## Useful Commands

### Symfony Backend

- Clear the cache:
  ```bash
  docker exec -it vsb-backend php bin/console cache:clear
  ```

- Run database migrations:
  ```bash
  docker exec -it vsb-backend php bin/console doctrine:migrations:migrate
  ```

- Install Composer dependencies:
  ```bash
  docker exec -it vsb-backend composer install
  ```

### Vue Frontend

- Install npm dependencies:
  ```bash
  docker exec -it vsb-frontend bun install
  ```

- Run the development server:
  ```bash
  docker exec -it vsb-frontend bun dev
  ```

- Build the production assets:
  ```bash
  docker exec -it vsb-frontend bun build
  ```

## License

This project is licensed under the MIT License.