# ☕ Skybrews Coffee App (Full-Stack)

**Skybrews Coffee App** is a complete full-stack mobile application for a coffee shop, built with **React Native (Expo)** on the frontend and **Node.js/Express** on the backend.  

Originally developed as a **university project (CS375)**, it has evolved into a feature-rich, professional-grade application featuring a live menu, a persistent shopping cart, and a complete simulated checkout flow.


## ✨ Features

### 🧩 Full-Stack Architecture
A true client-server model built with:
- **Frontend:** React Native (Expo)
- **Backend:** Node.js, Express, MongoDB

### 🛒 Persistent Shopping Cart
- Powered by **Zustand** for global state management  
- Users can add, remove, and update item quantities  
- Cart data persists across all screens  

### 💳 Complete Checkout Flow
A smooth, multi-step checkout experience:
1. **My Cart Screen** – Live-updating total price  
2. **Checkout Screen** – Validated user form (Name, Address, Phone)  
3. **Order Success Modal** – Clears cart and navigates home  

### 🍰 Item Details Screen
- Tap any menu item for detailed view  
- Displays large image, full description, and price  

### 🎁 “Surprise Me” Feature
- Fetches a random in-stock item from the backend  
- Displays it in an elegant, animated modal  

### ⚡ Dynamic UI & Feedback
- “Add to Cart” button shows instant visual confirmation (“Added!”)  
- “Cart” tab icon displays live badge with total items  
- Quick access cart icon on “Menu” screen  

### 🎨 Modern & Clean UI
- Custom **light theme** with white and sky-blue color palette  
- Hidden native headers for consistent, seamless design  
- Custom titles for each screen  

### 🌐 Automatic IP Configuration
- Backend server IP is automatically detected from the Expo manifest  
- No manual editing of `apiConfig.ts` required  

---

## 🛠️ Tech Stack

| Frontend (Client) | Backend (Server) |
|--------------------|------------------|
| React Native | Node.js |
| Expo (SDK 49+) | Express |
| TypeScript | Mongoose |
| Expo Router (v2) | MongoDB Atlas |
| Zustand (State Mgmt) | cors |
| expo-constants | dotenv |

---

## 🚀 How to Run

This project uses a **monorepo structure**, with separate `frontend` and `backend` folders.  
You’ll need two terminals — one for each.

---

### 🧰 Prerequisites

- **Node.js** (v18.x or higher)  
- **MongoDB Atlas** account (free tier works fine)  
- **Expo Go App** (on your iOS/Android device — same Wi-Fi as your computer)

---

## 🖥️ Backend Setup (Server)

1. **Navigate to backend folder**
   ```bash
   cd backend
Install dependencies

bash
Copy code
npm install
Create Environment File
Create a .env file inside the backend folder and add:

bash
Copy code
# Replace with your own MongoDB Atlas connection string
# Make sure the database name is 'coffee_shop_db'
MONGODB_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/coffee_shop_db?retryWrites=true&w=majority"
Set MongoDB IP Whitelist

Go to MongoDB Atlas Dashboard → Network Access → Add IP Address

Click "Allow My Current IP Address" and confirm

Populate Database

In Atlas, create a database named coffee_shop_db

Create a collection named menu_items

Click Insert Document → JSON Tab ({ }) and paste the provided menu JSON data

Run the Server

bash
Copy code
node server.js
✅ You should see:

vbnet
Copy code
Success: Connected to MongoDB
Coffee shop server running on port 3000
📱 Frontend Setup (App)
Navigate to frontend folder

bash
Copy code
cd frontend
Install dependencies

bash
Copy code
npm install
Allow Expo Network Access (Windows Firewall)

Open "Allow an app or feature through Windows Defender Firewall"

Find "Node.js JavaScript Runtime"

Check the "Private" box

Run the App

bash
Copy code
npx expo start -c
The -c flag clears cache (recommended for first run)

Scan the displayed QR code using the Expo Go app on your phone

🧭 API Endpoints
Method	Endpoint	Description
GET	/menu	Returns all menu items
GET	/menu/random	Returns a random item (where inStock: true)
GET	/menu/:id	Returns a specific menu item by _id

📂 Project Structure
pgsql
Copy code
skybrews-coffee-app/
│
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── store/
│   ├── apiConfig.ts
│   └── package.json
│
└── README.md
💡 Notes
Ensure both frontend and backend run simultaneously

Both must be connected to the same Wi-Fi network for local testing

You can host the backend online (Render, Vercel, etc.) and update apiConfig.ts with the deployed API URL

🧑‍💻 Author
M. Raheel Nawaz
📧 raheel.nawaz768@gmail.com
🔗 https://github.com/Raheel2k4

🪪 License
This project is licensed under the MIT License — feel free to use and modify.

⭐ If you like this project, consider giving it a star on GitHub!