# 🏥 ClinicDeskSystem

A modern **Clinic Management Dashboard** built with **Angular 21** and **Angular Material**. The project simulates the core workflow of a small medical clinic by providing separate interfaces for managing patients, appointments, doctor queues, reports, and user login.

This project was developed as part of a Software Engineering/Frontend implementation to demonstrate clean UI architecture, CRUD operations, reusable components, and responsive dashboard design using mock data.

---

## ✨ Features

### 🔐 Role-Based Login

* Login interface for multiple clinic roles
* Mock authentication (Frontend only)
* Supported roles:

  * Receptionist
  * Doctor
  * Manager
* Form validation
* Invalid credentials handling
* Navigation to dashboard after successful login

---

### 📊 Dashboard

Provides a quick overview of clinic operations.

Features include:

* Total Patients
* Scheduled Appointments
* Completed Visits
* Doctors Available
* Recent Activities
* Responsive statistics cards
* Charts and analytics overview
* Modern dashboard layout

---

### 👥 Patient Management

Complete patient management interface.

Features:

* View all patients
* Add new patient
* Edit patient information
* Delete patient
* Search patients
* Responsive Material table
* Status indicators
* CRUD operations using mock data

---

### 📅 Appointment Schedule

Receptionist appointment management page.

Features:

* View daily appointments
* Appointment table
* Patient information
* Doctor assignment
* Appointment status
* Update appointment status
* Material dialog for editing status
* Status chips

Supported statuses:

* Scheduled
* In Consultation
* Completed
* Cancelled

---

### 🩺 Doctor Queue

Doctor workspace for managing today's appointments.

Features:

* Assigned patient list
* Appointment time
* Consultation notes
* Patient details
* Complete visit action
* Status updates

---

### 📈 Reports & Analytics

Simple analytical dashboard.

Includes:

* Total Patients Today
* Completed Visits
* Waiting Patients
* Average Consultation Time
* Doctors Available
* Doctors Busy

Charts:

* Visits by Department
* Visits by Doctor

Summary table:

* Doctor
* Total Patients
* Completed Visits
* Average Consultation Time

---

### 🎨 User Interface

* Responsive layout
* Angular Material components
* Reusable Stat Card component
* Modern dashboard design
* Material dialogs
* Material tables
* Material forms
* Material chips
* Material icons
* Responsive cards
* Consistent spacing and typography

---

## 🛠 Tech Stack

### Frontend

* Angular 21
* TypeScript
* HTML5
* CSS3

### UI

* Angular Material
* Material Icons

### Charts

* Chart.js
* ng2-charts

### Architecture

* Standalone Components
* Angular Signals
* Angular Router
* Mock Data Service

---

## 📂 Project Structure

```text
src/
│
├── app/
│   ├── components/
│   │   └── stat-card/
│   │
│   ├── models/
│   │
│   ├── pages/
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── patients/
│   │   ├── schedule/
│   │   ├── doctor-queue/
│   │   └── reports/
│   │
│   ├── services/
│   │   └── mock-data.service.ts
│   │
│   ├── material.imports.ts
│   ├── app.routes.ts
│   └── app.config.ts
│
├── styles.css
└── main.ts
```

---

## 🧩 Reusable Components

* Stat Card
* Material Tables
* Material Dialogs
* Material Chips
* Form Components
* Dashboard Cards

---

## 📱 Responsive Design

The application is designed to work across different screen sizes, including:

* Desktop
* Laptop
* Tablet

---

## 📌 Current Implementation

This project is a **frontend prototype** that uses mock data to simulate a real clinic management system.

The current implementation focuses on:

* User Interface
* CRUD Operations
* Dashboard Visualization
* Component Reusability
* Routing
* Responsive Design

---

## 🚀 Future Improvements

Possible future enhancements include:

* Backend integration
* JWT authentication
* REST API integration
* Database support
* Patient history
* Medical records
* Prescription management
* Calendar scheduling
* Notifications
* Role-based authorization
* Export reports (PDF / Excel)
* Real-time appointment updates

---

## 💻 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/ClinicDeskSystem.git
```

Navigate to the project:

```bash
cd ClinicDeskSystem
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

---

## 📚 Learning Objectives

This project demonstrates practical experience with:

* Angular Standalone Components
* Angular Material
* Routing
* Component Communication
* CRUD Operations
* Mock Data Management
* Dashboard Development
* Responsive UI Design
* Software Engineering Practices
* Clean Project Organization

---

## 👨‍💻 Author

John George

Frontend Developer | Computer Engineering Student

GitHub: https://github.com/johngeorgee

---

## 📄 License

This project is intended for educational and portfolio purposes.
