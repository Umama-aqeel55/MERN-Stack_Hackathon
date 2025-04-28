# Task Tracking Application 📝

A Trello-inspired task management web app developed for a hackathon!  
Manage tasks easily through different stages: **To Do → In Progress → Done** with a beautiful and intuitive interface.

## 🚀 Live Links

- **Frontend Live**: (hackathon-frontend-liart-three.vercel.app
)
- **Backend Live (API)**: (hackathon-backend-chi-orcin.vercel.app)

## ✨ Features

- User Authentication (Sign Up / Login)
- Create, Edit, and Delete Tasks
- Drag & Drop between To Do, In Progress, and Done columns
- Assign tasks to users
- Task due dates and priority levels
- Responsive UI for mobile and desktop
- Secure API with JWT Authentication
- Persistent data storage with MongoDB

## 🛠️ Technologies Used

### Frontend
- React.js (Vite)
- React Router
- Context API
- Tailwind CSS
- React DnD
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt.js

## 📦 Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/your-username/task-tracking-app.git
```
## 📦 Frontend Setup

Follow these steps to run the frontend locally:

```
# Go to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

#### 📦 Backend Setup
```
# Go to the backend directory
cd backend

# Install dependencies
npm install

# Start the backend server
npm start
```
### 🔑 Environment Variables Setup
```
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```
