# Coding Platform Frontend 🖥️

This is the frontend for the Nexus Coding Platform, built with React, Vite, and Tailwind CSS. It provides a modern, responsive, and intuitive user interface for interacting with the backend services.

## ✨ Key Features

*   **🔐 User Authentication:** Seamless sign-up, login, and Google OAuth 2.0 single sign-on (SSO).
*   **📝 Problem Solving:** Browse a list of problems, view problem statements, and write code in an integrated editor.
*   **💻 Code Submission:** Submit code for execution against test cases and receive instant feedback on correctness, time, and memory usage.
*   **🤖 AI-Powered Tutor:** Get hints, complexity analysis, and code suggestions from an integrated AI assistant powered by Google Gemini.
*   **📹 Video Solutions:** Watch embedded video solutions for problems.
*   **💬 Community Discussions:** Engage in discussions on problem pages.
*   **📊 Submission History:** Review past submissions to track progress and compare solutions.
*   **🚀 Responsive Design:** Fully responsive UI that works on all screen sizes, built with Tailwind CSS.

## 🛠️ Tech Stack

*   **Framework:** [React](https://reactjs.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Routing:** [React Router v7](https://reactrouter.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **State Management:** React Context API
*   **API Communication:** Axios

## ⚙️ Environment Variables Setup

To run this project locally, create a `.env` file in the `Frontend` root directory and add the following keys. This file is used to store sensitive information and configuration details.

```env
# The Client ID for Google OAuth 2.0
VITE_GOOGLE_CLIENT_ID=<your_google_oauth_client_id>

# The base URL of the backend API
VITE_BACKEND_API=http://localhost:3000
```

**Notes:**
1.  All environment variables accessible in the browser **must** be prefixed with `VITE_`.
2.  The `VITE_GOOGLE_CLIENT_ID` can be found in the `DEPLOYMENT.md` guide.
3.  For production, `VITE_BACKEND_API` should be updated to your deployed backend's URL.

## 🚀 Getting Started

Follow these steps to get the frontend development environment running on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```

2.  **Navigate to the Frontend directory:**
    ```bash
    cd path/to/your/project/Frontend
    ```

3.  **Install dependencies:**
    It is recommended to use `npm ci` for deterministic installs, but `npm install` also works.
    ```bash
    npm ci
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the `Frontend` directory as described in the section above.

5.  **Start the development server:**
    This will start the Vite development server, typically on `http://localhost:5173`.
    ```bash
    npm run dev
    ```

## 📦 Build for Production

To create a production-ready build of the application, run the following command. The output will be placed in the `dist` directory.

```bash
npm run build
```