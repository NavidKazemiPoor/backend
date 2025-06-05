# Backend Project
## Overview This repository contains the backend codebase for a E-commerce application. It serves as the API for a web application, handling user authentication, task creation, and data storage. The project is built with Node.js, Express, and MongoDB to ensure scalability, performance, and maintainability.
## Features

User Authentication: Secure user registration and login using JWT.
Task Management: Create, read, update, and delete tasks for authenticated users.
Data Persistence: Store tasks and user data in a MongoDB database.

## Technologies Used

Node.js v18.x: Server-side JavaScript runtime for building the API.
Express.js v4.x: Framework for handling HTTP requests and routing.
MongoDB v6.x: NoSQL database for storing user and task data.
Docker v24.x: Containerization for consistent deployment.

## Installation

Clone the repository:
git clone https://github.com/NavidKazemiPoor/backend.git
cd backend


Install dependencies:
npm install


Set up environment variables:Create a .env file in the root directory and add the following:
PORT=3000
DATABASE_URL=mongodb://localhost:27017/task-manager
JWT_SECRET=supersecretkey123


Run the application:
npm start



## Usage

The server runs at http://localhost:3000.
Use tools like Postman to interact with the API. Example: curl http://localhost:3000/api/tasks



## API Endpoints

GET /api/users: Retrieve all users (admin only).
POST /api/users/register: Register a new user.
POST /api/users/login: Log in and receive a JWT.
GET /api/tasks: Retrieve tasks for the authenticated user.
POST /api/tasks: Create a new task.
PUT /api/tasks/:id: Update a task by ID.
DELETE /api/tasks/:id: Delete a task by ID.

API documentation is available at /api-docs (served via Swagger when the server is running).
## Contributing

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.

## LicenseThis project is licensed under the MIT License. See the LICENSE file for details.
## ContactFor questions or feedback, reach out to Navid KazemiPoor at navid.kazemipoor@example.com or open an issue on GitHub.
