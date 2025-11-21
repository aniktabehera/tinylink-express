<h1 align="center">🔥 TinyLink – URL Shortener Application 🔥</h1>

<p align="center">
  A clean, fast, and fully functional URL shortener built with 
  <strong>Node.js, Express, EJS, TailwindCSS, and Neon PostgreSQL</strong>.  
  <br/>
  Developed as part of the Aganitha Full-Stack Developer Assignment.
</p>

<p align="center">
  <a href="https://tinylink-express.onrender.com">
    <img src="https://img.shields.io/badge/Live Demo-Render-success?style=for-the-badge" />
  </a>
  <img src="https://img.shields.io/badge/Node.js-Express-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Production Ready-brightgreen?style=for-the-badge" />
</p>

---

## 🚀 Live Application

👉 **Deployed URL:**  
🔗 https://tinylink-express.onrender.com  

---

## 🧠 Problem Statement  
Develop a full-stack **URL shortening system** with the following features:

- Convert long URLs → short codes  
- Optionally use custom short codes  
- Redirect short URLs to original URLs  
- Track total clicks and last clicked timestamp  
- Dashboard to view and delete URLs  
- Persistent storage using **Neon PostgreSQL**  
- Fully deployed version accessible publicly  

**This project meets 100% of the assignment requirements.**

---

## 🧩 Architecture Overview

+-----------------------------+
| Client (UI) |
| EJS + JS + TailwindCSS |
+-------------+---------------+
|
v
+-----------------------------+
| Express.js Backend |
| Controllers, Routes, Utils |
+-------------+---------------+
|
v
+-----------------------------+
| Neon PostgreSQL Database |
| URLs, Clicks, Metadata |
+-----------------------------+


---

## 🛠 Tech Stack

### **Frontend**
- HTML5
- EJS (Templating)
- TailwindCSS
- Vanilla JavaScript

### **Backend**
- Node.js
- Express.js

### **Database**
- PostgreSQL  
- Neon DB (Serverless Postgres)
- pg library

### **Deployment**
- Render (Web Service Hosting)
- Neon (Managed DB Hosting)

---

## 📦 Folder Structure

tinylink/
├── controllers/
│ └── linkControllers.js
├── routes/
│ ├── api.js
│ └── web.js
├── utils/
│ └── codegen.js
├── views/
│ ├── index.ejs
│ ├── code.ejs
│ └── 404.ejs
├── public/ (optional assets)
├── server.js
├── db.js
├── package.json
├── .env.example
├── README.md
└── TinyLink_Report.pdf
