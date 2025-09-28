# ⭐ FullStack Intern Coding Challenge  

## 📌 Overview  
This is a **role-based web application** for store ratings. Users can rate stores (1–5), while admins and store owners have different privileges.  

**Tech Stack**:  
- **Frontend:** React.js  
- **Backend:** Express.js / NestJS / Loopback  
- **Database:** PostgreSQL / MySQL  

---

## 🚀 Features  

### 🔑 Authentication  
- Role-based login system (Admin, Normal User, Store Owner).  
- Secure password hashing + JWT authentication.  

### 👨‍💻 System Administrator  
- Add new stores, users (normal/admin).  
- Dashboard with: total users, total stores, total ratings.  
- Manage users (Name, Email, Address, Role).  
- Manage stores (Name, Email, Address, Rating).  
- Search/filter/sort users & stores.  
- View detailed user info.  

### 👥 Normal User  
- Sign up & log in.  
- Update password.  
- Browse/search stores.  
- Submit or update ratings (1–5).  
- View overall store ratings & their submitted rating.  

### 🏪 Store Owner  
- Log in & update password.  
- Dashboard: list of users who rated their store, average rating.  

---

## ✅ Validations  
- **Name:** 20–60 chars  
- **Address:** ≤ 400 chars  
- **Password:** 8–16 chars, must include 1 uppercase + 1 special character  
- **Email:** valid email format  

---

## 📊 Database Schema  

### `users`  
| Field     | Type      | Constraints |
|-----------|----------|-------------|
| id        | INT (PK) | AUTO_INCREMENT |
| name      | VARCHAR  | NOT NULL, 20–60 chars |
| email     | VARCHAR  | UNIQUE, NOT NULL |
| password  | VARCHAR  | Hashed, NOT NULL |
| address   | VARCHAR  | ≤ 400 chars |
| role      | ENUM     | ('ADMIN', 'USER', 'OWNER') |

### `stores`  
| Field     | Type      | Constraints |
|-----------|----------|-------------|
| id        | INT (PK) | AUTO_INCREMENT |
| name      | VARCHAR  | NOT NULL |
| email     | VARCHAR  | UNIQUE, NOT NULL |
| address   | VARCHAR  | NOT NULL |
| owner_id  | INT (FK) | REFERENCES users(id) |

### `ratings`  
| Field     | Type      | Constraints |
|-----------|----------|-------------|
| id        | INT (PK) | AUTO_INCREMENT |
| user_id   | INT (FK) | REFERENCES users(id) |
| store_id  | INT (FK) | REFERENCES stores(id) |
| rating    | INT      | CHECK (1–5) |

---

## ⚙️ Setup Instructions  

### 1️⃣ Clone Repo  
```bash
git clone https://github.com/your-username/fullstack-intern-challenge.git
cd fullstack-intern-challenge
```

### 2️⃣ Backend Setup  
```bash
cd backend
npm install
```

Create `.env` file:  
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_secret_key
```

Run migrations & start server:  
```bash
npm run migrate
npm run dev
```

### 3️⃣ Frontend Setup  
```bash
cd frontend
npm install
npm start
```

---

## 📂 Project Structure  

```
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
```

---

## 🛠 Best Practices  
✔️ RESTful APIs with proper error handling  
✔️ JWT-based authentication  
✔️ Password hashing with bcrypt  
✔️ Sorting, filtering, pagination  
✔️ Responsive UI with form validation  
✔️ Modular & clean code structure  

---

## 📌 Future Improvements  
- ✅ Add unit & integration tests  
- ✅ Deploy to cloud (Vercel/Netlify + Render/Heroku)  
- ✅ Add analytics for dashboards  
- ✅ Implement CI/CD pipeline  

---

## 👨‍💻 Author  
**Your Name**  
- GitHub: [@your-username](https://github.com/your-username)  
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)  
