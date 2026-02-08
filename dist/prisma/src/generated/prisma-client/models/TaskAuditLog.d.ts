import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type TaskAuditLogModel = runtime.Types.Result.DefaultSelection<Prisma.$TaskAuditLogPayload>;
export type AggregateTaskAuditLog = {
    _count: TaskAuditLogCountAggregateOutputType | null;
    _min: TaskAuditLogMinAggregateOutputType | null;
    _max: TaskAuditLogMaxAggregateOutputType | null;
};
export type TaskAuditLogMinAggregateOutputType = {
    id: string | null;
    officeId: string | null;
    taskId: string | null;
    actorUserId: string | null;
    action: $Enums.TaskAction | null;
    fieldName: string | null;
    oldValue: string | null;
    newValue: string | null;
    ip: string | null;
    deviceFingerprint: string | null;
    geo: string | null;
    createdAt: Date | null;
};
export type TaskAuditLogMaxAggregateOutputType = {
    id: string | null;
    officeId: string | null;
    taskId: string | null;
    actorUserId: string | null;
    action: $Enums.TaskAction | null;
    fieldName: string | null;
    oldValue: string | null;
    newValue: string | null;
    ip: string | null;
    deviceFingerprint: string | null;
    geo: string | null;
    createdAt: Date | null;
};
export type TaskAuditLogCountAggregateOutputType = {
    id: number;
    officeId: number;
    taskId: number;
    actorUserId: number;
    action: number;
    fieldName: number;
    oldValue: number;
    newValue: number;
    ip: number;
    deviceFingerprint: number;
    geo: number;
    createdAt: number;
    _all: number;
};
export type TaskAuditLogMinAggregateInputType = {
    id?: true;
    officeId?: true;
    taskId?: true;
    actorUserId?: true;
    action?: true;
    fieldName?: true;
    oldValue?: true;
    newValue?: true;
    ip?: true;
    deviceFingerprint?: true;
    geo?: true;
    createdAt?: true;
};
export type TaskAuditLogMaxAggregateInputType = {
    id?: true;
    officeId?: true;
    taskId?: true;
    actorUserId?: true;
    action?: true;
    fieldName?: true;
    oldValue?: true;
    newValue?: true;
    ip?: true;
    deviceFingerprint?: true;
    geo?: true;
    createdAt?: true;
};
export type TaskAuditLogCountAggregateInputType = {
    id?: true;
    officeId?: true;
    taskId?: true;
    actorUserId?: true;
    action?: true;
    fieldName?: true;
    oldValue?: true;
    newValue?: true;
    ip?: true;
    deviceFingerprint?: true;
    geo?: true;
    createdAt?: true;
    _all?: true;
};
export type TaskAuditLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaskAuditLogWhereInput;
    orderBy?: Prisma.TaskAuditLogOrderByWithRelationInput | Prisma.TaskAuditLogOrderByWithRelationInput[];
    cursor?: Prisma.TaskAuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TaskAuditLogCountAggregateInputType;
    _min?: TaskAuditLogMinAggregateInputType;
    _max?: TaskAuditLogMaxAggregateInputType;
};
export type GetTaskAuditLogAggregateType<T extends TaskAuditLogAggregateArgs> = {
    [P in keyof T & keyof AggregateTaskAuditLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTaskAuditLog[P]> : Prisma.GetScalarType<T[P], AggregateTaskAuditLog[P]>;
};
export type TaskAuditLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaskAuditLogWhereInput;
    orderBy?: Prisma.TaskAuditLogOrderByWithAggregationInput | Prisma.TaskAuditLogOrderByWithAggregationInput[];
    by: Prisma.TaskAuditLogScalarFieldEnum[] | Prisma.TaskAuditLogScalarFieldEnum;
    having?: Prisma.TaskAuditLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TaskAuditLogCountAggregateInputType | true;
    _min?: TaskAuditLogMinAggregateInputType;
    _max?: TaskAuditLogMaxAggregateInputType;
};
export type TaskAuditLogGroupByOutputType = {
    id: string;
    officeId: string;
    taskId: string;
    actorUserId: string;
    action: $Enums.TaskAction;
    fieldName: string | null;
    oldValue: string | null;
    newValue: string | null;
    ip: string | null;
    deviceFingerprint: string | null;
    geo: string | null;
    createdAt: Date;
    _count: TaskAuditLogCountAggregateOutputType | null;
    _min: TaskAuditLogMinAggregateOutputType | null;
    _max: TaskAuditLogMaxAggregateOutputType | null;
};
type GetTaskAuditLogGroupByPayload<T extends TaskAuditLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TaskAuditLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TaskAuditLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TaskAuditLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TaskAuditLogGroupByOutputType[P]>;
}>>;
export type TaskAuditLogWhereInput = {
    AND?: Prisma.TaskAuditLogWhereInput | Prisma.TaskAuditLogWhereInput[];
    OR?: Prisma.TaskAuditLogWhereInput[];
    NOT?: Prisma.TaskAuditLogWhereInput | Prisma.TaskAuditLogWhereInput[];
    id?: Prisma.StringFilter<"TaskAuditLog"> | string;
    officeId?: Prisma.StringFilter<"TaskAuditLog"> | string;
    taskId?: Prisma.StringFilter<"TaskAuditLog"> | string;
    actorUserId?: Prisma.StringFilter<"TaskAuditLog"> | string;
    action?: Prisma.EnumTaskActionFilter<"TaskAuditLog"> | $Enums.TaskAction;
    fieldName?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    oldValue?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    newValue?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    ip?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    deviceFingerprint?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    geo?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"TaskAuditLog"> | Date | string;
    office?: Prisma.XOR<Prisma.OfficeScalarRelationFilter, Prisma.OfficeWhereInput>;
    task?: Prisma.XOR<Prisma.TaskScalarRelationFilter, Prisma.TaskWhereInput>;
    actor?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type TaskAuditLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    taskId?: Prisma.SortOrder;
    actorUserId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    fieldName?: Prisma.SortOrderInput | Prisma.SortOrder;
    oldValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    newValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    ip?: Prisma.SortOrderInput | Prisma.SortOrder;
    deviceFingerprint?: Prisma.SortOrderInput | Prisma.SortOrder;
    geo?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    office?: Prisma.OfficeOrderByWithRelationInput;
    task?: Prisma.TaskOrderByWithRelationInput;
    actor?: Prisma.UserOrderByWithRelationInput;
};
export type TaskAuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TaskAuditLogWhereInput | Prisma.TaskAuditLogWhereInput[];
    OR?: Prisma.TaskAuditLogWhereInput[];
    NOT?: Prisma.TaskAuditLogWhereInput | Prisma.TaskAuditLogWhereInput[];
    officeId?: Prisma.StringFilter<"TaskAuditLog"> | string;
    taskId?: Prisma.StringFilter<"TaskAuditLog"> | string;
    actorUserId?: Prisma.StringFilter<"TaskAuditLog"> | string;
    action?: Prisma.EnumTaskActionFilter<"TaskAuditLog"> | $Enums.TaskAction;
    fieldName?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    oldValue?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    newValue?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    ip?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    deviceFingerprint?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    geo?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"TaskAuditLog"> | Date | string;
    office?: Prisma.XOR<Prisma.OfficeScalarRelationFilter, Prisma.OfficeWhereInput>;
    task?: Prisma.XOR<Prisma.TaskScalarRelationFilter, Prisma.TaskWhereInput>;
    actor?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type TaskAuditLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    taskId?: Prisma.SortOrder;
    actorUserId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    fieldName?: Prisma.SortOrderInput | Prisma.SortOrder;
    oldValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    newValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    ip?: Prisma.SortOrderInput | Prisma.SortOrder;
    deviceFingerprint?: Prisma.SortOrderInput | Prisma.SortOrder;
    geo?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TaskAuditLogCountOrderByAggregateInput;
    _max?: Prisma.TaskAuditLogMaxOrderByAggregateInput;
    _min?: Prisma.TaskAuditLogMinOrderByAggregateInput;
};
export type TaskAuditLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.TaskAuditLogScalarWhereWithAggregatesInput | Prisma.TaskAuditLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.TaskAuditLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TaskAuditLogScalarWhereWithAggregatesInput | Prisma.TaskAuditLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TaskAuditLog"> | string;
    officeId?: Prisma.StringWithAggregatesFilter<"TaskAuditLog"> | string;
    taskId?: Prisma.StringWithAggregatesFilter<"TaskAuditLog"> | string;
    actorUserId?: Prisma.StringWithAggregatesFilter<"TaskAuditLog"> | string;
    action?: Prisma.EnumTaskActionWithAggregatesFilter<"TaskAuditLog"> | $Enums.TaskAction;
    fieldName?: Prisma.StringNullableWithAggregatesFilter<"TaskAuditLog"> | string | null;
    oldValue?: Prisma.StringNullableWithAggregatesFilter<"TaskAuditLog"> | string | null;
    newValue?: Prisma.StringNullableWithAggregatesFilter<"TaskAuditLog"> | string | null;
    ip?: Prisma.StringNullableWithAggregatesFilter<"TaskAuditLog"> | string | null;
    deviceFingerprint?: Prisma.StringNullableWithAggregatesFilter<"TaskAuditLog"> | string | null;
    geo?: Prisma.StringNullableWithAggregatesFilter<"TaskAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TaskAuditLog"> | Date | string;
};
export type TaskAuditLogCreateInput = {
    id?: string;
    action: $Enums.TaskAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
    office: Prisma.OfficeCreateNestedOneWithoutTaskAuditLogsInput;
    task: Prisma.TaskCreateNestedOneWithoutAuditLogsInput;
    actor: Prisma.UserCreateNestedOneWithoutTaskAuditLogsInput;
};
export type TaskAuditLogUncheckedCreateInput = {
    id?: string;
    officeId: string;
    taskId: string;
    actorUserId: string;
    action: $Enums.TaskAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
};
export type TaskAuditLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumTaskActionFieldUpdateOperationsInput | $Enums.TaskAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    office?: Prisma.OfficeUpdateOneRequiredWithoutTaskAuditLogsNestedInput;
    task?: Prisma.TaskUpdateOneRequiredWithoutAuditLogsNestedInput;
    actor?: Prisma.UserUpdateOneRequiredWithoutTaskAuditLogsNestedInput;
};
export type TaskAuditLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    taskId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumTaskActionFieldUpdateOperationsInput | $Enums.TaskAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaskAuditLogCreateManyInput = {
    id?: string;
    officeId: string;
    taskId: string;
    actorUserId: string;
    action: $Enums.TaskAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
};
export type TaskAuditLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumTaskActionFieldUpdateOperationsInput | $Enums.TaskAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaskAuditLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    taskId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumTaskActionFieldUpdateOperationsInput | $Enums.TaskAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaskAuditLogListRelationFilter = {
    every?: Prisma.TaskAuditLogWhereInput;
    some?: Prisma.TaskAuditLogWhereInput;
    none?: Prisma.TaskAuditLogWhereInput;
};
export type TaskAuditLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TaskAuditLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    taskId?: Prisma.SortOrder;
    actorUserId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    fieldName?: Prisma.SortOrder;
    oldValue?: Prisma.SortOrder;
    newValue?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    deviceFingerprint?: Prisma.SortOrder;
    geo?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TaskAuditLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    taskId?: Prisma.SortOrder;
    actorUserId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    fieldName?: Prisma.SortOrder;
    oldValue?: Prisma.SortOrder;
    newValue?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    deviceFingerprint?: Prisma.SortOrder;
    geo?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TaskAuditLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    taskId?: Prisma.SortOrder;
    actorUserId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    fieldName?: Prisma.SortOrder;
    oldValue?: Prisma.SortOrder;
    newValue?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    deviceFingerprint?: Prisma.SortOrder;
    geo?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TaskAuditLogCreateNestedManyWithoutOfficeInput = {
    create?: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutOfficeInput, Prisma.TaskAuditLogUncheckedCreateWithoutOfficeInput> | Prisma.TaskAuditLogCreateWithoutOfficeInput[] | Prisma.TaskAuditLogUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.TaskAuditLogCreateOrConnectWithoutOfficeInput | Prisma.TaskAuditLogCreateOrConnectWithoutOfficeInput[];
    createMany?: Prisma.TaskAuditLogCreateManyOfficeInputEnvelope;
    connect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
};
export type TaskAuditLogUncheckedCreateNestedManyWithoutOfficeInput = {
    create?: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutOfficeInput, Prisma.TaskAuditLogUncheckedCreateWithoutOfficeInput> | Prisma.TaskAuditLogCreateWithoutOfficeInput[] | Prisma.TaskAuditLogUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.TaskAuditLogCreateOrConnectWithoutOfficeInput | Prisma.TaskAuditLogCreateOrConnectWithoutOfficeInput[];
    createMany?: Prisma.TaskAuditLogCreateManyOfficeInputEnvelope;
    connect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
};
export type TaskAuditLogUpdateManyWithoutOfficeNestedInput = {
    create?: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutOfficeInput, Prisma.TaskAuditLogUncheckedCreateWithoutOfficeInput> | Prisma.TaskAuditLogCreateWithoutOfficeInput[] | Prisma.TaskAuditLogUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.TaskAuditLogCreateOrConnectWithoutOfficeInput | Prisma.TaskAuditLogCreateOrConnectWithoutOfficeInput[];
    upsert?: Prisma.TaskAuditLogUpsertWithWhereUniqueWithoutOfficeInput | Prisma.TaskAuditLogUpsertWithWhereUniqueWithoutOfficeInput[];
    createMany?: Prisma.TaskAuditLogCreateManyOfficeInputEnvelope;
    set?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    disconnect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    delete?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    connect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    update?: Prisma.TaskAuditLogUpdateWithWhereUniqueWithoutOfficeInput | Prisma.TaskAuditLogUpdateWithWhereUniqueWithoutOfficeInput[];
    updateMany?: Prisma.TaskAuditLogUpdateManyWithWhereWithoutOfficeInput | Prisma.TaskAuditLogUpdateManyWithWhereWithoutOfficeInput[];
    deleteMany?: Prisma.TaskAuditLogScalarWhereInput | Prisma.TaskAuditLogScalarWhereInput[];
};
export type TaskAuditLogUncheckedUpdateManyWithoutOfficeNestedInput = {
    create?: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutOfficeInput, Prisma.TaskAuditLogUncheckedCreateWithoutOfficeInput> | Prisma.TaskAuditLogCreateWithoutOfficeInput[] | Prisma.TaskAuditLogUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.TaskAuditLogCreateOrConnectWithoutOfficeInput | Prisma.TaskAuditLogCreateOrConnectWithoutOfficeInput[];
    upsert?: Prisma.TaskAuditLogUpsertWithWhereUniqueWithoutOfficeInput | Prisma.TaskAuditLogUpsertWithWhereUniqueWithoutOfficeInput[];
    createMany?: Prisma.TaskAuditLogCreateManyOfficeInputEnvelope;
    set?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    disconnect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    delete?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    connect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    update?: Prisma.TaskAuditLogUpdateWithWhereUniqueWithoutOfficeInput | Prisma.TaskAuditLogUpdateWithWhereUniqueWithoutOfficeInput[];
    updateMany?: Prisma.TaskAuditLogUpdateManyWithWhereWithoutOfficeInput | Prisma.TaskAuditLogUpdateManyWithWhereWithoutOfficeInput[];
    deleteMany?: Prisma.TaskAuditLogScalarWhereInput | Prisma.TaskAuditLogScalarWhereInput[];
};
export type TaskAuditLogCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutActorInput, Prisma.TaskAuditLogUncheckedCreateWithoutActorInput> | Prisma.TaskAuditLogCreateWithoutActorInput[] | Prisma.TaskAuditLogUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.TaskAuditLogCreateOrConnectWithoutActorInput | Prisma.TaskAuditLogCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.TaskAuditLogCreateManyActorInputEnvelope;
    connect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
};
export type TaskAuditLogUncheckedCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutActorInput, Prisma.TaskAuditLogUncheckedCreateWithoutActorInput> | Prisma.TaskAuditLogCreateWithoutActorInput[] | Prisma.TaskAuditLogUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.TaskAuditLogCreateOrConnectWithoutActorInput | Prisma.TaskAuditLogCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.TaskAuditLogCreateManyActorInputEnvelope;
    connect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
};
export type TaskAuditLogUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutActorInput, Prisma.TaskAuditLogUncheckedCreateWithoutActorInput> | Prisma.TaskAuditLogCreateWithoutActorInput[] | Prisma.TaskAuditLogUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.TaskAuditLogCreateOrConnectWithoutActorInput | Prisma.TaskAuditLogCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.TaskAuditLogUpsertWithWhereUniqueWithoutActorInput | Prisma.TaskAuditLogUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.TaskAuditLogCreateManyActorInputEnvelope;
    set?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    disconnect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    delete?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    connect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    update?: Prisma.TaskAuditLogUpdateWithWhereUniqueWithoutActorInput | Prisma.TaskAuditLogUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.TaskAuditLogUpdateManyWithWhereWithoutActorInput | Prisma.TaskAuditLogUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.TaskAuditLogScalarWhereInput | Prisma.TaskAuditLogScalarWhereInput[];
};
export type TaskAuditLogUncheckedUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutActorInput, Prisma.TaskAuditLogUncheckedCreateWithoutActorInput> | Prisma.TaskAuditLogCreateWithoutActorInput[] | Prisma.TaskAuditLogUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.TaskAuditLogCreateOrConnectWithoutActorInput | Prisma.TaskAuditLogCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.TaskAuditLogUpsertWithWhereUniqueWithoutActorInput | Prisma.TaskAuditLogUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.TaskAuditLogCreateManyActorInputEnvelope;
    set?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    disconnect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    delete?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    connect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    update?: Prisma.TaskAuditLogUpdateWithWhereUniqueWithoutActorInput | Prisma.TaskAuditLogUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.TaskAuditLogUpdateManyWithWhereWithoutActorInput | Prisma.TaskAuditLogUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.TaskAuditLogScalarWhereInput | Prisma.TaskAuditLogScalarWhereInput[];
};
export type TaskAuditLogCreateNestedManyWithoutTaskInput = {
    create?: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutTaskInput, Prisma.TaskAuditLogUncheckedCreateWithoutTaskInput> | Prisma.TaskAuditLogCreateWithoutTaskInput[] | Prisma.TaskAuditLogUncheckedCreateWithoutTaskInput[];
    connectOrCreate?: Prisma.TaskAuditLogCreateOrConnectWithoutTaskInput | Prisma.TaskAuditLogCreateOrConnectWithoutTaskInput[];
    createMany?: Prisma.TaskAuditLogCreateManyTaskInputEnvelope;
    connect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
};
export type TaskAuditLogUncheckedCreateNestedManyWithoutTaskInput = {
    create?: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutTaskInput, Prisma.TaskAuditLogUncheckedCreateWithoutTaskInput> | Prisma.TaskAuditLogCreateWithoutTaskInput[] | Prisma.TaskAuditLogUncheckedCreateWithoutTaskInput[];
    connectOrCreate?: Prisma.TaskAuditLogCreateOrConnectWithoutTaskInput | Prisma.TaskAuditLogCreateOrConnectWithoutTaskInput[];
    createMany?: Prisma.TaskAuditLogCreateManyTaskInputEnvelope;
    connect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
};
export type TaskAuditLogUpdateManyWithoutTaskNestedInput = {
    create?: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutTaskInput, Prisma.TaskAuditLogUncheckedCreateWithoutTaskInput> | Prisma.TaskAuditLogCreateWithoutTaskInput[] | Prisma.TaskAuditLogUncheckedCreateWithoutTaskInput[];
    connectOrCreate?: Prisma.TaskAuditLogCreateOrConnectWithoutTaskInput | Prisma.TaskAuditLogCreateOrConnectWithoutTaskInput[];
    upsert?: Prisma.TaskAuditLogUpsertWithWhereUniqueWithoutTaskInput | Prisma.TaskAuditLogUpsertWithWhereUniqueWithoutTaskInput[];
    createMany?: Prisma.TaskAuditLogCreateManyTaskInputEnvelope;
    set?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    disconnect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    delete?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    connect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    update?: Prisma.TaskAuditLogUpdateWithWhereUniqueWithoutTaskInput | Prisma.TaskAuditLogUpdateWithWhereUniqueWithoutTaskInput[];
    updateMany?: Prisma.TaskAuditLogUpdateManyWithWhereWithoutTaskInput | Prisma.TaskAuditLogUpdateManyWithWhereWithoutTaskInput[];
    deleteMany?: Prisma.TaskAuditLogScalarWhereInput | Prisma.TaskAuditLogScalarWhereInput[];
};
export type TaskAuditLogUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutTaskInput, Prisma.TaskAuditLogUncheckedCreateWithoutTaskInput> | Prisma.TaskAuditLogCreateWithoutTaskInput[] | Prisma.TaskAuditLogUncheckedCreateWithoutTaskInput[];
    connectOrCreate?: Prisma.TaskAuditLogCreateOrConnectWithoutTaskInput | Prisma.TaskAuditLogCreateOrConnectWithoutTaskInput[];
    upsert?: Prisma.TaskAuditLogUpsertWithWhereUniqueWithoutTaskInput | Prisma.TaskAuditLogUpsertWithWhereUniqueWithoutTaskInput[];
    createMany?: Prisma.TaskAuditLogCreateManyTaskInputEnvelope;
    set?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    disconnect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    delete?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    connect?: Prisma.TaskAuditLogWhereUniqueInput | Prisma.TaskAuditLogWhereUniqueInput[];
    update?: Prisma.TaskAuditLogUpdateWithWhereUniqueWithoutTaskInput | Prisma.TaskAuditLogUpdateWithWhereUniqueWithoutTaskInput[];
    updateMany?: Prisma.TaskAuditLogUpdateManyWithWhereWithoutTaskInput | Prisma.TaskAuditLogUpdateManyWithWhereWithoutTaskInput[];
    deleteMany?: Prisma.TaskAuditLogScalarWhereInput | Prisma.TaskAuditLogScalarWhereInput[];
};
export type EnumTaskActionFieldUpdateOperationsInput = {
    set?: $Enums.TaskAction;
};
export type TaskAuditLogCreateWithoutOfficeInput = {
    id?: string;
    action: $Enums.TaskAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
    task: Prisma.TaskCreateNestedOneWithoutAuditLogsInput;
    actor: Prisma.UserCreateNestedOneWithoutTaskAuditLogsInput;
};
export type TaskAuditLogUncheckedCreateWithoutOfficeInput = {
    id?: string;
    taskId: string;
    actorUserId: string;
    action: $Enums.TaskAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
};
export type TaskAuditLogCreateOrConnectWithoutOfficeInput = {
    where: Prisma.TaskAuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutOfficeInput, Prisma.TaskAuditLogUncheckedCreateWithoutOfficeInput>;
};
export type TaskAuditLogCreateManyOfficeInputEnvelope = {
    data: Prisma.TaskAuditLogCreateManyOfficeInput | Prisma.TaskAuditLogCreateManyOfficeInput[];
    skipDuplicates?: boolean;
};
export type TaskAuditLogUpsertWithWhereUniqueWithoutOfficeInput = {
    where: Prisma.TaskAuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.TaskAuditLogUpdateWithoutOfficeInput, Prisma.TaskAuditLogUncheckedUpdateWithoutOfficeInput>;
    create: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutOfficeInput, Prisma.TaskAuditLogUncheckedCreateWithoutOfficeInput>;
};
export type TaskAuditLogUpdateWithWhereUniqueWithoutOfficeInput = {
    where: Prisma.TaskAuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.TaskAuditLogUpdateWithoutOfficeInput, Prisma.TaskAuditLogUncheckedUpdateWithoutOfficeInput>;
};
export type TaskAuditLogUpdateManyWithWhereWithoutOfficeInput = {
    where: Prisma.TaskAuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.TaskAuditLogUpdateManyMutationInput, Prisma.TaskAuditLogUncheckedUpdateManyWithoutOfficeInput>;
};
export type TaskAuditLogScalarWhereInput = {
    AND?: Prisma.TaskAuditLogScalarWhereInput | Prisma.TaskAuditLogScalarWhereInput[];
    OR?: Prisma.TaskAuditLogScalarWhereInput[];
    NOT?: Prisma.TaskAuditLogScalarWhereInput | Prisma.TaskAuditLogScalarWhereInput[];
    id?: Prisma.StringFilter<"TaskAuditLog"> | string;
    officeId?: Prisma.StringFilter<"TaskAuditLog"> | string;
    taskId?: Prisma.StringFilter<"TaskAuditLog"> | string;
    actorUserId?: Prisma.StringFilter<"TaskAuditLog"> | string;
    action?: Prisma.EnumTaskActionFilter<"TaskAuditLog"> | $Enums.TaskAction;
    fieldName?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    oldValue?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    newValue?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    ip?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    deviceFingerprint?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    geo?: Prisma.StringNullableFilter<"TaskAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"TaskAuditLog"> | Date | string;
};
export type TaskAuditLogCreateWithoutActorInput = {
    id?: string;
    action: $Enums.TaskAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
    office: Prisma.OfficeCreateNestedOneWithoutTaskAuditLogsInput;
    task: Prisma.TaskCreateNestedOneWithoutAuditLogsInput;
};
export type TaskAuditLogUncheckedCreateWithoutActorInput = {
    id?: string;
    officeId: string;
    taskId: string;
    action: $Enums.TaskAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
};
export type TaskAuditLogCreateOrConnectWithoutActorInput = {
    where: Prisma.TaskAuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutActorInput, Prisma.TaskAuditLogUncheckedCreateWithoutActorInput>;
};
export type TaskAuditLogCreateManyActorInputEnvelope = {
    data: Prisma.TaskAuditLogCreateManyActorInput | Prisma.TaskAuditLogCreateManyActorInput[];
    skipDuplicates?: boolean;
};
export type TaskAuditLogUpsertWithWhereUniqueWithoutActorInput = {
    where: Prisma.TaskAuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.TaskAuditLogUpdateWithoutActorInput, Prisma.TaskAuditLogUncheckedUpdateWithoutActorInput>;
    create: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutActorInput, Prisma.TaskAuditLogUncheckedCreateWithoutActorInput>;
};
export type TaskAuditLogUpdateWithWhereUniqueWithoutActorInput = {
    where: Prisma.TaskAuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.TaskAuditLogUpdateWithoutActorInput, Prisma.TaskAuditLogUncheckedUpdateWithoutActorInput>;
};
export type TaskAuditLogUpdateManyWithWhereWithoutActorInput = {
    where: Prisma.TaskAuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.TaskAuditLogUpdateManyMutationInput, Prisma.TaskAuditLogUncheckedUpdateManyWithoutActorInput>;
};
export type TaskAuditLogCreateWithoutTaskInput = {
    id?: string;
    action: $Enums.TaskAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
    office: Prisma.OfficeCreateNestedOneWithoutTaskAuditLogsInput;
    actor: Prisma.UserCreateNestedOneWithoutTaskAuditLogsInput;
};
export type TaskAuditLogUncheckedCreateWithoutTaskInput = {
    id?: string;
    officeId: string;
    actorUserId: string;
    action: $Enums.TaskAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
};
export type TaskAuditLogCreateOrConnectWithoutTaskInput = {
    where: Prisma.TaskAuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutTaskInput, Prisma.TaskAuditLogUncheckedCreateWithoutTaskInput>;
};
export type TaskAuditLogCreateManyTaskInputEnvelope = {
    data: Prisma.TaskAuditLogCreateManyTaskInput | Prisma.TaskAuditLogCreateManyTaskInput[];
    skipDuplicates?: boolean;
};
export type TaskAuditLogUpsertWithWhereUniqueWithoutTaskInput = {
    where: Prisma.TaskAuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.TaskAuditLogUpdateWithoutTaskInput, Prisma.TaskAuditLogUncheckedUpdateWithoutTaskInput>;
    create: Prisma.XOR<Prisma.TaskAuditLogCreateWithoutTaskInput, Prisma.TaskAuditLogUncheckedCreateWithoutTaskInput>;
};
export type TaskAuditLogUpdateWithWhereUniqueWithoutTaskInput = {
    where: Prisma.TaskAuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.TaskAuditLogUpdateWithoutTaskInput, Prisma.TaskAuditLogUncheckedUpdateWithoutTaskInput>;
};
export type TaskAuditLogUpdateManyWithWhereWithoutTaskInput = {
    where: Prisma.TaskAuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.TaskAuditLogUpdateManyMutationInput, Prisma.TaskAuditLogUncheckedUpdateManyWithoutTaskInput>;
};
export type TaskAuditLogCreateManyOfficeInput = {
    id?: string;
    taskId: string;
    actorUserId: string;
    action: $Enums.TaskAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
};
export type TaskAuditLogUpdateWithoutOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumTaskActionFieldUpdateOperationsInput | $Enums.TaskAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    task?: Prisma.TaskUpdateOneRequiredWithoutAuditLogsNestedInput;
    actor?: Prisma.UserUpdateOneRequiredWithoutTaskAuditLogsNestedInput;
};
export type TaskAuditLogUncheckedUpdateWithoutOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    taskId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumTaskActionFieldUpdateOperationsInput | $Enums.TaskAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaskAuditLogUncheckedUpdateManyWithoutOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    taskId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumTaskActionFieldUpdateOperationsInput | $Enums.TaskAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaskAuditLogCreateManyActorInput = {
    id?: string;
    officeId: string;
    taskId: string;
    action: $Enums.TaskAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
};
export type TaskAuditLogUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumTaskActionFieldUpdateOperationsInput | $Enums.TaskAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    office?: Prisma.OfficeUpdateOneRequiredWithoutTaskAuditLogsNestedInput;
    task?: Prisma.TaskUpdateOneRequiredWithoutAuditLogsNestedInput;
};
export type TaskAuditLogUncheckedUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    taskId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumTaskActionFieldUpdateOperationsInput | $Enums.TaskAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaskAuditLogUncheckedUpdateManyWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    taskId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumTaskActionFieldUpdateOperationsInput | $Enums.TaskAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaskAuditLogCreateManyTaskInput = {
    id?: string;
    officeId: string;
    actorUserId: string;
    action: $Enums.TaskAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
};
export type TaskAuditLogUpdateWithoutTaskInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumTaskActionFieldUpdateOperationsInput | $Enums.TaskAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    office?: Prisma.OfficeUpdateOneRequiredWithoutTaskAuditLogsNestedInput;
    actor?: Prisma.UserUpdateOneRequiredWithoutTaskAuditLogsNestedInput;
};
export type TaskAuditLogUncheckedUpdateWithoutTaskInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumTaskActionFieldUpdateOperationsInput | $Enums.TaskAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaskAuditLogUncheckedUpdateManyWithoutTaskInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumTaskActionFieldUpdateOperationsInput | $Enums.TaskAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaskAuditLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    officeId?: boolean;
    taskId?: boolean;
    actorUserId?: boolean;
    action?: boolean;
    fieldName?: boolean;
    oldValue?: boolean;
    newValue?: boolean;
    ip?: boolean;
    deviceFingerprint?: boolean;
    geo?: boolean;
    createdAt?: boolean;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
    task?: boolean | Prisma.TaskDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["taskAuditLog"]>;
