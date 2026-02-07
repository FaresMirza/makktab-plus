import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type ProjectAuditLogModel = runtime.Types.Result.DefaultSelection<Prisma.$ProjectAuditLogPayload>;
export type AggregateProjectAuditLog = {
    _count: ProjectAuditLogCountAggregateOutputType | null;
    _min: ProjectAuditLogMinAggregateOutputType | null;
    _max: ProjectAuditLogMaxAggregateOutputType | null;
};
export type ProjectAuditLogMinAggregateOutputType = {
    id: string | null;
    officeId: string | null;
    projectId: string | null;
    actorUserId: string | null;
    action: $Enums.ProjectAction | null;
    fieldName: string | null;
    oldValue: string | null;
    newValue: string | null;
    ip: string | null;
    deviceFingerprint: string | null;
    geo: string | null;
    createdAt: Date | null;
};
export type ProjectAuditLogMaxAggregateOutputType = {
    id: string | null;
    officeId: string | null;
    projectId: string | null;
    actorUserId: string | null;
    action: $Enums.ProjectAction | null;
    fieldName: string | null;
    oldValue: string | null;
    newValue: string | null;
    ip: string | null;
    deviceFingerprint: string | null;
    geo: string | null;
    createdAt: Date | null;
};
export type ProjectAuditLogCountAggregateOutputType = {
    id: number;
    officeId: number;
    projectId: number;
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
export type ProjectAuditLogMinAggregateInputType = {
    id?: true;
    officeId?: true;
    projectId?: true;
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
export type ProjectAuditLogMaxAggregateInputType = {
    id?: true;
    officeId?: true;
    projectId?: true;
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
export type ProjectAuditLogCountAggregateInputType = {
    id?: true;
    officeId?: true;
    projectId?: true;
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
export type ProjectAuditLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectAuditLogWhereInput;
    orderBy?: Prisma.ProjectAuditLogOrderByWithRelationInput | Prisma.ProjectAuditLogOrderByWithRelationInput[];
    cursor?: Prisma.ProjectAuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProjectAuditLogCountAggregateInputType;
    _min?: ProjectAuditLogMinAggregateInputType;
    _max?: ProjectAuditLogMaxAggregateInputType;
};
export type GetProjectAuditLogAggregateType<T extends ProjectAuditLogAggregateArgs> = {
    [P in keyof T & keyof AggregateProjectAuditLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProjectAuditLog[P]> : Prisma.GetScalarType<T[P], AggregateProjectAuditLog[P]>;
};
export type ProjectAuditLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectAuditLogWhereInput;
    orderBy?: Prisma.ProjectAuditLogOrderByWithAggregationInput | Prisma.ProjectAuditLogOrderByWithAggregationInput[];
    by: Prisma.ProjectAuditLogScalarFieldEnum[] | Prisma.ProjectAuditLogScalarFieldEnum;
    having?: Prisma.ProjectAuditLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProjectAuditLogCountAggregateInputType | true;
    _min?: ProjectAuditLogMinAggregateInputType;
    _max?: ProjectAuditLogMaxAggregateInputType;
};
export type ProjectAuditLogGroupByOutputType = {
    id: string;
    officeId: string;
    projectId: string;
    actorUserId: string;
    action: $Enums.ProjectAction;
    fieldName: string | null;
    oldValue: string | null;
    newValue: string | null;
    ip: string | null;
    deviceFingerprint: string | null;
    geo: string | null;
    createdAt: Date;
    _count: ProjectAuditLogCountAggregateOutputType | null;
    _min: ProjectAuditLogMinAggregateOutputType | null;
    _max: ProjectAuditLogMaxAggregateOutputType | null;
};
type GetProjectAuditLogGroupByPayload<T extends ProjectAuditLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProjectAuditLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProjectAuditLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProjectAuditLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProjectAuditLogGroupByOutputType[P]>;
}>>;
export type ProjectAuditLogWhereInput = {
    AND?: Prisma.ProjectAuditLogWhereInput | Prisma.ProjectAuditLogWhereInput[];
    OR?: Prisma.ProjectAuditLogWhereInput[];
    NOT?: Prisma.ProjectAuditLogWhereInput | Prisma.ProjectAuditLogWhereInput[];
    id?: Prisma.StringFilter<"ProjectAuditLog"> | string;
    officeId?: Prisma.StringFilter<"ProjectAuditLog"> | string;
    projectId?: Prisma.StringFilter<"ProjectAuditLog"> | string;
    actorUserId?: Prisma.StringFilter<"ProjectAuditLog"> | string;
    action?: Prisma.EnumProjectActionFilter<"ProjectAuditLog"> | $Enums.ProjectAction;
    fieldName?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    oldValue?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    newValue?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    ip?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    deviceFingerprint?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    geo?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ProjectAuditLog"> | Date | string;
    office?: Prisma.XOR<Prisma.OfficeScalarRelationFilter, Prisma.OfficeWhereInput>;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
    actor?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ProjectAuditLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
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
    project?: Prisma.ProjectOrderByWithRelationInput;
    actor?: Prisma.UserOrderByWithRelationInput;
};
export type ProjectAuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ProjectAuditLogWhereInput | Prisma.ProjectAuditLogWhereInput[];
    OR?: Prisma.ProjectAuditLogWhereInput[];
    NOT?: Prisma.ProjectAuditLogWhereInput | Prisma.ProjectAuditLogWhereInput[];
    officeId?: Prisma.StringFilter<"ProjectAuditLog"> | string;
    projectId?: Prisma.StringFilter<"ProjectAuditLog"> | string;
    actorUserId?: Prisma.StringFilter<"ProjectAuditLog"> | string;
    action?: Prisma.EnumProjectActionFilter<"ProjectAuditLog"> | $Enums.ProjectAction;
    fieldName?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    oldValue?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    newValue?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    ip?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    deviceFingerprint?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    geo?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ProjectAuditLog"> | Date | string;
    office?: Prisma.XOR<Prisma.OfficeScalarRelationFilter, Prisma.OfficeWhereInput>;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
    actor?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type ProjectAuditLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    actorUserId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    fieldName?: Prisma.SortOrderInput | Prisma.SortOrder;
    oldValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    newValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    ip?: Prisma.SortOrderInput | Prisma.SortOrder;
    deviceFingerprint?: Prisma.SortOrderInput | Prisma.SortOrder;
    geo?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ProjectAuditLogCountOrderByAggregateInput;
    _max?: Prisma.ProjectAuditLogMaxOrderByAggregateInput;
    _min?: Prisma.ProjectAuditLogMinOrderByAggregateInput;
};
export type ProjectAuditLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProjectAuditLogScalarWhereWithAggregatesInput | Prisma.ProjectAuditLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProjectAuditLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProjectAuditLogScalarWhereWithAggregatesInput | Prisma.ProjectAuditLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProjectAuditLog"> | string;
    officeId?: Prisma.StringWithAggregatesFilter<"ProjectAuditLog"> | string;
    projectId?: Prisma.StringWithAggregatesFilter<"ProjectAuditLog"> | string;
    actorUserId?: Prisma.StringWithAggregatesFilter<"ProjectAuditLog"> | string;
    action?: Prisma.EnumProjectActionWithAggregatesFilter<"ProjectAuditLog"> | $Enums.ProjectAction;
    fieldName?: Prisma.StringNullableWithAggregatesFilter<"ProjectAuditLog"> | string | null;
    oldValue?: Prisma.StringNullableWithAggregatesFilter<"ProjectAuditLog"> | string | null;
    newValue?: Prisma.StringNullableWithAggregatesFilter<"ProjectAuditLog"> | string | null;
    ip?: Prisma.StringNullableWithAggregatesFilter<"ProjectAuditLog"> | string | null;
    deviceFingerprint?: Prisma.StringNullableWithAggregatesFilter<"ProjectAuditLog"> | string | null;
    geo?: Prisma.StringNullableWithAggregatesFilter<"ProjectAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProjectAuditLog"> | Date | string;
};
export type ProjectAuditLogCreateInput = {
    id?: string;
    action: $Enums.ProjectAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
    office: Prisma.OfficeCreateNestedOneWithoutProjectAuditLogsInput;
    project: Prisma.ProjectCreateNestedOneWithoutAuditLogsInput;
    actor: Prisma.UserCreateNestedOneWithoutProjectAuditLogsInput;
};
export type ProjectAuditLogUncheckedCreateInput = {
    id?: string;
    officeId: string;
    projectId: string;
    actorUserId: string;
    action: $Enums.ProjectAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
};
export type ProjectAuditLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumProjectActionFieldUpdateOperationsInput | $Enums.ProjectAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    office?: Prisma.OfficeUpdateOneRequiredWithoutProjectAuditLogsNestedInput;
    project?: Prisma.ProjectUpdateOneRequiredWithoutAuditLogsNestedInput;
    actor?: Prisma.UserUpdateOneRequiredWithoutProjectAuditLogsNestedInput;
};
export type ProjectAuditLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumProjectActionFieldUpdateOperationsInput | $Enums.ProjectAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectAuditLogCreateManyInput = {
    id?: string;
    officeId: string;
    projectId: string;
    actorUserId: string;
    action: $Enums.ProjectAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
};
export type ProjectAuditLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumProjectActionFieldUpdateOperationsInput | $Enums.ProjectAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectAuditLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumProjectActionFieldUpdateOperationsInput | $Enums.ProjectAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectAuditLogListRelationFilter = {
    every?: Prisma.ProjectAuditLogWhereInput;
    some?: Prisma.ProjectAuditLogWhereInput;
    none?: Prisma.ProjectAuditLogWhereInput;
};
export type ProjectAuditLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProjectAuditLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
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
export type ProjectAuditLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
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
export type ProjectAuditLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
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
export type ProjectAuditLogCreateNestedManyWithoutOfficeInput = {
    create?: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutOfficeInput, Prisma.ProjectAuditLogUncheckedCreateWithoutOfficeInput> | Prisma.ProjectAuditLogCreateWithoutOfficeInput[] | Prisma.ProjectAuditLogUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.ProjectAuditLogCreateOrConnectWithoutOfficeInput | Prisma.ProjectAuditLogCreateOrConnectWithoutOfficeInput[];
    createMany?: Prisma.ProjectAuditLogCreateManyOfficeInputEnvelope;
    connect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
};
export type ProjectAuditLogUncheckedCreateNestedManyWithoutOfficeInput = {
    create?: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutOfficeInput, Prisma.ProjectAuditLogUncheckedCreateWithoutOfficeInput> | Prisma.ProjectAuditLogCreateWithoutOfficeInput[] | Prisma.ProjectAuditLogUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.ProjectAuditLogCreateOrConnectWithoutOfficeInput | Prisma.ProjectAuditLogCreateOrConnectWithoutOfficeInput[];
    createMany?: Prisma.ProjectAuditLogCreateManyOfficeInputEnvelope;
    connect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
};
export type ProjectAuditLogUpdateManyWithoutOfficeNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutOfficeInput, Prisma.ProjectAuditLogUncheckedCreateWithoutOfficeInput> | Prisma.ProjectAuditLogCreateWithoutOfficeInput[] | Prisma.ProjectAuditLogUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.ProjectAuditLogCreateOrConnectWithoutOfficeInput | Prisma.ProjectAuditLogCreateOrConnectWithoutOfficeInput[];
    upsert?: Prisma.ProjectAuditLogUpsertWithWhereUniqueWithoutOfficeInput | Prisma.ProjectAuditLogUpsertWithWhereUniqueWithoutOfficeInput[];
    createMany?: Prisma.ProjectAuditLogCreateManyOfficeInputEnvelope;
    set?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    disconnect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    delete?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    connect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    update?: Prisma.ProjectAuditLogUpdateWithWhereUniqueWithoutOfficeInput | Prisma.ProjectAuditLogUpdateWithWhereUniqueWithoutOfficeInput[];
    updateMany?: Prisma.ProjectAuditLogUpdateManyWithWhereWithoutOfficeInput | Prisma.ProjectAuditLogUpdateManyWithWhereWithoutOfficeInput[];
    deleteMany?: Prisma.ProjectAuditLogScalarWhereInput | Prisma.ProjectAuditLogScalarWhereInput[];
};
export type ProjectAuditLogUncheckedUpdateManyWithoutOfficeNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutOfficeInput, Prisma.ProjectAuditLogUncheckedCreateWithoutOfficeInput> | Prisma.ProjectAuditLogCreateWithoutOfficeInput[] | Prisma.ProjectAuditLogUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.ProjectAuditLogCreateOrConnectWithoutOfficeInput | Prisma.ProjectAuditLogCreateOrConnectWithoutOfficeInput[];
    upsert?: Prisma.ProjectAuditLogUpsertWithWhereUniqueWithoutOfficeInput | Prisma.ProjectAuditLogUpsertWithWhereUniqueWithoutOfficeInput[];
    createMany?: Prisma.ProjectAuditLogCreateManyOfficeInputEnvelope;
    set?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    disconnect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    delete?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    connect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    update?: Prisma.ProjectAuditLogUpdateWithWhereUniqueWithoutOfficeInput | Prisma.ProjectAuditLogUpdateWithWhereUniqueWithoutOfficeInput[];
    updateMany?: Prisma.ProjectAuditLogUpdateManyWithWhereWithoutOfficeInput | Prisma.ProjectAuditLogUpdateManyWithWhereWithoutOfficeInput[];
    deleteMany?: Prisma.ProjectAuditLogScalarWhereInput | Prisma.ProjectAuditLogScalarWhereInput[];
};
export type ProjectAuditLogCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutActorInput, Prisma.ProjectAuditLogUncheckedCreateWithoutActorInput> | Prisma.ProjectAuditLogCreateWithoutActorInput[] | Prisma.ProjectAuditLogUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.ProjectAuditLogCreateOrConnectWithoutActorInput | Prisma.ProjectAuditLogCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.ProjectAuditLogCreateManyActorInputEnvelope;
    connect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
};
export type ProjectAuditLogUncheckedCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutActorInput, Prisma.ProjectAuditLogUncheckedCreateWithoutActorInput> | Prisma.ProjectAuditLogCreateWithoutActorInput[] | Prisma.ProjectAuditLogUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.ProjectAuditLogCreateOrConnectWithoutActorInput | Prisma.ProjectAuditLogCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.ProjectAuditLogCreateManyActorInputEnvelope;
    connect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
};
export type ProjectAuditLogUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutActorInput, Prisma.ProjectAuditLogUncheckedCreateWithoutActorInput> | Prisma.ProjectAuditLogCreateWithoutActorInput[] | Prisma.ProjectAuditLogUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.ProjectAuditLogCreateOrConnectWithoutActorInput | Prisma.ProjectAuditLogCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.ProjectAuditLogUpsertWithWhereUniqueWithoutActorInput | Prisma.ProjectAuditLogUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.ProjectAuditLogCreateManyActorInputEnvelope;
    set?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    disconnect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    delete?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    connect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    update?: Prisma.ProjectAuditLogUpdateWithWhereUniqueWithoutActorInput | Prisma.ProjectAuditLogUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.ProjectAuditLogUpdateManyWithWhereWithoutActorInput | Prisma.ProjectAuditLogUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.ProjectAuditLogScalarWhereInput | Prisma.ProjectAuditLogScalarWhereInput[];
};
export type ProjectAuditLogUncheckedUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutActorInput, Prisma.ProjectAuditLogUncheckedCreateWithoutActorInput> | Prisma.ProjectAuditLogCreateWithoutActorInput[] | Prisma.ProjectAuditLogUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.ProjectAuditLogCreateOrConnectWithoutActorInput | Prisma.ProjectAuditLogCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.ProjectAuditLogUpsertWithWhereUniqueWithoutActorInput | Prisma.ProjectAuditLogUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.ProjectAuditLogCreateManyActorInputEnvelope;
    set?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    disconnect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    delete?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    connect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    update?: Prisma.ProjectAuditLogUpdateWithWhereUniqueWithoutActorInput | Prisma.ProjectAuditLogUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.ProjectAuditLogUpdateManyWithWhereWithoutActorInput | Prisma.ProjectAuditLogUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.ProjectAuditLogScalarWhereInput | Prisma.ProjectAuditLogScalarWhereInput[];
};
export type ProjectAuditLogCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutProjectInput, Prisma.ProjectAuditLogUncheckedCreateWithoutProjectInput> | Prisma.ProjectAuditLogCreateWithoutProjectInput[] | Prisma.ProjectAuditLogUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.ProjectAuditLogCreateOrConnectWithoutProjectInput | Prisma.ProjectAuditLogCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.ProjectAuditLogCreateManyProjectInputEnvelope;
    connect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
};
export type ProjectAuditLogUncheckedCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutProjectInput, Prisma.ProjectAuditLogUncheckedCreateWithoutProjectInput> | Prisma.ProjectAuditLogCreateWithoutProjectInput[] | Prisma.ProjectAuditLogUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.ProjectAuditLogCreateOrConnectWithoutProjectInput | Prisma.ProjectAuditLogCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.ProjectAuditLogCreateManyProjectInputEnvelope;
    connect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
};
export type ProjectAuditLogUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutProjectInput, Prisma.ProjectAuditLogUncheckedCreateWithoutProjectInput> | Prisma.ProjectAuditLogCreateWithoutProjectInput[] | Prisma.ProjectAuditLogUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.ProjectAuditLogCreateOrConnectWithoutProjectInput | Prisma.ProjectAuditLogCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.ProjectAuditLogUpsertWithWhereUniqueWithoutProjectInput | Prisma.ProjectAuditLogUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.ProjectAuditLogCreateManyProjectInputEnvelope;
    set?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    disconnect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    delete?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    connect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    update?: Prisma.ProjectAuditLogUpdateWithWhereUniqueWithoutProjectInput | Prisma.ProjectAuditLogUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.ProjectAuditLogUpdateManyWithWhereWithoutProjectInput | Prisma.ProjectAuditLogUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.ProjectAuditLogScalarWhereInput | Prisma.ProjectAuditLogScalarWhereInput[];
};
export type ProjectAuditLogUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutProjectInput, Prisma.ProjectAuditLogUncheckedCreateWithoutProjectInput> | Prisma.ProjectAuditLogCreateWithoutProjectInput[] | Prisma.ProjectAuditLogUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.ProjectAuditLogCreateOrConnectWithoutProjectInput | Prisma.ProjectAuditLogCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.ProjectAuditLogUpsertWithWhereUniqueWithoutProjectInput | Prisma.ProjectAuditLogUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.ProjectAuditLogCreateManyProjectInputEnvelope;
    set?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    disconnect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    delete?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    connect?: Prisma.ProjectAuditLogWhereUniqueInput | Prisma.ProjectAuditLogWhereUniqueInput[];
    update?: Prisma.ProjectAuditLogUpdateWithWhereUniqueWithoutProjectInput | Prisma.ProjectAuditLogUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.ProjectAuditLogUpdateManyWithWhereWithoutProjectInput | Prisma.ProjectAuditLogUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.ProjectAuditLogScalarWhereInput | Prisma.ProjectAuditLogScalarWhereInput[];
};
export type EnumProjectActionFieldUpdateOperationsInput = {
    set?: $Enums.ProjectAction;
};
export type ProjectAuditLogCreateWithoutOfficeInput = {
    id?: string;
    action: $Enums.ProjectAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
    project: Prisma.ProjectCreateNestedOneWithoutAuditLogsInput;
    actor: Prisma.UserCreateNestedOneWithoutProjectAuditLogsInput;
};
export type ProjectAuditLogUncheckedCreateWithoutOfficeInput = {
    id?: string;
    projectId: string;
    actorUserId: string;
    action: $Enums.ProjectAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
};
export type ProjectAuditLogCreateOrConnectWithoutOfficeInput = {
    where: Prisma.ProjectAuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutOfficeInput, Prisma.ProjectAuditLogUncheckedCreateWithoutOfficeInput>;
};
export type ProjectAuditLogCreateManyOfficeInputEnvelope = {
    data: Prisma.ProjectAuditLogCreateManyOfficeInput | Prisma.ProjectAuditLogCreateManyOfficeInput[];
    skipDuplicates?: boolean;
};
export type ProjectAuditLogUpsertWithWhereUniqueWithoutOfficeInput = {
    where: Prisma.ProjectAuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProjectAuditLogUpdateWithoutOfficeInput, Prisma.ProjectAuditLogUncheckedUpdateWithoutOfficeInput>;
    create: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutOfficeInput, Prisma.ProjectAuditLogUncheckedCreateWithoutOfficeInput>;
};
export type ProjectAuditLogUpdateWithWhereUniqueWithoutOfficeInput = {
    where: Prisma.ProjectAuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProjectAuditLogUpdateWithoutOfficeInput, Prisma.ProjectAuditLogUncheckedUpdateWithoutOfficeInput>;
};
export type ProjectAuditLogUpdateManyWithWhereWithoutOfficeInput = {
    where: Prisma.ProjectAuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.ProjectAuditLogUpdateManyMutationInput, Prisma.ProjectAuditLogUncheckedUpdateManyWithoutOfficeInput>;
};
export type ProjectAuditLogScalarWhereInput = {
    AND?: Prisma.ProjectAuditLogScalarWhereInput | Prisma.ProjectAuditLogScalarWhereInput[];
    OR?: Prisma.ProjectAuditLogScalarWhereInput[];
    NOT?: Prisma.ProjectAuditLogScalarWhereInput | Prisma.ProjectAuditLogScalarWhereInput[];
    id?: Prisma.StringFilter<"ProjectAuditLog"> | string;
    officeId?: Prisma.StringFilter<"ProjectAuditLog"> | string;
    projectId?: Prisma.StringFilter<"ProjectAuditLog"> | string;
    actorUserId?: Prisma.StringFilter<"ProjectAuditLog"> | string;
    action?: Prisma.EnumProjectActionFilter<"ProjectAuditLog"> | $Enums.ProjectAction;
    fieldName?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    oldValue?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    newValue?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    ip?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    deviceFingerprint?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    geo?: Prisma.StringNullableFilter<"ProjectAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ProjectAuditLog"> | Date | string;
};
export type ProjectAuditLogCreateWithoutActorInput = {
    id?: string;
    action: $Enums.ProjectAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
    office: Prisma.OfficeCreateNestedOneWithoutProjectAuditLogsInput;
    project: Prisma.ProjectCreateNestedOneWithoutAuditLogsInput;
};
export type ProjectAuditLogUncheckedCreateWithoutActorInput = {
    id?: string;
    officeId: string;
    projectId: string;
    action: $Enums.ProjectAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
};
export type ProjectAuditLogCreateOrConnectWithoutActorInput = {
    where: Prisma.ProjectAuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutActorInput, Prisma.ProjectAuditLogUncheckedCreateWithoutActorInput>;
};
export type ProjectAuditLogCreateManyActorInputEnvelope = {
    data: Prisma.ProjectAuditLogCreateManyActorInput | Prisma.ProjectAuditLogCreateManyActorInput[];
    skipDuplicates?: boolean;
};
export type ProjectAuditLogUpsertWithWhereUniqueWithoutActorInput = {
    where: Prisma.ProjectAuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProjectAuditLogUpdateWithoutActorInput, Prisma.ProjectAuditLogUncheckedUpdateWithoutActorInput>;
    create: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutActorInput, Prisma.ProjectAuditLogUncheckedCreateWithoutActorInput>;
};
export type ProjectAuditLogUpdateWithWhereUniqueWithoutActorInput = {
    where: Prisma.ProjectAuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProjectAuditLogUpdateWithoutActorInput, Prisma.ProjectAuditLogUncheckedUpdateWithoutActorInput>;
};
export type ProjectAuditLogUpdateManyWithWhereWithoutActorInput = {
    where: Prisma.ProjectAuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.ProjectAuditLogUpdateManyMutationInput, Prisma.ProjectAuditLogUncheckedUpdateManyWithoutActorInput>;
};
export type ProjectAuditLogCreateWithoutProjectInput = {
    id?: string;
    action: $Enums.ProjectAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
    office: Prisma.OfficeCreateNestedOneWithoutProjectAuditLogsInput;
    actor: Prisma.UserCreateNestedOneWithoutProjectAuditLogsInput;
};
export type ProjectAuditLogUncheckedCreateWithoutProjectInput = {
    id?: string;
    officeId: string;
    actorUserId: string;
    action: $Enums.ProjectAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
};
export type ProjectAuditLogCreateOrConnectWithoutProjectInput = {
    where: Prisma.ProjectAuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutProjectInput, Prisma.ProjectAuditLogUncheckedCreateWithoutProjectInput>;
};
export type ProjectAuditLogCreateManyProjectInputEnvelope = {
    data: Prisma.ProjectAuditLogCreateManyProjectInput | Prisma.ProjectAuditLogCreateManyProjectInput[];
    skipDuplicates?: boolean;
};
export type ProjectAuditLogUpsertWithWhereUniqueWithoutProjectInput = {
    where: Prisma.ProjectAuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProjectAuditLogUpdateWithoutProjectInput, Prisma.ProjectAuditLogUncheckedUpdateWithoutProjectInput>;
    create: Prisma.XOR<Prisma.ProjectAuditLogCreateWithoutProjectInput, Prisma.ProjectAuditLogUncheckedCreateWithoutProjectInput>;
};
export type ProjectAuditLogUpdateWithWhereUniqueWithoutProjectInput = {
    where: Prisma.ProjectAuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProjectAuditLogUpdateWithoutProjectInput, Prisma.ProjectAuditLogUncheckedUpdateWithoutProjectInput>;
};
export type ProjectAuditLogUpdateManyWithWhereWithoutProjectInput = {
    where: Prisma.ProjectAuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.ProjectAuditLogUpdateManyMutationInput, Prisma.ProjectAuditLogUncheckedUpdateManyWithoutProjectInput>;
};
export type ProjectAuditLogCreateManyOfficeInput = {
    id?: string;
    projectId: string;
    actorUserId: string;
    action: $Enums.ProjectAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
};
export type ProjectAuditLogUpdateWithoutOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumProjectActionFieldUpdateOperationsInput | $Enums.ProjectAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.ProjectUpdateOneRequiredWithoutAuditLogsNestedInput;
    actor?: Prisma.UserUpdateOneRequiredWithoutProjectAuditLogsNestedInput;
};
export type ProjectAuditLogUncheckedUpdateWithoutOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumProjectActionFieldUpdateOperationsInput | $Enums.ProjectAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectAuditLogUncheckedUpdateManyWithoutOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumProjectActionFieldUpdateOperationsInput | $Enums.ProjectAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectAuditLogCreateManyActorInput = {
    id?: string;
    officeId: string;
    projectId: string;
    action: $Enums.ProjectAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
};
export type ProjectAuditLogUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumProjectActionFieldUpdateOperationsInput | $Enums.ProjectAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    office?: Prisma.OfficeUpdateOneRequiredWithoutProjectAuditLogsNestedInput;
    project?: Prisma.ProjectUpdateOneRequiredWithoutAuditLogsNestedInput;
};
export type ProjectAuditLogUncheckedUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumProjectActionFieldUpdateOperationsInput | $Enums.ProjectAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectAuditLogUncheckedUpdateManyWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumProjectActionFieldUpdateOperationsInput | $Enums.ProjectAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectAuditLogCreateManyProjectInput = {
    id?: string;
    officeId: string;
    actorUserId: string;
    action: $Enums.ProjectAction;
    fieldName?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ip?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    createdAt?: Date | string;
};
export type ProjectAuditLogUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumProjectActionFieldUpdateOperationsInput | $Enums.ProjectAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    office?: Prisma.OfficeUpdateOneRequiredWithoutProjectAuditLogsNestedInput;
    actor?: Prisma.UserUpdateOneRequiredWithoutProjectAuditLogsNestedInput;
};
export type ProjectAuditLogUncheckedUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumProjectActionFieldUpdateOperationsInput | $Enums.ProjectAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectAuditLogUncheckedUpdateManyWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumProjectActionFieldUpdateOperationsInput | $Enums.ProjectAction;
    fieldName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    oldValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    newValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectAuditLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    officeId?: boolean;
    projectId?: boolean;
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
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["projectAuditLog"]>;
export type ProjectAuditLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    officeId?: boolean;
    projectId?: boolean;
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
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["projectAuditLog"]>;
export type ProjectAuditLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    officeId?: boolean;
    projectId?: boolean;
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
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["projectAuditLog"]>;
export type ProjectAuditLogSelectScalar = {
    id?: boolean;
    officeId?: boolean;
    projectId?: boolean;
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
export type ProjectAuditLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "officeId" | "projectId" | "actorUserId" | "action" | "fieldName" | "oldValue" | "newValue" | "ip" | "deviceFingerprint" | "geo" | "createdAt", ExtArgs["result"]["projectAuditLog"]>;
export type ProjectAuditLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ProjectAuditLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ProjectAuditLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ProjectAuditLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProjectAuditLog";
    objects: {
        office: Prisma.$OfficePayload<ExtArgs>;
        project: Prisma.$ProjectPayload<ExtArgs>;
        actor: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        officeId: string;
        projectId: string;
        actorUserId: string;
        action: $Enums.ProjectAction;
        fieldName: string | null;
        oldValue: string | null;
        newValue: string | null;
        ip: string | null;
        deviceFingerprint: string | null;
        geo: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["projectAuditLog"]>;
    composites: {};
};
export type ProjectAuditLogGetPayload<S extends boolean | null | undefined | ProjectAuditLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProjectAuditLogPayload, S>;
export type ProjectAuditLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProjectAuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProjectAuditLogCountAggregateInputType | true;
};
export interface ProjectAuditLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProjectAuditLog'];
        meta: {
            name: 'ProjectAuditLog';
        };
    };
    findUnique<T extends ProjectAuditLogFindUniqueArgs>(args: Prisma.SelectSubset<T, ProjectAuditLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProjectAuditLogClient<runtime.Types.Result.GetResult<Prisma.$ProjectAuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProjectAuditLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProjectAuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectAuditLogClient<runtime.Types.Result.GetResult<Prisma.$ProjectAuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProjectAuditLogFindFirstArgs>(args?: Prisma.SelectSubset<T, ProjectAuditLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProjectAuditLogClient<runtime.Types.Result.GetResult<Prisma.$ProjectAuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProjectAuditLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProjectAuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectAuditLogClient<runtime.Types.Result.GetResult<Prisma.$ProjectAuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProjectAuditLogFindManyArgs>(args?: Prisma.SelectSubset<T, ProjectAuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProjectAuditLogCreateArgs>(args: Prisma.SelectSubset<T, ProjectAuditLogCreateArgs<ExtArgs>>): Prisma.Prisma__ProjectAuditLogClient<runtime.Types.Result.GetResult<Prisma.$ProjectAuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProjectAuditLogCreateManyArgs>(args?: Prisma.SelectSubset<T, ProjectAuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProjectAuditLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProjectAuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectAuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProjectAuditLogDeleteArgs>(args: Prisma.SelectSubset<T, ProjectAuditLogDeleteArgs<ExtArgs>>): Prisma.Prisma__ProjectAuditLogClient<runtime.Types.Result.GetResult<Prisma.$ProjectAuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProjectAuditLogUpdateArgs>(args: Prisma.SelectSubset<T, ProjectAuditLogUpdateArgs<ExtArgs>>): Prisma.Prisma__ProjectAuditLogClient<runtime.Types.Result.GetResult<Prisma.$ProjectAuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProjectAuditLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProjectAuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProjectAuditLogUpdateManyArgs>(args: Prisma.SelectSubset<T, ProjectAuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProjectAuditLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProjectAuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectAuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProjectAuditLogUpsertArgs>(args: Prisma.SelectSubset<T, ProjectAuditLogUpsertArgs<ExtArgs>>): Prisma.Prisma__ProjectAuditLogClient<runtime.Types.Result.GetResult<Prisma.$ProjectAuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProjectAuditLogCountArgs>(args?: Prisma.Subset<T, ProjectAuditLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProjectAuditLogCountAggregateOutputType> : number>;
    aggregate<T extends ProjectAuditLogAggregateArgs>(args: Prisma.Subset<T, ProjectAuditLogAggregateArgs>): Prisma.PrismaPromise<GetProjectAuditLogAggregateType<T>>;
    groupBy<T extends ProjectAuditLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProjectAuditLogGroupByArgs['orderBy'];
    } : {
        orderBy?: ProjectAuditLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProjectAuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProjectAuditLogFieldRefs;
}
export interface Prisma__ProjectAuditLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    office<T extends Prisma.OfficeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OfficeDefaultArgs<ExtArgs>>): Prisma.Prisma__OfficeClient<runtime.Types.Result.GetResult<Prisma.$OfficePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    project<T extends Prisma.ProjectDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProjectDefaultArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    actor<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProjectAuditLogFieldRefs {
    readonly id: Prisma.FieldRef<"ProjectAuditLog", 'String'>;
    readonly officeId: Prisma.FieldRef<"ProjectAuditLog", 'String'>;
    readonly projectId: Prisma.FieldRef<"ProjectAuditLog", 'String'>;
    readonly actorUserId: Prisma.FieldRef<"ProjectAuditLog", 'String'>;
    readonly action: Prisma.FieldRef<"ProjectAuditLog", 'ProjectAction'>;
    readonly fieldName: Prisma.FieldRef<"ProjectAuditLog", 'String'>;
    readonly oldValue: Prisma.FieldRef<"ProjectAuditLog", 'String'>;
    readonly newValue: Prisma.FieldRef<"ProjectAuditLog", 'String'>;
    readonly ip: Prisma.FieldRef<"ProjectAuditLog", 'String'>;
    readonly deviceFingerprint: Prisma.FieldRef<"ProjectAuditLog", 'String'>;
    readonly geo: Prisma.FieldRef<"ProjectAuditLog", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ProjectAuditLog", 'DateTime'>;
}
export type ProjectAuditLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.ProjectAuditLogOmit<ExtArgs> | null;
    include?: Prisma.ProjectAuditLogInclude<ExtArgs> | null;
    where: Prisma.ProjectAuditLogWhereUniqueInput;
};
export type ProjectAuditLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.ProjectAuditLogOmit<ExtArgs> | null;
    include?: Prisma.ProjectAuditLogInclude<ExtArgs> | null;
    where: Prisma.ProjectAuditLogWhereUniqueInput;
};
export type ProjectAuditLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProjectAuditLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProjectAuditLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProjectAuditLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.ProjectAuditLogOmit<ExtArgs> | null;
    include?: Prisma.ProjectAuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectAuditLogCreateInput, Prisma.ProjectAuditLogUncheckedCreateInput>;
};
export type ProjectAuditLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProjectAuditLogCreateManyInput | Prisma.ProjectAuditLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProjectAuditLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectAuditLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectAuditLogOmit<ExtArgs> | null;
    data: Prisma.ProjectAuditLogCreateManyInput | Prisma.ProjectAuditLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProjectAuditLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProjectAuditLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.ProjectAuditLogOmit<ExtArgs> | null;
    include?: Prisma.ProjectAuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectAuditLogUpdateInput, Prisma.ProjectAuditLogUncheckedUpdateInput>;
    where: Prisma.ProjectAuditLogWhereUniqueInput;
};
export type ProjectAuditLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProjectAuditLogUpdateManyMutationInput, Prisma.ProjectAuditLogUncheckedUpdateManyInput>;
    where?: Prisma.ProjectAuditLogWhereInput;
    limit?: number;
};
export type ProjectAuditLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectAuditLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectAuditLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectAuditLogUpdateManyMutationInput, Prisma.ProjectAuditLogUncheckedUpdateManyInput>;
    where?: Prisma.ProjectAuditLogWhereInput;
    limit?: number;
    include?: Prisma.ProjectAuditLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProjectAuditLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.ProjectAuditLogOmit<ExtArgs> | null;
    include?: Prisma.ProjectAuditLogInclude<ExtArgs> | null;
    where: Prisma.ProjectAuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectAuditLogCreateInput, Prisma.ProjectAuditLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProjectAuditLogUpdateInput, Prisma.ProjectAuditLogUncheckedUpdateInput>;
};
export type ProjectAuditLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.ProjectAuditLogOmit<ExtArgs> | null;
    include?: Prisma.ProjectAuditLogInclude<ExtArgs> | null;
    where: Prisma.ProjectAuditLogWhereUniqueInput;
};
export type ProjectAuditLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectAuditLogWhereInput;
    limit?: number;
};
export type ProjectAuditLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.ProjectAuditLogOmit<ExtArgs> | null;
    include?: Prisma.ProjectAuditLogInclude<ExtArgs> | null;
};
export {};
