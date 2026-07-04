# Coding Platform Backend 🚀

A robust, scalable backend for a competitive programming and Data Structures & Algorithms (DSA) learning platform. It provides a complete ecosystem for solving algorithmic problems, testing code against hidden test cases, AI-assisted learning, and community discussions.

## 🌟 Key Features

*   **🔐 Authentication & Authorization:**
    *   Secure email/password registration and login using `bcrypt` and `JWT`.
    *   Google OAuth 2.0 integration for seamless single sign-on (SSO).
    *   Redis-backed token blocklisting for secure, stateful logouts.
    *   Role-based access control (User vs. Admin roles).
*   **📝 Problem Management:**
    *   Full CRUD operations for coding problems for admins/instructors.
    *   Support for visible/hidden test cases, starter code snippets across multiple languages, tags, and difficulty levels.
    *   Automatic tracking of user-solved problems.
*   **💻 Code Execution Engine:**
    *   Submit and run code in various programming languages.
    *   Batch test case execution with detailed feedback on compilation errors, runtime errors, execution time, and memory usage.
*   **🤖 AI Doubt Solver (Gemini Integration):**
    *   An intelligent, prompt-engineered DSA tutor powered by Google Gemini (`gemini-3-flash-preview`).
    *   Provides hints, code reviews, complexity analysis, and approach suggestions without spoon-feeding the final code.
*   **📹 Video Solutions:**
    *   Direct Cloudinary integration to securely upload, store, and stream video solutions for specific problems.
    *   Automatic thumbnail generation and video duration extraction.
*   **💬 Community Comments:**
    *   Problem-specific comment threads where users can discuss approaches and share insights.
*   **📊 Submission History:**
    *   Detailed history tracking for every code submission, allowing users to review their past attempts and code logic.

## 🛠️ Tech Stack

*   **Runtime Environment:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB (via Mongoose)
*   **Caching & Sessions:** Redis (Redis Cloud)
*   **Authentication:** JSON Web Tokens (JWT), Google Auth Library
*   **AI SDK:** `@google/genai` (Google Gemini)
*   **Media Storage:** Cloudinary
*   **Code Execution:** Integrated with third-party remote code execution APIs (via internal batch submission utilities).

## ⚙️ Environment Variables Setup

To run this project locally, create a `.env` file in the root directory and add the following keys:

```env
# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Databases
DB_CONNECT_STRING=<your_mongodb_connection_string>
REDIS_PASS=<your_redis_password>

# Authentication
JWT_KEY=<your_jwt_secret_key>
CLIENT_ID=<your_google_oauth_client_id>
CLIENT_SECRET=<your_google_oauth_client_secret>

# Media / Cloudinary
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

# AI Integration
GOOGLE_API_KEY=<your_google_gemini_api_key>
```

## 🚀 Getting Started

1.  **Clone the repository**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    node src/index.js
    ```

## 📂 Folder Structure Highlights

*   `src/controllers/`: Contains the core business logic (auth, problem creation, code submission, AI tutor, video uploads, etc.).
*   `src/models/`: Mongoose schemas for Users, Problems, Submissions, Comments, and Video Solutions.
*   `src/routes/`: Express route definitions connecting HTTP endpoints to their respective controllers.
*   `src/config/`: Configuration files for MongoDB, Redis, and Google Auth.
*   `src/utils/`: Helper functions, including `problemUtility` for handling remote code execution tokens and validations.

