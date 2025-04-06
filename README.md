
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


![Screenshot 2025-04-06 152346](https://github.com/user-attachments/assets/b786c4cb-f6be-4968-862d-aff58cd55845)
![Screenshot 2025-04-06 152338](https://github.com/user-attachments/assets/8a907bda-863c-4caf-a065-4bf73c8b6459)
![Screenshot 2025-04-06 152328](https://github.com/user-attachments/assets/ddbc9f98-158d-4aca-a9b9-cfb612b94018)
![Screenshot 2025-04-06 152317](https://github.com/user-attachments/assets/1a4f623e-5458-4df7-941f-34153fcfd856)
![Screenshot 2025-04-06 152310](https://github.com/user-attachments/assets/2cfd1b0b-7c49-4eea-802e-87b19eb0fa23)
![Screenshot 2025-04-06 152303](https://github.com/user-attachments/assets/d2847951-f7e3-47a2-b933-0e05420c7044)
![Screenshot 2025-04-06 152240](https://github.com/user-attachments/assets/2c7d6d4d-015a-4cf4-ba64-0a939b44c8d9)
![Screenshot 2025-04-06 152232](https://github.com/user-attachments/assets/0b0d295c-999b-4188-b315-23b972b16bd4)
