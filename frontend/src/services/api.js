// ============================================
// API Service Layer
// ============================================
// هذا الملف هو الطبقة الوسيطة بين الفرونت اند والباك اند
// حالياً يستخدم MOCK_DATA، ولكن عند إضافة Backend:
// استبدل كل دالة بـ fetch/axios call للـ API
// ============================================

import { MOCK_PROJECTS_DATA, MOCK_USERS } from "../data/mockData";
import axios from "axios";

const API_BASE_URL = "https://api.makktabplus.online";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // Do NOT set Content-Type here — Axios auto-sets it for request bodies (POST/PUT/PATCH).
  // Forcing it on GET requests makes them non-simple and triggers an unnecessary CORS preflight.
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Use AxiosHeaders.set() — the correct API for Axios 1.x
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      console.warn(
        "[API] No auth token found in localStorage (key: 'token'). " +
        "The request will be sent without an Authorization header."
      );
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const getDeviceFingerprint = () => {
  let fingerprint = localStorage.getItem("device_fingerprint");
  if (!fingerprint) {
    fingerprint = crypto.randomUUID();
    localStorage.setItem("device_fingerprint", fingerprint);
  }
  return fingerprint;
};

// ============================================
// Auth API
// ============================================

export const registerNewOffice = async (data) => {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
};

export const verifyRegistrationOTP = async (verifyData) => {
  const response = await apiClient.post("/auth/register/verify", verifyData, {
    headers: {
      "x-device-fingerprint": getDeviceFingerprint(),
    },
  });
  return response.data;
};

export const loginApi = async (username, password) => {
  const response = await apiClient.post("/auth/login", { username, password });
  return response.data;
};

export const verifyLoginApi = async (username, password, otp) => {
  const response = await apiClient.post(
    "/auth/login/verify",
    { username, password, otp },
    {
      headers: {
        "x-device-fingerprint": getDeviceFingerprint(),
      },
    },
  );
  return response.data;
};

// ============================================
// Super Admin API
// ============================================

export const getAdminOffices = async () => {
  const response = await apiClient.get("/admins/offices");
  return response.data;
};

export const activateAdminOffice = async (id) => {
  const response = await apiClient.patch(`/admins/offices/${id}/activate`);
  return response.data;
};

export const deactivateAdminOffice = async (id) => {
  const response = await apiClient.patch(`/admins/offices/${id}/deactivate`);
  return response.data;
};

export const getAdminOfficeRequests = async () => {
  const response = await apiClient.get("/admins/office-requests");
  return response.data;
};

export const approveOfficeRequest = async (id) => {
  const response = await apiClient.patch(
    `/admins/office-requests/${id}`,
    { approve: true },
    {
      headers: {
        "x-device-fingerprint": getDeviceFingerprint(),
      },
    },
  );
  return response.data;
};

export const rejectOfficeRequest = async (id) => {
  const response = await apiClient.patch(
    `/admins/office-requests/${id}`,
    { approve: false },
    {
      headers: {
        "x-device-fingerprint": getDeviceFingerprint(),
      },
    },
  );
  return response.data;
};

export const getAdmins = async () => {
  const response = await apiClient.get("/admins", {
    headers: {
      "x-device-fingerprint": getDeviceFingerprint(),
    },
  });
  return response.data;
};

export const createAdmin = async (data) => {
  const response = await apiClient.post("/admins", data, {
    headers: {
      "x-device-fingerprint": getDeviceFingerprint(),
    },
  });
  return response.data;
};

export const updateAdminStatus = async (id, status) => {
  const response = await apiClient.patch(
    `/admins/${id}/status`,
    { status },
    {
      headers: {
        "x-device-fingerprint": getDeviceFingerprint(),
      },
    },
  );
  return response.data;
};

export const deleteAdmin = async (id) => {
  const response = await apiClient.delete(`/admins/${id}`, {
    headers: {
      "x-device-fingerprint": getDeviceFingerprint(),
    },
  });
  return response.data;
};

export const getAdminStats = async () => {
  const response = await apiClient.get("/admins/stats", {
    headers: {
      "x-device-fingerprint": getDeviceFingerprint(),
    },
  });
  return response.data;
};

export const getAdminAuditLogs = async () => {
  try {
    const response = await apiClient.get("/admins/audit");
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) return [];
    throw error;
  }
};

export const getLastAdminAuditLogs = async () => {
  try {
    const response = await apiClient.get("/admins/audit/last");
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) return [];
    throw error;
  }
};

// ============================================
// Projects API
// ============================================

export const getAllProjects = async () => {
  const response = await apiClient.get("/projects");
  return response.data;
};

export const getProjectById = async (publicId) => {
  const response = await apiClient.get(`/projects/${publicId}`);
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await apiClient.post("/projects", projectData);
  return response.data;
};

export const deleteProject = async (publicId) => {
  const response = await apiClient.delete(`/projects/${publicId}`);
  return response.data;
};

// ============================================
// Project Files API
// ============================================

