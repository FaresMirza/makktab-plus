import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type LoginAttemptModel = runtime.Types.Result.DefaultSelection<Prisma.$LoginAttemptPayload>;
export type AggregateLoginAttempt = {
    _count: LoginAttemptCountAggregateOutputType | null;
    _min: LoginAttemptMinAggregateOutputType | null;
    _max: LoginAttemptMaxAggregateOutputType | null;
};
export type LoginAttemptMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    officeId: string | null;
    success: boolean | null;
    method: $Enums.LoginMethod | null;
    ip: string | null;
    userAgent: string | null;
    deviceFingerprint: string | null;
    geo: string | null;
    failReason: string | null;
    createdAt: Date | null;
};
export type LoginAttemptMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    officeId: string | null;
    success: boolean | null;
    method: $Enums.LoginMethod | null;
    ip: string | null;
    userAgent: string | null;
    deviceFingerprint: string | null;
    geo: string | null;
    failReason: string | null;
    createdAt: Date | null;
};
export type LoginAttemptCountAggregateOutputType = {
    id: number;
    userId: number;
    officeId: number;
    success: number;
    method: number;
    ip: number;
    userAgent: number;
    deviceFingerprint: number;
    geo: number;
    failReason: number;
    createdAt: number;
    _all: number;
};
export type LoginAttemptMinAggregateInputType = {
    id?: true;
    userId?: true;
    officeId?: true;
    success?: true;
    method?: true;
    ip?: true;
    userAgent?: true;
    deviceFingerprint?: true;
    geo?: true;
    failReason?: true;
    createdAt?: true;
};
export type LoginAttemptMaxAggregateInputType = {
    id?: true;
    userId?: true;
    officeId?: true;
    success?: true;
    method?: true;
    ip?: true;
    userAgent?: true;
    deviceFingerprint?: true;
    geo?: true;
    failReason?: true;
    createdAt?: true;
};
export type LoginAttemptCountAggregateInputType = {
    id?: true;
    userId?: true;
    officeId?: true;
    success?: true;
    method?: true;
    ip?: true;
    userAgent?: true;
    deviceFingerprint?: true;
    geo?: true;
    failReason?: true;
    createdAt?: true;
    _all?: true;
};
export type LoginAttemptAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoginAttemptWhereInput;
    orderBy?: Prisma.LoginAttemptOrderByWithRelationInput | Prisma.LoginAttemptOrderByWithRelationInput[];
    cursor?: Prisma.LoginAttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LoginAttemptCountAggregateInputType;
    _min?: LoginAttemptMinAggregateInputType;
    _max?: LoginAttemptMaxAggregateInputType;
};
export type GetLoginAttemptAggregateType<T extends LoginAttemptAggregateArgs> = {
    [P in keyof T & keyof AggregateLoginAttempt]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLoginAttempt[P]> : Prisma.GetScalarType<T[P], AggregateLoginAttempt[P]>;
};
export type LoginAttemptGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoginAttemptWhereInput;
    orderBy?: Prisma.LoginAttemptOrderByWithAggregationInput | Prisma.LoginAttemptOrderByWithAggregationInput[];
    by: Prisma.LoginAttemptScalarFieldEnum[] | Prisma.LoginAttemptScalarFieldEnum;
    having?: Prisma.LoginAttemptScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LoginAttemptCountAggregateInputType | true;
    _min?: LoginAttemptMinAggregateInputType;
    _max?: LoginAttemptMaxAggregateInputType;
};
export type LoginAttemptGroupByOutputType = {
    id: string;
    userId: string;
    officeId: string;
    success: boolean;
    method: $Enums.LoginMethod;
    ip: string | null;
    userAgent: string | null;
    deviceFingerprint: string | null;
    geo: string | null;
    failReason: string | null;
    createdAt: Date;
    _count: LoginAttemptCountAggregateOutputType | null;
    _min: LoginAttemptMinAggregateOutputType | null;
    _max: LoginAttemptMaxAggregateOutputType | null;
};
type GetLoginAttemptGroupByPayload<T extends LoginAttemptGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LoginAttemptGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LoginAttemptGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LoginAttemptGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LoginAttemptGroupByOutputType[P]>;
}>>;
export type LoginAttemptWhereInput = {
    AND?: Prisma.LoginAttemptWhereInput | Prisma.LoginAttemptWhereInput[];
    OR?: Prisma.LoginAttemptWhereInput[];
    NOT?: Prisma.LoginAttemptWhereInput | Prisma.LoginAttemptWhereInput[];
    id?: Prisma.StringFilter<"LoginAttempt"> | string;
    userId?: Prisma.StringFilter<"LoginAttempt"> | string;
    officeId?: Prisma.StringFilter<"LoginAttempt"> | string;
    success?: Prisma.BoolFilter<"LoginAttempt"> | boolean;
    method?: Prisma.EnumLoginMethodFilter<"LoginAttempt"> | $Enums.LoginMethod;
    ip?: Prisma.StringNullableFilter<"LoginAttempt"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"LoginAttempt"> | string | null;
    deviceFingerprint?: Prisma.StringNullableFilter<"LoginAttempt"> | string | null;
    geo?: Prisma.StringNullableFilter<"LoginAttempt"> | string | null;
    failReason?: Prisma.StringNullableFilter<"LoginAttempt"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"LoginAttempt"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    office?: Prisma.XOR<Prisma.OfficeScalarRelationFilter, Prisma.OfficeWhereInput>;
};
export type LoginAttemptOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    ip?: Prisma.SortOrderInput | Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    deviceFingerprint?: Prisma.SortOrderInput | Prisma.SortOrder;
    geo?: Prisma.SortOrderInput | Prisma.SortOrder;
    failReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    office?: Prisma.OfficeOrderByWithRelationInput;
};
export type LoginAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.LoginAttemptWhereInput | Prisma.LoginAttemptWhereInput[];
    OR?: Prisma.LoginAttemptWhereInput[];
    NOT?: Prisma.LoginAttemptWhereInput | Prisma.LoginAttemptWhereInput[];
    userId?: Prisma.StringFilter<"LoginAttempt"> | string;
    officeId?: Prisma.StringFilter<"LoginAttempt"> | string;
    success?: Prisma.BoolFilter<"LoginAttempt"> | boolean;
    method?: Prisma.EnumLoginMethodFilter<"LoginAttempt"> | $Enums.LoginMethod;
    ip?: Prisma.StringNullableFilter<"LoginAttempt"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"LoginAttempt"> | string | null;
    deviceFingerprint?: Prisma.StringNullableFilter<"LoginAttempt"> | string | null;
    geo?: Prisma.StringNullableFilter<"LoginAttempt"> | string | null;
    failReason?: Prisma.StringNullableFilter<"LoginAttempt"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"LoginAttempt"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    office?: Prisma.XOR<Prisma.OfficeScalarRelationFilter, Prisma.OfficeWhereInput>;
}, "id">;
export type LoginAttemptOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    ip?: Prisma.SortOrderInput | Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    deviceFingerprint?: Prisma.SortOrderInput | Prisma.SortOrder;
    geo?: Prisma.SortOrderInput | Prisma.SortOrder;
    failReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.LoginAttemptCountOrderByAggregateInput;
    _max?: Prisma.LoginAttemptMaxOrderByAggregateInput;
    _min?: Prisma.LoginAttemptMinOrderByAggregateInput;
};
export type LoginAttemptScalarWhereWithAggregatesInput = {
    AND?: Prisma.LoginAttemptScalarWhereWithAggregatesInput | Prisma.LoginAttemptScalarWhereWithAggregatesInput[];
    OR?: Prisma.LoginAttemptScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LoginAttemptScalarWhereWithAggregatesInput | Prisma.LoginAttemptScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"LoginAttempt"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"LoginAttempt"> | string;
    officeId?: Prisma.StringWithAggregatesFilter<"LoginAttempt"> | string;
    success?: Prisma.BoolWithAggregatesFilter<"LoginAttempt"> | boolean;
    method?: Prisma.EnumLoginMethodWithAggregatesFilter<"LoginAttempt"> | $Enums.LoginMethod;
    ip?: Prisma.StringNullableWithAggregatesFilter<"LoginAttempt"> | string | null;
    userAgent?: Prisma.StringNullableWithAggregatesFilter<"LoginAttempt"> | string | null;
    deviceFingerprint?: Prisma.StringNullableWithAggregatesFilter<"LoginAttempt"> | string | null;
    geo?: Prisma.StringNullableWithAggregatesFilter<"LoginAttempt"> | string | null;
    failReason?: Prisma.StringNullableWithAggregatesFilter<"LoginAttempt"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"LoginAttempt"> | Date | string;
};
export type LoginAttemptCreateInput = {
    id?: string;
    success: boolean;
    method: $Enums.LoginMethod;
    ip?: string | null;
    userAgent?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    failReason?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutLoginAttemptsInput;
    office: Prisma.OfficeCreateNestedOneWithoutLoginAttemptsInput;
};
export type LoginAttemptUncheckedCreateInput = {
    id?: string;
    userId: string;
    officeId: string;
    success: boolean;
    method: $Enums.LoginMethod;
    ip?: string | null;
    userAgent?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    failReason?: string | null;
    createdAt?: Date | string;
};
export type LoginAttemptUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    method?: Prisma.EnumLoginMethodFieldUpdateOperationsInput | $Enums.LoginMethod;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutLoginAttemptsNestedInput;
    office?: Prisma.OfficeUpdateOneRequiredWithoutLoginAttemptsNestedInput;
};
export type LoginAttemptUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    method?: Prisma.EnumLoginMethodFieldUpdateOperationsInput | $Enums.LoginMethod;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoginAttemptCreateManyInput = {
    id?: string;
    userId: string;
    officeId: string;
    success: boolean;
    method: $Enums.LoginMethod;
    ip?: string | null;
    userAgent?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    failReason?: string | null;
    createdAt?: Date | string;
};
export type LoginAttemptUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    method?: Prisma.EnumLoginMethodFieldUpdateOperationsInput | $Enums.LoginMethod;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoginAttemptUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    method?: Prisma.EnumLoginMethodFieldUpdateOperationsInput | $Enums.LoginMethod;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoginAttemptListRelationFilter = {
    every?: Prisma.LoginAttemptWhereInput;
    some?: Prisma.LoginAttemptWhereInput;
    none?: Prisma.LoginAttemptWhereInput;
};
export type LoginAttemptOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LoginAttemptCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    deviceFingerprint?: Prisma.SortOrder;
    geo?: Prisma.SortOrder;
    failReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type LoginAttemptMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    deviceFingerprint?: Prisma.SortOrder;
    geo?: Prisma.SortOrder;
    failReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type LoginAttemptMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    deviceFingerprint?: Prisma.SortOrder;
    geo?: Prisma.SortOrder;
    failReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type LoginAttemptCreateNestedManyWithoutOfficeInput = {
    create?: Prisma.XOR<Prisma.LoginAttemptCreateWithoutOfficeInput, Prisma.LoginAttemptUncheckedCreateWithoutOfficeInput> | Prisma.LoginAttemptCreateWithoutOfficeInput[] | Prisma.LoginAttemptUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.LoginAttemptCreateOrConnectWithoutOfficeInput | Prisma.LoginAttemptCreateOrConnectWithoutOfficeInput[];
    createMany?: Prisma.LoginAttemptCreateManyOfficeInputEnvelope;
    connect?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
};
export type LoginAttemptUncheckedCreateNestedManyWithoutOfficeInput = {
    create?: Prisma.XOR<Prisma.LoginAttemptCreateWithoutOfficeInput, Prisma.LoginAttemptUncheckedCreateWithoutOfficeInput> | Prisma.LoginAttemptCreateWithoutOfficeInput[] | Prisma.LoginAttemptUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.LoginAttemptCreateOrConnectWithoutOfficeInput | Prisma.LoginAttemptCreateOrConnectWithoutOfficeInput[];
    createMany?: Prisma.LoginAttemptCreateManyOfficeInputEnvelope;
    connect?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
};
export type LoginAttemptUpdateManyWithoutOfficeNestedInput = {
    create?: Prisma.XOR<Prisma.LoginAttemptCreateWithoutOfficeInput, Prisma.LoginAttemptUncheckedCreateWithoutOfficeInput> | Prisma.LoginAttemptCreateWithoutOfficeInput[] | Prisma.LoginAttemptUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.LoginAttemptCreateOrConnectWithoutOfficeInput | Prisma.LoginAttemptCreateOrConnectWithoutOfficeInput[];
    upsert?: Prisma.LoginAttemptUpsertWithWhereUniqueWithoutOfficeInput | Prisma.LoginAttemptUpsertWithWhereUniqueWithoutOfficeInput[];
    createMany?: Prisma.LoginAttemptCreateManyOfficeInputEnvelope;
    set?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
    disconnect?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
    delete?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
    connect?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
    update?: Prisma.LoginAttemptUpdateWithWhereUniqueWithoutOfficeInput | Prisma.LoginAttemptUpdateWithWhereUniqueWithoutOfficeInput[];
    updateMany?: Prisma.LoginAttemptUpdateManyWithWhereWithoutOfficeInput | Prisma.LoginAttemptUpdateManyWithWhereWithoutOfficeInput[];
    deleteMany?: Prisma.LoginAttemptScalarWhereInput | Prisma.LoginAttemptScalarWhereInput[];
};
export type LoginAttemptUncheckedUpdateManyWithoutOfficeNestedInput = {
    create?: Prisma.XOR<Prisma.LoginAttemptCreateWithoutOfficeInput, Prisma.LoginAttemptUncheckedCreateWithoutOfficeInput> | Prisma.LoginAttemptCreateWithoutOfficeInput[] | Prisma.LoginAttemptUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.LoginAttemptCreateOrConnectWithoutOfficeInput | Prisma.LoginAttemptCreateOrConnectWithoutOfficeInput[];
    upsert?: Prisma.LoginAttemptUpsertWithWhereUniqueWithoutOfficeInput | Prisma.LoginAttemptUpsertWithWhereUniqueWithoutOfficeInput[];
    createMany?: Prisma.LoginAttemptCreateManyOfficeInputEnvelope;
    set?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
    disconnect?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
    delete?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
    connect?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
    update?: Prisma.LoginAttemptUpdateWithWhereUniqueWithoutOfficeInput | Prisma.LoginAttemptUpdateWithWhereUniqueWithoutOfficeInput[];
    updateMany?: Prisma.LoginAttemptUpdateManyWithWhereWithoutOfficeInput | Prisma.LoginAttemptUpdateManyWithWhereWithoutOfficeInput[];
    deleteMany?: Prisma.LoginAttemptScalarWhereInput | Prisma.LoginAttemptScalarWhereInput[];
};
export type LoginAttemptCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.LoginAttemptCreateWithoutUserInput, Prisma.LoginAttemptUncheckedCreateWithoutUserInput> | Prisma.LoginAttemptCreateWithoutUserInput[] | Prisma.LoginAttemptUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.LoginAttemptCreateOrConnectWithoutUserInput | Prisma.LoginAttemptCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.LoginAttemptCreateManyUserInputEnvelope;
    connect?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
};
export type LoginAttemptUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.LoginAttemptCreateWithoutUserInput, Prisma.LoginAttemptUncheckedCreateWithoutUserInput> | Prisma.LoginAttemptCreateWithoutUserInput[] | Prisma.LoginAttemptUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.LoginAttemptCreateOrConnectWithoutUserInput | Prisma.LoginAttemptCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.LoginAttemptCreateManyUserInputEnvelope;
    connect?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
};
export type LoginAttemptUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.LoginAttemptCreateWithoutUserInput, Prisma.LoginAttemptUncheckedCreateWithoutUserInput> | Prisma.LoginAttemptCreateWithoutUserInput[] | Prisma.LoginAttemptUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.LoginAttemptCreateOrConnectWithoutUserInput | Prisma.LoginAttemptCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.LoginAttemptUpsertWithWhereUniqueWithoutUserInput | Prisma.LoginAttemptUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.LoginAttemptCreateManyUserInputEnvelope;
    set?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
    disconnect?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
    delete?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
    connect?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
    update?: Prisma.LoginAttemptUpdateWithWhereUniqueWithoutUserInput | Prisma.LoginAttemptUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.LoginAttemptUpdateManyWithWhereWithoutUserInput | Prisma.LoginAttemptUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.LoginAttemptScalarWhereInput | Prisma.LoginAttemptScalarWhereInput[];
};
export type LoginAttemptUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.LoginAttemptCreateWithoutUserInput, Prisma.LoginAttemptUncheckedCreateWithoutUserInput> | Prisma.LoginAttemptCreateWithoutUserInput[] | Prisma.LoginAttemptUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.LoginAttemptCreateOrConnectWithoutUserInput | Prisma.LoginAttemptCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.LoginAttemptUpsertWithWhereUniqueWithoutUserInput | Prisma.LoginAttemptUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.LoginAttemptCreateManyUserInputEnvelope;
    set?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
    disconnect?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
    delete?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
    connect?: Prisma.LoginAttemptWhereUniqueInput | Prisma.LoginAttemptWhereUniqueInput[];
    update?: Prisma.LoginAttemptUpdateWithWhereUniqueWithoutUserInput | Prisma.LoginAttemptUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.LoginAttemptUpdateManyWithWhereWithoutUserInput | Prisma.LoginAttemptUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.LoginAttemptScalarWhereInput | Prisma.LoginAttemptScalarWhereInput[];
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type EnumLoginMethodFieldUpdateOperationsInput = {
    set?: $Enums.LoginMethod;
};
export type LoginAttemptCreateWithoutOfficeInput = {
    id?: string;
    success: boolean;
    method: $Enums.LoginMethod;
    ip?: string | null;
    userAgent?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    failReason?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutLoginAttemptsInput;
};
export type LoginAttemptUncheckedCreateWithoutOfficeInput = {
    id?: string;
    userId: string;
    success: boolean;
    method: $Enums.LoginMethod;
    ip?: string | null;
    userAgent?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    failReason?: string | null;
    createdAt?: Date | string;
};
export type LoginAttemptCreateOrConnectWithoutOfficeInput = {
    where: Prisma.LoginAttemptWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoginAttemptCreateWithoutOfficeInput, Prisma.LoginAttemptUncheckedCreateWithoutOfficeInput>;
};
export type LoginAttemptCreateManyOfficeInputEnvelope = {
    data: Prisma.LoginAttemptCreateManyOfficeInput | Prisma.LoginAttemptCreateManyOfficeInput[];
    skipDuplicates?: boolean;
};
export type LoginAttemptUpsertWithWhereUniqueWithoutOfficeInput = {
    where: Prisma.LoginAttemptWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoginAttemptUpdateWithoutOfficeInput, Prisma.LoginAttemptUncheckedUpdateWithoutOfficeInput>;
    create: Prisma.XOR<Prisma.LoginAttemptCreateWithoutOfficeInput, Prisma.LoginAttemptUncheckedCreateWithoutOfficeInput>;
};
export type LoginAttemptUpdateWithWhereUniqueWithoutOfficeInput = {
    where: Prisma.LoginAttemptWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoginAttemptUpdateWithoutOfficeInput, Prisma.LoginAttemptUncheckedUpdateWithoutOfficeInput>;
};
export type LoginAttemptUpdateManyWithWhereWithoutOfficeInput = {
    where: Prisma.LoginAttemptScalarWhereInput;
    data: Prisma.XOR<Prisma.LoginAttemptUpdateManyMutationInput, Prisma.LoginAttemptUncheckedUpdateManyWithoutOfficeInput>;
};
export type LoginAttemptScalarWhereInput = {
    AND?: Prisma.LoginAttemptScalarWhereInput | Prisma.LoginAttemptScalarWhereInput[];
    OR?: Prisma.LoginAttemptScalarWhereInput[];
    NOT?: Prisma.LoginAttemptScalarWhereInput | Prisma.LoginAttemptScalarWhereInput[];
    id?: Prisma.StringFilter<"LoginAttempt"> | string;
    userId?: Prisma.StringFilter<"LoginAttempt"> | string;
    officeId?: Prisma.StringFilter<"LoginAttempt"> | string;
    success?: Prisma.BoolFilter<"LoginAttempt"> | boolean;
    method?: Prisma.EnumLoginMethodFilter<"LoginAttempt"> | $Enums.LoginMethod;
    ip?: Prisma.StringNullableFilter<"LoginAttempt"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"LoginAttempt"> | string | null;
    deviceFingerprint?: Prisma.StringNullableFilter<"LoginAttempt"> | string | null;
    geo?: Prisma.StringNullableFilter<"LoginAttempt"> | string | null;
    failReason?: Prisma.StringNullableFilter<"LoginAttempt"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"LoginAttempt"> | Date | string;
};
export type LoginAttemptCreateWithoutUserInput = {
    id?: string;
    success: boolean;
    method: $Enums.LoginMethod;
    ip?: string | null;
    userAgent?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    failReason?: string | null;
    createdAt?: Date | string;
    office: Prisma.OfficeCreateNestedOneWithoutLoginAttemptsInput;
};
export type LoginAttemptUncheckedCreateWithoutUserInput = {
    id?: string;
    officeId: string;
    success: boolean;
    method: $Enums.LoginMethod;
    ip?: string | null;
    userAgent?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    failReason?: string | null;
    createdAt?: Date | string;
};
export type LoginAttemptCreateOrConnectWithoutUserInput = {
    where: Prisma.LoginAttemptWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoginAttemptCreateWithoutUserInput, Prisma.LoginAttemptUncheckedCreateWithoutUserInput>;
};
export type LoginAttemptCreateManyUserInputEnvelope = {
    data: Prisma.LoginAttemptCreateManyUserInput | Prisma.LoginAttemptCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type LoginAttemptUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.LoginAttemptWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoginAttemptUpdateWithoutUserInput, Prisma.LoginAttemptUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.LoginAttemptCreateWithoutUserInput, Prisma.LoginAttemptUncheckedCreateWithoutUserInput>;
};
export type LoginAttemptUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.LoginAttemptWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoginAttemptUpdateWithoutUserInput, Prisma.LoginAttemptUncheckedUpdateWithoutUserInput>;
};
export type LoginAttemptUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.LoginAttemptScalarWhereInput;
    data: Prisma.XOR<Prisma.LoginAttemptUpdateManyMutationInput, Prisma.LoginAttemptUncheckedUpdateManyWithoutUserInput>;
};
export type LoginAttemptCreateManyOfficeInput = {
    id?: string;
    userId: string;
    success: boolean;
    method: $Enums.LoginMethod;
    ip?: string | null;
    userAgent?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    failReason?: string | null;
    createdAt?: Date | string;
};
export type LoginAttemptUpdateWithoutOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    method?: Prisma.EnumLoginMethodFieldUpdateOperationsInput | $Enums.LoginMethod;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutLoginAttemptsNestedInput;
};
export type LoginAttemptUncheckedUpdateWithoutOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    method?: Prisma.EnumLoginMethodFieldUpdateOperationsInput | $Enums.LoginMethod;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoginAttemptUncheckedUpdateManyWithoutOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    method?: Prisma.EnumLoginMethodFieldUpdateOperationsInput | $Enums.LoginMethod;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoginAttemptCreateManyUserInput = {
    id?: string;
    officeId: string;
    success: boolean;
    method: $Enums.LoginMethod;
    ip?: string | null;
    userAgent?: string | null;
    deviceFingerprint?: string | null;
    geo?: string | null;
    failReason?: string | null;
    createdAt?: Date | string;
};
export type LoginAttemptUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    method?: Prisma.EnumLoginMethodFieldUpdateOperationsInput | $Enums.LoginMethod;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    office?: Prisma.OfficeUpdateOneRequiredWithoutLoginAttemptsNestedInput;
};
export type LoginAttemptUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    method?: Prisma.EnumLoginMethodFieldUpdateOperationsInput | $Enums.LoginMethod;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoginAttemptUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    method?: Prisma.EnumLoginMethodFieldUpdateOperationsInput | $Enums.LoginMethod;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    geo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoginAttemptSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    officeId?: boolean;
    success?: boolean;
    method?: boolean;
    ip?: boolean;
    userAgent?: boolean;
    deviceFingerprint?: boolean;
    geo?: boolean;
    failReason?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["loginAttempt"]>;
