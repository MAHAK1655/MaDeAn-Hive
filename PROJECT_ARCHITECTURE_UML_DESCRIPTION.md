# Madean Hive - Ecommerce Multi-Vendor Platform
## Architecture & UML Description

---

## Project Overview

**Madean Hive** is a full-stack e-commerce multi-vendor platform with three distinct user roles:
- **Customer** - Browse, purchase, and review products
- **Seller** - Manage products, inventory, orders, and payouts
- **Admin** - Manage categories, coupons, deals, and sellers

**Tech Stack:**
- **Frontend:** React (Vite), TypeScript, Redux Toolkit, Material-UI, Tailwind CSS
- **Backend:** Spring Boot, JPA, MySQL
- **State Management:** Redux Toolkit with async thunks

---

## Core Data Models (TypeScript Interfaces)

### 1. **User & Authentication**

```
┌─────────────────────────────────────────────┐
│         UserRole (Enum)                     │
├─────────────────────────────────────────────┤
│ • ROLE_CUSTOMER                             │
│ • ROLE_SELLER                               │
│ • ROLE_ADMIN                                │
└─────────────────────────────────────────────┘
          △
          │ "has"
          │
┌─────────────────────────────────────────────┐
│           User                              │
├─────────────────────────────────────────────┤
│ - id: number                                │
│ - email: string                             │
│ - fullName: string                          │
│ - mobile: string                            │
│ - password: string                          │
│ - role: UserRole                            │
│ - addresses: Address[]                      │
└─────────────────────────────────────────────┘
          △
          │ "1:many"
          │
┌─────────────────────────────────────────────┐
│         Address                             │
├─────────────────────────────────────────────┤
│ - id: number                                │
│ - name: string                              │
│ - mobile: string                            │
│ - pinCode: string                           │
│ - address: string                           │
│ - locality: string                          │
│ - city: string                              │
│ - state: string                             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│    AuthResponse (API Response)              │
├─────────────────────────────────────────────┤
│ - jwt: string (Bearer Token)                │
│ - role: UserRole                            │
└─────────────────────────────────────────────┘
```

### 2. **Seller & Seller Management**

```
┌─────────────────────────────────────────────┐
│    Seller                                   │
├─────────────────────────────────────────────┤
│ - id: number                                │
│ - email: string                             │
│ - sellerName: string                        │
│ - mobile: string                            │
│ - gstin: string (Tax ID)                    │
│ - password: string                          │
│ - otp: string                               │
│ - accountStatus: string                     │
│ - businessDetails: BusinessDetails          │
│ - bankDetails: BankDetails                  │
│ - pickupAddress: PickupAddress              │
└─────────────────────────────────────────────┘
          △ "has"
          │
    ┌─────┴──────┬──────────┐
    │            │          │
    ▼            ▼          ▼
┌───────────┐ ┌───────────┐ ┌──────────────┐
│ Business  │ │  Bank     │ │  Pickup      │
│ Details   │ │  Details  │ │  Address     │
├───────────┤ ├───────────┤ ├──────────────┤
│-business  │ │-account   │ │-address      │
│ Name      │ │ Number    │ │-locality     │
│           │ │-ifsc Code │ │-city         │
│           │ │-account   │ │-state        │
│           │ │ Holder    │ │-pincode      │
│           │ │ Name      │ │-mobile       │
└───────────┘ └───────────┘ └──────────────┘

┌─────────────────────────────────────────────┐
│    SellerReport                             │
├─────────────────────────────────────────────┤
│ - id: number                                │
│ - seller: Seller (1:1)                      │
│ - totalEarnings: number                     │
│ - totalSales: number                        │
│ - totalRefunds: number                      │
│ - totalTax: number                          │
│ - netEarnings: number                       │
│ - totalOrders: number                       │
│ - canceledOrders: number                    │
│ - totalTransactions: number                 │
└─────────────────────────────────────────────┘
```

### 3. **Products & Categories**

