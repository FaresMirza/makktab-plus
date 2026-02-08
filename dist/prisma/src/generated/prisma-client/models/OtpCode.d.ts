import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type OtpCodeModel = runtime.Types.Result.DefaultSelection<Prisma.$OtpCodePayload>;
export type AggregateOtpCode = {
    _count: OtpCodeCountAggregateOutputType | null;
    _avg: OtpCodeAvgAggregateOutputType | null;
    _sum: OtpCodeSumAggregateOutputType | null;
    _min: OtpCodeMinAggregateOutputType | null;
    _max: OtpCodeMaxAggregateOutputType | null;
};
export type OtpCodeAvgAggregateOutputType = {
    attempts: number | null;
};
export type OtpCodeSumAggregateOutputType = {
    attempts: number | null;
};
export type OtpCodeMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    officeId: string | null;
    purpose: $Enums.OtpPurpose | null;
    channel: $Enums.OtpChannel | null;
    codeHash: string | null;
    attempts: number | null;
    deviceFingerprint: string | null;
    ip: string | null;
    userAgent: string | null;
    emailSnapshot: string | null;
    phoneSnapshot: string | null;
    expiresAt: Date | null;
    usedAt: Date | null;
    createdAt: Date | null;
};
export type OtpCodeMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    officeId: string | null;
    purpose: $Enums.OtpPurpose | null;
    channel: $Enums.OtpChannel | null;
    codeHash: string | null;
    attempts: number | null;
    deviceFingerprint: string | null;
    ip: string | null;
    userAgent: string | null;
    emailSnapshot: string | null;
    phoneSnapshot: string | null;
    expiresAt: Date | null;
    usedAt: Date | null;
    createdAt: Date | null;
};
export type OtpCodeCountAggregateOutputType = {
    id: number;
    userId: number;
    officeId: number;
    purpose: number;
    channel: number;
    codeHash: number;
    attempts: number;
    deviceFingerprint: number;
    ip: number;
    userAgent: number;
    emailSnapshot: number;
    phoneSnapshot: number;
    expiresAt: number;
    usedAt: number;
    createdAt: number;
    _all: number;
};
export type OtpCodeAvgAggregateInputType = {
    attempts?: true;
};
export type OtpCodeSumAggregateInputType = {
    attempts?: true;
};
export type OtpCodeMinAggregateInputType = {
    id?: true;
    userId?: true;
    officeId?: true;
    purpose?: true;
    channel?: true;
    codeHash?: true;
    attempts?: true;
    deviceFingerprint?: true;
    ip?: true;
    userAgent?: true;
    emailSnapshot?: true;
    phoneSnapshot?: true;
    expiresAt?: true;
    usedAt?: true;
    createdAt?: true;
};
export type OtpCodeMaxAggregateInputType = {
    id?: true;
    userId?: true;
    officeId?: true;
    purpose?: true;
    channel?: true;
    codeHash?: true;
    attempts?: true;
    deviceFingerprint?: true;
    ip?: true;
    userAgent?: true;
    emailSnapshot?: true;
    phoneSnapshot?: true;
    expiresAt?: true;
    usedAt?: true;
    createdAt?: true;
};
export type OtpCodeCountAggregateInputType = {
    id?: true;
    userId?: true;
    officeId?: true;
    purpose?: true;
    channel?: true;
    codeHash?: true;
    attempts?: true;
    deviceFingerprint?: true;
    ip?: true;
    userAgent?: true;
    emailSnapshot?: true;
    phoneSnapshot?: true;
    expiresAt?: true;
    usedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type OtpCodeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OtpCodeWhereInput;
    orderBy?: Prisma.OtpCodeOrderByWithRelationInput | Prisma.OtpCodeOrderByWithRelationInput[];
    cursor?: Prisma.OtpCodeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OtpCodeCountAggregateInputType;
    _avg?: OtpCodeAvgAggregateInputType;
    _sum?: OtpCodeSumAggregateInputType;
    _min?: OtpCodeMinAggregateInputType;
    _max?: OtpCodeMaxAggregateInputType;
};
export type GetOtpCodeAggregateType<T extends OtpCodeAggregateArgs> = {
    [P in keyof T & keyof AggregateOtpCode]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOtpCode[P]> : Prisma.GetScalarType<T[P], AggregateOtpCode[P]>;
};
export type OtpCodeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OtpCodeWhereInput;
    orderBy?: Prisma.OtpCodeOrderByWithAggregationInput | Prisma.OtpCodeOrderByWithAggregationInput[];
    by: Prisma.OtpCodeScalarFieldEnum[] | Prisma.OtpCodeScalarFieldEnum;
    having?: Prisma.OtpCodeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OtpCodeCountAggregateInputType | true;
    _avg?: OtpCodeAvgAggregateInputType;
    _sum?: OtpCodeSumAggregateInputType;
    _min?: OtpCodeMinAggregateInputType;
    _max?: OtpCodeMaxAggregateInputType;
};
export type OtpCodeGroupByOutputType = {
    id: string;
    userId: string;
    officeId: string;
    purpose: $Enums.OtpPurpose;
    channel: $Enums.OtpChannel;
    codeHash: string;
    attempts: number;
    deviceFingerprint: string | null;
    ip: string | null;
    userAgent: string | null;
    emailSnapshot: string | null;
    phoneSnapshot: string | null;
    expiresAt: Date;
    usedAt: Date | null;
    createdAt: Date;
    _count: OtpCodeCountAggregateOutputType | null;
    _avg: OtpCodeAvgAggregateOutputType | null;
    _sum: OtpCodeSumAggregateOutputType | null;
    _min: OtpCodeMinAggregateOutputType | null;
    _max: OtpCodeMaxAggregateOutputType | null;
};
type GetOtpCodeGroupByPayload<T extends OtpCodeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OtpCodeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OtpCodeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OtpCodeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OtpCodeGroupByOutputType[P]>;
}>>;
export type OtpCodeWhereInput = {
    AND?: Prisma.OtpCodeWhereInput | Prisma.OtpCodeWhereInput[];
    OR?: Prisma.OtpCodeWhereInput[];
    NOT?: Prisma.OtpCodeWhereInput | Prisma.OtpCodeWhereInput[];
    id?: Prisma.StringFilter<"OtpCode"> | string;
    userId?: Prisma.StringFilter<"OtpCode"> | string;
    officeId?: Prisma.StringFilter<"OtpCode"> | string;
    purpose?: Prisma.EnumOtpPurposeFilter<"OtpCode"> | $Enums.OtpPurpose;
    channel?: Prisma.EnumOtpChannelFilter<"OtpCode"> | $Enums.OtpChannel;
    codeHash?: Prisma.StringFilter<"OtpCode"> | string;
    attempts?: Prisma.IntFilter<"OtpCode"> | number;
    deviceFingerprint?: Prisma.StringNullableFilter<"OtpCode"> | string | null;
    ip?: Prisma.StringNullableFilter<"OtpCode"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"OtpCode"> | string | null;
    emailSnapshot?: Prisma.StringNullableFilter<"OtpCode"> | string | null;
    phoneSnapshot?: Prisma.StringNullableFilter<"OtpCode"> | string | null;
    expiresAt?: Prisma.DateTimeFilter<"OtpCode"> | Date | string;
    usedAt?: Prisma.DateTimeNullableFilter<"OtpCode"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"OtpCode"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    office?: Prisma.XOR<Prisma.OfficeScalarRelationFilter, Prisma.OfficeWhereInput>;
};
export type OtpCodeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    deviceFingerprint?: Prisma.SortOrderInput | Prisma.SortOrder;
    ip?: Prisma.SortOrderInput | Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    emailSnapshot?: Prisma.SortOrderInput | Prisma.SortOrder;
    phoneSnapshot?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    office?: Prisma.OfficeOrderByWithRelationInput;
};
export type OtpCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.OtpCodeWhereInput | Prisma.OtpCodeWhereInput[];
    OR?: Prisma.OtpCodeWhereInput[];
    NOT?: Prisma.OtpCodeWhereInput | Prisma.OtpCodeWhereInput[];
    userId?: Prisma.StringFilter<"OtpCode"> | string;
    officeId?: Prisma.StringFilter<"OtpCode"> | string;
    purpose?: Prisma.EnumOtpPurposeFilter<"OtpCode"> | $Enums.OtpPurpose;
    channel?: Prisma.EnumOtpChannelFilter<"OtpCode"> | $Enums.OtpChannel;
    codeHash?: Prisma.StringFilter<"OtpCode"> | string;
    attempts?: Prisma.IntFilter<"OtpCode"> | number;
    deviceFingerprint?: Prisma.StringNullableFilter<"OtpCode"> | string | null;
    ip?: Prisma.StringNullableFilter<"OtpCode"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"OtpCode"> | string | null;
    emailSnapshot?: Prisma.StringNullableFilter<"OtpCode"> | string | null;
    phoneSnapshot?: Prisma.StringNullableFilter<"OtpCode"> | string | null;
    expiresAt?: Prisma.DateTimeFilter<"OtpCode"> | Date | string;
    usedAt?: Prisma.DateTimeNullableFilter<"OtpCode"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"OtpCode"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    office?: Prisma.XOR<Prisma.OfficeScalarRelationFilter, Prisma.OfficeWhereInput>;
}, "id">;
export type OtpCodeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    deviceFingerprint?: Prisma.SortOrderInput | Prisma.SortOrder;
    ip?: Prisma.SortOrderInput | Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    emailSnapshot?: Prisma.SortOrderInput | Prisma.SortOrder;
    phoneSnapshot?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.OtpCodeCountOrderByAggregateInput;
    _avg?: Prisma.OtpCodeAvgOrderByAggregateInput;
    _max?: Prisma.OtpCodeMaxOrderByAggregateInput;
    _min?: Prisma.OtpCodeMinOrderByAggregateInput;
    _sum?: Prisma.OtpCodeSumOrderByAggregateInput;
};
export type OtpCodeScalarWhereWithAggregatesInput = {
    AND?: Prisma.OtpCodeScalarWhereWithAggregatesInput | Prisma.OtpCodeScalarWhereWithAggregatesInput[];
    OR?: Prisma.OtpCodeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OtpCodeScalarWhereWithAggregatesInput | Prisma.OtpCodeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"OtpCode"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"OtpCode"> | string;
    officeId?: Prisma.StringWithAggregatesFilter<"OtpCode"> | string;
    purpose?: Prisma.EnumOtpPurposeWithAggregatesFilter<"OtpCode"> | $Enums.OtpPurpose;
    channel?: Prisma.EnumOtpChannelWithAggregatesFilter<"OtpCode"> | $Enums.OtpChannel;
    codeHash?: Prisma.StringWithAggregatesFilter<"OtpCode"> | string;
    attempts?: Prisma.IntWithAggregatesFilter<"OtpCode"> | number;
    deviceFingerprint?: Prisma.StringNullableWithAggregatesFilter<"OtpCode"> | string | null;
    ip?: Prisma.StringNullableWithAggregatesFilter<"OtpCode"> | string | null;
    userAgent?: Prisma.StringNullableWithAggregatesFilter<"OtpCode"> | string | null;
    emailSnapshot?: Prisma.StringNullableWithAggregatesFilter<"OtpCode"> | string | null;
    phoneSnapshot?: Prisma.StringNullableWithAggregatesFilter<"OtpCode"> | string | null;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"OtpCode"> | Date | string;
    usedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"OtpCode"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OtpCode"> | Date | string;
};
export type OtpCodeCreateInput = {
    id?: string;
    purpose: $Enums.OtpPurpose;
    channel: $Enums.OtpChannel;
    codeHash: string;
    attempts: number;
    deviceFingerprint?: string | null;
    ip?: string | null;
    userAgent?: string | null;
    emailSnapshot?: string | null;
    phoneSnapshot?: string | null;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutOtpCodesInput;
    office: Prisma.OfficeCreateNestedOneWithoutOtpCodesInput;
};
export type OtpCodeUncheckedCreateInput = {
    id?: string;
    userId: string;
    officeId: string;
    purpose: $Enums.OtpPurpose;
    channel: $Enums.OtpChannel;
    codeHash: string;
    attempts: number;
    deviceFingerprint?: string | null;
    ip?: string | null;
    userAgent?: string | null;
    emailSnapshot?: string | null;
    phoneSnapshot?: string | null;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type OtpCodeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    channel?: Prisma.EnumOtpChannelFieldUpdateOperationsInput | $Enums.OtpChannel;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutOtpCodesNestedInput;
    office?: Prisma.OfficeUpdateOneRequiredWithoutOtpCodesNestedInput;
};
export type OtpCodeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    channel?: Prisma.EnumOtpChannelFieldUpdateOperationsInput | $Enums.OtpChannel;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OtpCodeCreateManyInput = {
    id?: string;
    userId: string;
    officeId: string;
    purpose: $Enums.OtpPurpose;
    channel: $Enums.OtpChannel;
    codeHash: string;
    attempts: number;
    deviceFingerprint?: string | null;
    ip?: string | null;
    userAgent?: string | null;
    emailSnapshot?: string | null;
    phoneSnapshot?: string | null;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type OtpCodeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    channel?: Prisma.EnumOtpChannelFieldUpdateOperationsInput | $Enums.OtpChannel;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OtpCodeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    channel?: Prisma.EnumOtpChannelFieldUpdateOperationsInput | $Enums.OtpChannel;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OtpCodeListRelationFilter = {
    every?: Prisma.OtpCodeWhereInput;
    some?: Prisma.OtpCodeWhereInput;
    none?: Prisma.OtpCodeWhereInput;
};
export type OtpCodeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OtpCodeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    deviceFingerprint?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    emailSnapshot?: Prisma.SortOrder;
    phoneSnapshot?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OtpCodeAvgOrderByAggregateInput = {
    attempts?: Prisma.SortOrder;
};
export type OtpCodeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    deviceFingerprint?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    emailSnapshot?: Prisma.SortOrder;
    phoneSnapshot?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OtpCodeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    officeId?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    codeHash?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    deviceFingerprint?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    emailSnapshot?: Prisma.SortOrder;
    phoneSnapshot?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OtpCodeSumOrderByAggregateInput = {
    attempts?: Prisma.SortOrder;
};
export type OtpCodeCreateNestedManyWithoutOfficeInput = {
    create?: Prisma.XOR<Prisma.OtpCodeCreateWithoutOfficeInput, Prisma.OtpCodeUncheckedCreateWithoutOfficeInput> | Prisma.OtpCodeCreateWithoutOfficeInput[] | Prisma.OtpCodeUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.OtpCodeCreateOrConnectWithoutOfficeInput | Prisma.OtpCodeCreateOrConnectWithoutOfficeInput[];
    createMany?: Prisma.OtpCodeCreateManyOfficeInputEnvelope;
    connect?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
};
export type OtpCodeUncheckedCreateNestedManyWithoutOfficeInput = {
    create?: Prisma.XOR<Prisma.OtpCodeCreateWithoutOfficeInput, Prisma.OtpCodeUncheckedCreateWithoutOfficeInput> | Prisma.OtpCodeCreateWithoutOfficeInput[] | Prisma.OtpCodeUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.OtpCodeCreateOrConnectWithoutOfficeInput | Prisma.OtpCodeCreateOrConnectWithoutOfficeInput[];
    createMany?: Prisma.OtpCodeCreateManyOfficeInputEnvelope;
    connect?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
};
export type OtpCodeUpdateManyWithoutOfficeNestedInput = {
    create?: Prisma.XOR<Prisma.OtpCodeCreateWithoutOfficeInput, Prisma.OtpCodeUncheckedCreateWithoutOfficeInput> | Prisma.OtpCodeCreateWithoutOfficeInput[] | Prisma.OtpCodeUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.OtpCodeCreateOrConnectWithoutOfficeInput | Prisma.OtpCodeCreateOrConnectWithoutOfficeInput[];
    upsert?: Prisma.OtpCodeUpsertWithWhereUniqueWithoutOfficeInput | Prisma.OtpCodeUpsertWithWhereUniqueWithoutOfficeInput[];
    createMany?: Prisma.OtpCodeCreateManyOfficeInputEnvelope;
    set?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
    disconnect?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
    delete?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
    connect?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
    update?: Prisma.OtpCodeUpdateWithWhereUniqueWithoutOfficeInput | Prisma.OtpCodeUpdateWithWhereUniqueWithoutOfficeInput[];
    updateMany?: Prisma.OtpCodeUpdateManyWithWhereWithoutOfficeInput | Prisma.OtpCodeUpdateManyWithWhereWithoutOfficeInput[];
    deleteMany?: Prisma.OtpCodeScalarWhereInput | Prisma.OtpCodeScalarWhereInput[];
};
export type OtpCodeUncheckedUpdateManyWithoutOfficeNestedInput = {
    create?: Prisma.XOR<Prisma.OtpCodeCreateWithoutOfficeInput, Prisma.OtpCodeUncheckedCreateWithoutOfficeInput> | Prisma.OtpCodeCreateWithoutOfficeInput[] | Prisma.OtpCodeUncheckedCreateWithoutOfficeInput[];
    connectOrCreate?: Prisma.OtpCodeCreateOrConnectWithoutOfficeInput | Prisma.OtpCodeCreateOrConnectWithoutOfficeInput[];
    upsert?: Prisma.OtpCodeUpsertWithWhereUniqueWithoutOfficeInput | Prisma.OtpCodeUpsertWithWhereUniqueWithoutOfficeInput[];
    createMany?: Prisma.OtpCodeCreateManyOfficeInputEnvelope;
    set?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
    disconnect?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
    delete?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
    connect?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
    update?: Prisma.OtpCodeUpdateWithWhereUniqueWithoutOfficeInput | Prisma.OtpCodeUpdateWithWhereUniqueWithoutOfficeInput[];
    updateMany?: Prisma.OtpCodeUpdateManyWithWhereWithoutOfficeInput | Prisma.OtpCodeUpdateManyWithWhereWithoutOfficeInput[];
    deleteMany?: Prisma.OtpCodeScalarWhereInput | Prisma.OtpCodeScalarWhereInput[];
};
export type OtpCodeCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OtpCodeCreateWithoutUserInput, Prisma.OtpCodeUncheckedCreateWithoutUserInput> | Prisma.OtpCodeCreateWithoutUserInput[] | Prisma.OtpCodeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OtpCodeCreateOrConnectWithoutUserInput | Prisma.OtpCodeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OtpCodeCreateManyUserInputEnvelope;
    connect?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
};
export type OtpCodeUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OtpCodeCreateWithoutUserInput, Prisma.OtpCodeUncheckedCreateWithoutUserInput> | Prisma.OtpCodeCreateWithoutUserInput[] | Prisma.OtpCodeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OtpCodeCreateOrConnectWithoutUserInput | Prisma.OtpCodeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OtpCodeCreateManyUserInputEnvelope;
    connect?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
};
export type OtpCodeUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OtpCodeCreateWithoutUserInput, Prisma.OtpCodeUncheckedCreateWithoutUserInput> | Prisma.OtpCodeCreateWithoutUserInput[] | Prisma.OtpCodeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OtpCodeCreateOrConnectWithoutUserInput | Prisma.OtpCodeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OtpCodeUpsertWithWhereUniqueWithoutUserInput | Prisma.OtpCodeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OtpCodeCreateManyUserInputEnvelope;
    set?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
    disconnect?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
    delete?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
    connect?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
    update?: Prisma.OtpCodeUpdateWithWhereUniqueWithoutUserInput | Prisma.OtpCodeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OtpCodeUpdateManyWithWhereWithoutUserInput | Prisma.OtpCodeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OtpCodeScalarWhereInput | Prisma.OtpCodeScalarWhereInput[];
};
export type OtpCodeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OtpCodeCreateWithoutUserInput, Prisma.OtpCodeUncheckedCreateWithoutUserInput> | Prisma.OtpCodeCreateWithoutUserInput[] | Prisma.OtpCodeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OtpCodeCreateOrConnectWithoutUserInput | Prisma.OtpCodeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OtpCodeUpsertWithWhereUniqueWithoutUserInput | Prisma.OtpCodeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OtpCodeCreateManyUserInputEnvelope;
    set?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
    disconnect?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
    delete?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
    connect?: Prisma.OtpCodeWhereUniqueInput | Prisma.OtpCodeWhereUniqueInput[];
    update?: Prisma.OtpCodeUpdateWithWhereUniqueWithoutUserInput | Prisma.OtpCodeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OtpCodeUpdateManyWithWhereWithoutUserInput | Prisma.OtpCodeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OtpCodeScalarWhereInput | Prisma.OtpCodeScalarWhereInput[];
};
export type EnumOtpPurposeFieldUpdateOperationsInput = {
    set?: $Enums.OtpPurpose;
};
export type EnumOtpChannelFieldUpdateOperationsInput = {
    set?: $Enums.OtpChannel;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type OtpCodeCreateWithoutOfficeInput = {
    id?: string;
    purpose: $Enums.OtpPurpose;
    channel: $Enums.OtpChannel;
    codeHash: string;
    attempts: number;
    deviceFingerprint?: string | null;
    ip?: string | null;
    userAgent?: string | null;
    emailSnapshot?: string | null;
    phoneSnapshot?: string | null;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutOtpCodesInput;
};
export type OtpCodeUncheckedCreateWithoutOfficeInput = {
    id?: string;
    userId: string;
    purpose: $Enums.OtpPurpose;
    channel: $Enums.OtpChannel;
    codeHash: string;
    attempts: number;
    deviceFingerprint?: string | null;
    ip?: string | null;
    userAgent?: string | null;
    emailSnapshot?: string | null;
    phoneSnapshot?: string | null;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type OtpCodeCreateOrConnectWithoutOfficeInput = {
    where: Prisma.OtpCodeWhereUniqueInput;
    create: Prisma.XOR<Prisma.OtpCodeCreateWithoutOfficeInput, Prisma.OtpCodeUncheckedCreateWithoutOfficeInput>;
};
export type OtpCodeCreateManyOfficeInputEnvelope = {
    data: Prisma.OtpCodeCreateManyOfficeInput | Prisma.OtpCodeCreateManyOfficeInput[];
    skipDuplicates?: boolean;
};
export type OtpCodeUpsertWithWhereUniqueWithoutOfficeInput = {
    where: Prisma.OtpCodeWhereUniqueInput;
    update: Prisma.XOR<Prisma.OtpCodeUpdateWithoutOfficeInput, Prisma.OtpCodeUncheckedUpdateWithoutOfficeInput>;
    create: Prisma.XOR<Prisma.OtpCodeCreateWithoutOfficeInput, Prisma.OtpCodeUncheckedCreateWithoutOfficeInput>;
};
export type OtpCodeUpdateWithWhereUniqueWithoutOfficeInput = {
    where: Prisma.OtpCodeWhereUniqueInput;
    data: Prisma.XOR<Prisma.OtpCodeUpdateWithoutOfficeInput, Prisma.OtpCodeUncheckedUpdateWithoutOfficeInput>;
};
export type OtpCodeUpdateManyWithWhereWithoutOfficeInput = {
    where: Prisma.OtpCodeScalarWhereInput;
    data: Prisma.XOR<Prisma.OtpCodeUpdateManyMutationInput, Prisma.OtpCodeUncheckedUpdateManyWithoutOfficeInput>;
};
export type OtpCodeScalarWhereInput = {
    AND?: Prisma.OtpCodeScalarWhereInput | Prisma.OtpCodeScalarWhereInput[];
    OR?: Prisma.OtpCodeScalarWhereInput[];
    NOT?: Prisma.OtpCodeScalarWhereInput | Prisma.OtpCodeScalarWhereInput[];
    id?: Prisma.StringFilter<"OtpCode"> | string;
    userId?: Prisma.StringFilter<"OtpCode"> | string;
    officeId?: Prisma.StringFilter<"OtpCode"> | string;
    purpose?: Prisma.EnumOtpPurposeFilter<"OtpCode"> | $Enums.OtpPurpose;
    channel?: Prisma.EnumOtpChannelFilter<"OtpCode"> | $Enums.OtpChannel;
    codeHash?: Prisma.StringFilter<"OtpCode"> | string;
    attempts?: Prisma.IntFilter<"OtpCode"> | number;
    deviceFingerprint?: Prisma.StringNullableFilter<"OtpCode"> | string | null;
    ip?: Prisma.StringNullableFilter<"OtpCode"> | string | null;
    userAgent?: Prisma.StringNullableFilter<"OtpCode"> | string | null;
    emailSnapshot?: Prisma.StringNullableFilter<"OtpCode"> | string | null;
    phoneSnapshot?: Prisma.StringNullableFilter<"OtpCode"> | string | null;
    expiresAt?: Prisma.DateTimeFilter<"OtpCode"> | Date | string;
    usedAt?: Prisma.DateTimeNullableFilter<"OtpCode"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"OtpCode"> | Date | string;
};
export type OtpCodeCreateWithoutUserInput = {
    id?: string;
    purpose: $Enums.OtpPurpose;
    channel: $Enums.OtpChannel;
    codeHash: string;
    attempts: number;
    deviceFingerprint?: string | null;
    ip?: string | null;
    userAgent?: string | null;
    emailSnapshot?: string | null;
    phoneSnapshot?: string | null;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
    office: Prisma.OfficeCreateNestedOneWithoutOtpCodesInput;
};
export type OtpCodeUncheckedCreateWithoutUserInput = {
    id?: string;
    officeId: string;
    purpose: $Enums.OtpPurpose;
    channel: $Enums.OtpChannel;
    codeHash: string;
    attempts: number;
    deviceFingerprint?: string | null;
    ip?: string | null;
    userAgent?: string | null;
    emailSnapshot?: string | null;
    phoneSnapshot?: string | null;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type OtpCodeCreateOrConnectWithoutUserInput = {
    where: Prisma.OtpCodeWhereUniqueInput;
    create: Prisma.XOR<Prisma.OtpCodeCreateWithoutUserInput, Prisma.OtpCodeUncheckedCreateWithoutUserInput>;
};
export type OtpCodeCreateManyUserInputEnvelope = {
    data: Prisma.OtpCodeCreateManyUserInput | Prisma.OtpCodeCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type OtpCodeUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.OtpCodeWhereUniqueInput;
    update: Prisma.XOR<Prisma.OtpCodeUpdateWithoutUserInput, Prisma.OtpCodeUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.OtpCodeCreateWithoutUserInput, Prisma.OtpCodeUncheckedCreateWithoutUserInput>;
};
export type OtpCodeUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.OtpCodeWhereUniqueInput;
    data: Prisma.XOR<Prisma.OtpCodeUpdateWithoutUserInput, Prisma.OtpCodeUncheckedUpdateWithoutUserInput>;
};
export type OtpCodeUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.OtpCodeScalarWhereInput;
    data: Prisma.XOR<Prisma.OtpCodeUpdateManyMutationInput, Prisma.OtpCodeUncheckedUpdateManyWithoutUserInput>;
};
export type OtpCodeCreateManyOfficeInput = {
    id?: string;
    userId: string;
    purpose: $Enums.OtpPurpose;
    channel: $Enums.OtpChannel;
    codeHash: string;
    attempts: number;
    deviceFingerprint?: string | null;
    ip?: string | null;
    userAgent?: string | null;
    emailSnapshot?: string | null;
    phoneSnapshot?: string | null;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type OtpCodeUpdateWithoutOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    channel?: Prisma.EnumOtpChannelFieldUpdateOperationsInput | $Enums.OtpChannel;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutOtpCodesNestedInput;
};
export type OtpCodeUncheckedUpdateWithoutOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    channel?: Prisma.EnumOtpChannelFieldUpdateOperationsInput | $Enums.OtpChannel;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OtpCodeUncheckedUpdateManyWithoutOfficeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    channel?: Prisma.EnumOtpChannelFieldUpdateOperationsInput | $Enums.OtpChannel;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OtpCodeCreateManyUserInput = {
    id?: string;
    officeId: string;
    purpose: $Enums.OtpPurpose;
    channel: $Enums.OtpChannel;
    codeHash: string;
    attempts: number;
    deviceFingerprint?: string | null;
    ip?: string | null;
    userAgent?: string | null;
    emailSnapshot?: string | null;
    phoneSnapshot?: string | null;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type OtpCodeUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    channel?: Prisma.EnumOtpChannelFieldUpdateOperationsInput | $Enums.OtpChannel;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    office?: Prisma.OfficeUpdateOneRequiredWithoutOtpCodesNestedInput;
};
export type OtpCodeUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    channel?: Prisma.EnumOtpChannelFieldUpdateOperationsInput | $Enums.OtpChannel;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OtpCodeUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    officeId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose;
    channel?: Prisma.EnumOtpChannelFieldUpdateOperationsInput | $Enums.OtpChannel;
    codeHash?: Prisma.StringFieldUpdateOperationsInput | string;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    deviceFingerprint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ip?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneSnapshot?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OtpCodeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    officeId?: boolean;
    purpose?: boolean;
    channel?: boolean;
    codeHash?: boolean;
    attempts?: boolean;
    deviceFingerprint?: boolean;
    ip?: boolean;
    userAgent?: boolean;
    emailSnapshot?: boolean;
    phoneSnapshot?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["otpCode"]>;
export type OtpCodeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    officeId?: boolean;
    purpose?: boolean;
    channel?: boolean;
    codeHash?: boolean;
    attempts?: boolean;
    deviceFingerprint?: boolean;
    ip?: boolean;
    userAgent?: boolean;
    emailSnapshot?: boolean;
    phoneSnapshot?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["otpCode"]>;
export type OtpCodeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    officeId?: boolean;
    purpose?: boolean;
    channel?: boolean;
    codeHash?: boolean;
    attempts?: boolean;
    deviceFingerprint?: boolean;
    ip?: boolean;
    userAgent?: boolean;
    emailSnapshot?: boolean;
    phoneSnapshot?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["otpCode"]>;
export type OtpCodeSelectScalar = {
    id?: boolean;
    userId?: boolean;
    officeId?: boolean;
    purpose?: boolean;
    channel?: boolean;
    codeHash?: boolean;
    attempts?: boolean;
    deviceFingerprint?: boolean;
    ip?: boolean;
    userAgent?: boolean;
    emailSnapshot?: boolean;
    phoneSnapshot?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
};
export type OtpCodeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "officeId" | "purpose" | "channel" | "codeHash" | "attempts" | "deviceFingerprint" | "ip" | "userAgent" | "emailSnapshot" | "phoneSnapshot" | "expiresAt" | "usedAt" | "createdAt", ExtArgs["result"]["otpCode"]>;
export type OtpCodeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
};
export type OtpCodeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
};
export type OtpCodeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    office?: boolean | Prisma.OfficeDefaultArgs<ExtArgs>;
};
export type $OtpCodePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OtpCode";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        office: Prisma.$OfficePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        officeId: string;
        purpose: $Enums.OtpPurpose;
        channel: $Enums.OtpChannel;
        codeHash: string;
        attempts: number;
        deviceFingerprint: string | null;
        ip: string | null;
        userAgent: string | null;
        emailSnapshot: string | null;
        phoneSnapshot: string | null;
        expiresAt: Date;
        usedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["otpCode"]>;
    composites: {};
};
export type OtpCodeGetPayload<S extends boolean | null | undefined | OtpCodeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OtpCodePayload, S>;
export type OtpCodeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OtpCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OtpCodeCountAggregateInputType | true;
};
export interface OtpCodeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OtpCode'];
        meta: {
            name: 'OtpCode';
        };
    };
    findUnique<T extends OtpCodeFindUniqueArgs>(args: Prisma.SelectSubset<T, OtpCodeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OtpCodeClient<runtime.Types.Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OtpCodeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OtpCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OtpCodeClient<runtime.Types.Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OtpCodeFindFirstArgs>(args?: Prisma.SelectSubset<T, OtpCodeFindFirstArgs<ExtArgs>>): Prisma.Prisma__OtpCodeClient<runtime.Types.Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OtpCodeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OtpCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OtpCodeClient<runtime.Types.Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OtpCodeFindManyArgs>(args?: Prisma.SelectSubset<T, OtpCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OtpCodeCreateArgs>(args: Prisma.SelectSubset<T, OtpCodeCreateArgs<ExtArgs>>): Prisma.Prisma__OtpCodeClient<runtime.Types.Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OtpCodeCreateManyArgs>(args?: Prisma.SelectSubset<T, OtpCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OtpCodeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OtpCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OtpCodeDeleteArgs>(args: Prisma.SelectSubset<T, OtpCodeDeleteArgs<ExtArgs>>): Prisma.Prisma__OtpCodeClient<runtime.Types.Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OtpCodeUpdateArgs>(args: Prisma.SelectSubset<T, OtpCodeUpdateArgs<ExtArgs>>): Prisma.Prisma__OtpCodeClient<runtime.Types.Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OtpCodeDeleteManyArgs>(args?: Prisma.SelectSubset<T, OtpCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OtpCodeUpdateManyArgs>(args: Prisma.SelectSubset<T, OtpCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OtpCodeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OtpCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OtpCodeUpsertArgs>(args: Prisma.SelectSubset<T, OtpCodeUpsertArgs<ExtArgs>>): Prisma.Prisma__OtpCodeClient<runtime.Types.Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OtpCodeCountArgs>(args?: Prisma.Subset<T, OtpCodeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OtpCodeCountAggregateOutputType> : number>;
    aggregate<T extends OtpCodeAggregateArgs>(args: Prisma.Subset<T, OtpCodeAggregateArgs>): Prisma.PrismaPromise<GetOtpCodeAggregateType<T>>;
    groupBy<T extends OtpCodeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OtpCodeGroupByArgs['orderBy'];
    } : {
        orderBy?: OtpCodeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OtpCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OtpCodeFieldRefs;
}
export interface Prisma__OtpCodeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    office<T extends Prisma.OfficeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OfficeDefaultArgs<ExtArgs>>): Prisma.Prisma__OfficeClient<runtime.Types.Result.GetResult<Prisma.$OfficePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OtpCodeFieldRefs {
    readonly id: Prisma.FieldRef<"OtpCode", 'String'>;
    readonly userId: Prisma.FieldRef<"OtpCode", 'String'>;
    readonly officeId: Prisma.FieldRef<"OtpCode", 'String'>;
    readonly purpose: Prisma.FieldRef<"OtpCode", 'OtpPurpose'>;
    readonly channel: Prisma.FieldRef<"OtpCode", 'OtpChannel'>;
    readonly codeHash: Prisma.FieldRef<"OtpCode", 'String'>;
    readonly attempts: Prisma.FieldRef<"OtpCode", 'Int'>;
    readonly deviceFingerprint: Prisma.FieldRef<"OtpCode", 'String'>;
    readonly ip: Prisma.FieldRef<"OtpCode", 'String'>;
    readonly userAgent: Prisma.FieldRef<"OtpCode", 'String'>;
    readonly emailSnapshot: Prisma.FieldRef<"OtpCode", 'String'>;
    readonly phoneSnapshot: Prisma.FieldRef<"OtpCode", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"OtpCode", 'DateTime'>;
    readonly usedAt: Prisma.FieldRef<"OtpCode", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"OtpCode", 'DateTime'>;
}
export type OtpCodeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpCodeSelect<ExtArgs> | null;
    omit?: Prisma.OtpCodeOmit<ExtArgs> | null;
    include?: Prisma.OtpCodeInclude<ExtArgs> | null;
    where: Prisma.OtpCodeWhereUniqueInput;
};
export type OtpCodeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpCodeSelect<ExtArgs> | null;
    omit?: Prisma.OtpCodeOmit<ExtArgs> | null;
    include?: Prisma.OtpCodeInclude<ExtArgs> | null;
    where: Prisma.OtpCodeWhereUniqueInput;
};
export type OtpCodeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OtpCodeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OtpCodeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OtpCodeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpCodeSelect<ExtArgs> | null;
    omit?: Prisma.OtpCodeOmit<ExtArgs> | null;
    include?: Prisma.OtpCodeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OtpCodeCreateInput, Prisma.OtpCodeUncheckedCreateInput>;
};
export type OtpCodeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OtpCodeCreateManyInput | Prisma.OtpCodeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OtpCodeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpCodeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OtpCodeOmit<ExtArgs> | null;
    data: Prisma.OtpCodeCreateManyInput | Prisma.OtpCodeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OtpCodeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OtpCodeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpCodeSelect<ExtArgs> | null;
    omit?: Prisma.OtpCodeOmit<ExtArgs> | null;
    include?: Prisma.OtpCodeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OtpCodeUpdateInput, Prisma.OtpCodeUncheckedUpdateInput>;
    where: Prisma.OtpCodeWhereUniqueInput;
};
export type OtpCodeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OtpCodeUpdateManyMutationInput, Prisma.OtpCodeUncheckedUpdateManyInput>;
    where?: Prisma.OtpCodeWhereInput;
    limit?: number;
};
export type OtpCodeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpCodeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OtpCodeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OtpCodeUpdateManyMutationInput, Prisma.OtpCodeUncheckedUpdateManyInput>;
    where?: Prisma.OtpCodeWhereInput;
    limit?: number;
    include?: Prisma.OtpCodeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OtpCodeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpCodeSelect<ExtArgs> | null;
    omit?: Prisma.OtpCodeOmit<ExtArgs> | null;
    include?: Prisma.OtpCodeInclude<ExtArgs> | null;
    where: Prisma.OtpCodeWhereUniqueInput;
    create: Prisma.XOR<Prisma.OtpCodeCreateInput, Prisma.OtpCodeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OtpCodeUpdateInput, Prisma.OtpCodeUncheckedUpdateInput>;
};
export type OtpCodeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpCodeSelect<ExtArgs> | null;
    omit?: Prisma.OtpCodeOmit<ExtArgs> | null;
    include?: Prisma.OtpCodeInclude<ExtArgs> | null;
    where: Prisma.OtpCodeWhereUniqueInput;
};
export type OtpCodeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OtpCodeWhereInput;
    limit?: number;
};
export type OtpCodeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OtpCodeSelect<ExtArgs> | null;
    omit?: Prisma.OtpCodeOmit<ExtArgs> | null;
    include?: Prisma.OtpCodeInclude<ExtArgs> | null;
};
export {};
