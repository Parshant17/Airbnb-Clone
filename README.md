# 🏡 Airbnb Clone

This is a full-stack **Airbnb Clone** web application built with **Node.js**, **Express**, **MongoDB**, **EJS**, and **Bootstrap**. It replicates the core functionality of Airbnb, allowing users to view, create, edit, and book property listings.

---

## 📌 Features

- 🌐 Homepage with dynamic listing cards
- 🔍 Location-based search
- 🏠 Create, Edit, and Delete property listings
- 📸 Upload images for listings (via Cloudinary)
- 🔐 User authentication and authorization (Login, Register)
- ⭐ Reviews and Ratings for properties
- 🗺️ Integrated Map for location preview (via Mapbox)
- 📱 Fully responsive design inspired by Airbnb
- ❤️ Like/Save favorite listings (optional/future enhancement)

---

## 🚀 Tech Stack

### 🔧 Backend
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **Passport.js** for authentication
- **Express-session** and **connect-flash**

### 🎨 Frontend
- **EJS** Templating Engine
- **Bootstrap 5**
- **Custom CSS**

### ☁️ Cloud & APIs
- **Cloudinary** for image upload
- **Mapbox** for interactive maps
- **Multer** for file uploads

---

## 🗂️ Folder Structure
Airbnb-Clone/
├── models/ → Mongoose models (User, Listing, Review)
├── routes/ → All Express routes
├── views/ → EJS templates
│ ├── listings/ → All listing-related pages
│ ├── users/ → Login/Register pages
│ └── partials/ → Header, footer, flash messages, etc.
├── public/ → Static assets (CSS, JS, Images)
├── utils/ → Helper functions, middleware
├── app.js → Main server file
├── .env → Environment variables
├── package.json → Dependencies and scripts
└── README.md → Project documentation

## 🛠️ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Parshant17/Airbnb-Clone.git
   cd Airbnb-Clone
Install Dependencies

bash
Copy code
npm install
Set Up Environment Variables

Create a .env file in the root directory and add the following:

env
Copy code
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
MAPBOX_TOKEN=your_mapbox_token
DB_URL=mongodb://localhost:27017/airbnb-clone
SESSION_SECRET=your_session_secret
Run the App

bash
Copy code
npm start
Visit http://localhost:3000 in your browser.
