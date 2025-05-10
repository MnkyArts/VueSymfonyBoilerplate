# VueSymfonyBoilerplate

This project is a boilerplate for a Vue.js frontend and Symfony backend application. It provides a pre-configured setup for developing modern web applications with a Vue.js frontend and a Symfony backend.

## Project Structure

- **backend/**: Contains the Symfony backend application.
- **frontend/**: Contains the Vue.js frontend application.
- **docker-compose.yaml**: Docker configuration for running the project.

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

### Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:3000/api](http://localhost:3000/api)

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

## Reverse Proxy Setup

The project includes an Nginx reverse proxy to serve both the Vue frontend and Symfony backend on a single domain.

### Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:3000/api](http://localhost:3000/api)

## Troubleshooting

### Symfony Backend

- If the backend is not accessible, ensure that the `--allow-all-ip` flag is set in the Symfony serve command.

### Vue Frontend

- If the frontend is not accessible, ensure that the `--host` flag is set in the `vite` dev script.

## License

This project is licensed under the MIT License.