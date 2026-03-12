# Local Eats With Kandyce

Full-stack food ordering platform with a customer-facing site and an admin dashboard to modify what is in the customer-facing site.

[Link to site](https://localeatswithkandyce.pages.dev)

---

## Project Structure

```bash
.
├── client          # React + Vite frontend
├── documents       # documents
├── README.md
└── server          # Express + Supabase backend
```

---

## Tech Stack

### Frontend (`/client`)
- React (Typescript)
- Vite
- React Router
- Fetch API
- Custom UI Styling

### Backend (`/server`)
- Node.js
- Express
- Supabase (Database + Storage)
- CORS + Cookie-based auth

---

## To Install

### 1. Clone Repository

```bash
git clone https://github.com/ZachRadaza/LocalEatsWithKandyce
cd LocalEatsWithKandyce
```

### 2. Setup Server

```bash
cd server
npm install
```

Create a `.env` file inside `/server` with the following:

```bash
# Example .env 
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret
ADMIN_PASSWORD_HASH=your_admin_password_hash

CLIENT_URL=http://localhost:5173
PORT=3001
NODE_ENV=development
```

Start the server with:

```bash
npm run dev
```

Server runs on:

```bash
https://localhost:3001  # Or whatever port set on .env
```

### 3. Setup Client

Open a new terminal

```bash
cd client
npm install
npm run dev
```

Client runs on:

```bash
http://localhost:5173
```

---
## Features

### Customer Side
- Browse menu by category
- Add items to cart
- Place orders
- Responsive UI
- Email notifications

### Admin Side
- View orders
- Accept / decline orders
- Manage menu items
- Manage categories
- Upload & delete images for menu items (Supabase Storage)

---

## Documents Folder

This folder contains:
  - Database schema design
  - Requirements & Specifications
  - Style Guide
  - Message screenshot for confirmation

---

## Environment Notes
- Client and server run on separate ports (CORS enabled).
- Supabase handles:
    - Database
    - Foreign key relations
    - Public image bucket

---