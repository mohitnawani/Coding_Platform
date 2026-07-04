# 🚀 Nexus Coding Platform - Interview Showcase

## 📌 Elevator Pitch
A scalable, full-stack competitive programming and DSA learning platform. It goes beyond basic CRUD by integrating a **Remote Code Execution (RCE) engine**, an **AI-powered DSA Tutor (Google Gemini)**, and secure **stateful authentication** using JWT and Redis.

---

## 🏗 Tech Stack & Architecture Justification

*   **Backend Framework (Node.js/Express.js):** Chosen for its non-blocking, event-driven architecture, making it highly efficient for handling concurrent API requests, especially during batch test-case execution.
*   **Database (MongoDB/Mongoose):** A NoSQL database was perfect for this use case as problem schemas (test cases, starting templates in multiple languages) can vary greatly in structure.
*   **Caching & Session Management (Redis):** Implemented to securely blocklist JWTs upon user logout. Since JWTs are stateless, Redis provides a fast, in-memory solution to invalidate tokens before their expiration time, ensuring high security.
*   **AI Integration (Google Gemini API):** Leveraged for the "AI Doubt Solver." Chosen over static hint systems to provide dynamic, context-aware code reviews and complexity analysis.
*   **Media Storage (Cloudinary):** Offloaded video solution storage and streaming to Cloudinary to reduce server bandwidth and automatically generate thumbnails/metadata.
*   **Deployment (Vercel):** Utilized Vercel for fast, automated CI/CD pipelines for both the frontend and backend.

---

## 💡 Key Technical Implementations

### 1. Robust Authentication & Authorization
*   **Implementation:** Engineered a dual-auth system supporting both traditional Email/Password (hashed via `bcrypt`) and **Google OAuth 2.0** for seamless SSO.
*   **Security:** Avoided common JWT pitfalls by implementing a Redis-backed token blocklisting mechanism. When a user logs out, their token is stored in Redis until it naturally expires, preventing replay attacks. Role-based access control (RBAC) separates 'Admin/Instructor' privileges from standard users.

### 2. Code Execution Engine Integration
*   **Implementation:** Built a bridge between the platform and remote code execution APIs.
*   **Features:** Handles batch submission of hidden test cases. Captures and parses standard output (stdout), compilation errors, runtime errors, memory usage, and execution time to provide rich feedback to the user.

### 3. Prompt-Engineered AI Tutor
*   **Implementation:** Integrated `@google/genai` (gemini-3-flash-preview).
*   **Highlight:** Applied advanced **prompt engineering** so the AI acts strictly as a tutor. It analyzes time/space complexity and finds bugs *without* spoon-feeding the final code, mimicking a real mock interview environment.

### 4. Media & Community Management
*   **Implementation:** Direct integration with Cloudinary for uploading and streaming video solutions. Added a relational comment schema in MongoDB to support problem-specific community discussions.

---

## 🧠 Challenges Faced & Solutions (Talking Points)

**Challenge 1: Securely Logging Out Users with Stateless JWTs**
*   *Problem:* Standard JWTs cannot be revoked once issued until they expire.
*   *Solution:* Integrated Redis Cloud. Upon logout, the JWT is added to a Redis blocklist with a TTL (Time To Live) equal to the token's remaining validity. Middleware checks this list on every protected route.

**Challenge 2: Preventing the AI from Giving Away Answers**
*   *Problem:* Standard LLM API calls would simply return the corrected code when a user asked a question, defeating the platform's educational purpose.
*   *Solution:* Designed a strict system prompt wrapper around user queries. The prompt explicitly instructs the Gemini model to act as a Socratic tutor, analyzing the user's provided code snippet and returning hints or complexity breakdowns instead of raw solutions.

**Challenge 3: Handling Untrusted Code Submissions**
*   *Problem:* Executing user-submitted code on the main server is a massive security risk (RCE vulnerability).
*   *Solution:* Architected the system to offload code execution to a third-party, sandboxed remote code execution API. Managed batch tokens and asynchronous polling to retrieve results safely without blocking the main event loop.

---

## 📈 Future Scope & Scalability
*   **WebSockets:** Transitioning the remote code execution polling mechanism to WebSockets for real-time output streaming.
*   **Microservices:** Splitting the code execution utility and AI prompt engine into their own microservices to scale them independently during high traffic (e.g., during a hosted coding contest).