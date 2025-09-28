⭐ FullStack Intern Coding Challenge
📌 Overview

This project is a role-based web application that enables users to rate stores on the platform. The system supports three types of users:

System Administrator – manages users, stores, and ratings.

Normal User – can register, log in, view stores, and submit/modify ratings.

Store Owner – can log in, manage their profile, and view ratings for their store.

The application is built with:

Frontend: React.js

Backend: Express.js / Loopback / NestJS (choose one)

Database: PostgreSQL / MySQL

⚙️ Features
🔑 Authentication & Authorization

Role-based login system (Admin, Normal User, Store Owner).

User signup and login functionality.

Secure password storage with validations.

👨‍💻 System Administrator

Add new stores, normal users, and admin users.

Dashboard with:

Total number of users

Total number of stores

Total number of submitted ratings

Manage users (Name, Email, Password, Address, Role).

Manage stores (Name, Email, Address, Overall Rating).

Search and filter by Name, Email, Address, and Role.

View detailed user info (with store rating if Store Owner).

👥 Normal User

Sign up (Name, Email, Address, Password).

Update password.

Browse and search stores by Name and Address.

Store listing includes:

Store Name

Address

Overall Rating

User’s Submitted Rating

Submit and update ratings (1–5).

🏪 Store Owner

Log in and update password.

Dashboard includes:

List of users who submitted ratings for their store

Average store rating

✅ Validations

Name: Min 20, Max 60 characters

Address: Max 400 characters

Password: 8–16 characters, at least 1 uppercase & 1 special character

Email: Standard email validation

📊 Database Schema (Suggested)
Users Table
Field	Type	Constraints
id	INT (PK)	AUTO_INCREMENT
name	VARCHAR	NOT NULL, 20–60 chars
email	VARCHAR	UNIQUE, NOT NULL
password	VARCHAR	Encrypted, NOT NULL
address	VARCHAR	Max 400 chars
role	ENUM	(‘ADMIN’, ‘USER’, ‘OWNER’)
Stores Table
Field	Type	Constraints
id	INT (PK)	AUTO_INCREMENT
name	VARCHAR	NOT NULL
email	VARCHAR	UNIQUE, NOT NULL
address	VARCHAR	NOT NULL
owner_id	INT (FK)	REFERENCES users(id)
Ratings Table
Field	Type	Constraints
id	INT (PK)	AUTO_INCREMENT
user_id	INT (FK)	REFERENCES users(id)
store_id	INT (FK)	REFERENCES stores(id)
rating	INT	CHECK (1–5)
🚀 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/fullstack-intern-challenge.git
cd fullstack-intern-challenge

2️⃣ Backend Setup
cd backend
npm install


Configure .env file with:

PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret


Run migrations & start server:

npm run migrate
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm start

📂 Project Structure (Suggested)
fullstack-intern-challenge/
│── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── utils/
│   ├── .env
│   └── package.json
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── public/
│   └── package.json
│
└── README.md

🛠 Best Practices Followed

JWT-based authentication for secure login.

Password hashing with bcrypt.

RESTful APIs with proper error handling.

Pagination, sorting, and filtering on listings.

Responsive UI with form validations.

Clean code with modular structure.

📌 Future Enhancements

Add role-based dashboards with analytics.

Implement unit & integration tests.

Deploy on cloud (Heroku/Render + Vercel/Netlify).

Add CI/CD pipeline for automated deployment.
