import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type TaskModel = runtime.Types.Result.DefaultSelection<Prisma.$TaskPayload>;
export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null;
    _min: TaskMinAggregateOutputType | null;
    _max: TaskMaxAggregateOutputType | null;
};
export type TaskMinAggregateOutputType = {
    id: string | null;
    projectId: string | null;
    createdByUserId: string | null;
    assignedToUserId: string | null;
    title: string | null;
    description: string | null;
    status: $Enums.TaskStatus | null;
    dueDate: Date | null;
    createdAt: Date | null;
};
export type TaskMaxAggregateOutputType = {
    id: string | null;
    projectId: string | null;
    createdByUserId: string | null;
    assignedToUserId: string | null;
    title: string | null;
    description: string | null;
    status: $Enums.TaskStatus | null;
    dueDate: Date | null;
    createdAt: Date | null;
};
export type TaskCountAggregateOutputType = {
    id: number;
    projectId: number;
    createdByUserId: number;
    assignedToUserId: number;
    title: number;
    description: number;
    status: number;
    dueDate: number;
    createdAt: number;
    _all: number;
};
export type TaskMinAggregateInputType = {
    id?: true;
    projectId?: true;
    createdByUserId?: true;
    assignedToUserId?: true;
    title?: true;
    description?: true;
    status?: true;
    dueDate?: true;
    createdAt?: true;
};
export type TaskMaxAggregateInputType = {
    id?: true;
    projectId?: true;
    createdByUserId?: true;
    assignedToUserId?: true;
    title?: true;
    description?: true;
    status?: true;
    dueDate?: true;
    createdAt?: true;
};
export type TaskCountAggregateInputType = {
    id?: true;
    projectId?: true;
    createdByUserId?: true;
    assignedToUserId?: true;
    title?: true;
    description?: true;
    status?: true;
    dueDate?: true;
    createdAt?: true;
    _all?: true;
};
export type TaskAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput | Prisma.TaskOrderByWithRelationInput[];
    cursor?: Prisma.TaskWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TaskCountAggregateInputType;
    _min?: TaskMinAggregateInputType;
    _max?: TaskMaxAggregateInputType;
};
export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
    [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTask[P]> : Prisma.GetScalarType<T[P], AggregateTask[P]>;
};
export type TaskGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithAggregationInput | Prisma.TaskOrderByWithAggregationInput[];
    by: Prisma.TaskScalarFieldEnum[] | Prisma.TaskScalarFieldEnum;
    having?: Prisma.TaskScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TaskCountAggregateInputType | true;
    _min?: TaskMinAggregateInputType;
    _max?: TaskMaxAggregateInputType;
};
export type TaskGroupByOutputType = {
    id: string;
    projectId: string;
    createdByUserId: string;
    assignedToUserId: string;
    title: string;
    description: string | null;
    status: $Enums.TaskStatus;
    dueDate: Date | null;
    createdAt: Date;
    _count: TaskCountAggregateOutputType | null;
    _min: TaskMinAggregateOutputType | null;
    _max: TaskMaxAggregateOutputType | null;
};
type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TaskGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TaskGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TaskGroupByOutputType[P]>;
}>>;
export type TaskWhereInput = {
    AND?: Prisma.TaskWhereInput | Prisma.TaskWhereInput[];
    OR?: Prisma.TaskWhereInput[];
    NOT?: Prisma.TaskWhereInput | Prisma.TaskWhereInput[];
    id?: Prisma.StringFilter<"Task"> | string;
    projectId?: Prisma.StringFilter<"Task"> | string;
    createdByUserId?: Prisma.StringFilter<"Task"> | string;
    assignedToUserId?: Prisma.StringFilter<"Task"> | string;
    title?: Prisma.StringFilter<"Task"> | string;
    description?: Prisma.StringNullableFilter<"Task"> | string | null;
    status?: Prisma.EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus;
    dueDate?: Prisma.DateTimeNullableFilter<"Task"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Task"> | Date | string;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
    createdBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    assignedTo?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    auditLogs?: Prisma.TaskAuditLogListRelationFilter;
};
export type TaskOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
    assignedToUserId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    project?: Prisma.ProjectOrderByWithRelationInput;
    createdBy?: Prisma.UserOrderByWithRelationInput;
    assignedTo?: Prisma.UserOrderByWithRelationInput;
    auditLogs?: Prisma.TaskAuditLogOrderByRelationAggregateInput;
};
export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TaskWhereInput | Prisma.TaskWhereInput[];
    OR?: Prisma.TaskWhereInput[];
    NOT?: Prisma.TaskWhereInput | Prisma.TaskWhereInput[];
    projectId?: Prisma.StringFilter<"Task"> | string;
    createdByUserId?: Prisma.StringFilter<"Task"> | string;
    assignedToUserId?: Prisma.StringFilter<"Task"> | string;
    title?: Prisma.StringFilter<"Task"> | string;
    description?: Prisma.StringNullableFilter<"Task"> | string | null;
    status?: Prisma.EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus;
    dueDate?: Prisma.DateTimeNullableFilter<"Task"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Task"> | Date | string;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
    createdBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    assignedTo?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    auditLogs?: Prisma.TaskAuditLogListRelationFilter;
}, "id">;
export type TaskOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
    assignedToUserId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TaskCountOrderByAggregateInput;
    _max?: Prisma.TaskMaxOrderByAggregateInput;
    _min?: Prisma.TaskMinOrderByAggregateInput;
};
export type TaskScalarWhereWithAggregatesInput = {
    AND?: Prisma.TaskScalarWhereWithAggregatesInput | Prisma.TaskScalarWhereWithAggregatesInput[];
    OR?: Prisma.TaskScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TaskScalarWhereWithAggregatesInput | Prisma.TaskScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Task"> | string;
    projectId?: Prisma.StringWithAggregatesFilter<"Task"> | string;
    createdByUserId?: Prisma.StringWithAggregatesFilter<"Task"> | string;
    assignedToUserId?: Prisma.StringWithAggregatesFilter<"Task"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Task"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Task"> | string | null;
    status?: Prisma.EnumTaskStatusWithAggregatesFilter<"Task"> | $Enums.TaskStatus;
    dueDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Task"> | Date | string;
};
export type TaskCreateInput = {
    id?: string;
    title: string;
    description?: string | null;
    status: $Enums.TaskStatus;
    dueDate?: Date | string | null;
    createdAt?: Date | string;
    project: Prisma.ProjectCreateNestedOneWithoutTasksInput;
    createdBy: Prisma.UserCreateNestedOneWithoutCreatedTasksInput;
    assignedTo: Prisma.UserCreateNestedOneWithoutAssignedTasksInput;
    auditLogs?: Prisma.TaskAuditLogCreateNestedManyWithoutTaskInput;
};
export type TaskUncheckedCreateInput = {
    id?: string;
    projectId: string;
    createdByUserId: string;
    assignedToUserId: string;
    title: string;
    description?: string | null;
    status: $Enums.TaskStatus;
    dueDate?: Date | string | null;
    createdAt?: Date | string;
    auditLogs?: Prisma.TaskAuditLogUncheckedCreateNestedManyWithoutTaskInput;
};
export type TaskUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.ProjectUpdateOneRequiredWithoutTasksNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCreatedTasksNestedInput;
    assignedTo?: Prisma.UserUpdateOneRequiredWithoutAssignedTasksNestedInput;
    auditLogs?: Prisma.TaskAuditLogUpdateManyWithoutTaskNestedInput;
};
export type TaskUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    auditLogs?: Prisma.TaskAuditLogUncheckedUpdateManyWithoutTaskNestedInput;
};
export type TaskCreateManyInput = {
    id?: string;
    projectId: string;
    createdByUserId: string;
    assignedToUserId: string;
    title: string;
    description?: string | null;
    status: $Enums.TaskStatus;
    dueDate?: Date | string | null;
    createdAt?: Date | string;
};
export type TaskUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaskUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaskListRelationFilter = {
    every?: Prisma.TaskWhereInput;
    some?: Prisma.TaskWhereInput;
    none?: Prisma.TaskWhereInput;
};
export type TaskOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TaskCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
    assignedToUserId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TaskMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
    assignedToUserId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TaskMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
    assignedToUserId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TaskScalarRelationFilter = {
    is?: Prisma.TaskWhereInput;
    isNot?: Prisma.TaskWhereInput;
};
export type TaskCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.TaskCreateWithoutCreatedByInput, Prisma.TaskUncheckedCreateWithoutCreatedByInput> | Prisma.TaskCreateWithoutCreatedByInput[] | Prisma.TaskUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.TaskCreateOrConnectWithoutCreatedByInput | Prisma.TaskCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.TaskCreateManyCreatedByInputEnvelope;
    connect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
};
export type TaskCreateNestedManyWithoutAssignedToInput = {
    create?: Prisma.XOR<Prisma.TaskCreateWithoutAssignedToInput, Prisma.TaskUncheckedCreateWithoutAssignedToInput> | Prisma.TaskCreateWithoutAssignedToInput[] | Prisma.TaskUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?: Prisma.TaskCreateOrConnectWithoutAssignedToInput | Prisma.TaskCreateOrConnectWithoutAssignedToInput[];
    createMany?: Prisma.TaskCreateManyAssignedToInputEnvelope;
    connect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
};
export type TaskUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.TaskCreateWithoutCreatedByInput, Prisma.TaskUncheckedCreateWithoutCreatedByInput> | Prisma.TaskCreateWithoutCreatedByInput[] | Prisma.TaskUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.TaskCreateOrConnectWithoutCreatedByInput | Prisma.TaskCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.TaskCreateManyCreatedByInputEnvelope;
    connect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
};
export type TaskUncheckedCreateNestedManyWithoutAssignedToInput = {
    create?: Prisma.XOR<Prisma.TaskCreateWithoutAssignedToInput, Prisma.TaskUncheckedCreateWithoutAssignedToInput> | Prisma.TaskCreateWithoutAssignedToInput[] | Prisma.TaskUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?: Prisma.TaskCreateOrConnectWithoutAssignedToInput | Prisma.TaskCreateOrConnectWithoutAssignedToInput[];
    createMany?: Prisma.TaskCreateManyAssignedToInputEnvelope;
    connect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
};
export type TaskUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.TaskCreateWithoutCreatedByInput, Prisma.TaskUncheckedCreateWithoutCreatedByInput> | Prisma.TaskCreateWithoutCreatedByInput[] | Prisma.TaskUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.TaskCreateOrConnectWithoutCreatedByInput | Prisma.TaskCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.TaskUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.TaskUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.TaskCreateManyCreatedByInputEnvelope;
    set?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    disconnect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    delete?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    connect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    update?: Prisma.TaskUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.TaskUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.TaskUpdateManyWithWhereWithoutCreatedByInput | Prisma.TaskUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.TaskScalarWhereInput | Prisma.TaskScalarWhereInput[];
};
export type TaskUpdateManyWithoutAssignedToNestedInput = {
    create?: Prisma.XOR<Prisma.TaskCreateWithoutAssignedToInput, Prisma.TaskUncheckedCreateWithoutAssignedToInput> | Prisma.TaskCreateWithoutAssignedToInput[] | Prisma.TaskUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?: Prisma.TaskCreateOrConnectWithoutAssignedToInput | Prisma.TaskCreateOrConnectWithoutAssignedToInput[];
    upsert?: Prisma.TaskUpsertWithWhereUniqueWithoutAssignedToInput | Prisma.TaskUpsertWithWhereUniqueWithoutAssignedToInput[];
    createMany?: Prisma.TaskCreateManyAssignedToInputEnvelope;
    set?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    disconnect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    delete?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    connect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    update?: Prisma.TaskUpdateWithWhereUniqueWithoutAssignedToInput | Prisma.TaskUpdateWithWhereUniqueWithoutAssignedToInput[];
    updateMany?: Prisma.TaskUpdateManyWithWhereWithoutAssignedToInput | Prisma.TaskUpdateManyWithWhereWithoutAssignedToInput[];
    deleteMany?: Prisma.TaskScalarWhereInput | Prisma.TaskScalarWhereInput[];
};
export type TaskUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.TaskCreateWithoutCreatedByInput, Prisma.TaskUncheckedCreateWithoutCreatedByInput> | Prisma.TaskCreateWithoutCreatedByInput[] | Prisma.TaskUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.TaskCreateOrConnectWithoutCreatedByInput | Prisma.TaskCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.TaskUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.TaskUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.TaskCreateManyCreatedByInputEnvelope;
    set?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    disconnect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    delete?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    connect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    update?: Prisma.TaskUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.TaskUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.TaskUpdateManyWithWhereWithoutCreatedByInput | Prisma.TaskUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.TaskScalarWhereInput | Prisma.TaskScalarWhereInput[];
};
export type TaskUncheckedUpdateManyWithoutAssignedToNestedInput = {
    create?: Prisma.XOR<Prisma.TaskCreateWithoutAssignedToInput, Prisma.TaskUncheckedCreateWithoutAssignedToInput> | Prisma.TaskCreateWithoutAssignedToInput[] | Prisma.TaskUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?: Prisma.TaskCreateOrConnectWithoutAssignedToInput | Prisma.TaskCreateOrConnectWithoutAssignedToInput[];
    upsert?: Prisma.TaskUpsertWithWhereUniqueWithoutAssignedToInput | Prisma.TaskUpsertWithWhereUniqueWithoutAssignedToInput[];
    createMany?: Prisma.TaskCreateManyAssignedToInputEnvelope;
    set?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    disconnect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    delete?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    connect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    update?: Prisma.TaskUpdateWithWhereUniqueWithoutAssignedToInput | Prisma.TaskUpdateWithWhereUniqueWithoutAssignedToInput[];
    updateMany?: Prisma.TaskUpdateManyWithWhereWithoutAssignedToInput | Prisma.TaskUpdateManyWithWhereWithoutAssignedToInput[];
    deleteMany?: Prisma.TaskScalarWhereInput | Prisma.TaskScalarWhereInput[];
};
export type TaskCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.TaskCreateWithoutProjectInput, Prisma.TaskUncheckedCreateWithoutProjectInput> | Prisma.TaskCreateWithoutProjectInput[] | Prisma.TaskUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.TaskCreateOrConnectWithoutProjectInput | Prisma.TaskCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.TaskCreateManyProjectInputEnvelope;
    connect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
};
export type TaskUncheckedCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.TaskCreateWithoutProjectInput, Prisma.TaskUncheckedCreateWithoutProjectInput> | Prisma.TaskCreateWithoutProjectInput[] | Prisma.TaskUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.TaskCreateOrConnectWithoutProjectInput | Prisma.TaskCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.TaskCreateManyProjectInputEnvelope;
    connect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
};
export type TaskUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.TaskCreateWithoutProjectInput, Prisma.TaskUncheckedCreateWithoutProjectInput> | Prisma.TaskCreateWithoutProjectInput[] | Prisma.TaskUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.TaskCreateOrConnectWithoutProjectInput | Prisma.TaskCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.TaskUpsertWithWhereUniqueWithoutProjectInput | Prisma.TaskUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.TaskCreateManyProjectInputEnvelope;
    set?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    disconnect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    delete?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    connect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    update?: Prisma.TaskUpdateWithWhereUniqueWithoutProjectInput | Prisma.TaskUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.TaskUpdateManyWithWhereWithoutProjectInput | Prisma.TaskUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.TaskScalarWhereInput | Prisma.TaskScalarWhereInput[];
};
export type TaskUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.TaskCreateWithoutProjectInput, Prisma.TaskUncheckedCreateWithoutProjectInput> | Prisma.TaskCreateWithoutProjectInput[] | Prisma.TaskUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.TaskCreateOrConnectWithoutProjectInput | Prisma.TaskCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.TaskUpsertWithWhereUniqueWithoutProjectInput | Prisma.TaskUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.TaskCreateManyProjectInputEnvelope;
    set?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    disconnect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    delete?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    connect?: Prisma.TaskWhereUniqueInput | Prisma.TaskWhereUniqueInput[];
    update?: Prisma.TaskUpdateWithWhereUniqueWithoutProjectInput | Prisma.TaskUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.TaskUpdateManyWithWhereWithoutProjectInput | Prisma.TaskUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.TaskScalarWhereInput | Prisma.TaskScalarWhereInput[];
};
export type EnumTaskStatusFieldUpdateOperationsInput = {
    set?: $Enums.TaskStatus;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type TaskCreateNestedOneWithoutAuditLogsInput = {
    create?: Prisma.XOR<Prisma.TaskCreateWithoutAuditLogsInput, Prisma.TaskUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.TaskCreateOrConnectWithoutAuditLogsInput;
    connect?: Prisma.TaskWhereUniqueInput;
};
export type TaskUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: Prisma.XOR<Prisma.TaskCreateWithoutAuditLogsInput, Prisma.TaskUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.TaskCreateOrConnectWithoutAuditLogsInput;
    upsert?: Prisma.TaskUpsertWithoutAuditLogsInput;
    connect?: Prisma.TaskWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TaskUpdateToOneWithWhereWithoutAuditLogsInput, Prisma.TaskUpdateWithoutAuditLogsInput>, Prisma.TaskUncheckedUpdateWithoutAuditLogsInput>;
};
export type TaskCreateWithoutCreatedByInput = {
    id?: string;
    title: string;
    description?: string | null;
    status: $Enums.TaskStatus;
    dueDate?: Date | string | null;
    createdAt?: Date | string;
    project: Prisma.ProjectCreateNestedOneWithoutTasksInput;
    assignedTo: Prisma.UserCreateNestedOneWithoutAssignedTasksInput;
    auditLogs?: Prisma.TaskAuditLogCreateNestedManyWithoutTaskInput;
};
export type TaskUncheckedCreateWithoutCreatedByInput = {
    id?: string;
    projectId: string;
    assignedToUserId: string;
    title: string;
    description?: string | null;
    status: $Enums.TaskStatus;
    dueDate?: Date | string | null;
    createdAt?: Date | string;
    auditLogs?: Prisma.TaskAuditLogUncheckedCreateNestedManyWithoutTaskInput;
};
export type TaskCreateOrConnectWithoutCreatedByInput = {
    where: Prisma.TaskWhereUniqueInput;
    create: Prisma.XOR<Prisma.TaskCreateWithoutCreatedByInput, Prisma.TaskUncheckedCreateWithoutCreatedByInput>;
};
export type TaskCreateManyCreatedByInputEnvelope = {
    data: Prisma.TaskCreateManyCreatedByInput | Prisma.TaskCreateManyCreatedByInput[];
    skipDuplicates?: boolean;
};
export type TaskCreateWithoutAssignedToInput = {
    id?: string;
    title: string;
    description?: string | null;
    status: $Enums.TaskStatus;
    dueDate?: Date | string | null;
    createdAt?: Date | string;
    project: Prisma.ProjectCreateNestedOneWithoutTasksInput;
    createdBy: Prisma.UserCreateNestedOneWithoutCreatedTasksInput;
    auditLogs?: Prisma.TaskAuditLogCreateNestedManyWithoutTaskInput;
};
export type TaskUncheckedCreateWithoutAssignedToInput = {
    id?: string;
    projectId: string;
    createdByUserId: string;
    title: string;
    description?: string | null;
    status: $Enums.TaskStatus;
    dueDate?: Date | string | null;
    createdAt?: Date | string;
    auditLogs?: Prisma.TaskAuditLogUncheckedCreateNestedManyWithoutTaskInput;
};
export type TaskCreateOrConnectWithoutAssignedToInput = {
    where: Prisma.TaskWhereUniqueInput;
    create: Prisma.XOR<Prisma.TaskCreateWithoutAssignedToInput, Prisma.TaskUncheckedCreateWithoutAssignedToInput>;
};
export type TaskCreateManyAssignedToInputEnvelope = {
    data: Prisma.TaskCreateManyAssignedToInput | Prisma.TaskCreateManyAssignedToInput[];
    skipDuplicates?: boolean;
};
export type TaskUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.TaskWhereUniqueInput;
    update: Prisma.XOR<Prisma.TaskUpdateWithoutCreatedByInput, Prisma.TaskUncheckedUpdateWithoutCreatedByInput>;
    create: Prisma.XOR<Prisma.TaskCreateWithoutCreatedByInput, Prisma.TaskUncheckedCreateWithoutCreatedByInput>;
};
export type TaskUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.XOR<Prisma.TaskUpdateWithoutCreatedByInput, Prisma.TaskUncheckedUpdateWithoutCreatedByInput>;
};
export type TaskUpdateManyWithWhereWithoutCreatedByInput = {
    where: Prisma.TaskScalarWhereInput;
    data: Prisma.XOR<Prisma.TaskUpdateManyMutationInput, Prisma.TaskUncheckedUpdateManyWithoutCreatedByInput>;
};
export type TaskScalarWhereInput = {
    AND?: Prisma.TaskScalarWhereInput | Prisma.TaskScalarWhereInput[];
    OR?: Prisma.TaskScalarWhereInput[];
    NOT?: Prisma.TaskScalarWhereInput | Prisma.TaskScalarWhereInput[];
    id?: Prisma.StringFilter<"Task"> | string;
    projectId?: Prisma.StringFilter<"Task"> | string;
    createdByUserId?: Prisma.StringFilter<"Task"> | string;
    assignedToUserId?: Prisma.StringFilter<"Task"> | string;
    title?: Prisma.StringFilter<"Task"> | string;
    description?: Prisma.StringNullableFilter<"Task"> | string | null;
    status?: Prisma.EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus;
    dueDate?: Prisma.DateTimeNullableFilter<"Task"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Task"> | Date | string;
};
export type TaskUpsertWithWhereUniqueWithoutAssignedToInput = {
    where: Prisma.TaskWhereUniqueInput;
    update: Prisma.XOR<Prisma.TaskUpdateWithoutAssignedToInput, Prisma.TaskUncheckedUpdateWithoutAssignedToInput>;
    create: Prisma.XOR<Prisma.TaskCreateWithoutAssignedToInput, Prisma.TaskUncheckedCreateWithoutAssignedToInput>;
};
export type TaskUpdateWithWhereUniqueWithoutAssignedToInput = {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.XOR<Prisma.TaskUpdateWithoutAssignedToInput, Prisma.TaskUncheckedUpdateWithoutAssignedToInput>;
};
export type TaskUpdateManyWithWhereWithoutAssignedToInput = {
    where: Prisma.TaskScalarWhereInput;
    data: Prisma.XOR<Prisma.TaskUpdateManyMutationInput, Prisma.TaskUncheckedUpdateManyWithoutAssignedToInput>;
};
export type TaskCreateWithoutProjectInput = {
    id?: string;
    title: string;
    description?: string | null;
    status: $Enums.TaskStatus;
    dueDate?: Date | string | null;
    createdAt?: Date | string;
    createdBy: Prisma.UserCreateNestedOneWithoutCreatedTasksInput;
    assignedTo: Prisma.UserCreateNestedOneWithoutAssignedTasksInput;
    auditLogs?: Prisma.TaskAuditLogCreateNestedManyWithoutTaskInput;
};
export type TaskUncheckedCreateWithoutProjectInput = {
    id?: string;
    createdByUserId: string;
    assignedToUserId: string;
    title: string;
    description?: string | null;
    status: $Enums.TaskStatus;
    dueDate?: Date | string | null;
    createdAt?: Date | string;
    auditLogs?: Prisma.TaskAuditLogUncheckedCreateNestedManyWithoutTaskInput;
};
export type TaskCreateOrConnectWithoutProjectInput = {
    where: Prisma.TaskWhereUniqueInput;
    create: Prisma.XOR<Prisma.TaskCreateWithoutProjectInput, Prisma.TaskUncheckedCreateWithoutProjectInput>;
};
export type TaskCreateManyProjectInputEnvelope = {
    data: Prisma.TaskCreateManyProjectInput | Prisma.TaskCreateManyProjectInput[];
    skipDuplicates?: boolean;
};
export type TaskUpsertWithWhereUniqueWithoutProjectInput = {
    where: Prisma.TaskWhereUniqueInput;
    update: Prisma.XOR<Prisma.TaskUpdateWithoutProjectInput, Prisma.TaskUncheckedUpdateWithoutProjectInput>;
    create: Prisma.XOR<Prisma.TaskCreateWithoutProjectInput, Prisma.TaskUncheckedCreateWithoutProjectInput>;
};
export type TaskUpdateWithWhereUniqueWithoutProjectInput = {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.XOR<Prisma.TaskUpdateWithoutProjectInput, Prisma.TaskUncheckedUpdateWithoutProjectInput>;
};
export type TaskUpdateManyWithWhereWithoutProjectInput = {
    where: Prisma.TaskScalarWhereInput;
    data: Prisma.XOR<Prisma.TaskUpdateManyMutationInput, Prisma.TaskUncheckedUpdateManyWithoutProjectInput>;
};
export type TaskCreateWithoutAuditLogsInput = {
    id?: string;
    title: string;
    description?: string | null;
    status: $Enums.TaskStatus;
    dueDate?: Date | string | null;
    createdAt?: Date | string;
    project: Prisma.ProjectCreateNestedOneWithoutTasksInput;
    createdBy: Prisma.UserCreateNestedOneWithoutCreatedTasksInput;
    assignedTo: Prisma.UserCreateNestedOneWithoutAssignedTasksInput;
};
export type TaskUncheckedCreateWithoutAuditLogsInput = {
    id?: string;
    projectId: string;
    createdByUserId: string;
    assignedToUserId: string;
    title: string;
    description?: string | null;
    status: $Enums.TaskStatus;
    dueDate?: Date | string | null;
    createdAt?: Date | string;
};
export type TaskCreateOrConnectWithoutAuditLogsInput = {
    where: Prisma.TaskWhereUniqueInput;
    create: Prisma.XOR<Prisma.TaskCreateWithoutAuditLogsInput, Prisma.TaskUncheckedCreateWithoutAuditLogsInput>;
};
export type TaskUpsertWithoutAuditLogsInput = {
    update: Prisma.XOR<Prisma.TaskUpdateWithoutAuditLogsInput, Prisma.TaskUncheckedUpdateWithoutAuditLogsInput>;
    create: Prisma.XOR<Prisma.TaskCreateWithoutAuditLogsInput, Prisma.TaskUncheckedCreateWithoutAuditLogsInput>;
    where?: Prisma.TaskWhereInput;
};
export type TaskUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: Prisma.TaskWhereInput;
    data: Prisma.XOR<Prisma.TaskUpdateWithoutAuditLogsInput, Prisma.TaskUncheckedUpdateWithoutAuditLogsInput>;
};
export type TaskUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.ProjectUpdateOneRequiredWithoutTasksNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCreatedTasksNestedInput;
    assignedTo?: Prisma.UserUpdateOneRequiredWithoutAssignedTasksNestedInput;
};
export type TaskUncheckedUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaskCreateManyCreatedByInput = {
    id?: string;
    projectId: string;
    assignedToUserId: string;
    title: string;
    description?: string | null;
    status: $Enums.TaskStatus;
    dueDate?: Date | string | null;
    createdAt?: Date | string;
};
export type TaskCreateManyAssignedToInput = {
    id?: string;
    projectId: string;
    createdByUserId: string;
    title: string;
    description?: string | null;
    status: $Enums.TaskStatus;
    dueDate?: Date | string | null;
    createdAt?: Date | string;
};
export type TaskUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.ProjectUpdateOneRequiredWithoutTasksNestedInput;
    assignedTo?: Prisma.UserUpdateOneRequiredWithoutAssignedTasksNestedInput;
    auditLogs?: Prisma.TaskAuditLogUpdateManyWithoutTaskNestedInput;
};
export type TaskUncheckedUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    auditLogs?: Prisma.TaskAuditLogUncheckedUpdateManyWithoutTaskNestedInput;
};
export type TaskUncheckedUpdateManyWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaskUpdateWithoutAssignedToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.ProjectUpdateOneRequiredWithoutTasksNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCreatedTasksNestedInput;
    auditLogs?: Prisma.TaskAuditLogUpdateManyWithoutTaskNestedInput;
};
export type TaskUncheckedUpdateWithoutAssignedToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    auditLogs?: Prisma.TaskAuditLogUncheckedUpdateManyWithoutTaskNestedInput;
};
export type TaskUncheckedUpdateManyWithoutAssignedToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaskCreateManyProjectInput = {
    id?: string;
    createdByUserId: string;
    assignedToUserId: string;
    title: string;
    description?: string | null;
    status: $Enums.TaskStatus;
    dueDate?: Date | string | null;
    createdAt?: Date | string;
};
export type TaskUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCreatedTasksNestedInput;
    assignedTo?: Prisma.UserUpdateOneRequiredWithoutAssignedTasksNestedInput;
    auditLogs?: Prisma.TaskAuditLogUpdateManyWithoutTaskNestedInput;
};
export type TaskUncheckedUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    auditLogs?: Prisma.TaskAuditLogUncheckedUpdateManyWithoutTaskNestedInput;
};
export type TaskUncheckedUpdateManyWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaskCountOutputType = {
    auditLogs: number;
};
export type TaskCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    auditLogs?: boolean | TaskCountOutputTypeCountAuditLogsArgs;
};
export type TaskCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskCountOutputTypeSelect<ExtArgs> | null;
};
export type TaskCountOutputTypeCountAuditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaskAuditLogWhereInput;
};
export type TaskSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    createdByUserId?: boolean;
    assignedToUserId?: boolean;
    title?: boolean;
    description?: boolean;
    status?: boolean;
    dueDate?: boolean;
    createdAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.Task$auditLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.TaskCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["task"]>;
