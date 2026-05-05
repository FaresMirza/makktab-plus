/**
 * Admin Dashboard Constants
 * Colors, status maps, and action maps for admin dashboard
 */

// KPI Card Colors
export const KPI_COLORS = {
  PRIMARY: "var(--primary-dark)",
  SUCCESS: "var(--success)",
  WARNING: "var(--warning)",
};

// Log Status Mapping
export const LOG_STATUS_MAP = {
  Success: { label: "نجح", bg: "var(--success-alt)", color: "var(--text-white)" },
  Failed: { label: "فشل", bg: "var(--error)", color: "var(--text-white)" },
};

// Action Colors Mapping
export const ACTION_COLORS = {
  Login: "var(--primary-dark)",
  Logout: "var(--text-light)",
  "Create User": "var(--success)",
  "Update Settings": "var(--warning)",
  "Approve Office": "var(--accent-blue)",
};

// Office Status Mapping (for OfficesManagementPage)
export const OFFICE_STATUS_MAP = {
  Active: { label: "مفعل", bg: "var(--success-alt)", color: "var(--text-white)" },
  Suspended: { label: "موقوف", bg: "var(--error)", color: "var(--text-white)" },
};

// DataTable RTL Styles
export const RTL_COLUMN_STYLES = {
  style: { textAlign: "right" },
  headerStyle: { textAlign: "right" },
  bodyStyle: { textAlign: "right" },
};
