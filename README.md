# 🏢 Makktab Plus (Office Management Platform)

A **multi-tenant office management platform** designed for professional offices such as **law firms, real estate offices, and consulting companies**.  
The system provides **secure authentication**, **role-based access control (RBAC)**, **project & task management**, **auditing**, and **notifications**, with a **strict separation** between **Platform Administration** and **Office Operations**.

---

## 🚀 Core Concept

The platform operates on **two clearly separated levels**:

### 🌐 Platform Level
Managed by **Super Admins / Management Users**, responsible for:
- 🏗️ Creating and managing offices  
- ⛔ Suspending or reactivating offices  
- 🔍 Monitoring system-level security logs  
- ❌ **No access** to internal office users, roles, or tasks  

---

### 🏢 Office Level
Each office is **fully isolated (multi-tenant)** and manages:
- 👥 Internal users  
- 🧩 Roles & permissions  
- 📁 Projects & tasks  
- 📊 Office activity logs  

---

## 👥 User Types

### 🌐 Platform Users
- **Super Admin / Management User**
  - Create offices
  - Suspend / reactivate offices
  - View platform security logs
  - 🔐 Permission scope: `platform.*`

### 🏢 Office Users
- **Office Owner**
  - Full control inside the office
- **Office Manager**
  - Manages users, projects, and tasks (based on permissions)
- **Project Manager**
  - Manages assigned projects and tasks
- **Employee**
  - Works on assigned tasks only

---

## 🔐 Authentication & Security

- 🔑 Username-based authentication (**globally unique**)
- 🆕 **First-time login requires:**
  - Password setup
  - OTP verification
- 🔁 **Normal login:**
  - Username + Password
  - OTP verification
- 🔄 Password reset & change with OTP
- 🚪 Secure logout with token invalidation

All authentication events are logged with:
- 🌍 IP address  
- 🖥️ Browser / device fingerprint  
- ⏱️ Timestamp  
- 📍 Geolocation (GEO)  

---

## 🧩 Role-Based Access Control (RBAC)

- 🎯 Permission-driven system
- 🔀 Two scopes:
  - `platform.*` → Platform administration
  - `office.*` → Office operations
- 🛠️ Permissions can be assigned via:
  - Roles
  - Direct user overrides
- 🧾 All role & permission changes are **fully audited**

---

## 📦 Main Modules

### 🔐 Authentication & Office Lifecycle
- Create office accounts
- Activate users on first login
- Login / logout
- Suspend or reactivate offices
- Password recovery & profile updates

---

### 🧩 Roles & Permissions
- Define office roles (Owner, Manager, Employee, etc.)
- Assign permissions
- Audit all role & permission changes

---

### 📁 Projects
- Create projects inside an office
- Assign a project manager (**must belong to the same office**)
- Track project status:
  - 🟡 In Progress
  - 🟢 Completed
  - 🔴 Canceled

---

### ✅ Tasks
- Create tasks inside projects
- Assign tasks **only to project members**
- Set and update deadlines
- Update task status
- Attach notes and files
- View:
  - 👤 Personal tasks
  - 🏢 All office tasks (with permission)

---

### 📊 Logs & Audit
- Office-level activity logs
- Platform-level security logs
- Filter and search logs by:
  - User
  - Date
  - Action type

---

### 🔔 Notifications
- OTP & password reset emails
- Project and task assignment notifications
- Login alerts
- Password change confirmations

---

## 🗂️ Architecture Highlights

- 🏢 Multi-tenant design (office isolation)
- 🔐 Strict permission enforcement
- 🧾 Audit-first approach
- 🧱 Scalable modular backend
- 🛡️ Security-focused authentication flow

---

## 🛠️ Tech Stack 

- **Backend:** NestJS  
- **Database:** PostgreSQL  
- **ORM:** Prisma  
- **Auth:** JWT + OTP  
- **Notifications:** Email   
- **Storage:** S3-compatible object storage  
- **Logging:** Audit & security logs  

---

## 📌 Key Rules

- ❌ Platform admins **cannot access** office internal data
- ❌ Office users **cannot access** platform-level features
- 👤 Project managers & task assignees **must belong to the same office**
- 🧾 Every critical action is logged for compliance & security

---

## 📄 Summary

This platform delivers **enterprise-grade office management** with:
- 🔐 High security
- 🎯 Fine-grained permissions
- 🧾 Full auditability
- 🔄 Clear separation of responsibilities

✨ Ideal for organizations that require **control, transparency, and scalability**.