```
┌─────────────────────────────────────────────┐
│    Category                                 │
├─────────────────────────────────────────────┤
│ - id: number                                │
│ - name: string                              │
│ - categoryId: string                        │
│ - level: number (hierarchy level)           │
│ - parentCategory: Category (self-reference) │
└─────────────────────────────────────────────┘
          △
          │ "1:many"
          │
┌─────────────────────────────────────────────┐
│         Product                             │
├─────────────────────────────────────────────┤
│ - id: number                                │
│ - title: string                             │
│ - description: string                       │
│ - mrpPrice: number (Market Rate Price)      │
│ - sellingPrice: number                      │
│ - discountPercent: number                   │
│ - quantity: number                          │
│ - color: string                             │
│ - sizes: string                             │
│ - images: string[] (URLs)                   │
│ - numRatings: number                        │
│ - in_stock: boolean                         │
│ - category: Category (1:many)               │
│ - seller: Seller (1:many)                   │
│ - createdAt: Date                           │
└─────────────────────────────────────────────┘
```

### 4. **Shopping Cart & Orders**

```
┌─────────────────────────────────────────────┐
│         CartItem                            │
├─────────────────────────────────────────────┤
│ - id: number                                │
│ - product: Product (1:1)                    │
│ - size: string                              │
│ - quantity: number                          │
│ - mrpPrice: number                          │
│ - sellingPrice: number                      │
│ - userId: number                            │
└─────────────────────────────────────────────┘
          △
          │ "1:many"
          │
┌─────────────────────────────────────────────┐
│           Cart                              │
├─────────────────────────────────────────────┤
│ - id: number                                │
│ - user: User (1:1)                          │
│ - cartItems: CartItem[] (1:many)            │
│ - totalMrpPrice: number                     │
│ - totalSellingPrice: number                 │
│ - totalItem: number                         │
│ - discount: number                          │
│ - couponCode: string | null                 │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│         OrderStatus (Enum - const)                      │
├─────────────────────────────────────────────────────────┤
│ • PENDING    • CONFIRMED   • SHIPPED                     │
│ • DELIVERED  • CANCELLED                                │
└─────────────────────────────────────────────────────────┘
          △
          │ "has"
          │
┌─────────────────────────────────────────────────────────┐
│         OrderItem                                       │
├─────────────────────────────────────────────────────────┤
│ - id: number                                            │
│ - order: Order (1:many)                                 │
│ - product: Product (1:1)                                │
│ - size: string                                          │
│ - quantity: number                                      │
│ - mrpPrice: number                                      │
│ - sellingPrice: number                                  │
│ - userId: number                                        │
└─────────────────────────────────────────────────────────┘
          △
          │ "1:many"
          │
┌─────────────────────────────────────────────────────────┐
│         Order                                           │
├─────────────────────────────────────────────────────────┤
│ - id: number                                            │
│ - orderId: string (unique reference)                    │
│ - user: User (1:1)                                      │
│ - sellerId: number                                      │
│ - orderItems: OrderItem[] (1:many)                      │
│ - orderDate: string                                     │
│ - deliverDate: string                                   │
│ - orderStatus: OrderStatus                              │
│ - shippingAddress: Address (1:1)                        │
│ - paymentDetails: Record<string, unknown>               │
│ - totalMrpPrice: number                                 │
│ - totalSellingPrice: number                             │
│ - discount: number                                      │
│ - totalItem: number                                     │
└─────────────────────────────────────────────────────────┘
```

### 5. **Coupons & Deals**

```
┌─────────────────────────────────────────────┐
│        Coupon                               │
├─────────────────────────────────────────────┤
│ - id: number                                │
│ - code: string (unique)                     │
│ - discountPercentage: number                │
│ - validityStartDate: string                 │
│ - validityEndDate: string                   │
│ - minimumOrderValue: number                 │
│ - active: boolean                           │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│         Deal                                │
├─────────────────────────────────────────────┤
│ - id: number                                │
│ - discount: number                          │
│ - category: Category (1:1)                  │
│ (Admin-managed promotional deals)           │
└─────────────────────────────────────────────┘
```

