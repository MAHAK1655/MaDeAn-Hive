# MaDeAn Hive - E-commerce Multi-Vendor Platform

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)
![React](https://img.shields.io/badge/React-18+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)

A full-stack e-commerce multi-vendor platform with three distinct user roles: Customer, Seller, and Admin. Built with React + TypeScript frontend and Spring Boot backend.

## Features

### Customer Features
- Browse and search products with advanced filtering and pagination
- Shopping cart with coupon code support
- Product reviews and ratings
- Wishlist management
- Order tracking with real-time status updates
- Multiple shipping address management

### Seller Features
- Comprehensive dashboard with revenue analytics and charts
- Complete product inventory management (CRUD operations)
- Order management with status updates
- Payout tracking and transaction history
- Sales reports and performance metrics

### Admin Features
- Category and deal management
- Coupon creation and management
- Seller approval and monitoring
- Platform-wide oversight

## Tech Stack

**Frontend:**
- React 18+ with TypeScript
- Vite (Build Tool)
- Redux Toolkit (State Management)
- Material-UI + Tailwind CSS
- React Router v6
- Axios

**Backend:**
- Spring Boot 3.x
- Spring Security + JWT
- JPA/Hibernate
- MySQL
- RESTful API

## Architecture

### User Roles
```
Customer → Browse, Purchase, Review Products
Seller   → Manage Products, Orders, Payouts
Admin    → Manage Categories, Coupons, Sellers
```

### Data Models
- **User Management**: User, Address, Role-based authentication
- **Product System**: Product, Category with hierarchical structure
- **Shopping**: Cart, CartItem with coupon support
- **Orders**: Order, OrderItem with status tracking
- **Seller**: Seller profile, Business details, Bank details, PickupAddress
- **Finance**: Transaction, Payout, SellerReport
- **Engagement**: Review, Wishlist

## Installation

### Prerequisites
- Node.js (v18+)
- Java (JDK 17+)
- MySQL (v8+)
- Maven (v3.8+)

### Backend Setup

1. Configure MySQL database:
properties
# src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/madean_hive
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

2. Build and run:
cd backend-spring-boot
mvn clean install
mvn spring-boot:run
```

Backend will run on `http://localhost:5454

### Frontend Setup

1. Install dependencies:
cd frontend-vite
npm install
```

2. Configure API endpoint:
typescript
// src/config/api.ts
export const API_BASE_URL = 'http://localhost:8080/api';
```

3. Run development server:
npm run dev
```

Frontend will run on `http://localhost:5173`

## Project Structure

```
MaDeAn-hive/
├── frontend-vite/
│   ├── src/
│   │   ├── Redux Toolkit/          
│   │   │   ├── Store.ts
│   │   │   ├── Customer/           
│   │   │   ├── Seller/             
│   │   │   └── Admin/              
│   │   ├── types/                  
│   │   ├── routes/                 
│   │   ├── customer/pages/         
│   │   ├── seller/pages/           
│   │   └── admin/pages/            
│   └── package.json
│
└── backend-spring-boot/
    └── src/main/java/com/zosh/
        ├── model/                   # JPA entities
        ├── repository/              # Data access layer
        ├── service/                 # Business logic
        ├── controller/              # REST endpoints
        └── security/                # JWT authentication
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Built with React, TypeScript, Spring Boot, and MySQL**
