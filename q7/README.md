# Question 7: MERN E-Commerce Application with 2-Level Category & Admin/User Portal

A complete, clean, simple MERN Stack Shopping Cart application featuring:
1. **2-Level Category Hierarchy**:
   - **Level 1**: Main Category (e.g. Electronics, Fashion)
   - **Level 2**: Sub-Category (e.g. Smartphones under Electronics)
2. **Admin Portal**:
   - Add/Delete 2-Level Categories
   - Add/Delete Products (associated with Main & Sub Category)
   - View Customer Orders
3. **User Store**:
   - Interactive 2-Level Category filter (Select Main Category -> filter Sub Categories -> View Products)
   - Product Grid with Price, Badges, Image & Description
   - Shopping Cart modal drawer with quantity controls, subtotal, checkout form, and order placement.

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js installed
- MongoDB installed & running locally on port 27017 (`mongodb://127.0.0.1:27017/shopping_cart_db`)

---

### Step 1: Start the Backend Server (Express + Mongoose)
1. Open a terminal and navigate to `Que7/server`:
   ```bash
   cd Que7/server
   npm install
   npm start
   ```
   The backend server will run on `http://localhost:5000` and automatically seed initial sample categories & products if the database is empty!

---

### Step 2: Start the Frontend Client (React + Vite)
1. Open a second terminal and navigate to `Que7/client`:
   ```bash
   cd Que7/client
   npm install
   npm run dev
   ```
2. Open your browser at `http://localhost:3000`.

---

## 📁 Project Structure

```
Que7/
├── server/
│   ├── models/
│   │   ├── Category.js    # Schema supporting 2-level hierarchy (parentCategory & level)
│   │   ├── Product.js     # Product schema linking parent & sub categories
│   │   └── Order.js       # Order schema for user checkouts
│   ├── routes/
│   │   ├── categoryRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── package.json
│   └── server.js          # Express server with MongoDB connection & data seeder
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx     # Header navigation & cart count badge
    │   │   ├── UserShop.jsx   # 2-Level Category filter & Product catalog
    │   │   ├── AdminPanel.jsx # Admin dashboard for categories, products & orders
    │   │   └── CartModal.jsx  # Cart drawer modal with checkout form
    │   ├── App.jsx            # State management & API integration
    │   ├── index.css          # Styling
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```
