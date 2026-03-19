# ShopEase — Full Stack E-Commerce App

A full-stack MERN e-commerce platform with JWT authentication, role-based access control, and a dedicated admin dashboard.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT + bcryptjs |

## Features

- Product listings with search, filter by category, sort by price
- Product detail page with quantity selector
- Shopping cart with localStorage persistence
- JWT-based authentication (register / login)
- Role-based access control (User / Admin)
- Checkout with shipping address form
- Order tracking with visual progress bar
- Admin dashboard — revenue stats, manage products, update order status

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Jeet3107/E-Commerce.git
cd E-Commerce
```

### 2. Setup the server
```bash
cd server
npm install
cp .env.example .env
# Edit .env — add your MongoDB Atlas URI and JWT secret
```

### 3. Seed the database
```bash
node seed.js
# Creates 12 products + 2 demo accounts
```

### 4. Setup the client
```bash
cd ../client
npm install
```

### 5. Run both servers
```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev
```

Open http://localhost:5173

## Demo Accounts

| Role | Email | Password |
|---|---|---|
| User | user@ecommerce.com | user123 |
| Admin | admin@ecommerce.com | admin123 |

## API Endpoints

| Method | Route | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/me | Protected |
| GET | /api/products | Public |
| GET | /api/products/:id | Public |
| POST | /api/products | Admin |
| PUT | /api/products/:id | Admin |
| DELETE | /api/products/:id | Admin |
| POST | /api/orders | Protected |
| GET | /api/orders/my | Protected |
| GET | /api/orders/:id | Protected |
| GET | /api/orders | Admin |
| PUT | /api/orders/:id/status | Admin |

---

Built by [Jeet Prajapati](https://github.com/Jeet3107)
# E-commerce---ShopEase