export type TaskAuditLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    officeId?: boolean;
    taskId?: boolean;
    actorUserId?: boolean;
    action?: boolean;
    fieldName?: boolean;
    oldValue?: boolean;
    newValue?: boolean;
    ip?: boolean;
    deviceFingerprint?: boolean;
    geo?: boolean;
    createdAt?: boolean;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
    task?: boolean | Prisma.TaskDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["taskAuditLog"]>;
export type TaskAuditLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    officeId?: boolean;
    taskId?: boolean;
    actorUserId?: boolean;
    action?: boolean;
    fieldName?: boolean;
    oldValue?: boolean;
    newValue?: boolean;
    ip?: boolean;
    deviceFingerprint?: boolean;
    geo?: boolean;
    createdAt?: boolean;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
    task?: boolean | Prisma.TaskDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["taskAuditLog"]>;
export type TaskAuditLogSelectScalar = {
    id?: boolean;
    officeId?: boolean;
    taskId?: boolean;
    actorUserId?: boolean;
    action?: boolean;
    fieldName?: boolean;
    oldValue?: boolean;
    newValue?: boolean;
    ip?: boolean;
    deviceFingerprint?: boolean;
    geo?: boolean;
    createdAt?: boolean;
};
export type TaskAuditLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "officeId" | "taskId" | "actorUserId" | "action" | "fieldName" | "oldValue" | "newValue" | "ip" | "deviceFingerprint" | "geo" | "createdAt", ExtArgs["result"]["taskAuditLog"]>;
export type TaskAuditLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
    task?: boolean | Prisma.TaskDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TaskAuditLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
    task?: boolean | Prisma.TaskDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TaskAuditLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
    task?: boolean | Prisma.TaskDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $TaskAuditLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TaskAuditLog";
    objects: {
        office: Prisma.$OfficePayload<ExtArgs>;
        task: Prisma.$TaskPayload<ExtArgs>;
        actor: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        officeId: string;
        taskId: string;
        actorUserId: string;
        action: $Enums.TaskAction;
        fieldName: string | null;
        oldValue: string | null;
        newValue: string | null;
        ip: string | null;
        deviceFingerprint: string | null;
        geo: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["taskAuditLog"]>;
    composites: {};
};
export type TaskAuditLogGetPayload<S extends boolean | null | undefined | TaskAuditLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TaskAuditLogPayload, S>;
export type TaskAuditLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TaskAuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TaskAuditLogCountAggregateInputType | true;
};
export interface TaskAuditLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TaskAuditLog'];
        meta: {
            name: 'TaskAuditLog';
        };
    };
    findUnique<T extends TaskAuditLogFindUniqueArgs>(args: Prisma.SelectSubset<T, TaskAuditLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TaskAuditLogClient<runtime.Types.Result.GetResult<Prisma.$TaskAuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TaskAuditLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TaskAuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TaskAuditLogClient<runtime.Types.Result.GetResult<Prisma.$TaskAuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TaskAuditLogFindFirstArgs>(args?: Prisma.SelectSubset<T, TaskAuditLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__TaskAuditLogClient<runtime.Types.Result.GetResult<Prisma.$TaskAuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TaskAuditLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TaskAuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TaskAuditLogClient<runtime.Types.Result.GetResult<Prisma.$TaskAuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TaskAuditLogFindManyArgs>(args?: Prisma.SelectSubset<T, TaskAuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TaskAuditLogCreateArgs>(args: Prisma.SelectSubset<T, TaskAuditLogCreateArgs<ExtArgs>>): Prisma.Prisma__TaskAuditLogClient<runtime.Types.Result.GetResult<Prisma.$TaskAuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TaskAuditLogCreateManyArgs>(args?: Prisma.SelectSubset<T, TaskAuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TaskAuditLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TaskAuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskAuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TaskAuditLogDeleteArgs>(args: Prisma.SelectSubset<T, TaskAuditLogDeleteArgs<ExtArgs>>): Prisma.Prisma__TaskAuditLogClient<runtime.Types.Result.GetResult<Prisma.$TaskAuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TaskAuditLogUpdateArgs>(args: Prisma.SelectSubset<T, TaskAuditLogUpdateArgs<ExtArgs>>): Prisma.Prisma__TaskAuditLogClient<runtime.Types.Result.GetResult<Prisma.$TaskAuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TaskAuditLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, TaskAuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TaskAuditLogUpdateManyArgs>(args: Prisma.SelectSubset<T, TaskAuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TaskAuditLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TaskAuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskAuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TaskAuditLogUpsertArgs>(args: Prisma.SelectSubset<T, TaskAuditLogUpsertArgs<ExtArgs>>): Prisma.Prisma__TaskAuditLogClient<runtime.Types.Result.GetResult<Prisma.$TaskAuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TaskAuditLogCountArgs>(args?: Prisma.Subset<T, TaskAuditLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TaskAuditLogCountAggregateOutputType> : number>;
    aggregate<T extends TaskAuditLogAggregateArgs>(args: Prisma.Subset<T, TaskAuditLogAggregateArgs>): Prisma.PrismaPromise<GetTaskAuditLogAggregateType<T>>;
    groupBy<T extends TaskAuditLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TaskAuditLogGroupByArgs['orderBy'];
    } : {
        orderBy?: TaskAuditLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TaskAuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TaskAuditLogFieldRefs;
}
export interface Prisma__TaskAuditLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    office<T extends Prisma.OfficeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OfficeDefaultArgs<ExtArgs>>): Prisma.Prisma__OfficeClient<runtime.Types.Result.GetResult<Prisma.$OfficePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    task<T extends Prisma.TaskDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TaskDefaultArgs<ExtArgs>>): Prisma.Prisma__TaskClient<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    actor<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TaskAuditLogFieldRefs {
    readonly id: Prisma.FieldRef<"TaskAuditLog", 'String'>;
    readonly officeId: Prisma.FieldRef<"TaskAuditLog", 'String'>;
    readonly taskId: Prisma.FieldRef<"TaskAuditLog", 'String'>;
    readonly actorUserId: Prisma.FieldRef<"TaskAuditLog", 'String'>;
    readonly action: Prisma.FieldRef<"TaskAuditLog", 'TaskAction'>;
    readonly fieldName: Prisma.FieldRef<"TaskAuditLog", 'String'>;
    readonly oldValue: Prisma.FieldRef<"TaskAuditLog", 'String'>;
    readonly newValue: Prisma.FieldRef<"TaskAuditLog", 'String'>;
    readonly ip: Prisma.FieldRef<"TaskAuditLog", 'String'>;
    readonly deviceFingerprint: Prisma.FieldRef<"TaskAuditLog", 'String'>;
    readonly geo: Prisma.FieldRef<"TaskAuditLog", 'String'>;
    readonly createdAt: Prisma.FieldRef<"TaskAuditLog", 'DateTime'>;
}
export type TaskAuditLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.TaskAuditLogOmit<ExtArgs> | null;
    include?: Prisma.TaskAuditLogInclude<ExtArgs> | null;
    where: Prisma.TaskAuditLogWhereUniqueInput;
};
export type TaskAuditLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.TaskAuditLogOmit<ExtArgs> | null;
    include?: Prisma.TaskAuditLogInclude<ExtArgs> | null;
    where: Prisma.TaskAuditLogWhereUniqueInput;
};
export type TaskAuditLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TaskAuditLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TaskAuditLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TaskAuditLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.TaskAuditLogOmit<ExtArgs> | null;
    include?: Prisma.TaskAuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TaskAuditLogCreateInput, Prisma.TaskAuditLogUncheckedCreateInput>;
};
export type TaskAuditLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TaskAuditLogCreateManyInput | Prisma.TaskAuditLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TaskAuditLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskAuditLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TaskAuditLogOmit<ExtArgs> | null;
    data: Prisma.TaskAuditLogCreateManyInput | Prisma.TaskAuditLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TaskAuditLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TaskAuditLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.TaskAuditLogOmit<ExtArgs> | null;
    include?: Prisma.TaskAuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TaskAuditLogUpdateInput, Prisma.TaskAuditLogUncheckedUpdateInput>;
    where: Prisma.TaskAuditLogWhereUniqueInput;
};
export type TaskAuditLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TaskAuditLogUpdateManyMutationInput, Prisma.TaskAuditLogUncheckedUpdateManyInput>;
    where?: Prisma.TaskAuditLogWhereInput;
    limit?: number;
};
export type TaskAuditLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskAuditLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TaskAuditLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TaskAuditLogUpdateManyMutationInput, Prisma.TaskAuditLogUncheckedUpdateManyInput>;
    where?: Prisma.TaskAuditLogWhereInput;
    limit?: number;
    include?: Prisma.TaskAuditLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TaskAuditLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.TaskAuditLogOmit<ExtArgs> | null;
    include?: Prisma.TaskAuditLogInclude<ExtArgs> | null;
    where: Prisma.TaskAuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.TaskAuditLogCreateInput, Prisma.TaskAuditLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TaskAuditLogUpdateInput, Prisma.TaskAuditLogUncheckedUpdateInput>;
};
export type TaskAuditLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.TaskAuditLogOmit<ExtArgs> | null;
    include?: Prisma.TaskAuditLogInclude<ExtArgs> | null;
    where: Prisma.TaskAuditLogWhereUniqueInput;
};
export type TaskAuditLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaskAuditLogWhereInput;
    limit?: number;
};
export type TaskAuditLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaskAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.TaskAuditLogOmit<ExtArgs> | null;
    include?: Prisma.TaskAuditLogInclude<ExtArgs> | null;
};
export {};
