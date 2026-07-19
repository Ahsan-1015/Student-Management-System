# Student Management System

A complete Student Management System built using React (Vite) on the frontend, Node.js + Express on the backend, and MongoDB (via Mongoose) as the database. It features responsive design, advanced search and filter, client-side/server-side validations, and complete CRUD operations.

> **Project report:** See [PROJECT_REPORT.md](PROJECT_REPORT.md) for the requirements, use-case diagram, ER diagram, system architecture, workflow sequence diagram, API specification, and validation rules.

## Technology Stack

- **Frontend**: React (Vite), React Router DOM (v6), Axios, and Custom Vanilla CSS (Premium design with gradients, micro-animations, and responsive layout).
- **Backend**: Node.js, Express, Mongoose (MongoDB ODM), Cors, and Dotenv.
- **Database**: MongoDB.

---

## Project Structure

```text
student-management/
├── backend/
│   ├── config/
│   │   └── db.js          # MongoDB connection handler
│   ├── models/
│   │   └── Student.js     # Student Mongoose Schema
│   ├── routes/
│   │   └── students.js    # Student REST API endpoints
│   ├── server.js          # Express entry point
│   ├── .env               # Backend Environment variables
│   └── package.json       # Backend Dependencies & Scripts
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Custom header navigation
│   │   │   ├── StudentCard.jsx   # Individual student view with actions
│   │   │   ├── StudentForm.jsx   # Form component shared for Add & Edit
│   │   │   └── StudentList.jsx   # Search, filters and card-grid layout
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Dashboard showing all students
│   │   │   ├── AddStudent.jsx   # Add Student page
│   │   │   └── EditStudent.jsx  # Edit Student page
│   │   ├── App.jsx        # Route definitions
│   │   ├── App.css        # Specific component styling
│   │   ├── index.css      # Base styling and design tokens
│   │   └── main.jsx       # App renderer
│   └── package.json       # Frontend Dependencies & Scripts
│
└── README.md              # Project documentation (this file)
```

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+ recommended) and [MongoDB](https://www.mongodb.com/) installed and running on your local machine.

### 1. Setup Backend
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Verify the `.env` file matches your local environment. Default values:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/student_db
   ```
3. Run the development server (runs with nodemon):
   ```bash
   npm run dev
   ```
   The backend server should start on port `5000` and output `MongoDB Connected: ...`.

### 2. Setup Frontend
1. Open another terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser to the URL displayed in the terminal (usually `http://localhost:5173`).

---

## Deploy to Vercel

The frontend and backend are deployed as **two separate Vercel projects** from this same repository. The backend needs a cloud MongoDB database; use a MongoDB Atlas connection string, not `localhost`.

### 1. Prepare MongoDB Atlas

1. Create a MongoDB Atlas cluster and database user.
2. In Atlas Network Access, allow Vercel to reach the database (for a simple first deployment, `0.0.0.0/0`; restrict it later if possible).
3. Copy the SRV connection string, for example `mongodb+srv://<user>:<password>@<cluster>/student_db?retryWrites=true&w=majority`.

### 2. Deploy the backend

1. In Vercel, click **Add New → Project** and import this Git repository.
2. Set **Root Directory** to `backend`. Vercel automatically uses `backend/api/index.js` as the serverless API entry point.
3. Add these environment variables for Production, Preview, and Development:

   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   CLIENT_ORIGIN=https://your-frontend.vercel.app
   ```

4. Deploy and copy the backend URL, e.g. `https://student-api.vercel.app`. Opening that URL should return an API status message.

### 3. Deploy the frontend

1. Create another Vercel project from the same repository and set **Root Directory** to `frontend`.
2. Add the environment variable below (include `/api`, without a trailing slash):

   ```env
   VITE_API_BASE_URL=https://student-api.vercel.app/api
   ```

3. Deploy. The included `frontend/vercel.json` makes refreshes on `/add` and `/edit/:id` work correctly.
4. Return to the backend project, update `CLIENT_ORIGIN` with the exact deployed frontend URL, and redeploy the backend.

> Never commit `.env` files or MongoDB credentials. Use `backend/.env.example` and `frontend/.env.example` only as templates.

---

## Features

1. **Student Database Schema**:
   - Unique `studentId` validation.
   - Validated email address and format.
   - Enums for Departments (`CSE`, `EEE`, `BBA`, `English`, `Mathematics`).
   - Enums for Class/Year (`1st Year`, `2nd Year`, `3rd Year`, `4th Year`).
   - Phone, Date of Birth, Gender, Address, and Admission Date fields.

2. **REST API Endpoints**:
   - `GET /api/students` - Supports query parameters: `search` (searches full name and student ID using case-insensitive regex), `department`, and `class`.
   - `GET /api/students/:id` - Fetches a student by primary database ID (or falls back to studentId query).
   - `POST /api/students` - Validates and adds a new student record. Returns 400 for duplicate IDs or emails.
   - `PUT /api/students/:id` - Updates an existing student record.
   - `DELETE /api/students/:id` - Deletes a student record.

3. **Frontend Dashboard & Form**:
   - **Search & Filters**: Debounced filter controls allow real-time search without flooding the server.
   - **Card Layout**: A modern grid layout with responsive styling, color-coded department tags, and dynamic avatars matching initials.
   - **Form Validation**: Clean required-field warnings, email regex validation, and automatic dates formatting for database storage.
   - **Confirm Delete Dialog**: Modals prevent accidental student deletions.
   - **Loading & Empty States**: Polished loading indicators and "no records found" screens.
