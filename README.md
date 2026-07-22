**Login mail:admin@erp.com
Password : admin123**

# Mini ERP + CRM Operations Portal

## Overview

Mini ERP + CRM Operations Portal is a full-stack web application developed for a wholesale and distribution business.

The purpose of this system is to help internal teams manage customers, products, inventory, sales challans, stock movements, and customer follow-ups from a single platform.

The application follows a real-world business workflow where sales teams can create challans, warehouse teams can track stock, and admins can manage overall operations.

---

## Features

### Authentication & User Management

- Secure login using JWT authentication
- Role-based user structure
- Supports different user roles:
  - Admin
  - Sales
  - Warehouse
  - Accounts

---

## Customer CRM Module

The CRM module helps manage customer-related activities.

Features:

- Add new customers
- View customer list
- Store customer details:
  - Customer name
  - Mobile number
  - Email
  - Business name
  - GST number
  - Customer type
  - Address
  - Status
  - Follow-up date
  - Notes

- Maintain follow-up records for customers

---

## Product & Inventory Management

The inventory module helps manage products and stock.

Features:

- Add and manage products
- Track:
  - Product name
  - SKU
  - Category
  - Unit price
  - Current stock
  - Minimum stock level
  - Warehouse location

- Low stock monitoring
- Stock movement tracking

---

## Stock Movement Module

Every stock change is recorded for better inventory control.

Tracks:

- Product
- Quantity changed
- Movement type:
  - IN (Stock added)
  - OUT (Stock removed)

- Reason
- Created by
- Timestamp

---

## Sales Challan Module

The challan module manages sales transactions.

Features:

- Select customer
- Add products with quantity
- Automatically generate challan number
- Save challan status:
  - Draft
  - Confirmed
  - Cancelled

Business logic:

- Stock is reduced only after challan confirmation
- Prevents negative stock
- Validates available inventory before confirming challan
- Stores product snapshot details with challan

---

## Dashboard

The dashboard provides a quick overview of business activities.

Displays:

- Total customers
- Total products
- Total challans
- Low stock products
- Recent challan activities
- Stock movement information

---

# Tech Stack

## Frontend

- React.js
- TypeScript
- Tailwind CSS
- Axios
- React Router
- Lucide Icons


## Backend

- Node.js
- Express.js
- TypeScript
- JWT Authentication
- REST APIs


## Database

- MySQL


---

# Project Structure

```
Mini-ERP-CRM

├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── config
│   └── server.ts
│
├── frontend
│   ├── components
│   ├── pages
│   ├── api
│   └── App.tsx
│
└── README.md
```

---

# Installation & Setup

## Backend Setup

Go to backend folder:

```
cd backend
```

Install dependencies:

```
npm install
```

Create a `.env` file:

```
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=mini_erp_crm

JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

## Frontend Setup

Go to frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Create `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# Database Setup

1. Create MySQL database:

```sql
CREATE DATABASE mini_erp_crm;
```

2. Import database tables.

3. Update database credentials in `.env`.

---

# Test Login Credentials

Example:

```
Email:
admin@erp.com

Password:
admin123
```

---

# API Modules

Available APIs:

### Authentication

```
POST /api/auth/login
```

### Customers

```
GET /api/customers

POST /api/customers
```

### Products

```
GET /api/products

POST /api/products
```

### Challans

```
GET /api/challans

POST /api/challans
```

### Follow-ups

```
GET /api/followups/:customerId

POST /api/followups
```

---

# Future Improvements

Some additional features that can be added:

- Invoice generation with PDF export
- Product image upload
- Advanced reporting and analytics
- Cloud deployment
- Email notifications for follow-ups

---

# Author

Developed as a Full Stack Developer case study project.

Technologies used:
React, Node.js, Express, TypeScript, MySQL