### 6. **Reviews & Wishlists**

```
┌─────────────────────────────────────────────┐
│         Review                              │
├─────────────────────────────────────────────┤
│ - id: number                                │
│ - user: User (1:1)                          │
│ - product: Product (1:1)                    │
│ - rating: number (1-5)                      │
│ - reviewText: string                        │
│ - images: string[] (optional)               │
│ - createdAt: Date                           │
│ - orderItem: OrderItem (1:1)                │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│        Wishlist                             │
├─────────────────────────────────────────────┤
│ - id: number                                │
│ - user: User (1:1)                          │
│ - products: Product[] (many:many)           │
│ - createdAt: Date                           │
└─────────────────────────────────────────────┘
```

### 7. **Payments & Payouts**

```
┌─────────────────────────────────────────────┐
│      Payout (Seller Earnings)               │
├─────────────────────────────────────────────┤
│ - id: number                                │
│ - seller: Seller (1:1)                      │
│ - amount: number                            │
│ - status: string (PENDING|COMPLETED)        │
│ - transactionId: string                     │
│ - createdAt: Date                           │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│     Transaction                             │
├─────────────────────────────────────────────┤
│ - id: number                                │
│ - seller: Seller (1:1)                      │
│ - customerId: number                        │
│ - orderId: number                           │
│ - amount: number                            │
│ - type: string (DEBIT|CREDIT)               │
│ - date: Date                                │
└─────────────────────────────────────────────┘
```

---

## Redux State Management Architecture

### Redux Store Structure (RootState)

