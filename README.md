Fullstack Application with Docker, NestJS, React, and Serverless Framework
This project is a fullstack application that leverages Docker to orchestrate services such as a NestJS backend, a React frontend, a Serverless Framework app, MongoDB, and LocalStack for AWS S3 simulation.

Features
Backend: A NestJS-based REST API.
Frontend: A React application built with Vite.
Serverless: Lambda functions for asynchronous tasks.
MongoDB: Database for persistent storage.
LocalStack: Simulated AWS S3 environment for local development.
Prerequisites
Before running this project, ensure you have the following installed:

Docker
Docker Compose
Environment Variables
Backend Service (backend)
MONGO_URL: MongoDB connection string.
S3_BUCKET_NAME: Name of the S3 bucket for image storage.
S3_ENDPOINT: Endpoint for LocalStack S3.
AWS_REGION: AWS region for S3.
AWS_SECRET_ACCESS_KEY: AWS secret access key for authentication.
AWS_ACCESS_KEY_ID: AWS access key ID for authentication.
Frontend Service (ui)
VITE_API_URL: Backend API URL.
Serverless Service (serverless)
MONGO_URL: MongoDB connection string.
Services
This project is defined with the following services in the docker-compose.yml:

Backend: Accessible on http://localhost:8080.
Frontend (UI): Accessible on http://localhost:5173.
Serverless: Accessible on http://localhost:3000.
LocalStack: Provides AWS S3 simulation on http://localhost:4566.
MongoDB: Database available on mongodb://root:root@localhost:27017.
Setup and Usage
1. Clone the Repository
bash
Copiar código
git clone <repository-url>
cd <repository-folder>
2. Start Services
Run the following command to build and start all services:

bash
Copiar código
docker-compose up --build
3. Verify Services
Backend: Visit http://localhost:8080 or use an API tool like Postman.
Frontend: Visit http://localhost:5173 in your browser.
Serverless: Access serverless endpoints via http://localhost:3000.
LocalStack: Verify S3 bucket setup at http://localhost:4566.
MongoDB: Use a MongoDB client or CLI to connect to mongodb://root:root@localhost:27017.
4. Create the S3 Bucket (LocalStack)
Run the following command to create the S3 bucket:

bash
Copiar código
aws --endpoint-url=http://localhost:4566 s3 mb s3://local-bucket
5. Upload Files to S3 (Optional)
You can upload files to the S3 bucket using:

bash
Copiar código
aws --endpoint-url=http://localhost:4566 s3 cp <file-path> s3://local-bucket/
Directory Structure
plaintext
Copiar código
.
├── backend/              # Backend service (NestJS)
├── ui/                   # Frontend service (React)
├── serverless-app/       # Serverless functions
├── docker-compose.yml    # Docker Compose configuration
└── README.md             # Project documentation
Development Notes
Hot Reloading: Changes in the backend, ui, or serverless-app directories will automatically trigger a rebuild if mounted correctly.
LocalStack: Simulates AWS services like S3 locally. Ensure localstack-data volume persists bucket data.
Troubleshooting
Common Issues
Connection Refused:

Ensure all services are running using docker-compose ps.
S3 Bucket Missing:

Run the aws s3 mb command mentioned above to create the bucket.
MongoDB Authentication Error:

Verify the environment variables MONGO_URL, MONGO_INITDB_ROOT_USERNAME, and MONGO_INITDB_ROOT_PASSWORD.
Useful Commands
Stop all services:
bash
Copiar código
docker-compose down
Rebuild services:
bash
Copiar código
docker-compose up --build
Access service logs:
bash
Copiar código
docker-compose logs <service-name>
License
This project is licensed under the MIT License.
