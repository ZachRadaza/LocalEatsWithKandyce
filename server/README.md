# Local Eats With Kandyce - Server

Backend API for the Kandyce Local Eats platform.

Built with **Node.js, Express, and Supabase**.
Handles authentication, menu management, orders, customers, and email notifications.

---

## Project Structure

```bash
.
├── api
│   ├── config
│   │   └── supabase.js
│   ├── controllers
│   ├── middleware
│   ├── routers
│   └── services
├── index.js
├── package.json
└── README.md
```

#### Folder Responsibilities
- `config/` – Third-party client configuration (Supabase)
- `controllers/` – HTTP request handling logic
- `middleware/` – Route protection & shared middleware
- `routers/` – Route definitions
- `services/` – Business logic & database interaction

---

## Tech Stack

- Node.js
- Express
- Supabase (Database + Storage)
- Cookie-based authentication
- CORS
- Nodemon (development)

--- 

## Authentication

- Admin login uses cookie-based authentication.
- Protected routes use `require-admin` middleware.
- JWT secret stored in environment variables.

---

## API Structure

Base path:
```bash
/api
```

#### Core Routes
| Route          | Purpose               |
| -------------- | --------------------- |
| `/admin`       | Admin login/logout    |
| `/categories`  | Category CRUD         |
| `/items`       | Menu item CRUD        |
| `/orders`      | Order management      |
| `/order-items` | Order item operations |
| `/customers`   | Customer creation     |
| `/email`       | Email notifications   |

All routes return JSON responses in the format:
```bash
{
  "success": true,
  "data": {},
  "error": error     # If errors present, not inlcuded if none
}
```

---

## Architecture Overview

The server follows a layered architecture:

### Routers
Define endpoints and map them to controllers.

### Controllers
Handle request/response logic and call services.

### Services
Contain business logic and Supabase queries.

### Config
Centralized Supabase client setup.

### Middleware
Route protection and reusable request logic.

This separation ensures:
- Clean code organization
- Maintainability
- Easier debugging
- Testability of services

---

## Database

Supabase handles:
- Categories (1 to many Items)
- Orders (1 to many OrderItems)
- Customers
- Storage bucket for menu images

Foreign key relationships are enforced at the database level.

---

## Storage

Menu images are stored in a Supabase public bucket.

Image lifecycle:
- Upload on item creation/update
- Delete from bucket when item is removed

---

## CORS Configuration

Client and server run on separate ports:
- Client on http://localhost:5173
- Server on http://localhost:3001

CORS is configured to allow credentials and cookie transmission.

---