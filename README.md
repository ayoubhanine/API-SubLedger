# 🚀 API-SubLedger

A RESTful API for managing user subscriptions, built with **Node.js**, **Express**, **MongoDB Atlas**, and **Docker**. The project includes JWT authentication, unit & integration tests, and a CI pipeline using GitHub Actions.

---

## 📌 Features

- 🔐 User Registration & Login
- 🔑 JWT Authentication
- 👤 User & Admin Roles
- 📦 Subscription Management (CRUD)
- ✅ Request Validation
- 🛡 Protected Routes
- 🧪 Unit & Integration Tests (Jest)
- 🐳 Docker & Docker Compose
- 🤖 GitHub Actions Continuous Integration
- ☁ MongoDB Atlas Database

---

## 🛠 Technologies

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- Express Validator
- Docker
- Docker Compose
- Jest
- Supertest
- GitHub Actions

---

## 📁 Project Structure

```
API-SubLedger
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── tests/
│   ├── integration/
│   └── unit/
├── validators/
├── app.js
├── server.js
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/ayoubhanine/API-SubLedger.git

cd API-SubLedger
```

### Install dependencies

```bash
npm install
```

### Create a .env file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run the server

```bash
npm run dev
```

Server:

```
http://localhost:5000
```

---

# 🐳 Docker

Build and run the application

```bash
docker compose up --build
```

Stop containers

```bash
docker compose down
```

---

# 📡 API Endpoints

## Authentication

### Register

```
POST /auth/register
```

### Login

```
POST /auth/login
```

---

## Subscriptions

### Create Subscription

```
POST /subscriptions
```

### Get All Subscriptions

```
GET /subscriptions
```

### Get Subscription By ID

```
GET /subscriptions/:id
```

### Update Subscription

```
PUT /subscriptions/:id
```

### Delete Subscription

```
DELETE /subscriptions/:id
```

---

# 🧪 Testing

Run all tests

```bash
npm test
```

Includes:

- ✅ Unit Tests
- ✅ Integration Tests

---

# 🤖 Continuous Integration

GitHub Actions automatically:

- Install dependencies
- Run tests
- Verify project integrity

Every push triggers the CI workflow.

---

# 🔒 Authentication

Protected routes require a JWT token.

Example:

```
Authorization: Bearer your_jwt_token
```

---

# 👨‍💻 Author

**Ayoub Hanine**

GitHub:
https://github.com/ayoubhanine

LinkedIn:
https://www.linkedin.com/in/ayoubhanine/

---

# 📄 License

This project is licensed under the MIT License.