# 📘 Staff Hub - Staff Management System

A comprehensive and lightweight **Staff Management System** built using **React.js** for the frontend and **Node.js (Express)** for the backend, with **JSON file-based storage** (no database) to ensure rapid and easy deployment. This system is tailored for educational institutions and supports core HR functions such as:

- 👤 Staff Profiles (Personal, Professional, Health)
- 🕒 Attendance Tracking
- 📝 Leave Management
- 💰 Payroll & Salary Management
- 📊 Performance Management
- 📚 Teaching Assignment & Scheduling
- 📂 Document Management (NEW!)

---

## 📦 Features

### ✅ Core Modules
- **Staff Profiles**: Manage personal, professional, and health details.
- **Attendance Management**: Track daily attendance with reports.
- **Leave Management**: Apply and approve leaves with status tracking.
- **Payroll Management**: Configure salary structure, generate pay slips.
- **Performance Module**: Track KPIs, feedback, evaluations, and rewards.
- **Teaching Assignments**: Allocate subjects, manage timetables and workloads.

### 🆕 Document Management Module
- **Digital Repository**: Store employment contracts, certificates, reviews, etc.
- **Version Control**: Maintain file version history.
- **Access Control**: Secure documents per staff/admin.
- **Expiry Alerts**: Track and notify about expiring documents.

---

## 🛠️ Tech Stack

| Layer       | Technology         |
|-------------|--------------------|
| Frontend    | React.js, Axios, Global CSS |
| Backend     | Node.js, Express.js |
| Storage     | JSON Files (no DB) |
| Uploads     | Multer (File Upload Middleware) |

---

## 🚀 Getting Started

### 📁 Folder Structure

Staff-Hub/ ├── client/ # React Frontend │ ├── public/ │ ├── src/ │ │ ├── components/ │ │ │ ├── DocumentUpload.js │ │ │ └── DocumentList.js │ │ ├── App.js │ │ └── index.css ├── server/ # Node.js Backend │ ├── routes/ │ │ └── documentRoutes.js │ ├── data/ │ │ └── documents.json │ ├── uploads/ │ │ └── documents/ │ └── server.js

bash
Copy
Edit

### 📥 Installation

1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/staff-hub.git
cd staff-hub
Install Backend Dependencies

bash
Copy
Edit
cd server
npm install
Start the Backend Server

bash
Copy
Edit
node server.js
# Or use nodemon for auto-restart
npx nodemon server.js
Setup and Run React Frontend

bash
Copy
Edit
cd ../client
npm install
npm start
📂 Document Management Usage
✅ Upload Document
Navigate to Upload Document

Enter:

Staff ID

Category (e.g., Contract, Certificate)

Expiry Date (optional)

Select file to upload

Click Upload

📃 View Staff Documents
Documents will list:

File name, category, and upload date

Expiry status (green = valid, red = nearing expiry)

Link to view/download document

🔁 Version Control
Upload new versions under same document ID via /version/:id API

🔐 Access Control (Planned)
Admins: Full access

Staff: Limited to own documents

Role-based restrictions coming soon

📅 Upcoming Enhancements
📧 Email notifications for expiring documents

📈 Analytics dashboard for document and attendance trends

🧑‍🏫 Substitute teacher management and advanced scheduling

☁️ Cloud backup and storage integration

🤝 Contribution
Feel free to fork and improve! Open issues or PRs for bugs, features, or ideas.

📃 License
This project is licensed under the MIT License.

👨‍💻 Developer
Author: uday kiran pyla

vbnet
Copy
Edit

Would you like me to generate this `README.md` as a downloadable file or place it 
