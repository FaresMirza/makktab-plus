"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskAction = exports.ProjectAction = exports.LoginMethod = exports.OtpChannel = exports.OtpPurpose = exports.TaskStatus = exports.ProjectStatus = exports.UserStatus = exports.OfficeStatus = void 0;
exports.OfficeStatus = {
    ACTIVE: 'ACTIVE',
    SUSPENDED: 'SUSPENDED'
};
exports.UserStatus = {
    PENDING: 'PENDING',
    ACTIVE: 'ACTIVE',
    DEACTIVATED: 'DEACTIVATED'
};
exports.ProjectStatus = {
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
};
exports.TaskStatus = {
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE',
    CANCELLED: 'CANCELLED'
};
exports.OtpPurpose = {
    FIRST_LOGIN: 'FIRST_LOGIN',
    LOGIN: 'LOGIN',
    RESET_PASSWORD: 'RESET_PASSWORD',
    CHANGE_DETAILS: 'CHANGE_DETAILS'
};
exports.OtpChannel = {
    SMS: 'SMS',
    EMAIL: 'EMAIL'
};
exports.LoginMethod = {
    PASSWORD: 'PASSWORD',
    OTP: 'OTP'
};
exports.ProjectAction = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    STATUS_CHANGE: 'STATUS_CHANGE'
};
exports.TaskAction = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    STATUS_CHANGE: 'STATUS_CHANGE',
    ASSIGN: 'ASSIGN',
    DUE_DATE_CHANGE: 'DUE_DATE_CHANGE'
};
//# sourceMappingURL=enums.js.map