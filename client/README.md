# Local Eats With Kandyce - Client

Frontend application for the Kandyce Local Eats platform. My first React app.

Built with **React + Typescript + Vite**

---

## Project Structure

```bash
.
├── index.html                  
├── package.json
├── README.md
|── vite.config.ts
├── src
│   ├── App.tsx                 # Route Definitions
│   ├── assets                  # Static Assets
│   ├── components              # Reusable Components
│   │   ├── admin
│   │   ├── non-admin
│   │   └── popups
│   ├── layouts                 # Route layout wrappers
│   │   ├── AdminLayout.tsx
│   │   └── RootLayout.tsx
│   ├── main.tsx                # React entry point
│   ├── pages                   # Route pages
│   │   ├── admin
│   │   └── non-admin
│   ├── schemas                 # Schemas used
│   │   └── schemas.ts
│   ├── utils                   # Helper functions & API utilities
│   │   ├── ExtensionService.ts
│   └---└── RandomFunctions.ts

```

---

## Tech Stack
- React
- TypeScript
- Vite
- React Router
- Fetch API
- Custom CSS

---

## Archetechture

The application is structured by responsibility and user role (admin vs non-admin).

---

### Entry Points
- `main.tsx` - React application bootstrap.
- `App.tsx` - Defines application routes and route hierarchy.

---

### Layout (`src/layouts`)

Shared structural wrappers used with React Router `<Outlet />`.
- `RootLayout` – Customer-facing layout (navigation, global structure)
- `AdminLayout` – Admin dashboard layout
- `Layout.css` – Shared layout styling

Layouts separate UI chrome from page logic.

---

## Pages (`src/pages`)

Organized by user type:
```bash
pages/
├── admin
└── non-admin
```
- `admin/` - Orders, Update Menu
- `non-admin` - Home, Menu, Cart, etc.

Each folder represents route-level components.

---

### Components (`src/components`)

Reusable UI pieces grouped by purpose:
```bash
components/
├── admin
├── non-admin
└── popups
```
- `admin/` – Order management components, menu editing UI
- `non-admin/` – Menu items, cart components, display components
- `popups/` – Modal dialogs and overlays

This keeps UI modular and separated by feature context.

---

### Schemas (`src/schemas`)
- Centralized TypeScript type definitions (schemas.ts)
- Shared interfaces for:
  - Orders
  - Menu Items
  - Categories
  - Customers
Ensures strong type safety across pages and services.

---

### Utilities (`src/utils`)

- ExtensionService.ts
  - Handles API communication with the backend.
- RandomFunctions.ts
  - Shared helper utilities.
Separates business logic from UI components.

---

## Architectural Principles

- Separation of admin and customer logic
- Layout-based route structure
- Type-safe API interaction
- Reusable UI components
- Service layer abstraction for backend calls

---