import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull);
};
export declare const DbNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const JsonNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const AnyNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const ModelName: {
    readonly Office: "Office";
    readonly User: "User";
    readonly Role: "Role";
    readonly Project: "Project";
    readonly Task: "Task";
    readonly OtpCode: "OtpCode";
    readonly LoginAttempt: "LoginAttempt";
    readonly ProjectAuditLog: "ProjectAuditLog";
    readonly TaskAuditLog: "TaskAuditLog";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const OfficeScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly ownerUserId: "ownerUserId";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type OfficeScalarFieldEnum = (typeof OfficeScalarFieldEnum)[keyof typeof OfficeScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly fullName: "fullName";
    readonly email: "email";
    readonly phone: "phone";
    readonly username: "username";
    readonly passwordHash: "passwordHash";
    readonly roles: "roles";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const RoleScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly scope: "scope";
    readonly name: "name";
    readonly description: "description";
    readonly createdAt: "createdAt";
};
export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum];
export declare const ProjectScalarFieldEnum: {
    readonly id: "id";
    readonly officeId: "officeId";
    readonly createdByUserId: "createdByUserId";
    readonly projectManagerUserId: "projectManagerUserId";
    readonly name: "name";
    readonly description: "description";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum];
export declare const TaskScalarFieldEnum: {
    readonly id: "id";
    readonly projectId: "projectId";
    readonly createdByUserId: "createdByUserId";
    readonly assignedToUserId: "assignedToUserId";
    readonly title: "title";
    readonly description: "description";
    readonly status: "status";
    readonly dueDate: "dueDate";
    readonly createdAt: "createdAt";
};
export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum];
export declare const OtpCodeScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly officeId: "officeId";
    readonly purpose: "purpose";
    readonly channel: "channel";
    readonly codeHash: "codeHash";
    readonly attempts: "attempts";
    readonly deviceFingerprint: "deviceFingerprint";
    readonly ip: "ip";
    readonly userAgent: "userAgent";
    readonly emailSnapshot: "emailSnapshot";
    readonly phoneSnapshot: "phoneSnapshot";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly createdAt: "createdAt";
};
export type OtpCodeScalarFieldEnum = (typeof OtpCodeScalarFieldEnum)[keyof typeof OtpCodeScalarFieldEnum];
export declare const LoginAttemptScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly officeId: "officeId";
    readonly success: "success";
    readonly method: "method";
    readonly ip: "ip";
    readonly userAgent: "userAgent";
    readonly deviceFingerprint: "deviceFingerprint";
    readonly geo: "geo";
    readonly failReason: "failReason";
    readonly createdAt: "createdAt";
};
export type LoginAttemptScalarFieldEnum = (typeof LoginAttemptScalarFieldEnum)[keyof typeof LoginAttemptScalarFieldEnum];
export declare const ProjectAuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly officeId: "officeId";
    readonly projectId: "projectId";
    readonly actorUserId: "actorUserId";
    readonly action: "action";
    readonly fieldName: "fieldName";
    readonly oldValue: "oldValue";
    readonly newValue: "newValue";
    readonly ip: "ip";
    readonly deviceFingerprint: "deviceFingerprint";
    readonly geo: "geo";
    readonly createdAt: "createdAt";
};
export type ProjectAuditLogScalarFieldEnum = (typeof ProjectAuditLogScalarFieldEnum)[keyof typeof ProjectAuditLogScalarFieldEnum];
export declare const TaskAuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly officeId: "officeId";
    readonly taskId: "taskId";
    readonly actorUserId: "actorUserId";
    readonly action: "action";
    readonly fieldName: "fieldName";
    readonly oldValue: "oldValue";
    readonly newValue: "newValue";
    readonly ip: "ip";
    readonly deviceFingerprint: "deviceFingerprint";
    readonly geo: "geo";
    readonly createdAt: "createdAt";
};
export type TaskAuditLogScalarFieldEnum = (typeof TaskAuditLogScalarFieldEnum)[keyof typeof TaskAuditLogScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