```
RootState
├── auth (AuthSlice)
│   ├── jwt: string | null
│   ├── role: UserRole | null
│   ├── loading: boolean
│   ├── error: string | null
│   ├── otpSent: boolean
│   └── actions:
│       ├── sendLoginSignupOtp (async)
│       ├── signup (async)
│       ├── signin (async)
│       ├── resetPassword (async)
│       └── logout
│
├── user (UserSlice)
│   ├── user: User | null
│   ├── loading: boolean
│   ├── error: string | null
│   ├── profileUpdated: boolean
│   └── actions:
│       └── fetchUserProfile (async)
│
├── products (ProductSlice)
│   ├── products: Product[]
│   ├── searchProduct: Product[]
│   ├── paginatedProducts: any (pagination object)
│   ├── totalPages: number
│   ├── selectedProduct: Product | null
│   ├── loading: boolean
│   ├── error: string | null
│   └── actions:
│       ├── getAllProducts (async, paginated)
│       ├── getProductById (async)
│       └── searchProduct (async)
│
├── cart (CartSlice)
│   ├── cart: Cart | null
│   ├── loading: boolean
│   ├── error: string | null
│   └── actions:
│       ├── fetchUserCart (async)
│       ├── addItemToCart (async)
│       ├── deleteCartItem (async)
│       ├── updateCartItem (async)
│       └── applyCoupon (async)
│
├── orders (OrderSlice)
│   ├── orders: Order[]
│   ├── currentOrder: Order | null
│   ├── orderItem: OrderItem | null
│   ├── paymentOrder: any | null
│   ├── loading: boolean
│   ├── error: string | null
│   ├── orderCanceled: boolean
│   └── actions:
│       ├── fetchOrders (async)
│       ├── fetchOrderById (async)
│       ├── createOrder (async)
│       ├── cancelOrder (async)
│       └── paymentSuccess (async)
│
├── coupon (CouponSlice)
│   ├── coupons: Coupon[]
│   ├── cart: Cart | null
│   ├── couponApplied: boolean
│   ├── couponCreated: boolean
│   ├── loading: boolean
│   └── error: string | null
│
├── review (ReviewSlice)
│   ├── reviews: Review[]
│   ├── reviewCreated: boolean
│   ├── reviewUpdated: boolean
│   ├── reviewDeleted: boolean
│   ├── loading: boolean
│   └── error: string | null
│   └── actions:
│       ├── fetchReviewsByProductId (async)
│       ├── createReview (async)
│       ├── updateReview (async)
│       └── deleteReview (async)
│
├── wishlist (WishlistSlice)
│   ├── wishlist: Wishlist | null
│   ├── loading: boolean
│   ├── error: string | null
│   └── actions:
│       ├── getWishlistByUserId (async)
│       ├── addProductToWishlist (async)
│       └── removeProductFromWishlist (async)
│
├── aiChatBot (AiChatBotSlice)
│   ├── messages: any[]
│   ├── loading: boolean
│   └── error: string | null
│
├── homePage (CustomerSlice)
│   ├── homePageData: any
│   ├── loading: boolean
│   └── error: string | null
│
│━━━ SELLER STATE ━━━
│
├── sellers (SellerSlice)
│   ├── sellers: Seller[]
│   ├── profile: Seller | null
│   ├── selectedSeller: Seller | null
│   ├── report: SellerReport | null
│   ├── loading: boolean
│   ├── profileUpdated: boolean
│   ├── error: string | null
│   └── actions:
│       ├── fetchSellerProfile (async)
│       ├── fetchSellers (async)
│       ├── fetchSellerById (async)
│       ├── updateSeller (async)
│       ├── updateSellerAccountStatus (async)
│       ├── deleteSeller (async)
│       └── fetchSellerReport (async)
│
├── sellerAuth (SellerAuthenticationSlice)
│   ├── jwt: string | null
│   ├── otpSent: boolean
│   ├── sellerCreated: string | null
│   ├── loading: boolean
│   ├── error: string | null
│   └── actions:
│       ├── sendLoginOtp (async)
│       ├── verifyLoginOtp (async)
│       ├── createSeller (async)
│       └── resetSellerAuthState
│
├── sellerProduct (SellerProductSlice)
│   ├── products: Product[]
│   ├── productCreated: boolean
│   ├── productUpdated: boolean
│   ├── productDeleted: boolean
│   ├── loading: boolean
│   ├── error: string | null
│   └── actions:
│       ├── fetchSellerProducts (async)
│       ├── createProduct (async)
│       ├── updateProduct (async)
│       ├── updateProductStock (async)
│       └── deleteProduct (async)
│
├── sellerOrder (SellerOrderSlice)
│   ├── orders: Order[]
│   ├── loading: boolean
│   ├── error: string | null
│   └── actions:
│       ├── fetchSellerOrders (async)
│       └── updateOrderStatus (async)
│
├── payouts (PayoutSlice)
│   ├── payouts: Payout[]
│   ├── payout: Payout | null
│   ├── loading: boolean
│   ├── error: string | null
│   └── actions:
│       ├── fetchPayoutsBySeller (async)
│       ├── fetchPayoutById (async)
│       └── updatePayoutStatus (async)
│
├── transaction (TransactionSlice)
│   ├── transactions: Transaction[]
│   ├── loading: boolean
│   └── error: string | null
│
├── revenueChart (RevenueChartSlice)
│   ├── data: any
│   ├── loading: boolean
│   └── error: string | null
│
│━━━ ADMIN STATE ━━━
│
├── admin (AdminSlice)
│   ├── categories: Category[]
│   ├── categoryUpdated: boolean
│   ├── loading: boolean
│   ├── error: string | null
│   └── actions:
│       ├── createHomeCategory (async)
│       ├── updateHomeCategory (async)
│       └── fetchHomeCategories (async)
│
├── adminCoupon (AdminCouponSlice)
│   ├── coupons: Coupon[]
│   ├── couponCreated: boolean
│   ├── loading: boolean
│   ├── error: string | null
│   └── actions:
│       ├── createCoupon (async)
│       └── deleteCoupon (async)
│
├── adminDeals (DealSlice)
│   ├── deals: Deal[]
│   ├── dealCreated: boolean
│   ├── dealUpdated: boolean
│   ├── loading: boolean
│   ├── error: string | null
│   └── actions:
│       ├── createDeal (async)
│       ├── updateDeal (async)
│       └── deleteDeal (async)
│
└── deal (DealSlice) [duplicate reference for compatibility]
```

