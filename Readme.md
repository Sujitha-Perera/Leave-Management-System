# Leave Management System

## Project Overview

The Leave Management System is a web application that replaces manual leave request processes in organizations. It allows employees to submit leave requests and enables managers to review, approve, or reject them efficiently.

The system uses role-based access control, where employees and managers have different capabilities.

## Key Features

### Employee

- Register as employee
- Login to the system
- Request leave
- View own leave history
- Track leave status

### Manager

- Register as manager
- Login to the system
- View all leave requests
- Approve or reject leave
- Create employees
- Manage users

## System Architecture

The system follows a 3-tier architecture:

Frontend (React + Tailwind)  
Backend API (Golang + Gin)  
Database (PostgreSQL)

## Technologies Used

### Frontend

- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend

- Golang
- Gin Framework
- GORM (ORM)
- JWT Authentication
- bcrypt (password hashing)

### Database

- PostgreSQL

## Database Design

The system consists of 2 main tables.

### Users Table

Stores employee and manager data.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(120) UNIQUE,
    password_hash TEXT,
    role VARCHAR(20),
    created_at TIMESTAMP
);
```

### Leave Requests Table

Stores leave data.

```sql
CREATE TABLE leave_requests (
    id SERIAL PRIMARY KEY,
    user_id INT,
    start_date DATE,
    end_date DATE,
    reason TEXT,
    status VARCHAR(20),
    reviewed_by INT,
    created_at TIMESTAMP
);
```

### Relationship

User (1) to Many Leave Requests

## API Endpoints

### Auth

- POST /register: Register user
- POST /login: Login user

### Users (Manager Only)

- GET /users: Get all users
- POST /users: Create employee

### Leave (Employee)

- POST /leave: Request leave
- GET /leave/my: Get my leaves

### Leave (Manager)

- GET /leave: Get all leaves
- PUT /leave/{id}/approve: Approve leave
- PUT /leave/{id}/reject: Reject leave

### Authorization Header

```http
Authorization: Bearer <token>
```

## System Workflow

### Step 1: Sign Up

Users choose role:

- Employee
- Manager

### Step 2: Login

- User logs in with email and password
- JWT token is generated

### Step 3: Role-Based Access

- Employee: My Leaves
- Manager: Dashboard

### Step 4: Employee Actions

- Request leave
- View own leave

### Step 5: Manager Actions

- View all leave requests
- Approve or reject leave
- Create employees

## Security Design

- Passwords are hashed using bcrypt
- Authentication is handled using JWT tokens
- Role-based middleware for employee and manager routes

## Installation and Setup

### 1. Clone Project

```bash
git clone <your-repo-link>
cd project-folder
```

### 2. Backend Setup

```bash
cd backend
go mod tidy
```

### 3. Create .env File

```env
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=leave_system
JWT_SECRET=secret123
```

### 4. Create Database

```sql
CREATE DATABASE leave_system;
```

### 5. Run Backend

```bash
go run main.go
```

Backend runs at: http://localhost:8080

### 6. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

## How to Run the System

1. Start PostgreSQL
2. Run backend server
3. Run frontend
4. Open browser

## Testing Flow

1. Register as Manager
2. Login as Manager
3. Create Employee
4. Login as Employee
5. Request Leave
6. Approve or reject leave from manager panel
