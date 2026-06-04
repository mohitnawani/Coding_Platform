🚀 Coder – Full Stack Coding Platform

A full-stack coding platform inspired by LeetCode where users can practice Data Structures & Algorithms problems, solve challenges, and track their progress.

The platform integrates Judge0 API for secure and scalable online code execution.

📌 Project Status

✅ Backend Completed

✅ Frontend Completed

✅ Judge0 Integrated for Code Execution

✅ Leaderboard System Implemented

✅ Submission History & User Dashboard Live

🛠️ Tech Stack
🔹 Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

Judge0 API Integration

RESTful APIs

🔹 Frontend

React.js

React Router

Context API

Responsive UI

Tailwind CSS / CSS Modules

🔹 Additional Tools

Redis (Caching)

Socket.io (Real-time Features)

✨ Features

🔐 User Authentication (Signup / Login)
- Secure JWT-based authentication
- Email verification
- Password reset functionality

🔒 Protected Routes using JWT

🧠 Create & Solve Coding Problems
- Problem creation with multiple test cases
- Detailed problem descriptions and constraints

⚡ Real-time Code Execution using Judge0
- Support for multiple programming languages
- Instant code compilation and execution

📄 Problem Descriptions with Constraints

🧪 Custom Test Case Support
- Create and test custom test cases
- View execution output and errors

🛡️ Centralized Error Handling

⚙️ Clean MVC Architecture

🏆 Leaderboard System
- Global leaderboard with rankings
- Points-based scoring system
- User statistics and achievements

📊 Submission History
- Track all code submissions
- View submission details and results
- Filter by status and programming language

📈 User Dashboard
- Personal statistics and performance metrics
- Problem-solving progress visualization
- Problem tags and difficulty filtering

🌙 Dark Mode
- System-wide dark/light theme support
- Persistent theme preference

🎓 Social Features
- User profiles with achievements
- Follow other users and compare stats
- Discussion comments on problems

⚡ Code Execution Engine

This platform uses Judge0 API to:

Compile and run code securely

Support multiple programming languages (C++, Python, Java, JavaScript, Go, Rust, etc.)

Execute custom test cases

Return output, errors, and execution time

Handle asynchronous submission polling

🔁 Execution Flow

User submits code

Backend sends code to Judge0 API

Judge0 processes compilation & execution

Backend fetches result

Output displayed to user in real-time

🏗️ Architecture

🔹 Backend Architecture

The backend follows the MVC Pattern:

backend/
│── controllers/
│── models/
│── routes/
│── middleware/
│── config/
│── services/ (Judge0 Integration)
│── server.js

Key Highlights

Secure JWT Authentication

Middleware-based Authorization

Modular API Design

Async Code Execution Handling

Scalable Folder Structure

🔹 Frontend Architecture

frontend/
│── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── context/
│   ├── services/
│   └── App.js

Key Highlights

Component-based UI structure

Reusable custom hooks

Global state management with Context API

API service abstraction layer

Responsive design for all devices

🚀 Getting Started
1️⃣ Clone Repository

git clone https://github.com/mohitnawani/Coding_Platform.git

cd Coding_Platform

2️⃣ Install Dependencies

Backend:
```
cd backend
npm install
```

Frontend:
```
cd frontend
npm install
```

3️⃣ Setup Environment Variables

Create a .env file inside backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_judge0_api_key
REDIS_URL=your_redis_connection_string (optional)

Create a .env file inside frontend folder:

REACT_APP_API_URL=http://localhost:5000

4️⃣ Start Development Servers

Backend:
```
cd backend
npm run dev
```

Frontend:
```
cd frontend
npm start
```

Backend runs at: http://localhost:5000
Frontend runs at: http://localhost:3000

🎯 Project Goals

✅ Build a scalable coding platform

✅ Strengthen backend architecture skills

✅ Implement real-world API integrations

✅ Create engaging user experience with leaderboards and dashboards

✅ Prepare for Software Engineering roles

📸 Screenshots

[Add screenshots of your application here]

🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

📝 License

This project is open source and available under the MIT License.

👨‍💻 Author

**Mohit Nawani**
Final Year Student – DTU (Civil Engineering)
Aspiring Software Developer

For questions or suggestions, feel free to reach out!