---

## Route Structure

### Customer Routes
- `/` - Home Page
- `/products` - Browse Products (Paginated)
- `/products/:id` - Product Details
- `/cart` - Shopping Cart
- `/checkout` - Checkout Process
- `/orders` - My Orders
- `/account` - User Profile
- `/wishlist` - Saved Items
- `/reviews` - My Reviews

### Seller Routes (Protected by JWT)
- `/seller-dashboard` - Dashboard Overview
- `/seller-products` - Manage Products
- `/seller-orders` - Manage Orders
- `/seller-account` - Profile & Settings
- `/seller-payouts` - Payment History
- `/become-seller` - Onboarding

### Admin Routes (Role-based)
- `/admin-dashboard` - Dashboard
- `/admin-categories` - Manage Categories
- `/admin-coupons` - Manage Coupons
- `/admin-deals` - Manage Deals
- `/admin-sellers` - Manage Sellers

---

## Component Hierarchy

```
App (Protected Routes)
├── CustomerRoutes
│   ├── Navbar
│   │   ├── SearchBar
│   │   ├── CartIcon (with badge)
│   │   └── UserMenu
│   ├── Home
│   │   ├── Banner
│   │   ├── HomeCategory
│   │   ├── TopBrands
│   │   ├── ElectronicCategory
│   │   ├── DealSlider
│   │   └── SellerBanner (with "Madean Hive" branding)
│   ├── Products
│   │   ├── FilterSection
│   │   ├── ProductCard (grid)
│   │   └── Pagination
│   ├── ProductDetails
│   │   ├── ZoomableImage
│   │   ├── ProductInfo
│   │   ├── ReviewSection
│   │   ├── SimilarProducts
│   │   └── AddToCart/Wishlist
│   ├── Cart
│   │   ├── CartItemCard
│   │   ├── PricingSummary
│   │   └── CouponApplyForm
│   ├── Checkout
│   │   ├── AddressForm
│   │   ├── AddressCard
│   │   └── PaymentGateway
│   ├── UserAccount
│   │   └── UserDetails
│   │       ├── PersonalInfo
│   │       └── UpdateModal
│   └── Footer
│
├── SellerRoutes (JWT Protected)
│   ├── SellerDashboard
│   │   ├── RevenueChart
│   │   ├── SalesMetrics
│   │   └── QuickStats
│   ├── Profile (with modalStyle.ts)
│   │   ├── ProfileFildCard
│   │   ├── PersonalDetailsForm
│   │   ├── BusinessDetailsForm
│   │   ├── PickupAddressForm
│   │   └── BankDetailsForm
│   ├── Products
│   │   ├── ProductTable
│   │   └── CreateProductForm
│   └── Orders
│       └── OrderTable (with OrderStatus enum)
│
└── AdminRoutes (Role Protected)
    ├── AdminDashboard
    ├── CategoryManagement
    ├── CouponManagement
    ├── DealManagement
    └── SellerManagement
```

---

## API Integration Points

### Authentication APIs
- `POST /api/auth/send-otp` - Send login OTP
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/reset-password` - Password reset

### Product APIs
- `GET /api/products` - List products (paginated)
- `GET /api/products/:id` - Get product details
- `GET /api/products/search` - Search products
- `POST /api/products` (seller) - Create product
- `PUT /api/products/:id` (seller) - Update product
- `DELETE /api/products/:id` (seller) - Delete product

### Cart & Checkout
- `GET /api/cart` - Fetch user cart
- `POST /api/cart/items` - Add to cart
- `DELETE /api/cart/items/:id` - Remove from cart
- `PUT /api/cart/items/:id` - Update cart item
- `POST /api/orders` - Create order

### Orders
- `GET /api/orders` - Fetch user orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders/:id/cancel` - Cancel order
- `GET /api/seller/orders` (seller) - Fetch seller orders
- `PUT /api/orders/:id/status` (seller) - Update order status

