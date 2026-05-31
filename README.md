# 🚀 rushChat

A real-time, room-based chat application built with **React**, **Express**, and **Socket.IO**. Users can sign up, log in, create public chat rooms, and exchange messages instantly with anyone who joins the same room.

---

## ✨ Features

- 🔐 **User Authentication** – Register and log in with email + password, secured with bcrypt hashing and JWT tokens.
- 💬 **Real-Time Messaging** – Messages are delivered instantly via WebSockets (Socket.IO).
- 🏠 **Custom Chat Rooms** – Create your own room, browse the live room list, and join any active room.
- 🔄 **Auto Room Switching** – Leaving a previous room and joining a new one is handled seamlessly.
- 🎨 **Modern UI** – Built with Chakra UI + Tailwind CSS for a clean, responsive interface.
- 📦 **Session Persistence** – Auth state is stored in `localStorage` so users stay logged in across reloads.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **React 18** + **Vite** (fast dev server & bundler)
- **React Router DOM** (client-side routing)
- **Chakra UI** + **Tailwind CSS** (UI / styling)
- **Socket.IO Client** (WebSocket communication)
- **Axios** (HTTP requests to the auth API)
- **React Icons** + **Framer Motion**

### Backend (`/server`)
- **Node.js** + **Express** (REST API)
- **Socket.IO** (real-time bidirectional communication)
- **MongoDB** + **Mongoose** (user data persistence)
- **bcrypt** (password hashing)
- **jsonwebtoken** (JWT auth)
- **dotenv** (environment variables)
- **cors**

---

## 📁 Project Structure

```
rushChat/
├── client/                    # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── authApi.js          # Axios instance for the auth API
│   │   ├── common/
│   │   │   ├── AllRoutes.jsx       # Route definitions (public vs. private)
│   │   │   └── useAuth.jsx         # Auth context (login/logout/state)
│   │   ├── components/
│   │   │   ├── Home/HomePage.jsx           # Chat dashboard (rooms + messages)
│   │   │   ├── LandingPage/landingPage.jsx # Public landing page
│   │   │   ├── Login/Login.jsx             # Login form
│   │   │   ├── SignIn/SignUp.jsx           # Registration form
│   │   │   └── ErrorPage/PageNotFound.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── server/                    # Express + Socket.IO backend
    ├── config/
    │   └── dbconfig.js              # MongoDB connection
    ├── controller/
    │   └── users.controller.js      # Register / login handlers
    ├── middleware/
    │   └── authVerify.js            # JWT verification middleware
    ├── model/
    │   └── users.model.js           # Mongoose user schema
    ├── routes/
    │   └── users.routes.js          # /auth/user routes
    ├── service/
    │   └── jwtgenrator.js           # JWT token generator
    ├── index.js                     # Server entry + Socket.IO logic
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm**
- A **MongoDB** instance (local or MongoDB Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/Divanshu-Gupta-612/rushChat.git
cd rushChat
```

### 2. Set up the server

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
MongoDBuRL="your_mongodb_connection_string_here"
PORT=8000
```

Start the backend:

```bash
npx nodemon index.js
# or
node index.js
```

The server will run on `http://localhost:8000`.

### 3. Set up the client

In a new terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will start on `http://localhost:5173` (default Vite port).

> **Note:** By default, the client's Axios instance points to a deployed backend (`https://rushchat.onrender.com`) and the Vite dev server proxies socket traffic to a deployed server. To run fully locally, update:
> - `client/src/api/authApi.js` → set `baseURL` to `http://localhost:8000`
> - `client/vite.config.js` → set the `socket.io` proxy target to `http://localhost:8000`

---

## 📡 API Endpoints

Base URL: `/auth/user`

| Method | Endpoint    | Description                              | Body                                   |
|--------|-------------|------------------------------------------|----------------------------------------|
| POST   | `/register` | Create a new user account                | `{ username, email, password }`        |
| POST   | `/login`    | Log in and receive user data + JWT token | `{ email, password }`                  |

---

## 🔌 Socket.IO Events

### Client → Server

| Event        | Payload                  | Description                                       |
|--------------|--------------------------|---------------------------------------------------|
| `createRoom` | `roomName`               | Creates a new chat room                           |
| `joinRoom`   | `prevRoom`, `currentRoom`| Leaves the previous room and joins the new one    |
| `msgSent`    | `room`, `message`        | Sends a message to everyone else in the room      |

### Server → Client

| Event         | Payload              | Description                                          |
|---------------|----------------------|------------------------------------------------------|
| `id`          | `socket.id`          | Broadcasts a new user's socket ID on connection      |
| `customRooms` | `{ roomName: true }` | Sends the current list of available rooms            |
| `receiveMsg`  | `{ id, msg }`        | Delivers an incoming message from another user       |

---

## 🧭 App Flow

1. User lands on the **Landing Page** → chooses **Login** or **Sign Up**.
2. On successful auth, the JWT and user data are saved in `localStorage` and the user is redirected to the **Home Page**.
3. The Home Page establishes a Socket.IO connection and receives the live list of rooms.
4. The user can **create** a new room or **join** an existing one from the sidebar.
5. Messages sent in a room are broadcast to all other members in real time.
6. Clicking **Logout** clears the stored credentials and returns the user to the landing page.

---

## ⚠️ Notes & Known Improvements

This project is a learning build — a few things worth tightening before going to production:

- The `.env` file should **never** be committed; add it to `.gitignore` and rotate any exposed credentials.
- The JWT signing secret is currently hardcoded in `middleware/authVerify.js` and `service/jwtgenrator.js`. Move it to an environment variable (e.g. `JWT_SECRET`).
- Messages are not persisted — they live only as long as the socket connection. Add a `messages` collection in MongoDB to support chat history.
- Room state is held in memory on the server (`custom_rooms`), so it resets on every restart.
- The `joinRoom` flow could broadcast a "user joined" system message for better UX.

---

## 👤 Author

**Divanshu Gupta**
🔗 [GitHub Profile](https://github.com/Divanshu-Gupta-612)

---

## 📄 License

This project is licensed under the **ISC License**.
