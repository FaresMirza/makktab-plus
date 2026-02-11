/**
 * OTP Module Constants
 */
export const OTP_CONSTANTS = {
    /** OTP code length */
    OTP_LENGTH: 6,

    /** OTP expires after N minutes from creation */
    OTP_EXPIRY_MINUTES: 3,

    /** Maximum verification attempts per OTP before blocking */
    MAX_OTP_ATTEMPTS: 3,

    /** Maximum OTP send requests allowed within the rate limit window */
    MAX_OTP_REQUESTS: 5,

    /** Rate limit window in minutes */
    RATE_LIMIT_WINDOW_MINUTES: 30,

    /** Lock duration in minutes when rate limit or verification is exceeded */
    LOCK_DURATION_MINUTES: 30,

    /** Bcrypt salt rounds for hashing OTP codes */
    SALT_ROUNDS: 10,

    /** Milliseconds per minute (utility constant) */
    MS_PER_MINUTE: 60_000,
} as const;

export const OTP_MESSAGES = {
    // -- Send OTP --
    OTP_SENT: 'OTP has been sent successfully.',
    USER_LOCKED: 'Your account is temporarily locked. Please try again later.',
    RATE_LIMIT_EXCEEDED: 'Too many OTP requests. Your account has been locked for 30 minutes.',

    // -- Verify OTP --
    OTP_NOT_FOUND: 'No pending OTP found. Please request a new one.',
    OTP_EXPIRED: 'OTP has expired. Please request a new one.',
    OTP_BLOCKED: 'Too many failed attempts. Your account has been locked for 30 minutes.',
    OTP_INVALID: 'Invalid OTP code.',
    OTP_VERIFIED: 'OTP verified successfully.',

    // -- General --
    USER_NOT_FOUND: 'User not found.',
    INVALID_OTP_STATUS: 'OTP is no longer valid.',
} as const;
