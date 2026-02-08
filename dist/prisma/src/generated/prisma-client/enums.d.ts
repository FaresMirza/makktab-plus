export declare const OfficeStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly SUSPENDED: "SUSPENDED";
};
export type OfficeStatus = (typeof OfficeStatus)[keyof typeof OfficeStatus];
export declare const UserStatus: {
    readonly PENDING: "PENDING";
    readonly ACTIVE: "ACTIVE";
    readonly DEACTIVATED: "DEACTIVATED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const ProjectStatus: {
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];
export declare const TaskStatus: {
    readonly TODO: "TODO";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly DONE: "DONE";
    readonly CANCELLED: "CANCELLED";
};
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
export declare const OtpPurpose: {
    readonly FIRST_LOGIN: "FIRST_LOGIN";
    readonly LOGIN: "LOGIN";
    readonly RESET_PASSWORD: "RESET_PASSWORD";
    readonly CHANGE_DETAILS: "CHANGE_DETAILS";
};
export type OtpPurpose = (typeof OtpPurpose)[keyof typeof OtpPurpose];
export declare const OtpChannel: {
    readonly SMS: "SMS";
    readonly EMAIL: "EMAIL";
};
export type OtpChannel = (typeof OtpChannel)[keyof typeof OtpChannel];
export declare const LoginMethod: {
    readonly PASSWORD: "PASSWORD";
    readonly OTP: "OTP";
};
export type LoginMethod = (typeof LoginMethod)[keyof typeof LoginMethod];
export declare const ProjectAction: {
    readonly CREATE: "CREATE";
    readonly UPDATE: "UPDATE";
    readonly DELETE: "DELETE";
    readonly STATUS_CHANGE: "STATUS_CHANGE";
};
export type ProjectAction = (typeof ProjectAction)[keyof typeof ProjectAction];
export declare const TaskAction: {
    readonly CREATE: "CREATE";
    readonly UPDATE: "UPDATE";
    readonly DELETE: "DELETE";
    readonly STATUS_CHANGE: "STATUS_CHANGE";
    readonly ASSIGN: "ASSIGN";
    readonly DUE_DATE_CHANGE: "DUE_DATE_CHANGE";
};
export type TaskAction = (typeof TaskAction)[keyof typeof TaskAction];
