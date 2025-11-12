# NameNest 🐣

NameNest is a lightweight full-stack application built with React and Express that allows users to submit names via a form and store them in a MongoDB database with auto-incremented IDs. It has "edit" and "delete" functionality.

## 🧩 Tech Stack

- **Frontend:** React, Axios  
- **Backend:** Node.js, Express, Mongoose  
- **Database:** MongoDB (with mongoose-sequence for auto-increment)  
- **Dev Tools:** Postman, concurrently (optional)

## 📦 Folder Structure

```
project-root/
├── backend/
│   └── server.js                # All backend logic in one file
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── NameForm.js      # React form component
│   │   ├── App.js               # Main app component
│   │   └── index.js             # React entry point
```

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/namenest.git
cd namenest
```

### 2. Backend Setup

```bash
cd backend
npm install
node server.js / nodemon server.js
```

Make sure MongoDB is running locally or update the connection string in `server.js`.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

## 🔗 API Endpoints

- `GET /api/data` – Fetch all names  
- `POST /api/data` – Add a new name `{ "name": "YourName" }`
- `PUT /api/data/:id` - Edit specific ID
- `DELETE /api/data/:id` - Delete specific name based upon ID

## 📸 Demo

<img width="661" height="572" alt="image" src="https://github.com/user-attachments/assets/47fdda3b-8f72-4cc1-89f7-c09d602b439a" />


## 💡 Features

- Simple React form to submit names  
- Auto-incremented IDs using MongoDB  
- Clean and minimal UI  
- Modular and scalable backend

## 🛠️ Future Enhancements

- Add validation and error messages    
- Add Tailwind CSS for styling  
- Deploy to Vercel + Render

## 📃 License

MIT

---

Made with ❤️ by ANIK ACHARJEE
