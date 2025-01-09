# HUBXP - CHALLENGE
## Fullstack Application with Docker, NestJS, React, and Serverless Framework
This project is a fullstack application for resolve the challenge proposed By Hubxp.
The project uses the services such as a NestJS backend, a React frontend, a Serverless Framework app, MongoDB, and LocalStack for AWS S3 simulation.

# Features
- Backend: A NestJS-based REST API.
- Frontend: A React application built with Vite.
- Serverless: Lambda functions for asynchronous tasks.
- MongoDB: Database for persistent storage.
- LocalStack: Simulated AWS S3 environment for local development.

# Infrastructure Configuration with Docker Compose
The entire infrastructure required for this project is already pre-configured in the Docker Compose file. This setup simplifies the deployment and orchestration of the necessary services.

# Prerequisites
Before running this project, ensure you have the following installed:

- Docker
- Docker Compose

#  Environment Variables
## Backend Service (backend)
- MONGO_URL: MongoDB connection string.
- S3_BUCKET_NAME: Name of the S3 bucket for image storage.
- S3_ENDPOINT: Endpoint for LocalStack S3.
- AWS_REGION: AWS region for S3.
- AWS_SECRET_ACCESS_KEY: AWS secret access key for authentication.
- AWS_ACCESS_KEY_ID: AWS access key ID for authentication.
## Frontend Service (ui)
- VITE_API_URL: Backend API URL.
## Serverless Service (serverless)
- MONGO_URL: MongoDB connection string.

## Services
This project is defined with the following services in the docker-compose.yml:

# 1.Backend: Accessible on http://localhost:8080.
# 2.Frontend (UI): Accessible on http://localhost:5173.
# 3.Serverless: Accessible on http://localhost:3000.
# 4.LocalStack: Provides AWS S3 simulation on http://localhost:4566.
# 5.MongoDB: Database available on mongodb://root:root@localhost:27017.

## Setup and Usage
1. Clone the Repository:
git clone <repository-url>
cd <repository-folder>
3. Start Services
Run the following command to build and start all services:
docker-compose up --build
3. Verify Services
Backend: Visit http://localhost:8080 or use an API tool like Postman.
Frontend: Visit http://localhost:5173 in your browser.
Serverless: Access serverless endpoints via http://localhost:3000.
LocalStack: Verify S3 bucket setup at http://localhost:4566.
MongoDB: Use a MongoDB client or CLI to connect to mongodb://root:root@localhost:27017.

# Development Notes
### LocalStack: Simulates AWS services like S3 locally. Ensure localstack-data volume persists bucket data. 
## Serverless Function Endpoint

### URL:http://localhost:3000/dev/process-sales-report
- Method: GET
### Query Parameters:
- startDate (string, required): Start date of the range in the format YYYY-MM-DD.
- endDate (string, required): End date of the range in the format YYYY-MM-DD.
- Request Example: GET  localhost:3000/dev/process-sales-report?startDate=2025-01-01&endDate=2025-01-08 HTTP/1.1

### MongoDB Connection:
The function connects to the MongoDB database using the URL specified in the MONGO_URL environment variable. If the connection fails, the function logs an error and does not process the report.

### Response:
![image](https://github.com/user-attachments/assets/84159b81-0a2e-4f49-9a3c-910b93a94e6d)


## Ensure all services are running using docker-compose ps.
- Verify the environment variables MONGO_URL, MONGO_INITDB_ROOT_USERNAME, and MONGO_INITDB_ROOT_PASSWORD.
## Useful Commands
- Stop all services: docker-compose down
- Rebuild services: docker-compose up --build
- Access service logs: docker-compose logs <service-name>


