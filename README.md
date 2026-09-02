# Task Manager

A full-stack **Task Management application** built using the MERN stack. The project provides a RESTful API with MongoDB and a React-based frontend for managing tasks.

## Tech Stack

### Frontend

* React.js
* Vite
* JavaScript (ES6+)
* HTML5
* CSS3
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Development Tools

* Git & GitHub
* Postman
* ESLint
* Prettier
* dotenv

## Features

* Create new tasks
* View all tasks
* View a single task
* Update tasks
* Delete tasks
* RESTful API
* MongoDB database integration
* Mongoose schemas and validation
* React frontend
* Frontend-backend API integration
* Environment variable configuration
* Error handling
* API testing with Postman

## Project Structure

```text
Task-Manager/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/MuzzamilNoor/Task-Manager.git
cd Task-Manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm run dev
```

## API

The backend provides RESTful endpoints for task management.

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/tasks`     | Get all tasks     |
| GET    | `/api/tasks/:id` | Get a single task |
| POST   | `/api/tasks`     | Create a task     |
| PUT    | `/api/tasks/:id` | Update a task     |
| DELETE | `/api/tasks/:id` | Delete a task     |

## API Testing

The API can be tested using **Postman**.

The project follows REST API principles and uses appropriate HTTP methods and status codes for different operations.

## Git Workflow

The project follows a basic professional Git workflow:

```text
main
  │
  └── dev
       │
       └── feature/*
```

Feature development is done on separate branches before merging into the development or main branch.

## Environment Variables

Sensitive configuration such as database credentials and environment-specific settings should be stored in `.env` files.

**Never commit `.env` files or sensitive credentials to GitHub.**

## Project Goals

This project is being developed as a practical MERN Stack learning project to gain hands-on experience with:

* Full-stack development
* RESTful API development
* MongoDB and Mongoose
* React
* Git and GitHub
* API testing
* Authentication and security
* Testing
* Deployment

## Future Improvements

* User registration and login
* JWT authentication
* Password hashing with bcrypt
* Protected routes
* Role-based authorization
* Advanced task filtering and searching
* Centralized error handling
* Automated testing
* API documentation with Swagger/OpenAPI
* Application deployment
