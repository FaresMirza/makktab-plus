import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    email: string | null;
    phone: string | null;
    username: string | null;
    passwordHash: string | null;
    status: $Enums.UserStatus | null;
    createdAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    email: string | null;
    phone: string | null;
    username: string | null;
    passwordHash: string | null;
    status: $Enums.UserStatus | null;
    createdAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    fullName: number;
    email: number;
    phone: number;
    username: number;
    passwordHash: number;
    roles: number;
    status: number;
    createdAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    fullName?: true;
    email?: true;
    phone?: true;
    username?: true;
    passwordHash?: true;
    status?: true;
    createdAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    fullName?: true;
    email?: true;
    phone?: true;
    username?: true;
    passwordHash?: true;
    status?: true;
    createdAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    fullName?: true;
    email?: true;
    phone?: true;
    username?: true;
    passwordHash?: true;
    roles?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserCountAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles: string[];
    status: $Enums.UserStatus;
    createdAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    fullName?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    phone?: Prisma.StringFilter<"User"> | string;
    username?: Prisma.StringFilter<"User"> | string;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    roles?: Prisma.StringNullableListFilter<"User">;
    status?: Prisma.EnumUserStatusFilter<"User"> | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    offices?: Prisma.OfficeListRelationFilter;
    ownedOffice?: Prisma.XOR<Prisma.OfficeNullableScalarRelationFilter, Prisma.OfficeWhereInput> | null;
    createdProjects?: Prisma.ProjectListRelationFilter;
    managedProjects?: Prisma.ProjectListRelationFilter;
    createdTasks?: Prisma.TaskListRelationFilter;
    assignedTasks?: Prisma.TaskListRelationFilter;
    otpCodes?: Prisma.OtpCodeListRelationFilter;
    loginAttempts?: Prisma.LoginAttemptListRelationFilter;
    projectAuditLogs?: Prisma.ProjectAuditLogListRelationFilter;
    taskAuditLogs?: Prisma.TaskAuditLogListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    roles?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    offices?: Prisma.OfficeOrderByRelationAggregateInput;
    ownedOffice?: Prisma.OfficeOrderByWithRelationInput;
    createdProjects?: Prisma.ProjectOrderByRelationAggregateInput;
    managedProjects?: Prisma.ProjectOrderByRelationAggregateInput;
    createdTasks?: Prisma.TaskOrderByRelationAggregateInput;
    assignedTasks?: Prisma.TaskOrderByRelationAggregateInput;
    otpCodes?: Prisma.OtpCodeOrderByRelationAggregateInput;
    loginAttempts?: Prisma.LoginAttemptOrderByRelationAggregateInput;
    projectAuditLogs?: Prisma.ProjectAuditLogOrderByRelationAggregateInput;
    taskAuditLogs?: Prisma.TaskAuditLogOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    username?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    fullName?: Prisma.StringFilter<"User"> | string;
    phone?: Prisma.StringFilter<"User"> | string;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    roles?: Prisma.StringNullableListFilter<"User">;
    status?: Prisma.EnumUserStatusFilter<"User"> | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    offices?: Prisma.OfficeListRelationFilter;
    ownedOffice?: Prisma.XOR<Prisma.OfficeNullableScalarRelationFilter, Prisma.OfficeWhereInput> | null;
    createdProjects?: Prisma.ProjectListRelationFilter;
    managedProjects?: Prisma.ProjectListRelationFilter;
    createdTasks?: Prisma.TaskListRelationFilter;
    assignedTasks?: Prisma.TaskListRelationFilter;
    otpCodes?: Prisma.OtpCodeListRelationFilter;
    loginAttempts?: Prisma.LoginAttemptListRelationFilter;
    projectAuditLogs?: Prisma.ProjectAuditLogListRelationFilter;
    taskAuditLogs?: Prisma.TaskAuditLogListRelationFilter;
}, "id" | "email" | "username">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    roles?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    fullName?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    phone?: Prisma.StringWithAggregatesFilter<"User"> | string;
    username?: Prisma.StringWithAggregatesFilter<"User"> | string;
    passwordHash?: Prisma.StringWithAggregatesFilter<"User"> | string;
    roles?: Prisma.StringNullableListFilter<"User">;
    status?: Prisma.EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeUncheckedCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeUncheckedCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeUncheckedCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedCreateNestedManyWithoutActorInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUncheckedUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUncheckedUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUncheckedUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserListRelationFilter = {
    every?: Prisma.UserWhereInput;
    some?: Prisma.UserWhereInput;
    none?: Prisma.UserWhereInput;
};
export type UserOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    roles?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserCreateNestedOneWithoutOwnedOfficeInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOwnedOfficeInput, Prisma.UserUncheckedCreateWithoutOwnedOfficeInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOwnedOfficeInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedManyWithoutOfficesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOfficesInput, Prisma.UserUncheckedCreateWithoutOfficesInput> | Prisma.UserCreateWithoutOfficesInput[] | Prisma.UserUncheckedCreateWithoutOfficesInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOfficesInput | Prisma.UserCreateOrConnectWithoutOfficesInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUncheckedCreateNestedManyWithoutOfficesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOfficesInput, Prisma.UserUncheckedCreateWithoutOfficesInput> | Prisma.UserCreateWithoutOfficesInput[] | Prisma.UserUncheckedCreateWithoutOfficesInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOfficesInput | Prisma.UserCreateOrConnectWithoutOfficesInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUpdateOneRequiredWithoutOwnedOfficeNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOwnedOfficeInput, Prisma.UserUncheckedCreateWithoutOwnedOfficeInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOwnedOfficeInput;
    upsert?: Prisma.UserUpsertWithoutOwnedOfficeInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOwnedOfficeInput, Prisma.UserUpdateWithoutOwnedOfficeInput>, Prisma.UserUncheckedUpdateWithoutOwnedOfficeInput>;
};
export type UserUpdateManyWithoutOfficesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOfficesInput, Prisma.UserUncheckedCreateWithoutOfficesInput> | Prisma.UserCreateWithoutOfficesInput[] | Prisma.UserUncheckedCreateWithoutOfficesInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOfficesInput | Prisma.UserCreateOrConnectWithoutOfficesInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutOfficesInput | Prisma.UserUpsertWithWhereUniqueWithoutOfficesInput[];
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutOfficesInput | Prisma.UserUpdateWithWhereUniqueWithoutOfficesInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutOfficesInput | Prisma.UserUpdateManyWithWhereWithoutOfficesInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type UserUncheckedUpdateManyWithoutOfficesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOfficesInput, Prisma.UserUncheckedCreateWithoutOfficesInput> | Prisma.UserCreateWithoutOfficesInput[] | Prisma.UserUncheckedCreateWithoutOfficesInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOfficesInput | Prisma.UserCreateOrConnectWithoutOfficesInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutOfficesInput | Prisma.UserUpsertWithWhereUniqueWithoutOfficesInput[];
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutOfficesInput | Prisma.UserUpdateWithWhereUniqueWithoutOfficesInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutOfficesInput | Prisma.UserUpdateManyWithWhereWithoutOfficesInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type UserCreaterolesInput = {
    set: string[];
};
export type UserUpdaterolesInput = {
    set?: string[];
    push?: string | string[];
};
export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus;
};
export type UserCreateNestedOneWithoutCreatedProjectsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCreatedProjectsInput, Prisma.UserUncheckedCreateWithoutCreatedProjectsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCreatedProjectsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutManagedProjectsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutManagedProjectsInput, Prisma.UserUncheckedCreateWithoutManagedProjectsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutManagedProjectsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutCreatedProjectsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCreatedProjectsInput, Prisma.UserUncheckedCreateWithoutCreatedProjectsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCreatedProjectsInput;
    upsert?: Prisma.UserUpsertWithoutCreatedProjectsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutCreatedProjectsInput, Prisma.UserUpdateWithoutCreatedProjectsInput>, Prisma.UserUncheckedUpdateWithoutCreatedProjectsInput>;
};
export type UserUpdateOneRequiredWithoutManagedProjectsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutManagedProjectsInput, Prisma.UserUncheckedCreateWithoutManagedProjectsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutManagedProjectsInput;
    upsert?: Prisma.UserUpsertWithoutManagedProjectsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutManagedProjectsInput, Prisma.UserUpdateWithoutManagedProjectsInput>, Prisma.UserUncheckedUpdateWithoutManagedProjectsInput>;
};
export type UserCreateNestedOneWithoutCreatedTasksInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCreatedTasksInput, Prisma.UserUncheckedCreateWithoutCreatedTasksInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCreatedTasksInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutAssignedTasksInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAssignedTasksInput, Prisma.UserUncheckedCreateWithoutAssignedTasksInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAssignedTasksInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutCreatedTasksNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCreatedTasksInput, Prisma.UserUncheckedCreateWithoutCreatedTasksInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCreatedTasksInput;
    upsert?: Prisma.UserUpsertWithoutCreatedTasksInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutCreatedTasksInput, Prisma.UserUpdateWithoutCreatedTasksInput>, Prisma.UserUncheckedUpdateWithoutCreatedTasksInput>;
};
export type UserUpdateOneRequiredWithoutAssignedTasksNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAssignedTasksInput, Prisma.UserUncheckedCreateWithoutAssignedTasksInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAssignedTasksInput;
    upsert?: Prisma.UserUpsertWithoutAssignedTasksInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAssignedTasksInput, Prisma.UserUpdateWithoutAssignedTasksInput>, Prisma.UserUncheckedUpdateWithoutAssignedTasksInput>;
};
export type UserCreateNestedOneWithoutOtpCodesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOtpCodesInput, Prisma.UserUncheckedCreateWithoutOtpCodesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOtpCodesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutOtpCodesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOtpCodesInput, Prisma.UserUncheckedCreateWithoutOtpCodesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOtpCodesInput;
    upsert?: Prisma.UserUpsertWithoutOtpCodesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOtpCodesInput, Prisma.UserUpdateWithoutOtpCodesInput>, Prisma.UserUncheckedUpdateWithoutOtpCodesInput>;
};
export type UserCreateNestedOneWithoutLoginAttemptsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutLoginAttemptsInput, Prisma.UserUncheckedCreateWithoutLoginAttemptsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutLoginAttemptsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutLoginAttemptsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutLoginAttemptsInput, Prisma.UserUncheckedCreateWithoutLoginAttemptsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutLoginAttemptsInput;
    upsert?: Prisma.UserUpsertWithoutLoginAttemptsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutLoginAttemptsInput, Prisma.UserUpdateWithoutLoginAttemptsInput>, Prisma.UserUncheckedUpdateWithoutLoginAttemptsInput>;
};
export type UserCreateNestedOneWithoutProjectAuditLogsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutProjectAuditLogsInput, Prisma.UserUncheckedCreateWithoutProjectAuditLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutProjectAuditLogsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutProjectAuditLogsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutProjectAuditLogsInput, Prisma.UserUncheckedCreateWithoutProjectAuditLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutProjectAuditLogsInput;
    upsert?: Prisma.UserUpsertWithoutProjectAuditLogsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutProjectAuditLogsInput, Prisma.UserUpdateWithoutProjectAuditLogsInput>, Prisma.UserUncheckedUpdateWithoutProjectAuditLogsInput>;
};
export type UserCreateNestedOneWithoutTaskAuditLogsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutTaskAuditLogsInput, Prisma.UserUncheckedCreateWithoutTaskAuditLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutTaskAuditLogsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutTaskAuditLogsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutTaskAuditLogsInput, Prisma.UserUncheckedCreateWithoutTaskAuditLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutTaskAuditLogsInput;
    upsert?: Prisma.UserUpsertWithoutTaskAuditLogsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutTaskAuditLogsInput, Prisma.UserUpdateWithoutTaskAuditLogsInput>, Prisma.UserUncheckedUpdateWithoutTaskAuditLogsInput>;
};
export type UserCreateWithoutOwnedOfficeInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeCreateNestedManyWithoutUsersInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateWithoutOwnedOfficeInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeUncheckedCreateNestedManyWithoutUsersInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeUncheckedCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedCreateNestedManyWithoutActorInput;
};
export type UserCreateOrConnectWithoutOwnedOfficeInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOwnedOfficeInput, Prisma.UserUncheckedCreateWithoutOwnedOfficeInput>;
};
export type UserCreateWithoutOfficesInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    ownedOffice?: Prisma.OfficeCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateWithoutOfficesInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    ownedOffice?: Prisma.OfficeUncheckedCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeUncheckedCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedCreateNestedManyWithoutActorInput;
};
export type UserCreateOrConnectWithoutOfficesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOfficesInput, Prisma.UserUncheckedCreateWithoutOfficesInput>;
};
export type UserUpsertWithoutOwnedOfficeInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOwnedOfficeInput, Prisma.UserUncheckedUpdateWithoutOwnedOfficeInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOwnedOfficeInput, Prisma.UserUncheckedCreateWithoutOwnedOfficeInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOwnedOfficeInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOwnedOfficeInput, Prisma.UserUncheckedUpdateWithoutOwnedOfficeInput>;
};
export type UserUpdateWithoutOwnedOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUpdateManyWithoutUsersNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateWithoutOwnedOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUncheckedUpdateManyWithoutUsersNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUncheckedUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserUpsertWithWhereUniqueWithoutOfficesInput = {
    where: Prisma.UserWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserUpdateWithoutOfficesInput, Prisma.UserUncheckedUpdateWithoutOfficesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOfficesInput, Prisma.UserUncheckedCreateWithoutOfficesInput>;
};
export type UserUpdateWithWhereUniqueWithoutOfficesInput = {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOfficesInput, Prisma.UserUncheckedUpdateWithoutOfficesInput>;
};
export type UserUpdateManyWithWhereWithoutOfficesInput = {
    where: Prisma.UserScalarWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyWithoutOfficesInput>;
};
export type UserScalarWhereInput = {
    AND?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
    OR?: Prisma.UserScalarWhereInput[];
    NOT?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    fullName?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    phone?: Prisma.StringFilter<"User"> | string;
    username?: Prisma.StringFilter<"User"> | string;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    roles?: Prisma.StringNullableListFilter<"User">;
    status?: Prisma.EnumUserStatusFilter<"User"> | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
};
export type UserCreateWithoutCreatedProjectsInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeCreateNestedOneWithoutOwnerInput;
    managedProjects?: Prisma.ProjectCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateWithoutCreatedProjectsInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeUncheckedCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeUncheckedCreateNestedOneWithoutOwnerInput;
    managedProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeUncheckedCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedCreateNestedManyWithoutActorInput;
};
export type UserCreateOrConnectWithoutCreatedProjectsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutCreatedProjectsInput, Prisma.UserUncheckedCreateWithoutCreatedProjectsInput>;
};
export type UserCreateWithoutManagedProjectsInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateWithoutManagedProjectsInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeUncheckedCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeUncheckedCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeUncheckedCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedCreateNestedManyWithoutActorInput;
};
export type UserCreateOrConnectWithoutManagedProjectsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutManagedProjectsInput, Prisma.UserUncheckedCreateWithoutManagedProjectsInput>;
};
export type UserUpsertWithoutCreatedProjectsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutCreatedProjectsInput, Prisma.UserUncheckedUpdateWithoutCreatedProjectsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutCreatedProjectsInput, Prisma.UserUncheckedCreateWithoutCreatedProjectsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutCreatedProjectsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutCreatedProjectsInput, Prisma.UserUncheckedUpdateWithoutCreatedProjectsInput>;
};
export type UserUpdateWithoutCreatedProjectsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUpdateOneWithoutOwnerNestedInput;
    managedProjects?: Prisma.ProjectUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateWithoutCreatedProjectsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUncheckedUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUncheckedUpdateOneWithoutOwnerNestedInput;
    managedProjects?: Prisma.ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUncheckedUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserUpsertWithoutManagedProjectsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutManagedProjectsInput, Prisma.UserUncheckedUpdateWithoutManagedProjectsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutManagedProjectsInput, Prisma.UserUncheckedCreateWithoutManagedProjectsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutManagedProjectsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutManagedProjectsInput, Prisma.UserUncheckedUpdateWithoutManagedProjectsInput>;
};
export type UserUpdateWithoutManagedProjectsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateWithoutManagedProjectsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUncheckedUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUncheckedUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUncheckedUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserCreateWithoutCreatedTasksInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectCreateNestedManyWithoutProjectManagerInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateWithoutCreatedTasksInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeUncheckedCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeUncheckedCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutProjectManagerInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeUncheckedCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedCreateNestedManyWithoutActorInput;
};
export type UserCreateOrConnectWithoutCreatedTasksInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutCreatedTasksInput, Prisma.UserUncheckedCreateWithoutCreatedTasksInput>;
};
export type UserCreateWithoutAssignedTasksInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    otpCodes?: Prisma.OtpCodeCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateWithoutAssignedTasksInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeUncheckedCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeUncheckedCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    otpCodes?: Prisma.OtpCodeUncheckedCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedCreateNestedManyWithoutActorInput;
};
export type UserCreateOrConnectWithoutAssignedTasksInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAssignedTasksInput, Prisma.UserUncheckedCreateWithoutAssignedTasksInput>;
};
export type UserUpsertWithoutCreatedTasksInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutCreatedTasksInput, Prisma.UserUncheckedUpdateWithoutCreatedTasksInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutCreatedTasksInput, Prisma.UserUncheckedCreateWithoutCreatedTasksInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutCreatedTasksInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutCreatedTasksInput, Prisma.UserUncheckedUpdateWithoutCreatedTasksInput>;
};
export type UserUpdateWithoutCreatedTasksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUpdateManyWithoutProjectManagerNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateWithoutCreatedTasksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUncheckedUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUncheckedUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUncheckedUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserUpsertWithoutAssignedTasksInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAssignedTasksInput, Prisma.UserUncheckedUpdateWithoutAssignedTasksInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAssignedTasksInput, Prisma.UserUncheckedCreateWithoutAssignedTasksInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAssignedTasksInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAssignedTasksInput, Prisma.UserUncheckedUpdateWithoutAssignedTasksInput>;
};
export type UserUpdateWithoutAssignedTasksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    otpCodes?: Prisma.OtpCodeUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateWithoutAssignedTasksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUncheckedUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUncheckedUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    otpCodes?: Prisma.OtpCodeUncheckedUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserCreateWithoutOtpCodesInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    loginAttempts?: Prisma.LoginAttemptCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateWithoutOtpCodesInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeUncheckedCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeUncheckedCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedCreateNestedManyWithoutActorInput;
};
export type UserCreateOrConnectWithoutOtpCodesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOtpCodesInput, Prisma.UserUncheckedCreateWithoutOtpCodesInput>;
};
export type UserUpsertWithoutOtpCodesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOtpCodesInput, Prisma.UserUncheckedUpdateWithoutOtpCodesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOtpCodesInput, Prisma.UserUncheckedCreateWithoutOtpCodesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOtpCodesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOtpCodesInput, Prisma.UserUncheckedUpdateWithoutOtpCodesInput>;
};
export type UserUpdateWithoutOtpCodesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    loginAttempts?: Prisma.LoginAttemptUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateWithoutOtpCodesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUncheckedUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUncheckedUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserCreateWithoutLoginAttemptsInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateWithoutLoginAttemptsInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeUncheckedCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeUncheckedCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeUncheckedCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedCreateNestedManyWithoutActorInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedCreateNestedManyWithoutActorInput;
};
export type UserCreateOrConnectWithoutLoginAttemptsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutLoginAttemptsInput, Prisma.UserUncheckedCreateWithoutLoginAttemptsInput>;
};
export type UserUpsertWithoutLoginAttemptsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutLoginAttemptsInput, Prisma.UserUncheckedUpdateWithoutLoginAttemptsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutLoginAttemptsInput, Prisma.UserUncheckedCreateWithoutLoginAttemptsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutLoginAttemptsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutLoginAttemptsInput, Prisma.UserUncheckedUpdateWithoutLoginAttemptsInput>;
};
export type UserUpdateWithoutLoginAttemptsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateWithoutLoginAttemptsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUncheckedUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUncheckedUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUncheckedUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserCreateWithoutProjectAuditLogsInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptCreateNestedManyWithoutUserInput;
    taskAuditLogs?: Prisma.TaskAuditLogCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateWithoutProjectAuditLogsInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeUncheckedCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeUncheckedCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeUncheckedCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedCreateNestedManyWithoutUserInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedCreateNestedManyWithoutActorInput;
};
export type UserCreateOrConnectWithoutProjectAuditLogsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutProjectAuditLogsInput, Prisma.UserUncheckedCreateWithoutProjectAuditLogsInput>;
};
export type UserUpsertWithoutProjectAuditLogsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutProjectAuditLogsInput, Prisma.UserUncheckedUpdateWithoutProjectAuditLogsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutProjectAuditLogsInput, Prisma.UserUncheckedCreateWithoutProjectAuditLogsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutProjectAuditLogsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutProjectAuditLogsInput, Prisma.UserUncheckedUpdateWithoutProjectAuditLogsInput>;
};
export type UserUpdateWithoutProjectAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUpdateManyWithoutUserNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateWithoutProjectAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUncheckedUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUncheckedUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUncheckedUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedUpdateManyWithoutUserNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserCreateWithoutTaskAuditLogsInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogCreateNestedManyWithoutActorInput;
};
export type UserUncheckedCreateWithoutTaskAuditLogsInput = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    passwordHash: string;
    roles?: Prisma.UserCreaterolesInput | string[];
    status: $Enums.UserStatus;
    createdAt?: Date | string;
    offices?: Prisma.OfficeUncheckedCreateNestedManyWithoutUsersInput;
    ownedOffice?: Prisma.OfficeUncheckedCreateNestedOneWithoutOwnerInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    managedProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutProjectManagerInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    otpCodes?: Prisma.OtpCodeUncheckedCreateNestedManyWithoutUserInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedCreateNestedManyWithoutUserInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedCreateNestedManyWithoutActorInput;
};
export type UserCreateOrConnectWithoutTaskAuditLogsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutTaskAuditLogsInput, Prisma.UserUncheckedCreateWithoutTaskAuditLogsInput>;
};
export type UserUpsertWithoutTaskAuditLogsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutTaskAuditLogsInput, Prisma.UserUncheckedUpdateWithoutTaskAuditLogsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutTaskAuditLogsInput, Prisma.UserUncheckedCreateWithoutTaskAuditLogsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutTaskAuditLogsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutTaskAuditLogsInput, Prisma.UserUncheckedUpdateWithoutTaskAuditLogsInput>;
};
export type UserUpdateWithoutTaskAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateWithoutTaskAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offices?: Prisma.OfficeUncheckedUpdateManyWithoutUsersNestedInput;
    ownedOffice?: Prisma.OfficeUncheckedUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUncheckedUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserUpdateWithoutOfficesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownedOffice?: Prisma.OfficeUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateWithoutOfficesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownedOffice?: Prisma.OfficeUncheckedUpdateOneWithoutOwnerNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    managedProjects?: Prisma.ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    otpCodes?: Prisma.OtpCodeUncheckedUpdateManyWithoutUserNestedInput;
    loginAttempts?: Prisma.LoginAttemptUncheckedUpdateManyWithoutUserNestedInput;
    projectAuditLogs?: Prisma.ProjectAuditLogUncheckedUpdateManyWithoutActorNestedInput;
    taskAuditLogs?: Prisma.TaskAuditLogUncheckedUpdateManyWithoutActorNestedInput;
};
export type UserUncheckedUpdateManyWithoutOfficesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.UserUpdaterolesInput | string[];
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOutputType = {
    offices: number;
    createdProjects: number;
    managedProjects: number;
    createdTasks: number;
    assignedTasks: number;
    otpCodes: number;
    loginAttempts: number;
    projectAuditLogs: number;
    taskAuditLogs: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    offices?: boolean | UserCountOutputTypeCountOfficesArgs;
    createdProjects?: boolean | UserCountOutputTypeCountCreatedProjectsArgs;
    managedProjects?: boolean | UserCountOutputTypeCountManagedProjectsArgs;
    createdTasks?: boolean | UserCountOutputTypeCountCreatedTasksArgs;
    assignedTasks?: boolean | UserCountOutputTypeCountAssignedTasksArgs;
    otpCodes?: boolean | UserCountOutputTypeCountOtpCodesArgs;
    loginAttempts?: boolean | UserCountOutputTypeCountLoginAttemptsArgs;
    projectAuditLogs?: boolean | UserCountOutputTypeCountProjectAuditLogsArgs;
    taskAuditLogs?: boolean | UserCountOutputTypeCountTaskAuditLogsArgs;
};
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
export type UserCountOutputTypeCountOfficesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OfficeWhereInput;
};
export type UserCountOutputTypeCountCreatedProjectsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
};
export type UserCountOutputTypeCountManagedProjectsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
};
export type UserCountOutputTypeCountCreatedTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaskWhereInput;
};
export type UserCountOutputTypeCountAssignedTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaskWhereInput;
};
export type UserCountOutputTypeCountOtpCodesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OtpCodeWhereInput;
};
export type UserCountOutputTypeCountLoginAttemptsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoginAttemptWhereInput;
};
export type UserCountOutputTypeCountProjectAuditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectAuditLogWhereInput;
};
export type UserCountOutputTypeCountTaskAuditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaskAuditLogWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    phone?: boolean;
    username?: boolean;
    passwordHash?: boolean;
    roles?: boolean;
    status?: boolean;
    createdAt?: boolean;
    offices?: boolean | Prisma.User$officesArgs<ExtArgs>;
    ownedOffice?: boolean | Prisma.User$ownedOfficeArgs<ExtArgs>;
    createdProjects?: boolean | Prisma.User$createdProjectsArgs<ExtArgs>;
    managedProjects?: boolean | Prisma.User$managedProjectsArgs<ExtArgs>;
    createdTasks?: boolean | Prisma.User$createdTasksArgs<ExtArgs>;
    assignedTasks?: boolean | Prisma.User$assignedTasksArgs<ExtArgs>;
    otpCodes?: boolean | Prisma.User$otpCodesArgs<ExtArgs>;
    loginAttempts?: boolean | Prisma.User$loginAttemptsArgs<ExtArgs>;
    projectAuditLogs?: boolean | Prisma.User$projectAuditLogsArgs<ExtArgs>;
    taskAuditLogs?: boolean | Prisma.User$taskAuditLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    phone?: boolean;
    username?: boolean;
    passwordHash?: boolean;
    roles?: boolean;
    status?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    phone?: boolean;
    username?: boolean;
    passwordHash?: boolean;
    roles?: boolean;
    status?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    phone?: boolean;
    username?: boolean;
    passwordHash?: boolean;
    roles?: boolean;
    status?: boolean;
    createdAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "fullName" | "email" | "phone" | "username" | "passwordHash" | "roles" | "status" | "createdAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    offices?: boolean | Prisma.User$officesArgs<ExtArgs>;
    ownedOffice?: boolean | Prisma.User$ownedOfficeArgs<ExtArgs>;
    createdProjects?: boolean | Prisma.User$createdProjectsArgs<ExtArgs>;
    managedProjects?: boolean | Prisma.User$managedProjectsArgs<ExtArgs>;
    createdTasks?: boolean | Prisma.User$createdTasksArgs<ExtArgs>;
    assignedTasks?: boolean | Prisma.User$assignedTasksArgs<ExtArgs>;
    otpCodes?: boolean | Prisma.User$otpCodesArgs<ExtArgs>;
    loginAttempts?: boolean | Prisma.User$loginAttemptsArgs<ExtArgs>;
    projectAuditLogs?: boolean | Prisma.User$projectAuditLogsArgs<ExtArgs>;
    taskAuditLogs?: boolean | Prisma.User$taskAuditLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        offices: Prisma.$OfficePayload<ExtArgs>[];
        ownedOffice: Prisma.$OfficePayload<ExtArgs> | null;
        createdProjects: Prisma.$ProjectPayload<ExtArgs>[];
        managedProjects: Prisma.$ProjectPayload<ExtArgs>[];
        createdTasks: Prisma.$TaskPayload<ExtArgs>[];
        assignedTasks: Prisma.$TaskPayload<ExtArgs>[];
        otpCodes: Prisma.$OtpCodePayload<ExtArgs>[];
        loginAttempts: Prisma.$LoginAttemptPayload<ExtArgs>[];
        projectAuditLogs: Prisma.$ProjectAuditLogPayload<ExtArgs>[];
        taskAuditLogs: Prisma.$TaskAuditLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        fullName: string;
        email: string;
        phone: string;
        username: string;
        passwordHash: string;
        roles: string[];
        status: $Enums.UserStatus;
        createdAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFieldRefs;
}
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    offices<T extends Prisma.User$officesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$officesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OfficePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    ownedOffice<T extends Prisma.User$ownedOfficeArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$ownedOfficeArgs<ExtArgs>>): Prisma.Prisma__OfficeClient<runtime.Types.Result.GetResult<Prisma.$OfficePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    createdProjects<T extends Prisma.User$createdProjectsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$createdProjectsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    managedProjects<T extends Prisma.User$managedProjectsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$managedProjectsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    createdTasks<T extends Prisma.User$createdTasksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$createdTasksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    assignedTasks<T extends Prisma.User$assignedTasksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$assignedTasksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    otpCodes<T extends Prisma.User$otpCodesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$otpCodesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    loginAttempts<T extends Prisma.User$loginAttemptsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$loginAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    projectAuditLogs<T extends Prisma.User$projectAuditLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$projectAuditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    taskAuditLogs<T extends Prisma.User$taskAuditLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$taskAuditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly fullName: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly phone: Prisma.FieldRef<"User", 'String'>;
    readonly username: Prisma.FieldRef<"User", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"User", 'String'>;
    readonly roles: Prisma.FieldRef<"User", 'String[]'>;
    readonly status: Prisma.FieldRef<"User", 'UserStatus'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
}
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    where: Prisma.UserWhereUniqueInput;
};
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type User$officesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OfficeSelect<ExtArgs> | null;
    omit?: Prisma.OfficeOmit<ExtArgs> | null;
    include?: Prisma.OfficeInclude<ExtArgs> | null;
    where?: Prisma.OfficeWhereInput;
    orderBy?: Prisma.OfficeOrderByWithRelationInput | Prisma.OfficeOrderByWithRelationInput[];
    cursor?: Prisma.OfficeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OfficeScalarFieldEnum | Prisma.OfficeScalarFieldEnum[];
};
export type User$ownedOfficeArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OfficeSelect<ExtArgs> | null;
    omit?: Prisma.OfficeOmit<ExtArgs> | null;
    include?: Prisma.OfficeInclude<ExtArgs> | null;
    where?: Prisma.OfficeWhereInput;
};
export type User$createdProjectsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectScalarFieldEnum | Prisma.ProjectScalarFieldEnum[];
};
export type User$managedProjectsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectScalarFieldEnum | Prisma.ProjectScalarFieldEnum[];
};
export type User$createdTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskSelect<ExtArgs> | null;
    omit?: Prisma.TaskOmit<ExtArgs> | null;
    include?: Prisma.TaskInclude<ExtArgs> | null;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput | Prisma.TaskOrderByWithRelationInput[];
    cursor?: Prisma.TaskWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TaskScalarFieldEnum | Prisma.TaskScalarFieldEnum[];
};
export type User$assignedTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskSelect<ExtArgs> | null;
    omit?: Prisma.TaskOmit<ExtArgs> | null;
    include?: Prisma.TaskInclude<ExtArgs> | null;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput | Prisma.TaskOrderByWithRelationInput[];
    cursor?: Prisma.TaskWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TaskScalarFieldEnum | Prisma.TaskScalarFieldEnum[];
};
export type User$otpCodesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpCodeSelect<ExtArgs> | null;
    omit?: Prisma.OtpCodeOmit<ExtArgs> | null;
    include?: Prisma.OtpCodeInclude<ExtArgs> | null;
    where?: Prisma.OtpCodeWhereInput;
    orderBy?: Prisma.OtpCodeOrderByWithRelationInput | Prisma.OtpCodeOrderByWithRelationInput[];
    cursor?: Prisma.OtpCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OtpCodeScalarFieldEnum | Prisma.OtpCodeScalarFieldEnum[];
};
export type User$loginAttemptsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoginAttemptSelect<ExtArgs> | null;
    omit?: Prisma.LoginAttemptOmit<ExtArgs> | null;
    include?: Prisma.LoginAttemptInclude<ExtArgs> | null;
    where?: Prisma.LoginAttemptWhereInput;
    orderBy?: Prisma.LoginAttemptOrderByWithRelationInput | Prisma.LoginAttemptOrderByWithRelationInput[];
    cursor?: Prisma.LoginAttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LoginAttemptScalarFieldEnum | Prisma.LoginAttemptScalarFieldEnum[];
};
export type User$projectAuditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.ProjectAuditLogOmit<ExtArgs> | null;
    include?: Prisma.ProjectAuditLogInclude<ExtArgs> | null;
    where?: Prisma.ProjectAuditLogWhereInput;
    orderBy?: Prisma.ProjectAuditLogOrderByWithRelationInput | Prisma.ProjectAuditLogOrderByWithRelationInput[];
    cursor?: Prisma.ProjectAuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectAuditLogScalarFieldEnum | Prisma.ProjectAuditLogScalarFieldEnum[];
};
export type User$taskAuditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.TaskAuditLogOmit<ExtArgs> | null;
    include?: Prisma.TaskAuditLogInclude<ExtArgs> | null;
    where?: Prisma.TaskAuditLogWhereInput;
    orderBy?: Prisma.TaskAuditLogOrderByWithRelationInput | Prisma.TaskAuditLogOrderByWithRelationInput[];
    cursor?: Prisma.TaskAuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TaskAuditLogScalarFieldEnum | Prisma.TaskAuditLogScalarFieldEnum[];
};
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
};
export {};
