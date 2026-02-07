"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.TaskAuditLogScalarFieldEnum = exports.ProjectAuditLogScalarFieldEnum = exports.LoginAttemptScalarFieldEnum = exports.OtpCodeScalarFieldEnum = exports.TaskScalarFieldEnum = exports.ProjectScalarFieldEnum = exports.RoleScalarFieldEnum = exports.UserScalarFieldEnum = exports.OfficeScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/library"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "6.19.2",
    engine: "c2990dca591cba766e3b7ef5d9e8a84796e47ab7"
};
exports.NullTypes = {
    DbNull: runtime.objectEnumValues.classes.DbNull,
    JsonNull: runtime.objectEnumValues.classes.JsonNull,
    AnyNull: runtime.objectEnumValues.classes.AnyNull,
};
exports.DbNull = runtime.objectEnumValues.instances.DbNull;
exports.JsonNull = runtime.objectEnumValues.instances.JsonNull;
exports.AnyNull = runtime.objectEnumValues.instances.AnyNull;
exports.ModelName = {
    Office: 'Office',
    User: 'User',
    Role: 'Role',
    Project: 'Project',
    Task: 'Task',
    OtpCode: 'OtpCode',
    LoginAttempt: 'LoginAttempt',
    ProjectAuditLog: 'ProjectAuditLog',
    TaskAuditLog: 'TaskAuditLog'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.OfficeScalarFieldEnum = {
    id: 'id',
    name: 'name',
    ownerUserId: 'ownerUserId',
    status: 'status',
    createdAt: 'createdAt'
};
exports.UserScalarFieldEnum = {
    id: 'id',
    fullName: 'fullName',
    email: 'email',
    phone: 'phone',
    username: 'username',
    passwordHash: 'passwordHash',
    roles: 'roles',
    status: 'status',
    createdAt: 'createdAt'
};
exports.RoleScalarFieldEnum = {
    id: 'id',
    key: 'key',
    scope: 'scope',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt'
};
exports.ProjectScalarFieldEnum = {
    id: 'id',
    officeId: 'officeId',
    createdByUserId: 'createdByUserId',
    projectManagerUserId: 'projectManagerUserId',
    name: 'name',
    description: 'description',
    status: 'status',
    createdAt: 'createdAt'
};
exports.TaskScalarFieldEnum = {
    id: 'id',
    projectId: 'projectId',
    createdByUserId: 'createdByUserId',
    assignedToUserId: 'assignedToUserId',
    title: 'title',
    description: 'description',
    status: 'status',
    dueDate: 'dueDate',
    createdAt: 'createdAt'
};
exports.OtpCodeScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    officeId: 'officeId',
    purpose: 'purpose',
    channel: 'channel',
    codeHash: 'codeHash',
    attempts: 'attempts',
    deviceFingerprint: 'deviceFingerprint',
    ip: 'ip',
    userAgent: 'userAgent',
    emailSnapshot: 'emailSnapshot',
    phoneSnapshot: 'phoneSnapshot',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
};
exports.LoginAttemptScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    officeId: 'officeId',
    success: 'success',
    method: 'method',
    ip: 'ip',
    userAgent: 'userAgent',
    deviceFingerprint: 'deviceFingerprint',
    geo: 'geo',
    failReason: 'failReason',
    createdAt: 'createdAt'
};
exports.ProjectAuditLogScalarFieldEnum = {
    id: 'id',
    officeId: 'officeId',
    projectId: 'projectId',
    actorUserId: 'actorUserId',
    action: 'action',
    fieldName: 'fieldName',
    oldValue: 'oldValue',
    newValue: 'newValue',
    ip: 'ip',
    deviceFingerprint: 'deviceFingerprint',
    geo: 'geo',
    createdAt: 'createdAt'
};
exports.TaskAuditLogScalarFieldEnum = {
    id: 'id',
    officeId: 'officeId',
    taskId: 'taskId',
    actorUserId: 'actorUserId',
    action: 'action',
    fieldName: 'fieldName',
    oldValue: 'oldValue',
    newValue: 'newValue',
    ip: 'ip',
    deviceFingerprint: 'deviceFingerprint',
    geo: 'geo',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map