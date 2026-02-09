export const AUTH_MESSAGES = {
    OTP_SENT: 'OTP sent successfully',
    PASSWORD_CHANGED: 'Password changed successfully',
    PASSWORD_RESET: 'Password reset successfully',
    INVALID_CREDENTIALS: 'Invalid credentials',
    INVALID_OTP: 'Invalid or expired OTP code',
    OTP_MAX_ATTEMPTS: 'Maximum OTP verification attempts exceeded. Please request a new code.',
    INVALID_REFRESH_TOKEN: 'Invalid refresh token',
    INVALID_TOKEN_FORMAT: 'Invalid token format',
    PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
    SAME_PASSWORD: 'New password cannot be the same as the old password',
    WAIT_48_HOURS: 'Cannot change password again so soon (wait 48 hours).',
    USER_NOT_FOUND: (email: string) => `User with email ${email} not found`,
    INVALID_REQUEST: 'Invalid request',
    USER_NO_OFFICE: 'User is not associated with any office',
};

export const AUTH_CONSTANTS = {
    OTP_EXPIRY_MINUTES: 10,
    MAX_OTP_ATTEMPTS: 3,
    SALT_ROUNDS: 10,
    REFRESH_TOKEN_EXPIRES_IN: '30d',
    PASSWORD_CHANGE_COOLDOWN_HOURS: 48,
    MILLISECONDS_PER_HOUR: 1000 * 60 * 60,
    MILLISECONDS_PER_MINUTE: 60 * 1000,
};
