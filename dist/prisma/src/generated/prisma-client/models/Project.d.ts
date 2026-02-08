import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type ProjectModel = runtime.Types.Result.DefaultSelection<Prisma.$ProjectPayload>;
export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null;
    _min: ProjectMinAggregateOutputType | null;
    _max: ProjectMaxAggregateOutputType | null;
};
export type ProjectMinAggregateOutputType = {
    id: string | null;
    officeId: string | null;
    createdByUserId: string | null;
    projectManagerUserId: string | null;
    name: string | null;
    description: string | null;
    status: $Enums.ProjectStatus | null;
    createdAt: Date | null;
};
export type ProjectMaxAggregateOutputType = {
    id: string | null;
    officeId: string | null;
    createdByUserId: string | null;
    projectManagerUserId: string | null;
    name: string | null;
    description: string | null;
    status: $Enums.ProjectStatus | null;
    createdAt: Date | null;
};
export type ProjectCountAggregateOutputType = {
    id: number;
    officeId: number;
    createdByUserId: number;
    projectManagerUserId: number;
    name: number;
    description: number;
    status: number;
    createdAt: number;
    _all: number;
};
export type ProjectMinAggregateInputType = {
    id?: true;
    officeId?: true;
    createdByUserId?: true;
    projectManagerUserId?: true;
    name?: true;
    description?: true;
    status?: true;
    createdAt?: true;
};
export type ProjectMaxAggregateInputType = {
    id?: true;
    officeId?: true;
    createdByUserId?: true;
    projectManagerUserId?: true;
    name?: true;
    description?: true;
    status?: true;
    createdAt?: true;
};
export type ProjectCountAggregateInputType = {
    id?: true;
    officeId?: true;
    createdByUserId?: true;
    projectManagerUserId?: true;
    name?: true;
    description?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
};
export type ProjectAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProjectCountAggregateInputType;
    _min?: ProjectMinAggregateInputType;
    _max?: ProjectMaxAggregateInputType;
};
export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
    [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProject[P]> : Prisma.GetScalarType<T[P], AggregateProject[P]>;
};
export type ProjectGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithAggregationInput | Prisma.ProjectOrderByWithAggregationInput[];
    by: Prisma.ProjectScalarFieldEnum[] | Prisma.ProjectScalarFieldEnum;
    having?: Prisma.ProjectScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProjectCountAggregateInputType | true;
    _min?: ProjectMinAggregateInputType;
    _max?: ProjectMaxAggregateInputType;
};
export type ProjectGroupByOutputType = {
    id: string;
    officeId: string;
    createdByUserId: string;
    projectManagerUserId: string;
    name: string;
    description: string | null;
    status: $Enums.ProjectStatus;
    createdAt: Date;
    _count: ProjectCountAggregateOutputType | null;
    _min: ProjectMinAggregateOutputType | null;
    _max: ProjectMaxAggregateOutputType | null;
};
type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProjectGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProjectGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProjectGroupByOutputType[P]>;
}>>;
export type ProjectWhereInput = {
    AND?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    OR?: Prisma.ProjectWhereInput[];
    NOT?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    id?: Prisma.StringFilter<"Project"> | string;
    officeId?: Prisma.StringFilter<"Project"> | string;
    createdByUserId?: Prisma.StringFilter<"Project"> | string;
    projectManagerUserId?: Prisma.StringFilter<"Project"> | string;
    name?: Prisma.StringFilter<"Project"> | string;
    description?: Prisma.StringNullableFilter<"Project"> | string | null;
    status?: Prisma.EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    office?: Prisma.XOR<Prisma.OfficeScalarRelationFilter, Prisma.OfficeWhereInput>;
    createdBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    projectManager?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    tasks?: Prisma.TaskListRelationFilter;
    auditLogs?: Prisma.ProjectAuditLogListRelationFilter;
};
export type ProjectOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
    projectManagerUserId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    office?: Prisma.OfficeOrderByWithRelationInput;
    createdBy?: Prisma.UserOrderByWithRelationInput;
    projectManager?: Prisma.UserOrderByWithRelationInput;
    tasks?: Prisma.TaskOrderByRelationAggregateInput;
    auditLogs?: Prisma.ProjectAuditLogOrderByRelationAggregateInput;
};
export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    OR?: Prisma.ProjectWhereInput[];
    NOT?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    officeId?: Prisma.StringFilter<"Project"> | string;
    createdByUserId?: Prisma.StringFilter<"Project"> | string;
    projectManagerUserId?: Prisma.StringFilter<"Project"> | string;
    name?: Prisma.StringFilter<"Project"> | string;
    description?: Prisma.StringNullableFilter<"Project"> | string | null;
    status?: Prisma.EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    office?: Prisma.XOR<Prisma.OfficeScalarRelationFilter, Prisma.OfficeWhereInput>;
    createdBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    projectManager?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    tasks?: Prisma.TaskListRelationFilter;
    auditLogs?: Prisma.ProjectAuditLogListRelationFilter;
}, "id">;
export type ProjectOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
    projectManagerUserId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ProjectCountOrderByAggregateInput;
    _max?: Prisma.ProjectMaxOrderByAggregateInput;
    _min?: Prisma.ProjectMinOrderByAggregateInput;
};
export type ProjectScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProjectScalarWhereWithAggregatesInput | Prisma.ProjectScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProjectScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProjectScalarWhereWithAggregatesInput | Prisma.ProjectScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    officeId?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    createdByUserId?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    projectManagerUserId?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Project"> | string | null;
    status?: Prisma.EnumProjectStatusWithAggregatesFilter<"Project"> | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Project"> | Date | string;
};
export type ProjectCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    status: $Enums.ProjectStatus;
    createdAt?: Date | string;
    office: Prisma.OfficeCreateNestedOneWithoutProjectsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutCreatedProjectsInput;
    projectManager: Prisma.UserCreateNestedOneWithoutManagedProjectsInput;
    tasks?: Prisma.TaskCreateNestedManyWithoutProjectInput;
    auditLogs?: Prisma.ProjectAuditLogCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateInput = {
    id?: string;
    officeId: string;
    createdByUserId: string;
    projectManagerUserId: string;
    name: string;
    description?: string | null;
    status: $Enums.ProjectStatus;
    createdAt?: Date | string;
    tasks?: Prisma.TaskUncheckedCreateNestedManyWithoutProjectInput;
    auditLogs?: Prisma.ProjectAuditLogUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    office?: Prisma.OfficeUpdateOneRequiredWithoutProjectsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCreatedProjectsNestedInput;
    projectManager?: Prisma.UserUpdateOneRequiredWithoutManagedProjectsNestedInput;
    tasks?: Prisma.TaskUpdateManyWithoutProjectNestedInput;
    auditLogs?: Prisma.ProjectAuditLogUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    projectManagerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tasks?: Prisma.TaskUncheckedUpdateManyWithoutProjectNestedInput;
    auditLogs?: Prisma.ProjectAuditLogUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectCreateManyInput = {
    id?: string;
    officeId: string;
    createdByUserId: string;
    projectManagerUserId: string;
    name: string;
    description?: string | null;
    status: $Enums.ProjectStatus;
    createdAt?: Date | string;
};
export type ProjectUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    projectManagerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectListRelationFilter = {
    every?: Prisma.ProjectWhereInput;
    some?: Prisma.ProjectWhereInput;
    none?: Prisma.ProjectWhereInput;
};
export type ProjectOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProjectCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
    projectManagerUserId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProjectMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
    projectManagerUserId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProjectMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
    projectManagerUserId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProjectScalarRelationFilter = {
    is?: Prisma.ProjectWhereInput;
    isNot?: Prisma.ProjectWhereInput;
};
export type ProjectCreateNestedManyWithoutOfficeInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutOfficeInput, Prisma.ProjectUncheckedCreateWithoutOfficeInput> | Prisma.ProjectCreateWithoutOfficeInput[] | Prisma.ProjectUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutOfficeInput | Prisma.ProjectCreateOrConnectWithoutOfficeInput[];
    createMany?: Prisma.ProjectCreateManyOfficeInputEnvelope;
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
};
export type ProjectUncheckedCreateNestedManyWithoutOfficeInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutOfficeInput, Prisma.ProjectUncheckedCreateWithoutOfficeInput> | Prisma.ProjectCreateWithoutOfficeInput[] | Prisma.ProjectUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutOfficeInput | Prisma.ProjectCreateOrConnectWithoutOfficeInput[];
    createMany?: Prisma.ProjectCreateManyOfficeInputEnvelope;
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
};
export type ProjectUpdateManyWithoutOfficeNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutOfficeInput, Prisma.ProjectUncheckedCreateWithoutOfficeInput> | Prisma.ProjectCreateWithoutOfficeInput[] | Prisma.ProjectUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutOfficeInput | Prisma.ProjectCreateOrConnectWithoutOfficeInput[];
    upsert?: Prisma.ProjectUpsertWithWhereUniqueWithoutOfficeInput | Prisma.ProjectUpsertWithWhereUniqueWithoutOfficeInput[];
    createMany?: Prisma.ProjectCreateManyOfficeInputEnvelope;
    set?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    disconnect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    delete?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    update?: Prisma.ProjectUpdateWithWhereUniqueWithoutOfficeInput | Prisma.ProjectUpdateWithWhereUniqueWithoutOfficeInput[];
    updateMany?: Prisma.ProjectUpdateManyWithWhereWithoutOfficeInput | Prisma.ProjectUpdateManyWithWhereWithoutOfficeInput[];
    deleteMany?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
};
export type ProjectUncheckedUpdateManyWithoutOfficeNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutOfficeInput, Prisma.ProjectUncheckedCreateWithoutOfficeInput> | Prisma.ProjectCreateWithoutOfficeInput[] | Prisma.ProjectUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutOfficeInput | Prisma.ProjectCreateOrConnectWithoutOfficeInput[];
    upsert?: Prisma.ProjectUpsertWithWhereUniqueWithoutOfficeInput | Prisma.ProjectUpsertWithWhereUniqueWithoutOfficeInput[];
    createMany?: Prisma.ProjectCreateManyOfficeInputEnvelope;
    set?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    disconnect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    delete?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    update?: Prisma.ProjectUpdateWithWhereUniqueWithoutOfficeInput | Prisma.ProjectUpdateWithWhereUniqueWithoutOfficeInput[];
    updateMany?: Prisma.ProjectUpdateManyWithWhereWithoutOfficeInput | Prisma.ProjectUpdateManyWithWhereWithoutOfficeInput[];
    deleteMany?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
};
export type ProjectCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutCreatedByInput, Prisma.ProjectUncheckedCreateWithoutCreatedByInput> | Prisma.ProjectCreateWithoutCreatedByInput[] | Prisma.ProjectUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutCreatedByInput | Prisma.ProjectCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.ProjectCreateManyCreatedByInputEnvelope;
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
};
export type ProjectCreateNestedManyWithoutProjectManagerInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutProjectManagerInput, Prisma.ProjectUncheckedCreateWithoutProjectManagerInput> | Prisma.ProjectCreateWithoutProjectManagerInput[] | Prisma.ProjectUncheckedCreateWithoutProjectManagerInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutProjectManagerInput | Prisma.ProjectCreateOrConnectWithoutProjectManagerInput[];
    createMany?: Prisma.ProjectCreateManyProjectManagerInputEnvelope;
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
};
export type ProjectUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutCreatedByInput, Prisma.ProjectUncheckedCreateWithoutCreatedByInput> | Prisma.ProjectCreateWithoutCreatedByInput[] | Prisma.ProjectUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutCreatedByInput | Prisma.ProjectCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.ProjectCreateManyCreatedByInputEnvelope;
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
};
export type ProjectUncheckedCreateNestedManyWithoutProjectManagerInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutProjectManagerInput, Prisma.ProjectUncheckedCreateWithoutProjectManagerInput> | Prisma.ProjectCreateWithoutProjectManagerInput[] | Prisma.ProjectUncheckedCreateWithoutProjectManagerInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutProjectManagerInput | Prisma.ProjectCreateOrConnectWithoutProjectManagerInput[];
    createMany?: Prisma.ProjectCreateManyProjectManagerInputEnvelope;
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
};
export type ProjectUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutCreatedByInput, Prisma.ProjectUncheckedCreateWithoutCreatedByInput> | Prisma.ProjectCreateWithoutCreatedByInput[] | Prisma.ProjectUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutCreatedByInput | Prisma.ProjectCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.ProjectUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.ProjectUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.ProjectCreateManyCreatedByInputEnvelope;
    set?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    disconnect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    delete?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    update?: Prisma.ProjectUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.ProjectUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.ProjectUpdateManyWithWhereWithoutCreatedByInput | Prisma.ProjectUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
};
export type ProjectUpdateManyWithoutProjectManagerNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutProjectManagerInput, Prisma.ProjectUncheckedCreateWithoutProjectManagerInput> | Prisma.ProjectCreateWithoutProjectManagerInput[] | Prisma.ProjectUncheckedCreateWithoutProjectManagerInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutProjectManagerInput | Prisma.ProjectCreateOrConnectWithoutProjectManagerInput[];
    upsert?: Prisma.ProjectUpsertWithWhereUniqueWithoutProjectManagerInput | Prisma.ProjectUpsertWithWhereUniqueWithoutProjectManagerInput[];
    createMany?: Prisma.ProjectCreateManyProjectManagerInputEnvelope;
    set?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    disconnect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    delete?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    update?: Prisma.ProjectUpdateWithWhereUniqueWithoutProjectManagerInput | Prisma.ProjectUpdateWithWhereUniqueWithoutProjectManagerInput[];
    updateMany?: Prisma.ProjectUpdateManyWithWhereWithoutProjectManagerInput | Prisma.ProjectUpdateManyWithWhereWithoutProjectManagerInput[];
    deleteMany?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
};
export type ProjectUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutCreatedByInput, Prisma.ProjectUncheckedCreateWithoutCreatedByInput> | Prisma.ProjectCreateWithoutCreatedByInput[] | Prisma.ProjectUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutCreatedByInput | Prisma.ProjectCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.ProjectUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.ProjectUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.ProjectCreateManyCreatedByInputEnvelope;
    set?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    disconnect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    delete?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    update?: Prisma.ProjectUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.ProjectUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.ProjectUpdateManyWithWhereWithoutCreatedByInput | Prisma.ProjectUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
};
export type ProjectUncheckedUpdateManyWithoutProjectManagerNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutProjectManagerInput, Prisma.ProjectUncheckedCreateWithoutProjectManagerInput> | Prisma.ProjectCreateWithoutProjectManagerInput[] | Prisma.ProjectUncheckedCreateWithoutProjectManagerInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutProjectManagerInput | Prisma.ProjectCreateOrConnectWithoutProjectManagerInput[];
    upsert?: Prisma.ProjectUpsertWithWhereUniqueWithoutProjectManagerInput | Prisma.ProjectUpsertWithWhereUniqueWithoutProjectManagerInput[];
    createMany?: Prisma.ProjectCreateManyProjectManagerInputEnvelope;
    set?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    disconnect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    delete?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    update?: Prisma.ProjectUpdateWithWhereUniqueWithoutProjectManagerInput | Prisma.ProjectUpdateWithWhereUniqueWithoutProjectManagerInput[];
    updateMany?: Prisma.ProjectUpdateManyWithWhereWithoutProjectManagerInput | Prisma.ProjectUpdateManyWithWhereWithoutProjectManagerInput[];
    deleteMany?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
};
export type EnumProjectStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProjectStatus;
};
export type ProjectCreateNestedOneWithoutTasksInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutTasksInput, Prisma.ProjectUncheckedCreateWithoutTasksInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutTasksInput;
    connect?: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateOneRequiredWithoutTasksNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutTasksInput, Prisma.ProjectUncheckedCreateWithoutTasksInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutTasksInput;
    upsert?: Prisma.ProjectUpsertWithoutTasksInput;
    connect?: Prisma.ProjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProjectUpdateToOneWithWhereWithoutTasksInput, Prisma.ProjectUpdateWithoutTasksInput>, Prisma.ProjectUncheckedUpdateWithoutTasksInput>;
};
export type ProjectCreateNestedOneWithoutAuditLogsInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutAuditLogsInput, Prisma.ProjectUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutAuditLogsInput;
    connect?: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutAuditLogsInput, Prisma.ProjectUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutAuditLogsInput;
    upsert?: Prisma.ProjectUpsertWithoutAuditLogsInput;
    connect?: Prisma.ProjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProjectUpdateToOneWithWhereWithoutAuditLogsInput, Prisma.ProjectUpdateWithoutAuditLogsInput>, Prisma.ProjectUncheckedUpdateWithoutAuditLogsInput>;
};
export type ProjectCreateWithoutOfficeInput = {
    id?: string;
    name: string;
    description?: string | null;
    status: $Enums.ProjectStatus;
    createdAt?: Date | string;
    createdBy: Prisma.UserCreateNestedOneWithoutCreatedProjectsInput;
    projectManager: Prisma.UserCreateNestedOneWithoutManagedProjectsInput;
    tasks?: Prisma.TaskCreateNestedManyWithoutProjectInput;
    auditLogs?: Prisma.ProjectAuditLogCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutOfficeInput = {
    id?: string;
    createdByUserId: string;
    projectManagerUserId: string;
    name: string;
    description?: string | null;
    status: $Enums.ProjectStatus;
    createdAt?: Date | string;
    tasks?: Prisma.TaskUncheckedCreateNestedManyWithoutProjectInput;
    auditLogs?: Prisma.ProjectAuditLogUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutOfficeInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutOfficeInput, Prisma.ProjectUncheckedCreateWithoutOfficeInput>;
};
export type ProjectCreateManyOfficeInputEnvelope = {
    data: Prisma.ProjectCreateManyOfficeInput | Prisma.ProjectCreateManyOfficeInput[];
    skipDuplicates?: boolean;
};
export type ProjectUpsertWithWhereUniqueWithoutOfficeInput = {
    where: Prisma.ProjectWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutOfficeInput, Prisma.ProjectUncheckedUpdateWithoutOfficeInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutOfficeInput, Prisma.ProjectUncheckedCreateWithoutOfficeInput>;
};
export type ProjectUpdateWithWhereUniqueWithoutOfficeInput = {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutOfficeInput, Prisma.ProjectUncheckedUpdateWithoutOfficeInput>;
};
export type ProjectUpdateManyWithWhereWithoutOfficeInput = {
    where: Prisma.ProjectScalarWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyWithoutOfficeInput>;
};
export type ProjectScalarWhereInput = {
    AND?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
    OR?: Prisma.ProjectScalarWhereInput[];
    NOT?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
    id?: Prisma.StringFilter<"Project"> | string;
    officeId?: Prisma.StringFilter<"Project"> | string;
    createdByUserId?: Prisma.StringFilter<"Project"> | string;
    projectManagerUserId?: Prisma.StringFilter<"Project"> | string;
    name?: Prisma.StringFilter<"Project"> | string;
    description?: Prisma.StringNullableFilter<"Project"> | string | null;
    status?: Prisma.EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
};
export type ProjectCreateWithoutCreatedByInput = {
    id?: string;
    name: string;
    description?: string | null;
    status: $Enums.ProjectStatus;
    createdAt?: Date | string;
    office: Prisma.OfficeCreateNestedOneWithoutProjectsInput;
    projectManager: Prisma.UserCreateNestedOneWithoutManagedProjectsInput;
    tasks?: Prisma.TaskCreateNestedManyWithoutProjectInput;
    auditLogs?: Prisma.ProjectAuditLogCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutCreatedByInput = {
    id?: string;
    officeId: string;
    projectManagerUserId: string;
    name: string;
    description?: string | null;
    status: $Enums.ProjectStatus;
    createdAt?: Date | string;
    tasks?: Prisma.TaskUncheckedCreateNestedManyWithoutProjectInput;
    auditLogs?: Prisma.ProjectAuditLogUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutCreatedByInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutCreatedByInput, Prisma.ProjectUncheckedCreateWithoutCreatedByInput>;
};
export type ProjectCreateManyCreatedByInputEnvelope = {
    data: Prisma.ProjectCreateManyCreatedByInput | Prisma.ProjectCreateManyCreatedByInput[];
    skipDuplicates?: boolean;
};
export type ProjectCreateWithoutProjectManagerInput = {
    id?: string;
    name: string;
    description?: string | null;
    status: $Enums.ProjectStatus;
    createdAt?: Date | string;
    office: Prisma.OfficeCreateNestedOneWithoutProjectsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutCreatedProjectsInput;
    tasks?: Prisma.TaskCreateNestedManyWithoutProjectInput;
    auditLogs?: Prisma.ProjectAuditLogCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutProjectManagerInput = {
    id?: string;
    officeId: string;
    createdByUserId: string;
    name: string;
    description?: string | null;
    status: $Enums.ProjectStatus;
    createdAt?: Date | string;
    tasks?: Prisma.TaskUncheckedCreateNestedManyWithoutProjectInput;
    auditLogs?: Prisma.ProjectAuditLogUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutProjectManagerInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutProjectManagerInput, Prisma.ProjectUncheckedCreateWithoutProjectManagerInput>;
};
export type ProjectCreateManyProjectManagerInputEnvelope = {
    data: Prisma.ProjectCreateManyProjectManagerInput | Prisma.ProjectCreateManyProjectManagerInput[];
    skipDuplicates?: boolean;
};
export type ProjectUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.ProjectWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutCreatedByInput, Prisma.ProjectUncheckedUpdateWithoutCreatedByInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutCreatedByInput, Prisma.ProjectUncheckedCreateWithoutCreatedByInput>;
};
export type ProjectUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutCreatedByInput, Prisma.ProjectUncheckedUpdateWithoutCreatedByInput>;
};
export type ProjectUpdateManyWithWhereWithoutCreatedByInput = {
    where: Prisma.ProjectScalarWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyWithoutCreatedByInput>;
};
export type ProjectUpsertWithWhereUniqueWithoutProjectManagerInput = {
    where: Prisma.ProjectWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutProjectManagerInput, Prisma.ProjectUncheckedUpdateWithoutProjectManagerInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutProjectManagerInput, Prisma.ProjectUncheckedCreateWithoutProjectManagerInput>;
};
export type ProjectUpdateWithWhereUniqueWithoutProjectManagerInput = {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutProjectManagerInput, Prisma.ProjectUncheckedUpdateWithoutProjectManagerInput>;
};
export type ProjectUpdateManyWithWhereWithoutProjectManagerInput = {
    where: Prisma.ProjectScalarWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyWithoutProjectManagerInput>;
};
export type ProjectCreateWithoutTasksInput = {
    id?: string;
    name: string;
    description?: string | null;
    status: $Enums.ProjectStatus;
    createdAt?: Date | string;
    office: Prisma.OfficeCreateNestedOneWithoutProjectsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutCreatedProjectsInput;
    projectManager: Prisma.UserCreateNestedOneWithoutManagedProjectsInput;
    auditLogs?: Prisma.ProjectAuditLogCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutTasksInput = {
    id?: string;
    officeId: string;
    createdByUserId: string;
    projectManagerUserId: string;
    name: string;
    description?: string | null;
    status: $Enums.ProjectStatus;
    createdAt?: Date | string;
    auditLogs?: Prisma.ProjectAuditLogUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutTasksInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutTasksInput, Prisma.ProjectUncheckedCreateWithoutTasksInput>;
};
export type ProjectUpsertWithoutTasksInput = {
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutTasksInput, Prisma.ProjectUncheckedUpdateWithoutTasksInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutTasksInput, Prisma.ProjectUncheckedCreateWithoutTasksInput>;
    where?: Prisma.ProjectWhereInput;
};
export type ProjectUpdateToOneWithWhereWithoutTasksInput = {
    where?: Prisma.ProjectWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutTasksInput, Prisma.ProjectUncheckedUpdateWithoutTasksInput>;
};
export type ProjectUpdateWithoutTasksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    office?: Prisma.OfficeUpdateOneRequiredWithoutProjectsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCreatedProjectsNestedInput;
    projectManager?: Prisma.UserUpdateOneRequiredWithoutManagedProjectsNestedInput;
    auditLogs?: Prisma.ProjectAuditLogUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutTasksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    projectManagerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    auditLogs?: Prisma.ProjectAuditLogUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectCreateWithoutAuditLogsInput = {
    id?: string;
    name: string;
    description?: string | null;
    status: $Enums.ProjectStatus;
    createdAt?: Date | string;
    office: Prisma.OfficeCreateNestedOneWithoutProjectsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutCreatedProjectsInput;
    projectManager: Prisma.UserCreateNestedOneWithoutManagedProjectsInput;
    tasks?: Prisma.TaskCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutAuditLogsInput = {
    id?: string;
    officeId: string;
    createdByUserId: string;
    projectManagerUserId: string;
    name: string;
    description?: string | null;
    status: $Enums.ProjectStatus;
    createdAt?: Date | string;
    tasks?: Prisma.TaskUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutAuditLogsInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutAuditLogsInput, Prisma.ProjectUncheckedCreateWithoutAuditLogsInput>;
};
export type ProjectUpsertWithoutAuditLogsInput = {
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutAuditLogsInput, Prisma.ProjectUncheckedUpdateWithoutAuditLogsInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutAuditLogsInput, Prisma.ProjectUncheckedCreateWithoutAuditLogsInput>;
    where?: Prisma.ProjectWhereInput;
};
export type ProjectUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: Prisma.ProjectWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutAuditLogsInput, Prisma.ProjectUncheckedUpdateWithoutAuditLogsInput>;
};
export type ProjectUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    office?: Prisma.OfficeUpdateOneRequiredWithoutProjectsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCreatedProjectsNestedInput;
    projectManager?: Prisma.UserUpdateOneRequiredWithoutManagedProjectsNestedInput;
    tasks?: Prisma.TaskUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    projectManagerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tasks?: Prisma.TaskUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectCreateManyOfficeInput = {
    id?: string;
    createdByUserId: string;
    projectManagerUserId: string;
    name: string;
    description?: string | null;
    status: $Enums.ProjectStatus;
    createdAt?: Date | string;
};
export type ProjectUpdateWithoutOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCreatedProjectsNestedInput;
    projectManager?: Prisma.UserUpdateOneRequiredWithoutManagedProjectsNestedInput;
    tasks?: Prisma.TaskUpdateManyWithoutProjectNestedInput;
    auditLogs?: Prisma.ProjectAuditLogUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    projectManagerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tasks?: Prisma.TaskUncheckedUpdateManyWithoutProjectNestedInput;
    auditLogs?: Prisma.ProjectAuditLogUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateManyWithoutOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    projectManagerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectCreateManyCreatedByInput = {
    id?: string;
    officeId: string;
    projectManagerUserId: string;
    name: string;
    description?: string | null;
    status: $Enums.ProjectStatus;
    createdAt?: Date | string;
};
export type ProjectCreateManyProjectManagerInput = {
    id?: string;
    officeId: string;
    createdByUserId: string;
    name: string;
    description?: string | null;
    status: $Enums.ProjectStatus;
    createdAt?: Date | string;
};
export type ProjectUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    office?: Prisma.OfficeUpdateOneRequiredWithoutProjectsNestedInput;
    projectManager?: Prisma.UserUpdateOneRequiredWithoutManagedProjectsNestedInput;
    tasks?: Prisma.TaskUpdateManyWithoutProjectNestedInput;
    auditLogs?: Prisma.ProjectAuditLogUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    projectManagerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tasks?: Prisma.TaskUncheckedUpdateManyWithoutProjectNestedInput;
    auditLogs?: Prisma.ProjectAuditLogUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateManyWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    projectManagerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectUpdateWithoutProjectManagerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    office?: Prisma.OfficeUpdateOneRequiredWithoutProjectsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCreatedProjectsNestedInput;
    tasks?: Prisma.TaskUpdateManyWithoutProjectNestedInput;
    auditLogs?: Prisma.ProjectAuditLogUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutProjectManagerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tasks?: Prisma.TaskUncheckedUpdateManyWithoutProjectNestedInput;
    auditLogs?: Prisma.ProjectAuditLogUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateManyWithoutProjectManagerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdByUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectCountOutputType = {
    tasks: number;
    auditLogs: number;
};
export type ProjectCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tasks?: boolean | ProjectCountOutputTypeCountTasksArgs;
    auditLogs?: boolean | ProjectCountOutputTypeCountAuditLogsArgs;
};
export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectCountOutputTypeSelect<ExtArgs> | null;
};
export type ProjectCountOutputTypeCountTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaskWhereInput;
};
export type ProjectCountOutputTypeCountAuditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectAuditLogWhereInput;
};
export type ProjectSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    officeId?: boolean;
    createdByUserId?: boolean;
    projectManagerUserId?: boolean;
    name?: boolean;
    description?: boolean;
    status?: boolean;
    createdAt?: boolean;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    projectManager?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    tasks?: boolean | Prisma.Project$tasksArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.Project$auditLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProjectCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["project"]>;
