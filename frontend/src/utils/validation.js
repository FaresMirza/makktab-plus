/**
 * Validation utility functions
 */

/**
 * Validate username format
 * @param {string} username
 * @returns {{ isValid: boolean, error?: string }}
 */
export const validateUsername = (username) => {
  if (!username) {
    return { isValid: false, error: "اسم المستخدم مطلوب" };
  }

  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!usernameRegex.test(username)) {
    return {
      isValid: false,
      error: "يجب أن يتكون اسم المستخدم من 3-20 حرف أو رقم أو شرطة سفلية فقط",
    };
  }

  return { isValid: true };
};

/**
 * Validate email format
 * @param {string} email
 * @returns {{ isValid: boolean, error?: string }}
 */
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, error: "البريد الإلكتروني مطلوب" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "يرجى إدخال بريد إلكتروني صحيح" };
  }

  return { isValid: true };
};

/**
 * Validate Saudi phone number
 * @param {string} phone
 * @returns {{ isValid: boolean, error?: string }}
 */
export const validateSaudiPhone = (phone) => {
  if (!phone) {
    return { isValid: false, error: "رقم الجوال مطلوب" };
  }

  const phoneRegex = /^(05|5)[0-9]{8}$/;
  const cleanPhone = phone.replace(/[\s-]/g, "");

  if (!phoneRegex.test(cleanPhone)) {
    return {
      isValid: false,
      error: "يرجى إدخال رقم جوال سعودي صحيح (05xxxxxxxx)",
    };
  }

  return { isValid: true };
};

/**
 * Validate password strength
 * @param {string} password
 * @returns {{ isValid: boolean, error?: string }}
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: "كلمة المرور مطلوبة" };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      error: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
    };
  }

  return { isValid: true };
};

/**
 * Validate passwords match
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {{ isValid: boolean, error?: string }}
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { isValid: false, error: "كلمة المرور وتأكيدها غير متطابقتين" };
  }

  return { isValid: true };
};

/**
 * Validate all required fields are filled
 * @param {Object} fields
 * @returns {{ isValid: boolean, error?: string }}
 */
export const validateRequiredFields = (fields) => {
  const emptyFields = Object.entries(fields).filter(
    ([, value]) => !value || value.trim() === "",
  );

  if (emptyFields.length > 0) {
    return { isValid: false, error: "يرجى ملء جميع الحقول المطلوبة" };
  }

  return { isValid: true };
};

/**
 * Calculate password strength
 * @param {string} password
 * @returns {{ level: number, label: string, color: string, width: string }}
 */
export const getPasswordStrength = (password) => {
  if (!password) {
    return { level: 0, label: "", color: "#e5e7eb", width: "0%" };
  }

  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  if (strength <= 2) {
    return { level: 1, label: "ضعيفة", color: "#ef4444", width: "33%" };
  } else if (strength <= 3) {
    return { level: 2, label: "متوسطة", color: "#f59e0b", width: "66%" };
  } else {
    return { level: 3, label: "قوية", color: "#10b981", width: "100%" };
  }
};

/**
 * Mask phone number to show only last 4 digits
 * @param {string} phone
 * @returns {string}
 */
export const maskPhoneNumber = (phone) => {
  if (!phone || phone.length < 4) return phone;
  const lastFour = phone.slice(-4);
  const prefix = phone.slice(0, 2); // Keep first 2 digits (05)
  const masked = "*".repeat(phone.length - 6); // Mask middle digits
  return `${lastFour}${masked}${prefix}`;
};
