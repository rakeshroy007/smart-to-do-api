# 📝 Smart ToDo API 

A robust RESTful API built with Node.js and Express to manage your daily tasks. This API features secure user authentication, task ownership protection, and data validation.

---

## 🎯 Overview
At its core, the API empowers users to:
* **Secure Authentication**: Register and login with encrypted credentials and JWT-based session management.
* **Full CRUD Lifecycle**: Effortlessly Create, Read, Update, and Delete personal tasks.
* **Granular Control**: Organize productivity using priority levels and real-time status tracking.
* **Optimized Performance**: Handle large datasets gracefully with built-in pagination support.

---

## 🚀 Features

* **User Authentication**: Secure Sign-up and Login using JWT (JSON Web Tokens).
* **Password Security**: Industry-standard password hashing using `bcrypt`.
* **Task Management**: Full CRUD (Create, Read, Update, Delete) for personal tasks.
* **Ownership Protection**: Users can only access, edit, or delete their own tasks.
* **Input Validation**: Strict data sanitization and validation using `express-validator`.
* **Global Error Handling**: Centralized middleware for clean and consistent error responses.
* **Pagination**: Optimized task retrieval for better performance.

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js** | JavaScript Runtime |
| **Express.js** | Web Framework |
| **MongoDB** | NoSQL Database |
| **Mongoose** | MongoDB Object Modeling |
| **JWT** | Secure Authorization |
| **Bcrypt** | Password Hashing |
| **nodemon** | Automatically restart a Node.js application |

---

## ⚙️ Getting Started

Follow these steps to get your local development environment running.

### 1. Prerequisites
Make sure you have **Node.js** (v18 or higher) and **MongoDB** installed on your machine.

### 2. Installation
Clone the repository and install the necessary dependencies:
```bash
git clone <repository-url>
cd ToDo-API
npm install
```

### 3. Set up Environment Variables
 - Copy `.env.example` to a new file named `.env`.
 - Fill in your `MONGO_URI` and `JWT_SECRET`.

### 4. Run the server
```bash
nodemon .\app.js
```

### 🔒 API Endpoints
**Auth**
 - `POST /api/auth/signup` - Register a new user
 - `POST /api/auth/login` - Login and get token

**Tasks**
 - `GET /api/tasks` - Get all user tasks (Requires Auth)
 - `POST /api/tasks` - Create a new task (Requires Auth)
 - `PUT /api/tasks/:id` - Update a task (Requires Ownership)
 - `DELETE /api/tasks/:id` - Delete a task (Requires Ownership)


## 📂 Project Structure

```text
ToDo-API/
├── src/
│   ├── config/          # Database connection & Env setup
│   ├── controllers/     # Business logic for routes
│   ├── middleware/      # Auth, Ownership, & Error handlers
│   ├── models/          # Mongoose Schemas (User, Task)
│   ├── routes/          # API Endpoint definitions
│   ├── utils/           # Helper functions (JWT, Validators)
│   └── app.js           # Entry point
├── .env.example         # Template for environment variables
├── .gitignore           # Files to exclude from Git
└── package.json         # Dependencies & Scripts
```

