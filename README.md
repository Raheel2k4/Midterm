# ☕ Skybrews Coffee App (Full-Stack)

This is a complete full-stack mobile application for a coffee shop, built with React Native (Expo) on the frontend and Node.js/Express on the backend.

The app allows users to view the full coffee menu, fetched from a live MongoDB database, and request a random "surprise" item. This project was built to fulfill the requirements of the CS375 Mobile Application Development Mid-Term Examination.

## 📱 App Demo

A full video recording demonstrating the app's features and functionality is included in the root of this repository.

**[Click to view App Demo (demo.mp4)]**

*(Just replace `YOUR_VIDEO_FILE.mp4` with the actual name of your video file, like `demo.mp4`)*

<p align="center">
  </p>

## ✨ Features

* **Full-Stack Architecture:** A true client-server model with a React Native app and a Node.js backend.
* **Dynamic Menu:** View all menu items, populated directly from a MongoDB Atlas database.
* **"Surprise Me" Feature:** Fetches a random item from the backend, but only if it's marked as `inStock: true`.
* **Elegant UI:** A clean, modern, and professional light-themed UI with sky-blue accents.
* **Custom Modal:** A polished, custom-built modal for the "Surprise Me" feature instead of a basic system alert.
* **Headerless Design:** Custom-built titles and headers directly within each screen for a seamless look.

## 🛠️ Tech Stack

| Frontend (Client) | Backend (Server) |
| :--- | :--- |
| React Native | Node.js |
| Expo | Express |
| TypeScript | Mongoose |
| Expo Router | MongoDB Atlas |
| `expo-linear-gradient` | `cors` |
| `dotenv` | |

## 🚀 How to Run

This project is in a monorepo structure. You will need **two separate terminals** to run it (one for the backend and one for the frontend).

### Prerequisites

* **Node.js** (v18.x or higher)
* **MongoDB Atlas Account:** You need a free account and a connection string.
* **Expo Go App:** On your physical iOS or Android device.

---

### 1. Backend Setup (The Server)

This is the "brain" of your app.

1.  **Navigate to the backend:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create Environment File:**
    Create a file named `.env` in the `backend` folder. This is critical for connecting to your database. Paste the following into it and add your MongoDB connection string:

    ```env
    # Replace with your own MongoDB Atlas connection string
    # Make sure the database name is 'coffee_shop_db'
    MONGODB_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/coffee_shop_db?retryWrites=true&w=majority"
    ```

4.  **Run the server:**
    ```bash
    node server.js
    ```
    If successful, you will see:
    `Success: Connected to MongoDB`
    `Coffee shop server running on port 3000`

---

### 2. Frontend Setup (The App)

This is the app your users see.

1.  **Open a *second* terminal** and navigate to the frontend:
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **IMPORTANT: Configure Your IP Address**
    Your mobile phone cannot talk to `localhost`. You must tell the app your computer's local IP address.

    * Open the file: `frontend/apiConfig.ts`
    * Find your computer's **local Wi-Fi IP address** (e.g., `192.168.1.10`).
    * Change the `API_URL` to match your IP:

    ```ts
    // This IP MUST be your computer's IP address on the local network
    const API_URL = '[http://192.168.186.1:3000](http://192.168.186.1:3000)'; 
    
    export default API_URL;
    ```

4.  **Run the app:**
    ```bash
    npx expo start
    ```

5.  A QR code will appear in your terminal. Scan this code with the **Expo Go** app on your phone. The app will build and launch.

## API Endpoints

The Express server exposes the following endpoints:

* **`GET /menu`**
    * Returns a JSON array of all menu items in the database.

* **`GET /menu/random`**
    * Finds all items where `inStock` is `true`.
    * Returns a single random JSON object from that list.
    * Returns a `404` error if no items are currently in stock.