export type LoginAttemptSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    officeId?: boolean;
    success?: boolean;
    method?: boolean;
    ip?: boolean;
    userAgent?: boolean;
    deviceFingerprint?: boolean;
    geo?: boolean;
    failReason?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["loginAttempt"]>;
export type LoginAttemptSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    officeId?: boolean;
    success?: boolean;
    method?: boolean;
    ip?: boolean;
    userAgent?: boolean;
    deviceFingerprint?: boolean;
    geo?: boolean;
    failReason?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["loginAttempt"]>;
export type LoginAttemptSelectScalar = {
    id?: boolean;
    userId?: boolean;
    officeId?: boolean;
    success?: boolean;
    method?: boolean;
    ip?: boolean;
    userAgent?: boolean;
    deviceFingerprint?: boolean;
    geo?: boolean;
    failReason?: boolean;
    createdAt?: boolean;
};
export type LoginAttemptOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "officeId" | "success" | "method" | "ip" | "userAgent" | "deviceFingerprint" | "geo" | "failReason" | "createdAt", ExtArgs["result"]["loginAttempt"]>;
export type LoginAttemptInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
};
export type LoginAttemptIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
};
export type LoginAttemptIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
};
export type $LoginAttemptPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "LoginAttempt";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        office: Prisma.$OfficePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        officeId: string;
        success: boolean;
        method: $Enums.LoginMethod;
        ip: string | null;
        userAgent: string | null;
        deviceFingerprint: string | null;
        geo: string | null;
        failReason: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["loginAttempt"]>;
    composites: {};
};
export type LoginAttemptGetPayload<S extends boolean | null | undefined | LoginAttemptDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LoginAttemptPayload, S>;
export type LoginAttemptCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LoginAttemptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LoginAttemptCountAggregateInputType | true;
};
export interface LoginAttemptDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['LoginAttempt'];
        meta: {
            name: 'LoginAttempt';
        };
    };
    findUnique<T extends LoginAttemptFindUniqueArgs>(args: Prisma.SelectSubset<T, LoginAttemptFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LoginAttemptClient<runtime.Types.Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LoginAttemptFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LoginAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LoginAttemptClient<runtime.Types.Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LoginAttemptFindFirstArgs>(args?: Prisma.SelectSubset<T, LoginAttemptFindFirstArgs<ExtArgs>>): Prisma.Prisma__LoginAttemptClient<runtime.Types.Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LoginAttemptFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LoginAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LoginAttemptClient<runtime.Types.Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LoginAttemptFindManyArgs>(args?: Prisma.SelectSubset<T, LoginAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LoginAttemptCreateArgs>(args: Prisma.SelectSubset<T, LoginAttemptCreateArgs<ExtArgs>>): Prisma.Prisma__LoginAttemptClient<runtime.Types.Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LoginAttemptCreateManyArgs>(args?: Prisma.SelectSubset<T, LoginAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LoginAttemptCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LoginAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LoginAttemptDeleteArgs>(args: Prisma.SelectSubset<T, LoginAttemptDeleteArgs<ExtArgs>>): Prisma.Prisma__LoginAttemptClient<runtime.Types.Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LoginAttemptUpdateArgs>(args: Prisma.SelectSubset<T, LoginAttemptUpdateArgs<ExtArgs>>): Prisma.Prisma__LoginAttemptClient<runtime.Types.Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LoginAttemptDeleteManyArgs>(args?: Prisma.SelectSubset<T, LoginAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LoginAttemptUpdateManyArgs>(args: Prisma.SelectSubset<T, LoginAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LoginAttemptUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LoginAttemptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LoginAttemptUpsertArgs>(args: Prisma.SelectSubset<T, LoginAttemptUpsertArgs<ExtArgs>>): Prisma.Prisma__LoginAttemptClient<runtime.Types.Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LoginAttemptCountArgs>(args?: Prisma.Subset<T, LoginAttemptCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LoginAttemptCountAggregateOutputType> : number>;
    aggregate<T extends LoginAttemptAggregateArgs>(args: Prisma.Subset<T, LoginAttemptAggregateArgs>): Prisma.PrismaPromise<GetLoginAttemptAggregateType<T>>;
    groupBy<T extends LoginAttemptGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LoginAttemptGroupByArgs['orderBy'];
    } : {
        orderBy?: LoginAttemptGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LoginAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoginAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LoginAttemptFieldRefs;
}
export interface Prisma__LoginAttemptClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    office<T extends Prisma.OfficeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OfficeDefaultArgs<ExtArgs>>): Prisma.Prisma__OfficeClient<runtime.Types.Result.GetResult<Prisma.$OfficePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LoginAttemptFieldRefs {
    readonly id: Prisma.FieldRef<"LoginAttempt", 'String'>;
    readonly userId: Prisma.FieldRef<"LoginAttempt", 'String'>;
    readonly officeId: Prisma.FieldRef<"LoginAttempt", 'String'>;
    readonly success: Prisma.FieldRef<"LoginAttempt", 'Boolean'>;
    readonly method: Prisma.FieldRef<"LoginAttempt", 'LoginMethod'>;
    readonly ip: Prisma.FieldRef<"LoginAttempt", 'String'>;
    readonly userAgent: Prisma.FieldRef<"LoginAttempt", 'String'>;
    readonly deviceFingerprint: Prisma.FieldRef<"LoginAttempt", 'String'>;
    readonly geo: Prisma.FieldRef<"LoginAttempt", 'String'>;
    readonly failReason: Prisma.FieldRef<"LoginAttempt", 'String'>;
    readonly createdAt: Prisma.FieldRef<"LoginAttempt", 'DateTime'>;
}
export type LoginAttemptFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoginAttemptSelect<ExtArgs> | null;
    omit?: Prisma.LoginAttemptOmit<ExtArgs> | null;
    include?: Prisma.LoginAttemptInclude<ExtArgs> | null;
    where: Prisma.LoginAttemptWhereUniqueInput;
};
export type LoginAttemptFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoginAttemptSelect<ExtArgs> | null;
    omit?: Prisma.LoginAttemptOmit<ExtArgs> | null;
    include?: Prisma.LoginAttemptInclude<ExtArgs> | null;
    where: Prisma.LoginAttemptWhereUniqueInput;
};
export type LoginAttemptFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type LoginAttemptFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type LoginAttemptFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type LoginAttemptCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoginAttemptSelect<ExtArgs> | null;
    omit?: Prisma.LoginAttemptOmit<ExtArgs> | null;
    include?: Prisma.LoginAttemptInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LoginAttemptCreateInput, Prisma.LoginAttemptUncheckedCreateInput>;
};
export type LoginAttemptCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LoginAttemptCreateManyInput | Prisma.LoginAttemptCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LoginAttemptCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoginAttemptSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LoginAttemptOmit<ExtArgs> | null;
    data: Prisma.LoginAttemptCreateManyInput | Prisma.LoginAttemptCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.LoginAttemptIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type LoginAttemptUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoginAttemptSelect<ExtArgs> | null;
    omit?: Prisma.LoginAttemptOmit<ExtArgs> | null;
    include?: Prisma.LoginAttemptInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LoginAttemptUpdateInput, Prisma.LoginAttemptUncheckedUpdateInput>;
    where: Prisma.LoginAttemptWhereUniqueInput;
};
export type LoginAttemptUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LoginAttemptUpdateManyMutationInput, Prisma.LoginAttemptUncheckedUpdateManyInput>;
    where?: Prisma.LoginAttemptWhereInput;
    limit?: number;
};
export type LoginAttemptUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoginAttemptSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LoginAttemptOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LoginAttemptUpdateManyMutationInput, Prisma.LoginAttemptUncheckedUpdateManyInput>;
    where?: Prisma.LoginAttemptWhereInput;
    limit?: number;
    include?: Prisma.LoginAttemptIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type LoginAttemptUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoginAttemptSelect<ExtArgs> | null;
    omit?: Prisma.LoginAttemptOmit<ExtArgs> | null;
    include?: Prisma.LoginAttemptInclude<ExtArgs> | null;
    where: Prisma.LoginAttemptWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoginAttemptCreateInput, Prisma.LoginAttemptUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LoginAttemptUpdateInput, Prisma.LoginAttemptUncheckedUpdateInput>;
};
export type LoginAttemptDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoginAttemptSelect<ExtArgs> | null;
    omit?: Prisma.LoginAttemptOmit<ExtArgs> | null;
    include?: Prisma.LoginAttemptInclude<ExtArgs> | null;
    where: Prisma.LoginAttemptWhereUniqueInput;
};
export type LoginAttemptDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoginAttemptWhereInput;
    limit?: number;
};
export type LoginAttemptDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoginAttemptSelect<ExtArgs> | null;
    omit?: Prisma.LoginAttemptOmit<ExtArgs> | null;
    include?: Prisma.LoginAttemptInclude<ExtArgs> | null;
};
export {};