### Coupons & Deals
- `GET /api/coupons` - List coupons
- `POST /api/coupons/apply` - Apply coupon
- `POST /api/admin/coupons` (admin) - Create coupon
- `GET /api/admin/deals` (admin) - List deals

### Seller Management
- `GET /api/seller/profile` - Get seller profile
- `PUT /api/seller/profile` - Update seller profile
- `GET /api/seller/report` - Get seller report
- `GET /api/seller/payouts` - Get payouts
- `PUT /api/seller/payouts/:id` - Update payout status

---

## Key Business Logic Flows

### 1. **User Authentication Flow**
```
User → Enter Email → Send OTP → Verify OTP → Get JWT Token → Store in localStorage
Role determination → Route to Customer/Seller/Admin Dashboard
```

### 2. **Product Purchase Flow**
```
Browse Products → Search/Filter → Add to Cart → Apply Coupon → Checkout
→ Enter Shipping Address → Process Payment → Create Order → Seller Notified
```

### 3. **Seller Order Management Flow**
```
Seller Views Orders → Update Order Status → Customer Notified
→ Generate Payout → Admin Approves → Fund Transfer
```

### 4. **Admin Controls Flow**
```
Admin Dashboard → Manage Categories → Create/Update/Delete Deals
→ Create Coupons → Approve/Reject Sellers → Monitor Reports
```

---

## Technology Stack Summary

### Frontend
| Component | Technology |
|-----------|-----------|
| UI Framework | React 18+ with TypeScript |
| State Management | Redux Toolkit |
| HTTP Client | Axios |
| UI Components | Material-UI (MUI) |
| Styling | Tailwind CSS + Emotion |
| Routing | React Router v6 |
| Build Tool | Vite |
| Icons | Material-UI Icons |

### Backend
| Component | Technology |
|-----------|-----------|
| Framework | Spring Boot |
| Database | MySQL |
| ORM | JPA/Hibernate |
| Security | Spring Security |
| API | REST |
| AI Integration | Spring AI (Optional) |

---

## Key Files & Structure

```
frontend-vite/src/
├── Redux Toolkit/
│   ├── Store.ts (Root store with all slices)
│   ├── Customer/ (Auth, Product, Cart, Order, Review, Wishlist slices)
│   ├── Seller/ (Seller auth, products, orders, payouts, transactions slices)
│   └── Admin/ (Admin, Coupon, Deal slices)
├── types/
│   ├── userTypes.ts (User, Address, UserRole)
│   ├── productTypes.ts (Product, Category)
│   ├── orderTypes.ts (Order, OrderItem, OrderStatus)
│   ├── sellerTypes.ts (Seller, SellerReport)
│   ├── cartTypes.ts (Cart, CartItem)
│   ├── couponTypes.ts (Coupon)
│   ├── reviewTypes.ts (Review)
│   └── [other domain types]
├── routes/
│   ├── CustomerRoutes.tsx
│   ├── SellerRoutes.tsx
│   └── AdminRoutes.tsx
├── customer/pages/ (Home, Products, Cart, Checkout, Account)
├── seller/pages/ (Dashboard, Products, Orders, Account)
├── admin/pages/ (Dashboard, Categories, Coupons, Deals)
└── App.tsx (Protected route components)

backend-spring boot/
└── src/main/java/com/zosh/
    ├── model/ (Entities: User, Product, Order, etc.)
    ├── repository/ (JPA Repositories)
    ├── service/ (Business Logic)
    ├── controller/ (REST Endpoints)
    ├── security/ (JWT, Authentication)
    └── exception/ (Custom Exceptions)

