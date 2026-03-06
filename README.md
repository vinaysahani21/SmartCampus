***SmartCampus: Institutional Management System***

SmartCampus is a full-stack MERN (MongoDB, Express, Angular, Node) application designed to streamline student registrations and departmental management. It features a modern, responsive dashboard with real-time analytics and a decoupled architecture.

🚀 Key Features
Analytics Dashboard: Real-time tracking of total students and active faculties.
Dynamic Registration: Intelligent student onboarding with department-linked dropdowns.
Student Directory: Full CRUD operations with advanced filtering by name, email, or department.
Faculty Management: Dedicated interface to define and manage institutional departments.
Reactive Forms: Robust client-side validation using Angular Reactive Forms.

🛠️ Tech Stack
Layer          Technology
Frontend       Angular 17+, TypeScript, CSS3
Backend        Node.js, Express.js
Database       MongoDB (via Mongoose)
State Mgmt     RxJS & Change Detection Optimization

📥 Installation & Setup
Follow these steps to get the project running locally on your machine.

1. PrerequisitesNode.js (v18+)
   MongoDB (Local or Atlas Cloud)Angular CLI (npm install -g @angular/cli)
2. Clone the Repository:
   
   git clone **https://github.com/vinaysahani21/SmartCampus.git**
   cd SmartCampus

3. Backend SetupBashcd backend
   
**npm install**

Create a .env file in the /backend folder.
Add your MongoDB connection string: MONGO_URI=mongodb://localhost:27017/smartcampus
Start the server:
   npm start

4. Frontend SetupOpen a new terminal window:

   cd frontend
   npm install
   ng serve

Navigate to http://localhost:4200/ to see the app in action

📁 Project StructurePlaintextSmartCampus/

├── frontend/               # Angular standalone components & services
│   ├── src/app/
│   │   ├── components/     # Dashboard, Registration, Directory, Depts
│   │   └── services/       # API communication logic
├── backend/                # Node/Express API
│   ├── models/             # Mongoose Schemas (Student, Department)
│   ├── routes/             # API Endpoints
│   └── server.js           # Main entry point
└── .gitignore              # Multi-tier ignore rules



🤝 ContributingFork the ProjectCreate your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 LicenseDistributed under the MIT License. See LICENSE for more information.

Developed with ❤️ by ****Vinay Sahani****
