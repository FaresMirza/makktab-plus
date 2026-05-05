/**
 * Admin Dashboard Mock Data
 * Mock data for testing admin dashboard features
 */

export const MOCK_STATS = {
  totalOffices: 12,
  activeSubscriptions: 10,
  pendingApprovals: 3,
};

export const MOCK_OFFICES = [
  {
    id: 1,
    name: "مكتب الرياض العقاري",
    owner: "أحمد محمد",
    status: "Active",
    users: 15,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "شركة جدة للعقارات",
    owner: "خالد السعيد",
    status: "Active",
    users: 8,
    createdAt: "2024-02-10",
  },
  {
    id: 3,
    name: "مكتب الدمام التجاري",
    owner: "سارة الأحمد",
    status: "Suspended",
    users: 5,
    createdAt: "2024-03-05",
  },
  {
    id: 4,
    name: "العقارات المتحدة",
    owner: "محمد علي",
    status: "Active",
    users: 20,
    createdAt: "2024-01-20",
  },
  {
    id: 5,
    name: "مجموعة الخليج العقارية",
    owner: "فاطمة حسن",
    status: "Active",
    users: 12,
    createdAt: "2024-02-28",
  },
];

export const MOCK_RECENT_LOGS = [
  {
    id: 1,
    userEmail: "admin@platform.com",
    action: "Login",
    status: "Success",
    timestamp: "2024-12-26 14:30:15",
    office: "Platform Admin",
  },
  {
    id: 2,
    userEmail: "owner@office1.com",
    action: "Create User",
    status: "Success",
    timestamp: "2024-12-26 14:15:22",
    office: "مكتب الرياض العقاري",
  },
  {
    id: 3,
    userEmail: "employee@office2.com",
    action: "Login",
    status: "Failed",
    timestamp: "2024-12-26 13:45:30",
    office: "شركة جدة للعقارات",
  },
  {
    id: 4,
    userEmail: "owner@office3.com",
    action: "Update Settings",
    status: "Success",
    timestamp: "2024-12-26 13:20:10",
    office: "مكتب الدمام التجاري",
  },
  {
    id: 5,
    userEmail: "admin@platform.com",
    action: "Approve Office",
    status: "Success",
    timestamp: "2024-12-26 12:50:45",
    office: "Platform Admin",
  },
];

export const MOCK_PENDING_OFFICES = [
  {
    id: 1,
    name: "مكتب النخبة الهندسي",
    ownerName: "فهد العتيبي",
    username: "fahad_alotaibi",
    email: "fahad@elite-office.com",
    phone: "0501234567",
    city: "الرياض",
    registeredAt: "2024-12-20",
  },
  {
    id: 2,
    name: "شركة الأفق للاستشارات",
    ownerName: "نورة الدوسري",
    username: "noura_aldosari",
    email: "noura@horizon-consult.com",
    phone: "0559876543",
    city: "جدة",
    registeredAt: "2024-12-21",
  },
  {
    id: 3,
    name: "مكتب التميز العقاري",
    ownerName: "عبدالله الشمري",
    username: "abdullah_shamari",
    email: "abdullah@excellence-re.com",
    phone: "0505554444",
    city: "الدمام",
    registeredAt: "2024-12-22",
  },
];

export const MOCK_MANAGED_OFFICES = [
  {
    id: 1,
    name: "مكتب الرياض العقاري",
    ownerName: "أحمد محمد",
    ownerUsername: "owner1",
    ownerEmail: "ahmed@riyadh-office.com",
    status: "Active",
    users: 15,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "شركة جدة للعقارات",
    ownerName: "خالد السعيد",
    ownerUsername: "owner2",
    ownerEmail: "khalid@jeddah-realestate.com",
    status: "Active",
    users: 8,
    createdAt: "2024-02-10",
  },
  {
    id: 3,
    name: "مكتب الدمام التجاري",
    ownerName: "سارة الأحمد",
    ownerUsername: "owner3",
    ownerEmail: "sara@dammam-office.com",
    status: "Suspended",
    users: 5,
    createdAt: "2024-03-05",
  },
];

export const MOCK_SECURITY_LOGS = [
  {
    id: 1,
    userEmail: "admin@platform.com",
    action: "Login",
    status: "Success",
    ip: "192.168.1.100",
    office: "Platform Admin",
    timestamp: "2024-12-26 10:30:15",
  },
  {
    id: 2,
    userEmail: "owner@office1.com",
    action: "Login",
    status: "Success",
    ip: "192.168.1.105",
    office: "مكتب الرياض العقاري",
    timestamp: "2024-12-26 09:15:22",
  },
  {
    id: 3,
    userEmail: "employee@office1.com",
    action: "Login",
    status: "Failed",
    ip: "192.168.1.110",
    office: "مكتب الرياض العقاري",
    timestamp: "2024-12-26 08:45:30",
  },
  {
    id: 4,
    userEmail: "owner@office2.com",
    action: "Logout",
    status: "Success",
    ip: "192.168.1.115",
    office: "شركة جدة للعقارات",
    timestamp: "2024-12-26 11:20:10",
  },
  {
    id: 5,
    userEmail: "hacker@test.com",
    action: "Login",
    status: "Failed",
    ip: "45.67.89.123",
    office: "Unknown",
    timestamp: "2024-12-26 02:30:45",
  },
  {
    id: 6,
    userEmail: "admin@platform.com",
    action: "Create Office",
    status: "Success",
    ip: "192.168.1.100",
    office: "Platform Admin",
    timestamp: "2024-12-26 14:10:00",
  },
  {
    id: 7,
    userEmail: "employee@office1.com",
    action: "Login",
    status: "Success",
    ip: "192.168.1.110",
    office: "مكتب الرياض العقاري",
    timestamp: "2024-12-26 13:55:18",
  },
  {
    id: 8,
    userEmail: "owner@office3.com",
    action: "Login",
    status: "Failed",
    ip: "192.168.1.120",
    office: "مكتب الدمام التجاري",
    timestamp: "2024-12-26 12:40:33",
  },
];

export const LOG_ACTION_OPTIONS = [
  { label: "الكل", value: null },
  { label: "Login", value: "Login" },
  { label: "Logout", value: "Logout" },
  { label: "Create Office", value: "Create Office" },
];

export const LOG_STATUS_OPTIONS = [
  { label: "الكل", value: null },
  { label: "Success", value: "Success" },
  { label: "Failed", value: "Failed" },
];