export type TaskSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    createdByUserId?: boolean;
    assignedToUserId?: boolean;
    title?: boolean;
    description?: boolean;
    status?: boolean;
    dueDate?: boolean;
    createdAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["task"]>;
export type TaskSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    createdByUserId?: boolean;
    assignedToUserId?: boolean;
    title?: boolean;
    description?: boolean;
    status?: boolean;
    dueDate?: boolean;
    createdAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["task"]>;
export type TaskSelectScalar = {
    id?: boolean;
    projectId?: boolean;
    createdByUserId?: boolean;
    assignedToUserId?: boolean;
    title?: boolean;
    description?: boolean;
    status?: boolean;
    dueDate?: boolean;
    createdAt?: boolean;
};
export type TaskOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "projectId" | "createdByUserId" | "assignedToUserId" | "title" | "description" | "status" | "dueDate" | "createdAt", ExtArgs["result"]["task"]>;
export type TaskInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.Task$auditLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.TaskCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TaskIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TaskIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $TaskPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Task";
    objects: {
        project: Prisma.$ProjectPayload<ExtArgs>;
        createdBy: Prisma.$UserPayload<ExtArgs>;
        assignedTo: Prisma.$UserPayload<ExtArgs>;
        auditLogs: Prisma.$TaskAuditLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        projectId: string;
        createdByUserId: string;
        assignedToUserId: string;
        title: string;
        description: string | null;
        status: $Enums.TaskStatus;
        dueDate: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["task"]>;
    composites: {};
};
export type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TaskPayload, S>;
export type TaskCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TaskCountAggregateInputType | true;
};
export interface TaskDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Task'];
        meta: {
            name: 'Task';
        };
    };
    findUnique<T extends TaskFindUniqueArgs>(args: Prisma.SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TaskFindFirstArgs>(args?: Prisma.SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma.Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TaskFindManyArgs>(args?: Prisma.SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TaskCreateArgs>(args: Prisma.SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma.Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TaskCreateManyArgs>(args?: Prisma.SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TaskDeleteArgs>(args: Prisma.SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma.Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TaskUpdateArgs>(args: Prisma.SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma.Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TaskDeleteManyArgs>(args?: Prisma.SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TaskUpdateManyArgs>(args: Prisma.SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TaskUpsertArgs>(args: Prisma.SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma.Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TaskCountArgs>(args?: Prisma.Subset<T, TaskCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TaskCountAggregateOutputType> : number>;
    aggregate<T extends TaskAggregateArgs>(args: Prisma.Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>;
    groupBy<T extends TaskGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TaskGroupByArgs['orderBy'];
    } : {
        orderBy?: TaskGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TaskFieldRefs;
}
export interface Prisma__TaskClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    project<T extends Prisma.ProjectDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProjectDefaultArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    createdBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    assignedTo<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    auditLogs<T extends Prisma.Task$auditLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Task$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TaskFieldRefs {
    readonly id: Prisma.FieldRef<"Task", 'String'>;
    readonly projectId: Prisma.FieldRef<"Task", 'String'>;
    readonly createdByUserId: Prisma.FieldRef<"Task", 'String'>;
    readonly assignedToUserId: Prisma.FieldRef<"Task", 'String'>;
    readonly title: Prisma.FieldRef<"Task", 'String'>;
    readonly description: Prisma.FieldRef<"Task", 'String'>;
    readonly status: Prisma.FieldRef<"Task", 'TaskStatus'>;
    readonly dueDate: Prisma.FieldRef<"Task", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Task", 'DateTime'>;
}
export type TaskFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskSelect<ExtArgs> | null;
    omit?: Prisma.TaskOmit<ExtArgs> | null;
    include?: Prisma.TaskInclude<ExtArgs> | null;
    where: Prisma.TaskWhereUniqueInput;
};
export type TaskFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskSelect<ExtArgs> | null;
    omit?: Prisma.TaskOmit<ExtArgs> | null;
    include?: Prisma.TaskInclude<ExtArgs> | null;
    where: Prisma.TaskWhereUniqueInput;
};
export type TaskFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TaskFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TaskFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TaskCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskSelect<ExtArgs> | null;
    omit?: Prisma.TaskOmit<ExtArgs> | null;
    include?: Prisma.TaskInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>;
};
export type TaskCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TaskCreateManyInput | Prisma.TaskCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TaskCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TaskOmit<ExtArgs> | null;
    data: Prisma.TaskCreateManyInput | Prisma.TaskCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TaskIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TaskUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskSelect<ExtArgs> | null;
    omit?: Prisma.TaskOmit<ExtArgs> | null;
    include?: Prisma.TaskInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>;
    where: Prisma.TaskWhereUniqueInput;
};
export type TaskUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TaskUpdateManyMutationInput, Prisma.TaskUncheckedUpdateManyInput>;
    where?: Prisma.TaskWhereInput;
    limit?: number;
};
export type TaskUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TaskOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TaskUpdateManyMutationInput, Prisma.TaskUncheckedUpdateManyInput>;
    where?: Prisma.TaskWhereInput;
    limit?: number;
    include?: Prisma.TaskIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TaskUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskSelect<ExtArgs> | null;
    omit?: Prisma.TaskOmit<ExtArgs> | null;
    include?: Prisma.TaskInclude<ExtArgs> | null;
    where: Prisma.TaskWhereUniqueInput;
    create: Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>;
};
export type TaskDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskSelect<ExtArgs> | null;
    omit?: Prisma.TaskOmit<ExtArgs> | null;
    include?: Prisma.TaskInclude<ExtArgs> | null;
    where: Prisma.TaskWhereUniqueInput;
};
export type TaskDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaskWhereInput;
    limit?: number;
};
export type Task$auditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TaskDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskSelect<ExtArgs> | null;
    omit?: Prisma.TaskOmit<ExtArgs> | null;
    include?: Prisma.TaskInclude<ExtArgs> | null;
};
export {};