export type ProjectSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    officeId?: boolean;
    createdByUserId?: boolean;
    projectManagerUserId?: boolean;
    name?: boolean;
    description?: boolean;
    status?: boolean;
    createdAt?: boolean;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    projectManager?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["project"]>;
export type ProjectSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    officeId?: boolean;
    createdByUserId?: boolean;
    projectManagerUserId?: boolean;
    name?: boolean;
    description?: boolean;
    status?: boolean;
    createdAt?: boolean;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    projectManager?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["project"]>;
export type ProjectSelectScalar = {
    id?: boolean;
    officeId?: boolean;
    createdByUserId?: boolean;
    projectManagerUserId?: boolean;
    name?: boolean;
    description?: boolean;
    status?: boolean;
    createdAt?: boolean;
};
export type ProjectOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "officeId" | "createdByUserId" | "projectManagerUserId" | "name" | "description" | "status" | "createdAt", ExtArgs["result"]["project"]>;
export type ProjectInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    projectManager?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    tasks?: boolean | Prisma.Project$tasksArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.Project$auditLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProjectCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProjectIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    projectManager?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    projectManager?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ProjectPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Project";
    objects: {
        office: Prisma.$OfficePayload<ExtArgs>;
        createdBy: Prisma.$UserPayload<ExtArgs>;
        projectManager: Prisma.$UserPayload<ExtArgs>;
        tasks: Prisma.$TaskPayload<ExtArgs>[];
        auditLogs: Prisma.$ProjectAuditLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        officeId: string;
        createdByUserId: string;
        projectManagerUserId: string;
        name: string;
        description: string | null;
        status: $Enums.ProjectStatus;
        createdAt: Date;
    }, ExtArgs["result"]["project"]>;
    composites: {};
};
export type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProjectPayload, S>;
export type ProjectCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProjectCountAggregateInputType | true;
};
export interface ProjectDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Project'];
        meta: {
            name: 'Project';
        };
    };
    findUnique<T extends ProjectFindUniqueArgs>(args: Prisma.SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProjectFindFirstArgs>(args?: Prisma.SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProjectFindManyArgs>(args?: Prisma.SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProjectCreateArgs>(args: Prisma.SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProjectCreateManyArgs>(args?: Prisma.SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProjectDeleteArgs>(args: Prisma.SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProjectUpdateArgs>(args: Prisma.SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProjectDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProjectUpdateManyArgs>(args: Prisma.SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProjectUpsertArgs>(args: Prisma.SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProjectCountArgs>(args?: Prisma.Subset<T, ProjectCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProjectCountAggregateOutputType> : number>;
    aggregate<T extends ProjectAggregateArgs>(args: Prisma.Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>;
    groupBy<T extends ProjectGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProjectGroupByArgs['orderBy'];
    } : {
        orderBy?: ProjectGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProjectFieldRefs;
}
export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    office<T extends Prisma.OfficeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OfficeDefaultArgs<ExtArgs>>): Prisma.Prisma__OfficeClient<runtime.Types.Result.GetResult<Prisma.$OfficePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    createdBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    projectManager<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tasks<T extends Prisma.Project$tasksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Project$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    auditLogs<T extends Prisma.Project$auditLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Project$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProjectFieldRefs {
    readonly id: Prisma.FieldRef<"Project", 'String'>;
    readonly officeId: Prisma.FieldRef<"Project", 'String'>;
    readonly createdByUserId: Prisma.FieldRef<"Project", 'String'>;
    readonly projectManagerUserId: Prisma.FieldRef<"Project", 'String'>;
    readonly name: Prisma.FieldRef<"Project", 'String'>;
    readonly description: Prisma.FieldRef<"Project", 'String'>;
    readonly status: Prisma.FieldRef<"Project", 'ProjectStatus'>;
    readonly createdAt: Prisma.FieldRef<"Project", 'DateTime'>;
}
export type ProjectFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProjectFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProjectFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProjectCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectCreateInput, Prisma.ProjectUncheckedCreateInput>;
};
export type ProjectCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProjectCreateManyInput | Prisma.ProjectCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProjectCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    data: Prisma.ProjectCreateManyInput | Prisma.ProjectCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProjectIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProjectUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectUpdateInput, Prisma.ProjectUncheckedUpdateInput>;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyInput>;
    where?: Prisma.ProjectWhereInput;
    limit?: number;
};
export type ProjectUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyInput>;
    where?: Prisma.ProjectWhereInput;
    limit?: number;
    include?: Prisma.ProjectIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProjectUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateInput, Prisma.ProjectUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProjectUpdateInput, Prisma.ProjectUncheckedUpdateInput>;
};
export type ProjectDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
    limit?: number;
};
export type Project$tasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Project$auditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProjectDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
};
export {};
