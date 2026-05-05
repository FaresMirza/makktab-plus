/**
 * Date Utilities
 * Helper functions for date formatting
 */

/**
 * Format date to Arabic locale
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date in Arabic
 */
export const formatArabicDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("ar-SA");
};

/**
 * Format date with time to Arabic locale
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date and time in Arabic
 */
export const formatArabicDateTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleString("ar-SA");
};

/**
 * Format time only to Arabic locale
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted time in Arabic
 */
export const formatArabicTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleTimeString("ar-SA");
};