export const uploadProjectFile = async (publicId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post(`/projects/${publicId}/files`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getProjectFiles = async (publicId) => {
  const response = await apiClient.get(`/projects/${publicId}/files`);
  return response.data;
};

export const deleteProjectFile = async (filePublicId) => {
  const response = await apiClient.delete(`/projects/files/${filePublicId}`);
  return response.data;
};

/**
 * تحديث مشروع
 * TODO: عند إضافة Backend، استبدل بـ:
 * return await fetch(`/api/projects/${id}`, {
 *   method: 'PUT',
 *   body: JSON.stringify(updates)
 * }).then(res => res.json())
 */
export const updateProject = async (id, updates) => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  if (!MOCK_PROJECTS_DATA[id]) {
    throw new Error("Project not found");
  }

  MOCK_PROJECTS_DATA[id] = {
    ...MOCK_PROJECTS_DATA[id],
    ...updates,
  };

  return MOCK_PROJECTS_DATA[id];
};

// ============================================
// Tasks API
// ============================================

/**
 * جلب جميع المهام لمستخدم معين
 * TODO: عند إضافة Backend، استبدل بـ:
 * return await fetch(`/api/tasks?userId=${userId}`).then(res => res.json())
 */
export const getTasksByUser = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const tasks = [];
  Object.values(MOCK_PROJECTS_DATA).forEach((project) => {
    project.tasks.forEach((task) => {
      if (task.assignedToId === userId) {
        tasks.push({
          ...task,
          projectId: project.id,
          projectName: project.name,
          projectClient: project.client,
        });
      }
    });
  });

  return tasks;
};

/**
 * جلب جميع مهام مشروع معين
 * TODO: عند إضافة Backend، استبدل بـ:
 * return await fetch(`/api/projects/${projectId}/tasks`).then(res => res.json())
 */
export const getTasksByProject = async (projectId) => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const project = MOCK_PROJECTS_DATA[projectId];
  return project ? project.tasks : [];
};

/**
 * إنشاء مهمة جديدة
 * TODO: عند إضافة Backend، استبدل بـ:
 * return await fetch(`/api/projects/${projectId}/tasks`, {
 *   method: 'POST',
 *   body: JSON.stringify(taskData)
 * }).then(res => res.json())
 */
export const createTask = async (projectId, taskData) => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const project = MOCK_PROJECTS_DATA[projectId];
  if (!project) {
    throw new Error("Project not found");
  }

  const newId =
    project.tasks.length > 0
      ? Math.max(...project.tasks.map((t) => t.id)) + 1
      : 1;

  const newTask = {
    id: newId,
    ...taskData,
    status: taskData.status || "In Progress",
  };

  project.tasks.push(newTask);
  return newTask;
};

/**
 * تحديث مهمة
 * TODO: عند إضافة Backend، استبدل بـ:
 * return await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
 *   method: 'PUT',
 *   body: JSON.stringify(updates)
 * }).then(res => res.json())
 */
export const updateTask = async (projectId, taskId, updates) => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const project = MOCK_PROJECTS_DATA[projectId];
  if (!project) {
    throw new Error("Project not found");
  }

  const taskIndex = project.tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    throw new Error("Task not found");
  }

  project.tasks[taskIndex] = {
    ...project.tasks[taskIndex],
    ...updates,
  };

  return project.tasks[taskIndex];
};

/**
 * حذف مهمة
 * TODO: عند إضافة Backend، استبدل بـ:
 * return await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
 *   method: 'DELETE'
 * })
 */
export const deleteTask = async (projectId, taskId) => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const project = MOCK_PROJECTS_DATA[projectId];
  if (!project) {
    throw new Error("Project not found");
  }

  project.tasks = project.tasks.filter((t) => t.id !== taskId);
  return { success: true };
};

/**
 * إنجاز مهمة مع إثبات العمل
 * TODO: عند إضافة Backend، استبدل بـ:
 * return await fetch(`/api/tasks/${taskId}/complete`, {
 *   method: 'POST',
 *   body: JSON.stringify({ completionNotes, attachments })
 * }).then(res => res.json())
 */
export const completeTask = async (
  projectId,
  taskId,
  completionNotes,
  attachments,
) => {
  return await updateTask(projectId, taskId, {
    status: "Completed",
    completionNotes,
    attachments,
  });
};

// ============================================
// Users API
// ============================================

export const getAllUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const getOfficeEmployees = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

/**
 * جلب مستخدم حسب الـ ID
 * TODO: عند إضافة Backend، استبدل بـ:
 * return await fetch(`/api/users/${id}`).then(res => res.json())
 */
export const getUserById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return MOCK_USERS[id] || null;
};

// ============================================
// Statistics API
// ============================================

/**
 * جلب إحصائيات Dashboard
 * TODO: عند إضافة Backend، استبدل بـ:
 * return await fetch('/api/statistics').then(res => res.json())
 */
export const getDashboardStats = async (userId, userRole) => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const projects = Object.values(MOCK_PROJECTS_DATA);

  let totalProjects = projects.length;
  let totalTasks = 0;
  let completedTasks = 0;
  let inProgressTasks = 0;

  if (userRole === "employee") {
    // للموظف: فقط مهامه
    projects.forEach((project) => {
      project.tasks.forEach((task) => {
        if (task.assignedToId === userId) {
          totalTasks++;
          if (task.status === "Completed") completedTasks++;
          if (task.status === "In Progress") inProgressTasks++;
        }
      });
    });
  } else {
    // لصاحب المكتب: جميع المهام
    projects.forEach((project) => {
      totalTasks += project.tasks.length;
      completedTasks += project.tasks.filter(
        (t) => t.status === "Completed",
      ).length;
      inProgressTasks += project.tasks.filter(
        (t) => t.status === "In Progress",
      ).length;
    });
  }

  return {
    totalProjects,
    totalTasks,
    completedTasks,
    inProgressTasks,
  };
};
