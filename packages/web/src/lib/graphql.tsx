/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  JSON: any;
};

export enum AgeRating {
  Eighteen = 'EIGHTEEN',
  Pg = 'PG',
  Twelve = 'TWELVE',
  Twelvea = 'TWELVEA',
  U = 'U'
}

export type AuthResponse = {
  __typename?: 'AuthResponse';
  refreshToken: Scalars['String'];
  token: Scalars['String'];
  user: User;
};

export type BoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type CrewMemberRoleCreateNestedManyWithoutMoviesInput = {
  connect?: InputMaybe<Array<CrewMemberRoleWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CrewMemberRoleCreateOrConnectWithoutMoviesInput>>;
  create?: InputMaybe<Array<CrewMemberRoleCreateWithoutMoviesInput>>;
};

export type CrewMemberRoleCreateNestedManyWithoutShowsInput = {
  connect?: InputMaybe<Array<CrewMemberRoleWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CrewMemberRoleCreateOrConnectWithoutShowsInput>>;
  create?: InputMaybe<Array<CrewMemberRoleCreateWithoutShowsInput>>;
};

export type CrewMemberRoleCreateOrConnectWithoutMoviesInput = {
  create: CrewMemberRoleCreateWithoutMoviesInput;
  where: CrewMemberRoleWhereUniqueInput;
};

export type CrewMemberRoleCreateOrConnectWithoutShowsInput = {
  create: CrewMemberRoleCreateWithoutShowsInput;
  where: CrewMemberRoleWhereUniqueInput;
};

export type CrewMemberRoleCreateWithoutMoviesInput = {
  id?: InputMaybe<Scalars['String']>;
  shows?: InputMaybe<ShowCrewMemberCreateNestedManyWithoutTypeInput>;
  type: Scalars['String'];
};

export type CrewMemberRoleCreateWithoutShowsInput = {
  id?: InputMaybe<Scalars['String']>;
  movies?: InputMaybe<MovieCrewMemberCreateNestedManyWithoutRoleInput>;
  type: Scalars['String'];
};

export type CrewMemberRoleListRelationFilter = {
  every?: InputMaybe<CrewMemberRoleWhereInput>;
  none?: InputMaybe<CrewMemberRoleWhereInput>;
  some?: InputMaybe<CrewMemberRoleWhereInput>;
};

export type CrewMemberRoleScalarWhereInput = {
  AND?: InputMaybe<Array<CrewMemberRoleScalarWhereInput>>;
  NOT?: InputMaybe<Array<CrewMemberRoleScalarWhereInput>>;
  OR?: InputMaybe<Array<CrewMemberRoleScalarWhereInput>>;
  id?: InputMaybe<UuidFilter>;
  type?: InputMaybe<StringFilter>;
};

export type CrewMemberRoleUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CrewMemberRoleUpdateManyWithWhereWithoutMoviesInput = {
  data: CrewMemberRoleUpdateManyMutationInput;
  where: CrewMemberRoleScalarWhereInput;
};

export type CrewMemberRoleUpdateManyWithWhereWithoutShowsInput = {
  data: CrewMemberRoleUpdateManyMutationInput;
  where: CrewMemberRoleScalarWhereInput;
};

export type CrewMemberRoleUpdateManyWithoutMoviesNestedInput = {
  connect?: InputMaybe<Array<CrewMemberRoleWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CrewMemberRoleCreateOrConnectWithoutMoviesInput>>;
  create?: InputMaybe<Array<CrewMemberRoleCreateWithoutMoviesInput>>;
  delete?: InputMaybe<Array<CrewMemberRoleWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CrewMemberRoleScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CrewMemberRoleWhereUniqueInput>>;
  set?: InputMaybe<Array<CrewMemberRoleWhereUniqueInput>>;
  update?: InputMaybe<Array<CrewMemberRoleUpdateWithWhereUniqueWithoutMoviesInput>>;
  updateMany?: InputMaybe<Array<CrewMemberRoleUpdateManyWithWhereWithoutMoviesInput>>;
  upsert?: InputMaybe<Array<CrewMemberRoleUpsertWithWhereUniqueWithoutMoviesInput>>;
};

export type CrewMemberRoleUpdateManyWithoutShowsNestedInput = {
  connect?: InputMaybe<Array<CrewMemberRoleWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CrewMemberRoleCreateOrConnectWithoutShowsInput>>;
  create?: InputMaybe<Array<CrewMemberRoleCreateWithoutShowsInput>>;
  delete?: InputMaybe<Array<CrewMemberRoleWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CrewMemberRoleScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CrewMemberRoleWhereUniqueInput>>;
  set?: InputMaybe<Array<CrewMemberRoleWhereUniqueInput>>;
  update?: InputMaybe<Array<CrewMemberRoleUpdateWithWhereUniqueWithoutShowsInput>>;
  updateMany?: InputMaybe<Array<CrewMemberRoleUpdateManyWithWhereWithoutShowsInput>>;
  upsert?: InputMaybe<Array<CrewMemberRoleUpsertWithWhereUniqueWithoutShowsInput>>;
};

export type CrewMemberRoleUpdateWithWhereUniqueWithoutMoviesInput = {
  data: CrewMemberRoleUpdateWithoutMoviesInput;
  where: CrewMemberRoleWhereUniqueInput;
};

export type CrewMemberRoleUpdateWithWhereUniqueWithoutShowsInput = {
  data: CrewMemberRoleUpdateWithoutShowsInput;
  where: CrewMemberRoleWhereUniqueInput;
};

export type CrewMemberRoleUpdateWithoutMoviesInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  shows?: InputMaybe<ShowCrewMemberUpdateManyWithoutTypeNestedInput>;
  type?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CrewMemberRoleUpdateWithoutShowsInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  movies?: InputMaybe<MovieCrewMemberUpdateManyWithoutRoleNestedInput>;
  type?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type CrewMemberRoleUpsertWithWhereUniqueWithoutMoviesInput = {
  create: CrewMemberRoleCreateWithoutMoviesInput;
  update: CrewMemberRoleUpdateWithoutMoviesInput;
  where: CrewMemberRoleWhereUniqueInput;
};

export type CrewMemberRoleUpsertWithWhereUniqueWithoutShowsInput = {
  create: CrewMemberRoleCreateWithoutShowsInput;
  update: CrewMemberRoleUpdateWithoutShowsInput;
  where: CrewMemberRoleWhereUniqueInput;
};

export type CrewMemberRoleWhereInput = {
  AND?: InputMaybe<Array<CrewMemberRoleWhereInput>>;
  NOT?: InputMaybe<Array<CrewMemberRoleWhereInput>>;
  OR?: InputMaybe<Array<CrewMemberRoleWhereInput>>;
  id?: InputMaybe<UuidFilter>;
  movies?: InputMaybe<MovieCrewMemberListRelationFilter>;
  shows?: InputMaybe<ShowCrewMemberListRelationFilter>;
  type?: InputMaybe<StringFilter>;
};

export type CrewMemberRoleWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type EnumAgeRatingNullableFilter = {
  equals?: InputMaybe<AgeRating>;
  in?: InputMaybe<Array<AgeRating>>;
  not?: InputMaybe<NestedEnumAgeRatingNullableFilter>;
  notIn?: InputMaybe<Array<AgeRating>>;
};

export type EnumMediaTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<MediaType>;
};

export type EnumMediaTypeFilter = {
  equals?: InputMaybe<MediaType>;
  in?: InputMaybe<Array<MediaType>>;
  not?: InputMaybe<NestedEnumMediaTypeFilter>;
  notIn?: InputMaybe<Array<MediaType>>;
};

export type EnumRoleFieldUpdateOperationsInput = {
  set?: InputMaybe<Role>;
};

export type EnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type EnumStatusNullableFilter = {
  equals?: InputMaybe<Status>;
  in?: InputMaybe<Array<Status>>;
  not?: InputMaybe<NestedEnumStatusNullableFilter>;
  notIn?: InputMaybe<Array<Status>>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type Genre = {
  __typename?: 'Genre';
  _count?: Maybe<GenreCount>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type GenreCount = {
  __typename?: 'GenreCount';
  movies: Scalars['Int'];
  shows: Scalars['Int'];
};

export type GenreCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutGenresInput>;
  name: Scalars['String'];
  shows?: InputMaybe<ShowCreateNestedManyWithoutGenresInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type GenreCreateNestedManyWithoutMoviesInput = {
  connect?: InputMaybe<Array<GenreWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GenreCreateOrConnectWithoutMoviesInput>>;
  create?: InputMaybe<Array<GenreCreateWithoutMoviesInput>>;
};

export type GenreCreateNestedManyWithoutShowsInput = {
  connect?: InputMaybe<Array<GenreWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GenreCreateOrConnectWithoutShowsInput>>;
  create?: InputMaybe<Array<GenreCreateWithoutShowsInput>>;
};

export type GenreCreateOrConnectWithoutMoviesInput = {
  create: GenreCreateWithoutMoviesInput;
  where: GenreWhereUniqueInput;
};

export type GenreCreateOrConnectWithoutShowsInput = {
  create: GenreCreateWithoutShowsInput;
  where: GenreWhereUniqueInput;
};

export type GenreCreateWithoutMoviesInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  shows?: InputMaybe<ShowCreateNestedManyWithoutGenresInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type GenreCreateWithoutShowsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutGenresInput>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type GenreListRelationFilter = {
  every?: InputMaybe<GenreWhereInput>;
  none?: InputMaybe<GenreWhereInput>;
  some?: InputMaybe<GenreWhereInput>;
};

export type GenreOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type GenreScalarWhereInput = {
  AND?: InputMaybe<Array<GenreScalarWhereInput>>;
  NOT?: InputMaybe<Array<GenreScalarWhereInput>>;
  OR?: InputMaybe<Array<GenreScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GenreUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutGenresNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  shows?: InputMaybe<ShowUpdateManyWithoutGenresNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GenreUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GenreUpdateManyWithWhereWithoutMoviesInput = {
  data: GenreUpdateManyMutationInput;
  where: GenreScalarWhereInput;
};

export type GenreUpdateManyWithWhereWithoutShowsInput = {
  data: GenreUpdateManyMutationInput;
  where: GenreScalarWhereInput;
};

export type GenreUpdateManyWithoutMoviesNestedInput = {
  connect?: InputMaybe<Array<GenreWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GenreCreateOrConnectWithoutMoviesInput>>;
  create?: InputMaybe<Array<GenreCreateWithoutMoviesInput>>;
  delete?: InputMaybe<Array<GenreWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<GenreScalarWhereInput>>;
  disconnect?: InputMaybe<Array<GenreWhereUniqueInput>>;
  set?: InputMaybe<Array<GenreWhereUniqueInput>>;
  update?: InputMaybe<Array<GenreUpdateWithWhereUniqueWithoutMoviesInput>>;
  updateMany?: InputMaybe<Array<GenreUpdateManyWithWhereWithoutMoviesInput>>;
  upsert?: InputMaybe<Array<GenreUpsertWithWhereUniqueWithoutMoviesInput>>;
};

export type GenreUpdateManyWithoutShowsNestedInput = {
  connect?: InputMaybe<Array<GenreWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GenreCreateOrConnectWithoutShowsInput>>;
  create?: InputMaybe<Array<GenreCreateWithoutShowsInput>>;
  delete?: InputMaybe<Array<GenreWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<GenreScalarWhereInput>>;
  disconnect?: InputMaybe<Array<GenreWhereUniqueInput>>;
  set?: InputMaybe<Array<GenreWhereUniqueInput>>;
  update?: InputMaybe<Array<GenreUpdateWithWhereUniqueWithoutShowsInput>>;
  updateMany?: InputMaybe<Array<GenreUpdateManyWithWhereWithoutShowsInput>>;
  upsert?: InputMaybe<Array<GenreUpsertWithWhereUniqueWithoutShowsInput>>;
};

export type GenreUpdateWithWhereUniqueWithoutMoviesInput = {
  data: GenreUpdateWithoutMoviesInput;
  where: GenreWhereUniqueInput;
};

export type GenreUpdateWithWhereUniqueWithoutShowsInput = {
  data: GenreUpdateWithoutShowsInput;
  where: GenreWhereUniqueInput;
};

export type GenreUpdateWithoutMoviesInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  shows?: InputMaybe<ShowUpdateManyWithoutGenresNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GenreUpdateWithoutShowsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutGenresNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GenreUpsertWithWhereUniqueWithoutMoviesInput = {
  create: GenreCreateWithoutMoviesInput;
  update: GenreUpdateWithoutMoviesInput;
  where: GenreWhereUniqueInput;
};

export type GenreUpsertWithWhereUniqueWithoutShowsInput = {
  create: GenreCreateWithoutShowsInput;
  update: GenreUpdateWithoutShowsInput;
  where: GenreWhereUniqueInput;
};

export type GenreWhereInput = {
  AND?: InputMaybe<Array<GenreWhereInput>>;
  NOT?: InputMaybe<Array<GenreWhereInput>>;
  OR?: InputMaybe<Array<GenreWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  movies?: InputMaybe<MovieListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  shows?: InputMaybe<ShowListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GenreWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type JsonFilter = {
  array_contains?: InputMaybe<Scalars['JSON']>;
  array_ends_with?: InputMaybe<Scalars['JSON']>;
  array_starts_with?: InputMaybe<Scalars['JSON']>;
  equals?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<Scalars['JSON']>;
  path?: InputMaybe<Array<Scalars['String']>>;
  string_contains?: InputMaybe<Scalars['String']>;
  string_ends_with?: InputMaybe<Scalars['String']>;
  string_starts_with?: InputMaybe<Scalars['String']>;
};

export type Keyword = {
  __typename?: 'Keyword';
  _count?: Maybe<KeywordCount>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  showId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type KeywordCount = {
  __typename?: 'KeywordCount';
  movies: Scalars['Int'];
};

export type KeywordCreateInput = {
  Show?: InputMaybe<ShowCreateNestedOneWithoutKeywordsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutKeywordsInput>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type KeywordCreateManyShowInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type KeywordCreateManyShowInputEnvelope = {
  data: Array<KeywordCreateManyShowInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type KeywordCreateNestedManyWithoutMoviesInput = {
  connect?: InputMaybe<Array<KeywordWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<KeywordCreateOrConnectWithoutMoviesInput>>;
  create?: InputMaybe<Array<KeywordCreateWithoutMoviesInput>>;
};

export type KeywordCreateNestedManyWithoutShowInput = {
  connect?: InputMaybe<Array<KeywordWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<KeywordCreateOrConnectWithoutShowInput>>;
  create?: InputMaybe<Array<KeywordCreateWithoutShowInput>>;
  createMany?: InputMaybe<KeywordCreateManyShowInputEnvelope>;
};

export type KeywordCreateOrConnectWithoutMoviesInput = {
  create: KeywordCreateWithoutMoviesInput;
  where: KeywordWhereUniqueInput;
};

export type KeywordCreateOrConnectWithoutShowInput = {
  create: KeywordCreateWithoutShowInput;
  where: KeywordWhereUniqueInput;
};

export type KeywordCreateWithoutMoviesInput = {
  Show?: InputMaybe<ShowCreateNestedOneWithoutKeywordsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type KeywordCreateWithoutShowInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutKeywordsInput>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type KeywordListRelationFilter = {
  every?: InputMaybe<KeywordWhereInput>;
  none?: InputMaybe<KeywordWhereInput>;
  some?: InputMaybe<KeywordWhereInput>;
};

export type KeywordOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type KeywordScalarWhereInput = {
  AND?: InputMaybe<Array<KeywordScalarWhereInput>>;
  NOT?: InputMaybe<Array<KeywordScalarWhereInput>>;
  OR?: InputMaybe<Array<KeywordScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  showId?: InputMaybe<UuidNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type KeywordUpdateInput = {
  Show?: InputMaybe<ShowUpdateOneWithoutKeywordsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutKeywordsNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type KeywordUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type KeywordUpdateManyWithWhereWithoutMoviesInput = {
  data: KeywordUpdateManyMutationInput;
  where: KeywordScalarWhereInput;
};

export type KeywordUpdateManyWithWhereWithoutShowInput = {
  data: KeywordUpdateManyMutationInput;
  where: KeywordScalarWhereInput;
};

export type KeywordUpdateManyWithoutMoviesNestedInput = {
  connect?: InputMaybe<Array<KeywordWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<KeywordCreateOrConnectWithoutMoviesInput>>;
  create?: InputMaybe<Array<KeywordCreateWithoutMoviesInput>>;
  delete?: InputMaybe<Array<KeywordWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<KeywordScalarWhereInput>>;
  disconnect?: InputMaybe<Array<KeywordWhereUniqueInput>>;
  set?: InputMaybe<Array<KeywordWhereUniqueInput>>;
  update?: InputMaybe<Array<KeywordUpdateWithWhereUniqueWithoutMoviesInput>>;
  updateMany?: InputMaybe<Array<KeywordUpdateManyWithWhereWithoutMoviesInput>>;
  upsert?: InputMaybe<Array<KeywordUpsertWithWhereUniqueWithoutMoviesInput>>;
};

export type KeywordUpdateManyWithoutShowNestedInput = {
  connect?: InputMaybe<Array<KeywordWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<KeywordCreateOrConnectWithoutShowInput>>;
  create?: InputMaybe<Array<KeywordCreateWithoutShowInput>>;
  createMany?: InputMaybe<KeywordCreateManyShowInputEnvelope>;
  delete?: InputMaybe<Array<KeywordWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<KeywordScalarWhereInput>>;
  disconnect?: InputMaybe<Array<KeywordWhereUniqueInput>>;
  set?: InputMaybe<Array<KeywordWhereUniqueInput>>;
  update?: InputMaybe<Array<KeywordUpdateWithWhereUniqueWithoutShowInput>>;
  updateMany?: InputMaybe<Array<KeywordUpdateManyWithWhereWithoutShowInput>>;
  upsert?: InputMaybe<Array<KeywordUpsertWithWhereUniqueWithoutShowInput>>;
};

export type KeywordUpdateWithWhereUniqueWithoutMoviesInput = {
  data: KeywordUpdateWithoutMoviesInput;
  where: KeywordWhereUniqueInput;
};

export type KeywordUpdateWithWhereUniqueWithoutShowInput = {
  data: KeywordUpdateWithoutShowInput;
  where: KeywordWhereUniqueInput;
};

export type KeywordUpdateWithoutMoviesInput = {
  Show?: InputMaybe<ShowUpdateOneWithoutKeywordsNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type KeywordUpdateWithoutShowInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutKeywordsNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type KeywordUpsertWithWhereUniqueWithoutMoviesInput = {
  create: KeywordCreateWithoutMoviesInput;
  update: KeywordUpdateWithoutMoviesInput;
  where: KeywordWhereUniqueInput;
};

export type KeywordUpsertWithWhereUniqueWithoutShowInput = {
  create: KeywordCreateWithoutShowInput;
  update: KeywordUpdateWithoutShowInput;
  where: KeywordWhereUniqueInput;
};

export type KeywordWhereInput = {
  AND?: InputMaybe<Array<KeywordWhereInput>>;
  NOT?: InputMaybe<Array<KeywordWhereInput>>;
  OR?: InputMaybe<Array<KeywordWhereInput>>;
  Show?: InputMaybe<ShowRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  movies?: InputMaybe<MovieListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  showId?: InputMaybe<UuidNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type KeywordWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type List = {
  __typename?: 'List';
  _count?: Maybe<ListCount>;
  backdrop?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  movies: Array<Movie>;
  public?: Maybe<Scalars['Boolean']>;
  shows: Array<Show>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};


export type ListMoviesArgs = {
  cursor?: InputMaybe<MovieWhereUniqueInput>;
  distinct?: InputMaybe<Array<MovieScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<MovieOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MovieWhereInput>;
};


export type ListShowsArgs = {
  cursor?: InputMaybe<ShowWhereUniqueInput>;
  distinct?: InputMaybe<Array<ShowScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ShowOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ShowWhereInput>;
};

export type ListCount = {
  __typename?: 'ListCount';
  movies: Scalars['Int'];
  shows: Scalars['Int'];
};

export type ListCreateManyUserInput = {
  backdrop?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ListCreateManyUserInputEnvelope = {
  data: Array<ListCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ListCreateNestedManyWithoutMoviesInput = {
  connect?: InputMaybe<Array<ListWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ListCreateOrConnectWithoutMoviesInput>>;
  create?: InputMaybe<Array<ListCreateWithoutMoviesInput>>;
};

export type ListCreateNestedManyWithoutShowsInput = {
  connect?: InputMaybe<Array<ListWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ListCreateOrConnectWithoutShowsInput>>;
  create?: InputMaybe<Array<ListCreateWithoutShowsInput>>;
};

export type ListCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ListWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ListCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ListCreateWithoutUserInput>>;
  createMany?: InputMaybe<ListCreateManyUserInputEnvelope>;
};

export type ListCreateOrConnectWithoutMoviesInput = {
  create: ListCreateWithoutMoviesInput;
  where: ListWhereUniqueInput;
};

export type ListCreateOrConnectWithoutShowsInput = {
  create: ListCreateWithoutShowsInput;
  where: ListWhereUniqueInput;
};

export type ListCreateOrConnectWithoutUserInput = {
  create: ListCreateWithoutUserInput;
  where: ListWhereUniqueInput;
};

export type ListCreateWithoutMoviesInput = {
  backdrop?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  shows?: InputMaybe<ShowCreateNestedManyWithoutListsInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutListsInput;
};

export type ListCreateWithoutShowsInput = {
  backdrop?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutListsInput>;
  public?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutListsInput;
};

export type ListCreateWithoutUserInput = {
  backdrop?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutListsInput>;
  public?: InputMaybe<Scalars['Boolean']>;
  shows?: InputMaybe<ShowCreateNestedManyWithoutListsInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ListInput = {
  backdrop?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type ListListRelationFilter = {
  every?: InputMaybe<ListWhereInput>;
  none?: InputMaybe<ListWhereInput>;
  some?: InputMaybe<ListWhereInput>;
};

export type ListOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ListScalarWhereInput = {
  AND?: InputMaybe<Array<ListScalarWhereInput>>;
  NOT?: InputMaybe<Array<ListScalarWhereInput>>;
  OR?: InputMaybe<Array<ListScalarWhereInput>>;
  backdrop?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<UuidFilter>;
  public?: InputMaybe<BoolNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type ListUpdateManyMutationInput = {
  backdrop?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  public?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ListUpdateManyWithWhereWithoutMoviesInput = {
  data: ListUpdateManyMutationInput;
  where: ListScalarWhereInput;
};

export type ListUpdateManyWithWhereWithoutShowsInput = {
  data: ListUpdateManyMutationInput;
  where: ListScalarWhereInput;
};

export type ListUpdateManyWithWhereWithoutUserInput = {
  data: ListUpdateManyMutationInput;
  where: ListScalarWhereInput;
};

export type ListUpdateManyWithoutMoviesNestedInput = {
  connect?: InputMaybe<Array<ListWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ListCreateOrConnectWithoutMoviesInput>>;
  create?: InputMaybe<Array<ListCreateWithoutMoviesInput>>;
  delete?: InputMaybe<Array<ListWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ListScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ListWhereUniqueInput>>;
  set?: InputMaybe<Array<ListWhereUniqueInput>>;
  update?: InputMaybe<Array<ListUpdateWithWhereUniqueWithoutMoviesInput>>;
  updateMany?: InputMaybe<Array<ListUpdateManyWithWhereWithoutMoviesInput>>;
  upsert?: InputMaybe<Array<ListUpsertWithWhereUniqueWithoutMoviesInput>>;
};

export type ListUpdateManyWithoutShowsNestedInput = {
  connect?: InputMaybe<Array<ListWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ListCreateOrConnectWithoutShowsInput>>;
  create?: InputMaybe<Array<ListCreateWithoutShowsInput>>;
  delete?: InputMaybe<Array<ListWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ListScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ListWhereUniqueInput>>;
  set?: InputMaybe<Array<ListWhereUniqueInput>>;
  update?: InputMaybe<Array<ListUpdateWithWhereUniqueWithoutShowsInput>>;
  updateMany?: InputMaybe<Array<ListUpdateManyWithWhereWithoutShowsInput>>;
  upsert?: InputMaybe<Array<ListUpsertWithWhereUniqueWithoutShowsInput>>;
};

export type ListUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<ListWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ListCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ListCreateWithoutUserInput>>;
  createMany?: InputMaybe<ListCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<ListWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ListScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ListWhereUniqueInput>>;
  set?: InputMaybe<Array<ListWhereUniqueInput>>;
  update?: InputMaybe<Array<ListUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<ListUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<ListUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ListUpdateWithWhereUniqueWithoutMoviesInput = {
  data: ListUpdateWithoutMoviesInput;
  where: ListWhereUniqueInput;
};

export type ListUpdateWithWhereUniqueWithoutShowsInput = {
  data: ListUpdateWithoutShowsInput;
  where: ListWhereUniqueInput;
};

export type ListUpdateWithWhereUniqueWithoutUserInput = {
  data: ListUpdateWithoutUserInput;
  where: ListWhereUniqueInput;
};

export type ListUpdateWithoutMoviesInput = {
  backdrop?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  public?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  shows?: InputMaybe<ShowUpdateManyWithoutListsNestedInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutListsNestedInput>;
};

export type ListUpdateWithoutShowsInput = {
  backdrop?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutListsNestedInput>;
  public?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutListsNestedInput>;
};

export type ListUpdateWithoutUserInput = {
  backdrop?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutListsNestedInput>;
  public?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  shows?: InputMaybe<ShowUpdateManyWithoutListsNestedInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ListUpsertWithWhereUniqueWithoutMoviesInput = {
  create: ListCreateWithoutMoviesInput;
  update: ListUpdateWithoutMoviesInput;
  where: ListWhereUniqueInput;
};

export type ListUpsertWithWhereUniqueWithoutShowsInput = {
  create: ListCreateWithoutShowsInput;
  update: ListUpdateWithoutShowsInput;
  where: ListWhereUniqueInput;
};

export type ListUpsertWithWhereUniqueWithoutUserInput = {
  create: ListCreateWithoutUserInput;
  update: ListUpdateWithoutUserInput;
  where: ListWhereUniqueInput;
};

export type ListWhereInput = {
  AND?: InputMaybe<Array<ListWhereInput>>;
  NOT?: InputMaybe<Array<ListWhereInput>>;
  OR?: InputMaybe<Array<ListWhereInput>>;
  backdrop?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<UuidFilter>;
  movies?: InputMaybe<MovieListRelationFilter>;
  public?: InputMaybe<BoolNullableFilter>;
  shows?: InputMaybe<ShowListRelationFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type ListWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Log = {
  __typename?: 'Log';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  key: Scalars['String'];
  mediaId: Scalars['String'];
  type: MediaType;
  userId: Scalars['String'];
  value: Scalars['JSON'];
};

export type LogCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  key: Scalars['String'];
  mediaId: Scalars['String'];
  type: MediaType;
  value: Scalars['JSON'];
};

export type LogCreateManyUserInputEnvelope = {
  data: Array<LogCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type LogCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<LogWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LogCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<LogCreateWithoutUserInput>>;
  createMany?: InputMaybe<LogCreateManyUserInputEnvelope>;
};

export type LogCreateOrConnectWithoutUserInput = {
  create: LogCreateWithoutUserInput;
  where: LogWhereUniqueInput;
};

export type LogCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  key: Scalars['String'];
  mediaId: Scalars['String'];
  type: MediaType;
  value: Scalars['JSON'];
};

export type LogListRelationFilter = {
  every?: InputMaybe<LogWhereInput>;
  none?: InputMaybe<LogWhereInput>;
  some?: InputMaybe<LogWhereInput>;
};

export type LogOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type LogScalarWhereInput = {
  AND?: InputMaybe<Array<LogScalarWhereInput>>;
  NOT?: InputMaybe<Array<LogScalarWhereInput>>;
  OR?: InputMaybe<Array<LogScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  key?: InputMaybe<StringFilter>;
  mediaId?: InputMaybe<UuidFilter>;
  type?: InputMaybe<EnumMediaTypeFilter>;
  userId?: InputMaybe<UuidFilter>;
  value?: InputMaybe<JsonFilter>;
};

export type LogUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  key?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaId?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumMediaTypeFieldUpdateOperationsInput>;
  value?: InputMaybe<Scalars['JSON']>;
};

export type LogUpdateManyWithWhereWithoutUserInput = {
  data: LogUpdateManyMutationInput;
  where: LogScalarWhereInput;
};

export type LogUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<LogWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LogCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<LogCreateWithoutUserInput>>;
  createMany?: InputMaybe<LogCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<LogWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<LogScalarWhereInput>>;
  disconnect?: InputMaybe<Array<LogWhereUniqueInput>>;
  set?: InputMaybe<Array<LogWhereUniqueInput>>;
  update?: InputMaybe<Array<LogUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<LogUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<LogUpsertWithWhereUniqueWithoutUserInput>>;
};

export type LogUpdateWithWhereUniqueWithoutUserInput = {
  data: LogUpdateWithoutUserInput;
  where: LogWhereUniqueInput;
};

export type LogUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  key?: InputMaybe<StringFieldUpdateOperationsInput>;
  mediaId?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumMediaTypeFieldUpdateOperationsInput>;
  value?: InputMaybe<Scalars['JSON']>;
};

export type LogUpsertWithWhereUniqueWithoutUserInput = {
  create: LogCreateWithoutUserInput;
  update: LogUpdateWithoutUserInput;
  where: LogWhereUniqueInput;
};

export type LogWhereInput = {
  AND?: InputMaybe<Array<LogWhereInput>>;
  NOT?: InputMaybe<Array<LogWhereInput>>;
  OR?: InputMaybe<Array<LogWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  key?: InputMaybe<StringFilter>;
  mediaId?: InputMaybe<UuidFilter>;
  type?: InputMaybe<EnumMediaTypeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
  value?: InputMaybe<JsonFilter>;
};

export type LogWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum MediaType {
  Book = 'BOOK',
  Movie = 'MOVIE',
  Person = 'PERSON',
  Show = 'SHOW',
  Song = 'SONG'
}

export type Movie = {
  __typename?: 'Movie';
  _count?: Maybe<MovieCount>;
  adult?: Maybe<Scalars['Boolean']>;
  age_rating?: Maybe<AgeRating>;
  backdrops: Array<Scalars['String']>;
  budget?: Maybe<Scalars['Int']>;
  characters: Array<MovieCharacter>;
  contentScore?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  genres: Array<Genre>;
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  keywords: Array<Keyword>;
  language?: Maybe<Scalars['String']>;
  locked: Array<Scalars['String']>;
  overview: Scalars['String'];
  popularity?: Maybe<Scalars['Float']>;
  posters: Array<Scalars['String']>;
  rating: MovieRatingAverage;
  releaseDate?: Maybe<Scalars['DateTime']>;
  revenue?: Maybe<Scalars['Int']>;
  runtime?: Maybe<Scalars['Int']>;
  status?: Maybe<Status>;
  tagline?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  videos: Array<Scalars['String']>;
};

export type MovieCharacter = {
  __typename?: 'MovieCharacter';
  movie: Movie;
  movieId: Scalars['String'];
  name: Scalars['String'];
  personId: Scalars['String'];
};

export type MovieCharacterCreateManyMovieInput = {
  name: Scalars['String'];
  personId: Scalars['String'];
};

export type MovieCharacterCreateManyMovieInputEnvelope = {
  data: Array<MovieCharacterCreateManyMovieInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MovieCharacterCreateManyPersonInput = {
  movieId: Scalars['String'];
  name: Scalars['String'];
};

export type MovieCharacterCreateManyPersonInputEnvelope = {
  data: Array<MovieCharacterCreateManyPersonInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MovieCharacterCreateNestedManyWithoutMovieInput = {
  connect?: InputMaybe<Array<MovieCharacterWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCharacterCreateOrConnectWithoutMovieInput>>;
  create?: InputMaybe<Array<MovieCharacterCreateWithoutMovieInput>>;
  createMany?: InputMaybe<MovieCharacterCreateManyMovieInputEnvelope>;
};

export type MovieCharacterCreateNestedManyWithoutPersonInput = {
  connect?: InputMaybe<Array<MovieCharacterWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCharacterCreateOrConnectWithoutPersonInput>>;
  create?: InputMaybe<Array<MovieCharacterCreateWithoutPersonInput>>;
  createMany?: InputMaybe<MovieCharacterCreateManyPersonInputEnvelope>;
};

export type MovieCharacterCreateOrConnectWithoutMovieInput = {
  create: MovieCharacterCreateWithoutMovieInput;
  where: MovieCharacterWhereUniqueInput;
};

export type MovieCharacterCreateOrConnectWithoutPersonInput = {
  create: MovieCharacterCreateWithoutPersonInput;
  where: MovieCharacterWhereUniqueInput;
};

export type MovieCharacterCreateWithoutMovieInput = {
  name: Scalars['String'];
  person: PersonCreateNestedOneWithoutMoviesInput;
};

export type MovieCharacterCreateWithoutPersonInput = {
  movie: MovieCreateNestedOneWithoutCharatersInput;
  name: Scalars['String'];
};

export type MovieCharacterInput = {
  movieId: Scalars['String'];
  name: Scalars['String'];
  personId: Scalars['String'];
};

export type MovieCharacterListRelationFilter = {
  every?: InputMaybe<MovieCharacterWhereInput>;
  none?: InputMaybe<MovieCharacterWhereInput>;
  some?: InputMaybe<MovieCharacterWhereInput>;
};

export type MovieCharacterOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type MovieCharacterPersonIdMovieIdCompoundUniqueInput = {
  movieId: Scalars['String'];
  personId: Scalars['String'];
};

export type MovieCharacterScalarWhereInput = {
  AND?: InputMaybe<Array<MovieCharacterScalarWhereInput>>;
  NOT?: InputMaybe<Array<MovieCharacterScalarWhereInput>>;
  OR?: InputMaybe<Array<MovieCharacterScalarWhereInput>>;
  movieId?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  personId?: InputMaybe<UuidFilter>;
};

export type MovieCharacterUpdateManyMutationInput = {
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type MovieCharacterUpdateManyWithWhereWithoutMovieInput = {
  data: MovieCharacterUpdateManyMutationInput;
  where: MovieCharacterScalarWhereInput;
};

export type MovieCharacterUpdateManyWithWhereWithoutPersonInput = {
  data: MovieCharacterUpdateManyMutationInput;
  where: MovieCharacterScalarWhereInput;
};

export type MovieCharacterUpdateManyWithoutMovieNestedInput = {
  connect?: InputMaybe<Array<MovieCharacterWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCharacterCreateOrConnectWithoutMovieInput>>;
  create?: InputMaybe<Array<MovieCharacterCreateWithoutMovieInput>>;
  createMany?: InputMaybe<MovieCharacterCreateManyMovieInputEnvelope>;
  delete?: InputMaybe<Array<MovieCharacterWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MovieCharacterScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MovieCharacterWhereUniqueInput>>;
  set?: InputMaybe<Array<MovieCharacterWhereUniqueInput>>;
  update?: InputMaybe<Array<MovieCharacterUpdateWithWhereUniqueWithoutMovieInput>>;
  updateMany?: InputMaybe<Array<MovieCharacterUpdateManyWithWhereWithoutMovieInput>>;
  upsert?: InputMaybe<Array<MovieCharacterUpsertWithWhereUniqueWithoutMovieInput>>;
};

export type MovieCharacterUpdateManyWithoutPersonNestedInput = {
  connect?: InputMaybe<Array<MovieCharacterWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCharacterCreateOrConnectWithoutPersonInput>>;
  create?: InputMaybe<Array<MovieCharacterCreateWithoutPersonInput>>;
  createMany?: InputMaybe<MovieCharacterCreateManyPersonInputEnvelope>;
  delete?: InputMaybe<Array<MovieCharacterWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MovieCharacterScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MovieCharacterWhereUniqueInput>>;
  set?: InputMaybe<Array<MovieCharacterWhereUniqueInput>>;
  update?: InputMaybe<Array<MovieCharacterUpdateWithWhereUniqueWithoutPersonInput>>;
  updateMany?: InputMaybe<Array<MovieCharacterUpdateManyWithWhereWithoutPersonInput>>;
  upsert?: InputMaybe<Array<MovieCharacterUpsertWithWhereUniqueWithoutPersonInput>>;
};

export type MovieCharacterUpdateWithWhereUniqueWithoutMovieInput = {
  data: MovieCharacterUpdateWithoutMovieInput;
  where: MovieCharacterWhereUniqueInput;
};

export type MovieCharacterUpdateWithWhereUniqueWithoutPersonInput = {
  data: MovieCharacterUpdateWithoutPersonInput;
  where: MovieCharacterWhereUniqueInput;
};

export type MovieCharacterUpdateWithoutMovieInput = {
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  person?: InputMaybe<PersonUpdateOneRequiredWithoutMoviesNestedInput>;
};

export type MovieCharacterUpdateWithoutPersonInput = {
  movie?: InputMaybe<MovieUpdateOneRequiredWithoutCharatersNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type MovieCharacterUpsertWithWhereUniqueWithoutMovieInput = {
  create: MovieCharacterCreateWithoutMovieInput;
  update: MovieCharacterUpdateWithoutMovieInput;
  where: MovieCharacterWhereUniqueInput;
};

export type MovieCharacterUpsertWithWhereUniqueWithoutPersonInput = {
  create: MovieCharacterCreateWithoutPersonInput;
  update: MovieCharacterUpdateWithoutPersonInput;
  where: MovieCharacterWhereUniqueInput;
};

export type MovieCharacterWhereInput = {
  AND?: InputMaybe<Array<MovieCharacterWhereInput>>;
  NOT?: InputMaybe<Array<MovieCharacterWhereInput>>;
  OR?: InputMaybe<Array<MovieCharacterWhereInput>>;
  movie?: InputMaybe<MovieRelationFilter>;
  movieId?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  person?: InputMaybe<PersonRelationFilter>;
  personId?: InputMaybe<UuidFilter>;
};

export type MovieCharacterWhereUniqueInput = {
  personId_movieId?: InputMaybe<MovieCharacterPersonIdMovieIdCompoundUniqueInput>;
};

export type MovieCount = {
  __typename?: 'MovieCount';
  charaters: Scalars['Int'];
  crew: Scalars['Int'];
  genres: Scalars['Int'];
  keywords: Scalars['Int'];
  lists: Scalars['Int'];
  ratings: Scalars['Int'];
  reviews: Scalars['Int'];
  watchlists: Scalars['Int'];
};

export type MovieCreateManyUserInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<MovieCreatebackdropsInput>;
  budget?: InputMaybe<Scalars['Int']>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  overview: Scalars['String'];
  posters?: InputMaybe<MovieCreatepostersInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  revenue?: InputMaybe<Scalars['Int']>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  videos?: InputMaybe<MovieCreatevideosInput>;
};

export type MovieCreateManyUserInputEnvelope = {
  data: Array<MovieCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MovieCreateNestedManyWithoutGenresInput = {
  connect?: InputMaybe<Array<MovieWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCreateOrConnectWithoutGenresInput>>;
  create?: InputMaybe<Array<MovieCreateWithoutGenresInput>>;
};

export type MovieCreateNestedManyWithoutKeywordsInput = {
  connect?: InputMaybe<Array<MovieWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCreateOrConnectWithoutKeywordsInput>>;
  create?: InputMaybe<Array<MovieCreateWithoutKeywordsInput>>;
};

export type MovieCreateNestedManyWithoutListsInput = {
  connect?: InputMaybe<Array<MovieWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCreateOrConnectWithoutListsInput>>;
  create?: InputMaybe<Array<MovieCreateWithoutListsInput>>;
};

export type MovieCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<MovieWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<MovieCreateWithoutUserInput>>;
  createMany?: InputMaybe<MovieCreateManyUserInputEnvelope>;
};

export type MovieCreateNestedManyWithoutWatchlistsInput = {
  connect?: InputMaybe<Array<MovieWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCreateOrConnectWithoutWatchlistsInput>>;
  create?: InputMaybe<Array<MovieCreateWithoutWatchlistsInput>>;
};

export type MovieCreateNestedOneWithoutCharatersInput = {
  connect?: InputMaybe<MovieWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MovieCreateOrConnectWithoutCharatersInput>;
  create?: InputMaybe<MovieCreateWithoutCharatersInput>;
};

export type MovieCreateNestedOneWithoutCrewInput = {
  connect?: InputMaybe<MovieWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MovieCreateOrConnectWithoutCrewInput>;
  create?: InputMaybe<MovieCreateWithoutCrewInput>;
};

export type MovieCreateNestedOneWithoutRatingsInput = {
  connect?: InputMaybe<MovieWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MovieCreateOrConnectWithoutRatingsInput>;
  create?: InputMaybe<MovieCreateWithoutRatingsInput>;
};

export type MovieCreateNestedOneWithoutReviewsInput = {
  connect?: InputMaybe<MovieWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MovieCreateOrConnectWithoutReviewsInput>;
  create?: InputMaybe<MovieCreateWithoutReviewsInput>;
};

export type MovieCreateOrConnectWithoutCharatersInput = {
  create: MovieCreateWithoutCharatersInput;
  where: MovieWhereUniqueInput;
};

export type MovieCreateOrConnectWithoutCrewInput = {
  create: MovieCreateWithoutCrewInput;
  where: MovieWhereUniqueInput;
};

export type MovieCreateOrConnectWithoutGenresInput = {
  create: MovieCreateWithoutGenresInput;
  where: MovieWhereUniqueInput;
};

export type MovieCreateOrConnectWithoutKeywordsInput = {
  create: MovieCreateWithoutKeywordsInput;
  where: MovieWhereUniqueInput;
};

export type MovieCreateOrConnectWithoutListsInput = {
  create: MovieCreateWithoutListsInput;
  where: MovieWhereUniqueInput;
};

export type MovieCreateOrConnectWithoutRatingsInput = {
  create: MovieCreateWithoutRatingsInput;
  where: MovieWhereUniqueInput;
};

export type MovieCreateOrConnectWithoutReviewsInput = {
  create: MovieCreateWithoutReviewsInput;
  where: MovieWhereUniqueInput;
};

export type MovieCreateOrConnectWithoutUserInput = {
  create: MovieCreateWithoutUserInput;
  where: MovieWhereUniqueInput;
};

export type MovieCreateOrConnectWithoutWatchlistsInput = {
  create: MovieCreateWithoutWatchlistsInput;
  where: MovieWhereUniqueInput;
};

export type MovieCreateWithoutCharatersInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<MovieCreatebackdropsInput>;
  budget?: InputMaybe<Scalars['Int']>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crew?: InputMaybe<MovieCrewMemberCreateNestedManyWithoutMovieInput>;
  genres?: InputMaybe<GenreCreateNestedManyWithoutMoviesInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<KeywordCreateNestedManyWithoutMoviesInput>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutMoviesInput>;
  overview: Scalars['String'];
  posters?: InputMaybe<MovieCreatepostersInput>;
  ratings?: InputMaybe<MovieRatingCreateNestedManyWithoutMovieInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  revenue?: InputMaybe<Scalars['Int']>;
  reviews?: InputMaybe<MovieReviewCreateNestedManyWithoutMovieInput>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutMoviesInput;
  videos?: InputMaybe<MovieCreatevideosInput>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutMoviesInput>;
};

export type MovieCreateWithoutCrewInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<MovieCreatebackdropsInput>;
  budget?: InputMaybe<Scalars['Int']>;
  charaters?: InputMaybe<MovieCharacterCreateNestedManyWithoutMovieInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  genres?: InputMaybe<GenreCreateNestedManyWithoutMoviesInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<KeywordCreateNestedManyWithoutMoviesInput>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutMoviesInput>;
  overview: Scalars['String'];
  posters?: InputMaybe<MovieCreatepostersInput>;
  ratings?: InputMaybe<MovieRatingCreateNestedManyWithoutMovieInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  revenue?: InputMaybe<Scalars['Int']>;
  reviews?: InputMaybe<MovieReviewCreateNestedManyWithoutMovieInput>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutMoviesInput;
  videos?: InputMaybe<MovieCreatevideosInput>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutMoviesInput>;
};

export type MovieCreateWithoutGenresInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<MovieCreatebackdropsInput>;
  budget?: InputMaybe<Scalars['Int']>;
  charaters?: InputMaybe<MovieCharacterCreateNestedManyWithoutMovieInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crew?: InputMaybe<MovieCrewMemberCreateNestedManyWithoutMovieInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<KeywordCreateNestedManyWithoutMoviesInput>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutMoviesInput>;
  overview: Scalars['String'];
  posters?: InputMaybe<MovieCreatepostersInput>;
  ratings?: InputMaybe<MovieRatingCreateNestedManyWithoutMovieInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  revenue?: InputMaybe<Scalars['Int']>;
  reviews?: InputMaybe<MovieReviewCreateNestedManyWithoutMovieInput>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutMoviesInput;
  videos?: InputMaybe<MovieCreatevideosInput>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutMoviesInput>;
};

export type MovieCreateWithoutKeywordsInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<MovieCreatebackdropsInput>;
  budget?: InputMaybe<Scalars['Int']>;
  charaters?: InputMaybe<MovieCharacterCreateNestedManyWithoutMovieInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crew?: InputMaybe<MovieCrewMemberCreateNestedManyWithoutMovieInput>;
  genres?: InputMaybe<GenreCreateNestedManyWithoutMoviesInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutMoviesInput>;
  overview: Scalars['String'];
  posters?: InputMaybe<MovieCreatepostersInput>;
  ratings?: InputMaybe<MovieRatingCreateNestedManyWithoutMovieInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  revenue?: InputMaybe<Scalars['Int']>;
  reviews?: InputMaybe<MovieReviewCreateNestedManyWithoutMovieInput>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutMoviesInput;
  videos?: InputMaybe<MovieCreatevideosInput>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutMoviesInput>;
};

export type MovieCreateWithoutListsInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<MovieCreatebackdropsInput>;
  budget?: InputMaybe<Scalars['Int']>;
  charaters?: InputMaybe<MovieCharacterCreateNestedManyWithoutMovieInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crew?: InputMaybe<MovieCrewMemberCreateNestedManyWithoutMovieInput>;
  genres?: InputMaybe<GenreCreateNestedManyWithoutMoviesInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<KeywordCreateNestedManyWithoutMoviesInput>;
  language?: InputMaybe<Scalars['String']>;
  overview: Scalars['String'];
  posters?: InputMaybe<MovieCreatepostersInput>;
  ratings?: InputMaybe<MovieRatingCreateNestedManyWithoutMovieInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  revenue?: InputMaybe<Scalars['Int']>;
  reviews?: InputMaybe<MovieReviewCreateNestedManyWithoutMovieInput>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutMoviesInput;
  videos?: InputMaybe<MovieCreatevideosInput>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutMoviesInput>;
};

export type MovieCreateWithoutRatingsInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<MovieCreatebackdropsInput>;
  budget?: InputMaybe<Scalars['Int']>;
  charaters?: InputMaybe<MovieCharacterCreateNestedManyWithoutMovieInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crew?: InputMaybe<MovieCrewMemberCreateNestedManyWithoutMovieInput>;
  genres?: InputMaybe<GenreCreateNestedManyWithoutMoviesInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<KeywordCreateNestedManyWithoutMoviesInput>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutMoviesInput>;
  overview: Scalars['String'];
  posters?: InputMaybe<MovieCreatepostersInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  revenue?: InputMaybe<Scalars['Int']>;
  reviews?: InputMaybe<MovieReviewCreateNestedManyWithoutMovieInput>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutMoviesInput;
  videos?: InputMaybe<MovieCreatevideosInput>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutMoviesInput>;
};

export type MovieCreateWithoutReviewsInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<MovieCreatebackdropsInput>;
  budget?: InputMaybe<Scalars['Int']>;
  charaters?: InputMaybe<MovieCharacterCreateNestedManyWithoutMovieInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crew?: InputMaybe<MovieCrewMemberCreateNestedManyWithoutMovieInput>;
  genres?: InputMaybe<GenreCreateNestedManyWithoutMoviesInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<KeywordCreateNestedManyWithoutMoviesInput>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutMoviesInput>;
  overview: Scalars['String'];
  posters?: InputMaybe<MovieCreatepostersInput>;
  ratings?: InputMaybe<MovieRatingCreateNestedManyWithoutMovieInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  revenue?: InputMaybe<Scalars['Int']>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutMoviesInput;
  videos?: InputMaybe<MovieCreatevideosInput>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutMoviesInput>;
};

export type MovieCreateWithoutUserInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<MovieCreatebackdropsInput>;
  budget?: InputMaybe<Scalars['Int']>;
  charaters?: InputMaybe<MovieCharacterCreateNestedManyWithoutMovieInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crew?: InputMaybe<MovieCrewMemberCreateNestedManyWithoutMovieInput>;
  genres?: InputMaybe<GenreCreateNestedManyWithoutMoviesInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<KeywordCreateNestedManyWithoutMoviesInput>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutMoviesInput>;
  overview: Scalars['String'];
  posters?: InputMaybe<MovieCreatepostersInput>;
  ratings?: InputMaybe<MovieRatingCreateNestedManyWithoutMovieInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  revenue?: InputMaybe<Scalars['Int']>;
  reviews?: InputMaybe<MovieReviewCreateNestedManyWithoutMovieInput>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  videos?: InputMaybe<MovieCreatevideosInput>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutMoviesInput>;
};

export type MovieCreateWithoutWatchlistsInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<MovieCreatebackdropsInput>;
  budget?: InputMaybe<Scalars['Int']>;
  charaters?: InputMaybe<MovieCharacterCreateNestedManyWithoutMovieInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crew?: InputMaybe<MovieCrewMemberCreateNestedManyWithoutMovieInput>;
  genres?: InputMaybe<GenreCreateNestedManyWithoutMoviesInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<KeywordCreateNestedManyWithoutMoviesInput>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutMoviesInput>;
  overview: Scalars['String'];
  posters?: InputMaybe<MovieCreatepostersInput>;
  ratings?: InputMaybe<MovieRatingCreateNestedManyWithoutMovieInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  revenue?: InputMaybe<Scalars['Int']>;
  reviews?: InputMaybe<MovieReviewCreateNestedManyWithoutMovieInput>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutMoviesInput;
  videos?: InputMaybe<MovieCreatevideosInput>;
};

export type MovieCreatebackdropsInput = {
  set: Array<Scalars['String']>;
};

export type MovieCreatepostersInput = {
  set: Array<Scalars['String']>;
};

export type MovieCreatevideosInput = {
  set: Array<Scalars['String']>;
};

export type MovieCrewMemberCreateManyMovieInput = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  personId: Scalars['String'];
};

export type MovieCrewMemberCreateManyMovieInputEnvelope = {
  data: Array<MovieCrewMemberCreateManyMovieInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MovieCrewMemberCreateManyPersonInput = {
  id?: InputMaybe<Scalars['String']>;
  movieId: Scalars['String'];
  name: Scalars['String'];
};

export type MovieCrewMemberCreateManyPersonInputEnvelope = {
  data: Array<MovieCrewMemberCreateManyPersonInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MovieCrewMemberCreateNestedManyWithoutMovieInput = {
  connect?: InputMaybe<Array<MovieCrewMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCrewMemberCreateOrConnectWithoutMovieInput>>;
  create?: InputMaybe<Array<MovieCrewMemberCreateWithoutMovieInput>>;
  createMany?: InputMaybe<MovieCrewMemberCreateManyMovieInputEnvelope>;
};

export type MovieCrewMemberCreateNestedManyWithoutPersonInput = {
  connect?: InputMaybe<Array<MovieCrewMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCrewMemberCreateOrConnectWithoutPersonInput>>;
  create?: InputMaybe<Array<MovieCrewMemberCreateWithoutPersonInput>>;
  createMany?: InputMaybe<MovieCrewMemberCreateManyPersonInputEnvelope>;
};

export type MovieCrewMemberCreateNestedManyWithoutRoleInput = {
  connect?: InputMaybe<Array<MovieCrewMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCrewMemberCreateOrConnectWithoutRoleInput>>;
  create?: InputMaybe<Array<MovieCrewMemberCreateWithoutRoleInput>>;
};

export type MovieCrewMemberCreateOrConnectWithoutMovieInput = {
  create: MovieCrewMemberCreateWithoutMovieInput;
  where: MovieCrewMemberWhereUniqueInput;
};

export type MovieCrewMemberCreateOrConnectWithoutPersonInput = {
  create: MovieCrewMemberCreateWithoutPersonInput;
  where: MovieCrewMemberWhereUniqueInput;
};

export type MovieCrewMemberCreateOrConnectWithoutRoleInput = {
  create: MovieCrewMemberCreateWithoutRoleInput;
  where: MovieCrewMemberWhereUniqueInput;
};

export type MovieCrewMemberCreateWithoutMovieInput = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  person: PersonCreateNestedOneWithoutMovieCrewsInput;
  role?: InputMaybe<CrewMemberRoleCreateNestedManyWithoutMoviesInput>;
};

export type MovieCrewMemberCreateWithoutPersonInput = {
  id?: InputMaybe<Scalars['String']>;
  movie: MovieCreateNestedOneWithoutCrewInput;
  name: Scalars['String'];
  role?: InputMaybe<CrewMemberRoleCreateNestedManyWithoutMoviesInput>;
};

export type MovieCrewMemberCreateWithoutRoleInput = {
  id?: InputMaybe<Scalars['String']>;
  movie: MovieCreateNestedOneWithoutCrewInput;
  name: Scalars['String'];
  person: PersonCreateNestedOneWithoutMovieCrewsInput;
};

export type MovieCrewMemberListRelationFilter = {
  every?: InputMaybe<MovieCrewMemberWhereInput>;
  none?: InputMaybe<MovieCrewMemberWhereInput>;
  some?: InputMaybe<MovieCrewMemberWhereInput>;
};

export type MovieCrewMemberOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type MovieCrewMemberPersonIdMovieIdCompoundUniqueInput = {
  movieId: Scalars['String'];
  personId: Scalars['String'];
};

export type MovieCrewMemberScalarWhereInput = {
  AND?: InputMaybe<Array<MovieCrewMemberScalarWhereInput>>;
  NOT?: InputMaybe<Array<MovieCrewMemberScalarWhereInput>>;
  OR?: InputMaybe<Array<MovieCrewMemberScalarWhereInput>>;
  id?: InputMaybe<UuidFilter>;
  movieId?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  personId?: InputMaybe<UuidFilter>;
};

export type MovieCrewMemberUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type MovieCrewMemberUpdateManyWithWhereWithoutMovieInput = {
  data: MovieCrewMemberUpdateManyMutationInput;
  where: MovieCrewMemberScalarWhereInput;
};

export type MovieCrewMemberUpdateManyWithWhereWithoutPersonInput = {
  data: MovieCrewMemberUpdateManyMutationInput;
  where: MovieCrewMemberScalarWhereInput;
};

export type MovieCrewMemberUpdateManyWithWhereWithoutRoleInput = {
  data: MovieCrewMemberUpdateManyMutationInput;
  where: MovieCrewMemberScalarWhereInput;
};

export type MovieCrewMemberUpdateManyWithoutMovieNestedInput = {
  connect?: InputMaybe<Array<MovieCrewMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCrewMemberCreateOrConnectWithoutMovieInput>>;
  create?: InputMaybe<Array<MovieCrewMemberCreateWithoutMovieInput>>;
  createMany?: InputMaybe<MovieCrewMemberCreateManyMovieInputEnvelope>;
  delete?: InputMaybe<Array<MovieCrewMemberWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MovieCrewMemberScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MovieCrewMemberWhereUniqueInput>>;
  set?: InputMaybe<Array<MovieCrewMemberWhereUniqueInput>>;
  update?: InputMaybe<Array<MovieCrewMemberUpdateWithWhereUniqueWithoutMovieInput>>;
  updateMany?: InputMaybe<Array<MovieCrewMemberUpdateManyWithWhereWithoutMovieInput>>;
  upsert?: InputMaybe<Array<MovieCrewMemberUpsertWithWhereUniqueWithoutMovieInput>>;
};

export type MovieCrewMemberUpdateManyWithoutPersonNestedInput = {
  connect?: InputMaybe<Array<MovieCrewMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCrewMemberCreateOrConnectWithoutPersonInput>>;
  create?: InputMaybe<Array<MovieCrewMemberCreateWithoutPersonInput>>;
  createMany?: InputMaybe<MovieCrewMemberCreateManyPersonInputEnvelope>;
  delete?: InputMaybe<Array<MovieCrewMemberWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MovieCrewMemberScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MovieCrewMemberWhereUniqueInput>>;
  set?: InputMaybe<Array<MovieCrewMemberWhereUniqueInput>>;
  update?: InputMaybe<Array<MovieCrewMemberUpdateWithWhereUniqueWithoutPersonInput>>;
  updateMany?: InputMaybe<Array<MovieCrewMemberUpdateManyWithWhereWithoutPersonInput>>;
  upsert?: InputMaybe<Array<MovieCrewMemberUpsertWithWhereUniqueWithoutPersonInput>>;
};

export type MovieCrewMemberUpdateManyWithoutRoleNestedInput = {
  connect?: InputMaybe<Array<MovieCrewMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCrewMemberCreateOrConnectWithoutRoleInput>>;
  create?: InputMaybe<Array<MovieCrewMemberCreateWithoutRoleInput>>;
  delete?: InputMaybe<Array<MovieCrewMemberWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MovieCrewMemberScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MovieCrewMemberWhereUniqueInput>>;
  set?: InputMaybe<Array<MovieCrewMemberWhereUniqueInput>>;
  update?: InputMaybe<Array<MovieCrewMemberUpdateWithWhereUniqueWithoutRoleInput>>;
  updateMany?: InputMaybe<Array<MovieCrewMemberUpdateManyWithWhereWithoutRoleInput>>;
  upsert?: InputMaybe<Array<MovieCrewMemberUpsertWithWhereUniqueWithoutRoleInput>>;
};

export type MovieCrewMemberUpdateWithWhereUniqueWithoutMovieInput = {
  data: MovieCrewMemberUpdateWithoutMovieInput;
  where: MovieCrewMemberWhereUniqueInput;
};

export type MovieCrewMemberUpdateWithWhereUniqueWithoutPersonInput = {
  data: MovieCrewMemberUpdateWithoutPersonInput;
  where: MovieCrewMemberWhereUniqueInput;
};

export type MovieCrewMemberUpdateWithWhereUniqueWithoutRoleInput = {
  data: MovieCrewMemberUpdateWithoutRoleInput;
  where: MovieCrewMemberWhereUniqueInput;
};

export type MovieCrewMemberUpdateWithoutMovieInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  person?: InputMaybe<PersonUpdateOneRequiredWithoutMovieCrewsNestedInput>;
  role?: InputMaybe<CrewMemberRoleUpdateManyWithoutMoviesNestedInput>;
};

export type MovieCrewMemberUpdateWithoutPersonInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  movie?: InputMaybe<MovieUpdateOneRequiredWithoutCrewNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<CrewMemberRoleUpdateManyWithoutMoviesNestedInput>;
};

export type MovieCrewMemberUpdateWithoutRoleInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  movie?: InputMaybe<MovieUpdateOneRequiredWithoutCrewNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  person?: InputMaybe<PersonUpdateOneRequiredWithoutMovieCrewsNestedInput>;
};

export type MovieCrewMemberUpsertWithWhereUniqueWithoutMovieInput = {
  create: MovieCrewMemberCreateWithoutMovieInput;
  update: MovieCrewMemberUpdateWithoutMovieInput;
  where: MovieCrewMemberWhereUniqueInput;
};

export type MovieCrewMemberUpsertWithWhereUniqueWithoutPersonInput = {
  create: MovieCrewMemberCreateWithoutPersonInput;
  update: MovieCrewMemberUpdateWithoutPersonInput;
  where: MovieCrewMemberWhereUniqueInput;
};

export type MovieCrewMemberUpsertWithWhereUniqueWithoutRoleInput = {
  create: MovieCrewMemberCreateWithoutRoleInput;
  update: MovieCrewMemberUpdateWithoutRoleInput;
  where: MovieCrewMemberWhereUniqueInput;
};

export type MovieCrewMemberWhereInput = {
  AND?: InputMaybe<Array<MovieCrewMemberWhereInput>>;
  NOT?: InputMaybe<Array<MovieCrewMemberWhereInput>>;
  OR?: InputMaybe<Array<MovieCrewMemberWhereInput>>;
  id?: InputMaybe<UuidFilter>;
  movie?: InputMaybe<MovieRelationFilter>;
  movieId?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  person?: InputMaybe<PersonRelationFilter>;
  personId?: InputMaybe<UuidFilter>;
  role?: InputMaybe<CrewMemberRoleListRelationFilter>;
};

export type MovieCrewMemberWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  personId_movieId?: InputMaybe<MovieCrewMemberPersonIdMovieIdCompoundUniqueInput>;
};

export type MovieInput = {
  overview: Scalars['String'];
  title: Scalars['String'];
};

export type MovieListRelationFilter = {
  every?: InputMaybe<MovieWhereInput>;
  none?: InputMaybe<MovieWhereInput>;
  some?: InputMaybe<MovieWhereInput>;
};

export type MovieOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type MovieOrderByWithRelationInput = {
  adult?: InputMaybe<SortOrder>;
  age_rating?: InputMaybe<SortOrder>;
  backdrops?: InputMaybe<SortOrder>;
  budget?: InputMaybe<SortOrder>;
  charaters?: InputMaybe<MovieCharacterOrderByRelationAggregateInput>;
  contentScore?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  crew?: InputMaybe<MovieCrewMemberOrderByRelationAggregateInput>;
  genres?: InputMaybe<GenreOrderByRelationAggregateInput>;
  homepage?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  keywords?: InputMaybe<KeywordOrderByRelationAggregateInput>;
  language?: InputMaybe<SortOrder>;
  lists?: InputMaybe<ListOrderByRelationAggregateInput>;
  locked?: InputMaybe<SortOrder>;
  overview?: InputMaybe<SortOrder>;
  popularity?: InputMaybe<SortOrder>;
  posters?: InputMaybe<SortOrder>;
  ratings?: InputMaybe<MovieRatingOrderByRelationAggregateInput>;
  releaseDate?: InputMaybe<SortOrder>;
  revenue?: InputMaybe<SortOrder>;
  reviews?: InputMaybe<MovieReviewOrderByRelationAggregateInput>;
  runtime?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  tagline?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
  videos?: InputMaybe<SortOrder>;
  watchlists?: InputMaybe<WatchlistOrderByRelationAggregateInput>;
};

export type MovieRating = {
  __typename?: 'MovieRating';
  createdAt: Scalars['DateTime'];
  movieId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  value: Scalars['Int'];
};

export type MovieRatingAverage = {
  __typename?: 'MovieRatingAverage';
  _avg?: Maybe<MovieRatingAvgAggregate>;
  _count?: Maybe<MovieRatingCountAggregate>;
};

export type MovieRatingAvgAggregate = {
  __typename?: 'MovieRatingAvgAggregate';
  value?: Maybe<Scalars['Float']>;
};

export type MovieRatingCountAggregate = {
  __typename?: 'MovieRatingCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  movieId: Scalars['Int'];
  updatedAt: Scalars['Int'];
  userId: Scalars['Int'];
  value: Scalars['Int'];
};

export type MovieRatingCreateManyMovieInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId: Scalars['String'];
  value: Scalars['Int'];
};

export type MovieRatingCreateManyMovieInputEnvelope = {
  data: Array<MovieRatingCreateManyMovieInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MovieRatingCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  movieId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  value: Scalars['Int'];
};

export type MovieRatingCreateManyUserInputEnvelope = {
  data: Array<MovieRatingCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MovieRatingCreateNestedManyWithoutMovieInput = {
  connect?: InputMaybe<Array<MovieRatingWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieRatingCreateOrConnectWithoutMovieInput>>;
  create?: InputMaybe<Array<MovieRatingCreateWithoutMovieInput>>;
  createMany?: InputMaybe<MovieRatingCreateManyMovieInputEnvelope>;
};

export type MovieRatingCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<MovieRatingWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieRatingCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<MovieRatingCreateWithoutUserInput>>;
  createMany?: InputMaybe<MovieRatingCreateManyUserInputEnvelope>;
};

export type MovieRatingCreateOrConnectWithoutMovieInput = {
  create: MovieRatingCreateWithoutMovieInput;
  where: MovieRatingWhereUniqueInput;
};

export type MovieRatingCreateOrConnectWithoutUserInput = {
  create: MovieRatingCreateWithoutUserInput;
  where: MovieRatingWhereUniqueInput;
};

export type MovieRatingCreateWithoutMovieInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutRatingsInput;
  value: Scalars['Int'];
};

export type MovieRatingCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  movie: MovieCreateNestedOneWithoutRatingsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  value: Scalars['Int'];
};

export type MovieRatingInput = {
  movieId: Scalars['String'];
  value: Scalars['Int'];
};

export type MovieRatingListRelationFilter = {
  every?: InputMaybe<MovieRatingWhereInput>;
  none?: InputMaybe<MovieRatingWhereInput>;
  some?: InputMaybe<MovieRatingWhereInput>;
};

export type MovieRatingOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type MovieRatingScalarWhereInput = {
  AND?: InputMaybe<Array<MovieRatingScalarWhereInput>>;
  NOT?: InputMaybe<Array<MovieRatingScalarWhereInput>>;
  OR?: InputMaybe<Array<MovieRatingScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  movieId?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<UuidFilter>;
  value?: InputMaybe<IntFilter>;
};

export type MovieRatingUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  value?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type MovieRatingUpdateManyWithWhereWithoutMovieInput = {
  data: MovieRatingUpdateManyMutationInput;
  where: MovieRatingScalarWhereInput;
};

export type MovieRatingUpdateManyWithWhereWithoutUserInput = {
  data: MovieRatingUpdateManyMutationInput;
  where: MovieRatingScalarWhereInput;
};

export type MovieRatingUpdateManyWithoutMovieNestedInput = {
  connect?: InputMaybe<Array<MovieRatingWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieRatingCreateOrConnectWithoutMovieInput>>;
  create?: InputMaybe<Array<MovieRatingCreateWithoutMovieInput>>;
  createMany?: InputMaybe<MovieRatingCreateManyMovieInputEnvelope>;
  delete?: InputMaybe<Array<MovieRatingWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MovieRatingScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MovieRatingWhereUniqueInput>>;
  set?: InputMaybe<Array<MovieRatingWhereUniqueInput>>;
  update?: InputMaybe<Array<MovieRatingUpdateWithWhereUniqueWithoutMovieInput>>;
  updateMany?: InputMaybe<Array<MovieRatingUpdateManyWithWhereWithoutMovieInput>>;
  upsert?: InputMaybe<Array<MovieRatingUpsertWithWhereUniqueWithoutMovieInput>>;
};

export type MovieRatingUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<MovieRatingWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieRatingCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<MovieRatingCreateWithoutUserInput>>;
  createMany?: InputMaybe<MovieRatingCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<MovieRatingWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MovieRatingScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MovieRatingWhereUniqueInput>>;
  set?: InputMaybe<Array<MovieRatingWhereUniqueInput>>;
  update?: InputMaybe<Array<MovieRatingUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<MovieRatingUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<MovieRatingUpsertWithWhereUniqueWithoutUserInput>>;
};

export type MovieRatingUpdateWithWhereUniqueWithoutMovieInput = {
  data: MovieRatingUpdateWithoutMovieInput;
  where: MovieRatingWhereUniqueInput;
};

export type MovieRatingUpdateWithWhereUniqueWithoutUserInput = {
  data: MovieRatingUpdateWithoutUserInput;
  where: MovieRatingWhereUniqueInput;
};

export type MovieRatingUpdateWithoutMovieInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutRatingsNestedInput>;
  value?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type MovieRatingUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  movie?: InputMaybe<MovieUpdateOneRequiredWithoutRatingsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  value?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type MovieRatingUpsertWithWhereUniqueWithoutMovieInput = {
  create: MovieRatingCreateWithoutMovieInput;
  update: MovieRatingUpdateWithoutMovieInput;
  where: MovieRatingWhereUniqueInput;
};

export type MovieRatingUpsertWithWhereUniqueWithoutUserInput = {
  create: MovieRatingCreateWithoutUserInput;
  update: MovieRatingUpdateWithoutUserInput;
  where: MovieRatingWhereUniqueInput;
};

export type MovieRatingUserIdMovieIdCompoundUniqueInput = {
  movieId: Scalars['String'];
  userId: Scalars['String'];
};

export type MovieRatingWhereInput = {
  AND?: InputMaybe<Array<MovieRatingWhereInput>>;
  NOT?: InputMaybe<Array<MovieRatingWhereInput>>;
  OR?: InputMaybe<Array<MovieRatingWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  movie?: InputMaybe<MovieRelationFilter>;
  movieId?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
  value?: InputMaybe<IntFilter>;
};

export type MovieRatingWhereUniqueInput = {
  userId_movieId?: InputMaybe<MovieRatingUserIdMovieIdCompoundUniqueInput>;
};

export type MovieRelationFilter = {
  is?: InputMaybe<MovieWhereInput>;
  isNot?: InputMaybe<MovieWhereInput>;
};

export type MovieReviewCreateManyMovieInput = {
  comment: Scalars['String'];
  userId: Scalars['String'];
};

export type MovieReviewCreateManyMovieInputEnvelope = {
  data: Array<MovieReviewCreateManyMovieInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MovieReviewCreateManyUserInput = {
  comment: Scalars['String'];
  movieId: Scalars['String'];
};

export type MovieReviewCreateManyUserInputEnvelope = {
  data: Array<MovieReviewCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MovieReviewCreateNestedManyWithoutMovieInput = {
  connect?: InputMaybe<Array<MovieReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieReviewCreateOrConnectWithoutMovieInput>>;
  create?: InputMaybe<Array<MovieReviewCreateWithoutMovieInput>>;
  createMany?: InputMaybe<MovieReviewCreateManyMovieInputEnvelope>;
};

export type MovieReviewCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<MovieReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieReviewCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<MovieReviewCreateWithoutUserInput>>;
  createMany?: InputMaybe<MovieReviewCreateManyUserInputEnvelope>;
};

export type MovieReviewCreateOrConnectWithoutMovieInput = {
  create: MovieReviewCreateWithoutMovieInput;
  where: MovieReviewWhereUniqueInput;
};

export type MovieReviewCreateOrConnectWithoutUserInput = {
  create: MovieReviewCreateWithoutUserInput;
  where: MovieReviewWhereUniqueInput;
};

export type MovieReviewCreateWithoutMovieInput = {
  comment: Scalars['String'];
  user: UserCreateNestedOneWithoutMovieReviewInput;
};

export type MovieReviewCreateWithoutUserInput = {
  comment: Scalars['String'];
  movie: MovieCreateNestedOneWithoutReviewsInput;
};

export type MovieReviewListRelationFilter = {
  every?: InputMaybe<MovieReviewWhereInput>;
  none?: InputMaybe<MovieReviewWhereInput>;
  some?: InputMaybe<MovieReviewWhereInput>;
};

export type MovieReviewOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type MovieReviewScalarWhereInput = {
  AND?: InputMaybe<Array<MovieReviewScalarWhereInput>>;
  NOT?: InputMaybe<Array<MovieReviewScalarWhereInput>>;
  OR?: InputMaybe<Array<MovieReviewScalarWhereInput>>;
  comment?: InputMaybe<StringFilter>;
  movieId?: InputMaybe<UuidFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type MovieReviewUpdateManyMutationInput = {
  comment?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type MovieReviewUpdateManyWithWhereWithoutMovieInput = {
  data: MovieReviewUpdateManyMutationInput;
  where: MovieReviewScalarWhereInput;
};

export type MovieReviewUpdateManyWithWhereWithoutUserInput = {
  data: MovieReviewUpdateManyMutationInput;
  where: MovieReviewScalarWhereInput;
};

export type MovieReviewUpdateManyWithoutMovieNestedInput = {
  connect?: InputMaybe<Array<MovieReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieReviewCreateOrConnectWithoutMovieInput>>;
  create?: InputMaybe<Array<MovieReviewCreateWithoutMovieInput>>;
  createMany?: InputMaybe<MovieReviewCreateManyMovieInputEnvelope>;
  delete?: InputMaybe<Array<MovieReviewWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MovieReviewScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MovieReviewWhereUniqueInput>>;
  set?: InputMaybe<Array<MovieReviewWhereUniqueInput>>;
  update?: InputMaybe<Array<MovieReviewUpdateWithWhereUniqueWithoutMovieInput>>;
  updateMany?: InputMaybe<Array<MovieReviewUpdateManyWithWhereWithoutMovieInput>>;
  upsert?: InputMaybe<Array<MovieReviewUpsertWithWhereUniqueWithoutMovieInput>>;
};

export type MovieReviewUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<MovieReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieReviewCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<MovieReviewCreateWithoutUserInput>>;
  createMany?: InputMaybe<MovieReviewCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<MovieReviewWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MovieReviewScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MovieReviewWhereUniqueInput>>;
  set?: InputMaybe<Array<MovieReviewWhereUniqueInput>>;
  update?: InputMaybe<Array<MovieReviewUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<MovieReviewUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<MovieReviewUpsertWithWhereUniqueWithoutUserInput>>;
};

export type MovieReviewUpdateWithWhereUniqueWithoutMovieInput = {
  data: MovieReviewUpdateWithoutMovieInput;
  where: MovieReviewWhereUniqueInput;
};

export type MovieReviewUpdateWithWhereUniqueWithoutUserInput = {
  data: MovieReviewUpdateWithoutUserInput;
  where: MovieReviewWhereUniqueInput;
};

export type MovieReviewUpdateWithoutMovieInput = {
  comment?: InputMaybe<StringFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutMovieReviewNestedInput>;
};

export type MovieReviewUpdateWithoutUserInput = {
  comment?: InputMaybe<StringFieldUpdateOperationsInput>;
  movie?: InputMaybe<MovieUpdateOneRequiredWithoutReviewsNestedInput>;
};

export type MovieReviewUpsertWithWhereUniqueWithoutMovieInput = {
  create: MovieReviewCreateWithoutMovieInput;
  update: MovieReviewUpdateWithoutMovieInput;
  where: MovieReviewWhereUniqueInput;
};

export type MovieReviewUpsertWithWhereUniqueWithoutUserInput = {
  create: MovieReviewCreateWithoutUserInput;
  update: MovieReviewUpdateWithoutUserInput;
  where: MovieReviewWhereUniqueInput;
};

export type MovieReviewUserIdMovieIdCompoundUniqueInput = {
  movieId: Scalars['String'];
  userId: Scalars['String'];
};

export type MovieReviewWhereInput = {
  AND?: InputMaybe<Array<MovieReviewWhereInput>>;
  NOT?: InputMaybe<Array<MovieReviewWhereInput>>;
  OR?: InputMaybe<Array<MovieReviewWhereInput>>;
  comment?: InputMaybe<StringFilter>;
  movie?: InputMaybe<MovieRelationFilter>;
  movieId?: InputMaybe<UuidFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type MovieReviewWhereUniqueInput = {
  userId_movieId?: InputMaybe<MovieReviewUserIdMovieIdCompoundUniqueInput>;
};

export enum MovieScalarFieldEnum {
  Adult = 'adult',
  AgeRating = 'age_rating',
  Backdrops = 'backdrops',
  Budget = 'budget',
  ContentScore = 'contentScore',
  CreatedAt = 'createdAt',
  Homepage = 'homepage',
  Id = 'id',
  Language = 'language',
  Locked = 'locked',
  Overview = 'overview',
  Popularity = 'popularity',
  Posters = 'posters',
  ReleaseDate = 'releaseDate',
  Revenue = 'revenue',
  Runtime = 'runtime',
  Status = 'status',
  Tagline = 'tagline',
  Title = 'title',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
  Videos = 'videos'
}

export type MovieScalarWhereInput = {
  AND?: InputMaybe<Array<MovieScalarWhereInput>>;
  NOT?: InputMaybe<Array<MovieScalarWhereInput>>;
  OR?: InputMaybe<Array<MovieScalarWhereInput>>;
  adult?: InputMaybe<BoolNullableFilter>;
  age_rating?: InputMaybe<EnumAgeRatingNullableFilter>;
  backdrops?: InputMaybe<StringNullableListFilter>;
  budget?: InputMaybe<IntNullableFilter>;
  contentScore?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  homepage?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<UuidFilter>;
  language?: InputMaybe<StringNullableFilter>;
  locked?: InputMaybe<StringNullableListFilter>;
  overview?: InputMaybe<StringFilter>;
  popularity?: InputMaybe<FloatNullableFilter>;
  posters?: InputMaybe<StringNullableListFilter>;
  releaseDate?: InputMaybe<DateTimeNullableFilter>;
  revenue?: InputMaybe<IntNullableFilter>;
  runtime?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<EnumStatusNullableFilter>;
  tagline?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<UuidFilter>;
  videos?: InputMaybe<StringNullableListFilter>;
};

export type MovieUpdateInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<MovieUpdatebackdropsInput>;
  budget?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  charaters?: InputMaybe<MovieCharacterUpdateManyWithoutMovieNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<MovieCrewMemberUpdateManyWithoutMovieNestedInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutMoviesNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutMoviesNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutMoviesNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<MovieUpdatepostersInput>;
  ratings?: InputMaybe<MovieRatingUpdateManyWithoutMovieNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  revenue?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  reviews?: InputMaybe<MovieReviewUpdateManyWithoutMovieNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutMoviesNestedInput>;
  videos?: InputMaybe<MovieUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutMoviesNestedInput>;
};

export type MovieUpdateManyMutationInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<MovieUpdatebackdropsInput>;
  budget?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<MovieUpdatepostersInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  revenue?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  videos?: InputMaybe<MovieUpdatevideosInput>;
};

export type MovieUpdateManyWithWhereWithoutGenresInput = {
  data: MovieUpdateManyMutationInput;
  where: MovieScalarWhereInput;
};

export type MovieUpdateManyWithWhereWithoutKeywordsInput = {
  data: MovieUpdateManyMutationInput;
  where: MovieScalarWhereInput;
};

export type MovieUpdateManyWithWhereWithoutListsInput = {
  data: MovieUpdateManyMutationInput;
  where: MovieScalarWhereInput;
};

export type MovieUpdateManyWithWhereWithoutUserInput = {
  data: MovieUpdateManyMutationInput;
  where: MovieScalarWhereInput;
};

export type MovieUpdateManyWithWhereWithoutWatchlistsInput = {
  data: MovieUpdateManyMutationInput;
  where: MovieScalarWhereInput;
};

export type MovieUpdateManyWithoutGenresNestedInput = {
  connect?: InputMaybe<Array<MovieWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCreateOrConnectWithoutGenresInput>>;
  create?: InputMaybe<Array<MovieCreateWithoutGenresInput>>;
  delete?: InputMaybe<Array<MovieWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MovieScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MovieWhereUniqueInput>>;
  set?: InputMaybe<Array<MovieWhereUniqueInput>>;
  update?: InputMaybe<Array<MovieUpdateWithWhereUniqueWithoutGenresInput>>;
  updateMany?: InputMaybe<Array<MovieUpdateManyWithWhereWithoutGenresInput>>;
  upsert?: InputMaybe<Array<MovieUpsertWithWhereUniqueWithoutGenresInput>>;
};

export type MovieUpdateManyWithoutKeywordsNestedInput = {
  connect?: InputMaybe<Array<MovieWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCreateOrConnectWithoutKeywordsInput>>;
  create?: InputMaybe<Array<MovieCreateWithoutKeywordsInput>>;
  delete?: InputMaybe<Array<MovieWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MovieScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MovieWhereUniqueInput>>;
  set?: InputMaybe<Array<MovieWhereUniqueInput>>;
  update?: InputMaybe<Array<MovieUpdateWithWhereUniqueWithoutKeywordsInput>>;
  updateMany?: InputMaybe<Array<MovieUpdateManyWithWhereWithoutKeywordsInput>>;
  upsert?: InputMaybe<Array<MovieUpsertWithWhereUniqueWithoutKeywordsInput>>;
};

export type MovieUpdateManyWithoutListsNestedInput = {
  connect?: InputMaybe<Array<MovieWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCreateOrConnectWithoutListsInput>>;
  create?: InputMaybe<Array<MovieCreateWithoutListsInput>>;
  delete?: InputMaybe<Array<MovieWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MovieScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MovieWhereUniqueInput>>;
  set?: InputMaybe<Array<MovieWhereUniqueInput>>;
  update?: InputMaybe<Array<MovieUpdateWithWhereUniqueWithoutListsInput>>;
  updateMany?: InputMaybe<Array<MovieUpdateManyWithWhereWithoutListsInput>>;
  upsert?: InputMaybe<Array<MovieUpsertWithWhereUniqueWithoutListsInput>>;
};

export type MovieUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<MovieWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<MovieCreateWithoutUserInput>>;
  createMany?: InputMaybe<MovieCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<MovieWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MovieScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MovieWhereUniqueInput>>;
  set?: InputMaybe<Array<MovieWhereUniqueInput>>;
  update?: InputMaybe<Array<MovieUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<MovieUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<MovieUpsertWithWhereUniqueWithoutUserInput>>;
};

export type MovieUpdateManyWithoutWatchlistsNestedInput = {
  connect?: InputMaybe<Array<MovieWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MovieCreateOrConnectWithoutWatchlistsInput>>;
  create?: InputMaybe<Array<MovieCreateWithoutWatchlistsInput>>;
  delete?: InputMaybe<Array<MovieWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MovieScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MovieWhereUniqueInput>>;
  set?: InputMaybe<Array<MovieWhereUniqueInput>>;
  update?: InputMaybe<Array<MovieUpdateWithWhereUniqueWithoutWatchlistsInput>>;
  updateMany?: InputMaybe<Array<MovieUpdateManyWithWhereWithoutWatchlistsInput>>;
  upsert?: InputMaybe<Array<MovieUpsertWithWhereUniqueWithoutWatchlistsInput>>;
};

export type MovieUpdateOneRequiredWithoutCharatersNestedInput = {
  connect?: InputMaybe<MovieWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MovieCreateOrConnectWithoutCharatersInput>;
  create?: InputMaybe<MovieCreateWithoutCharatersInput>;
  update?: InputMaybe<MovieUpdateWithoutCharatersInput>;
  upsert?: InputMaybe<MovieUpsertWithoutCharatersInput>;
};

export type MovieUpdateOneRequiredWithoutCrewNestedInput = {
  connect?: InputMaybe<MovieWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MovieCreateOrConnectWithoutCrewInput>;
  create?: InputMaybe<MovieCreateWithoutCrewInput>;
  update?: InputMaybe<MovieUpdateWithoutCrewInput>;
  upsert?: InputMaybe<MovieUpsertWithoutCrewInput>;
};

export type MovieUpdateOneRequiredWithoutRatingsNestedInput = {
  connect?: InputMaybe<MovieWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MovieCreateOrConnectWithoutRatingsInput>;
  create?: InputMaybe<MovieCreateWithoutRatingsInput>;
  update?: InputMaybe<MovieUpdateWithoutRatingsInput>;
  upsert?: InputMaybe<MovieUpsertWithoutRatingsInput>;
};

export type MovieUpdateOneRequiredWithoutReviewsNestedInput = {
  connect?: InputMaybe<MovieWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MovieCreateOrConnectWithoutReviewsInput>;
  create?: InputMaybe<MovieCreateWithoutReviewsInput>;
  update?: InputMaybe<MovieUpdateWithoutReviewsInput>;
  upsert?: InputMaybe<MovieUpsertWithoutReviewsInput>;
};

export type MovieUpdateWithWhereUniqueWithoutGenresInput = {
  data: MovieUpdateWithoutGenresInput;
  where: MovieWhereUniqueInput;
};

export type MovieUpdateWithWhereUniqueWithoutKeywordsInput = {
  data: MovieUpdateWithoutKeywordsInput;
  where: MovieWhereUniqueInput;
};

export type MovieUpdateWithWhereUniqueWithoutListsInput = {
  data: MovieUpdateWithoutListsInput;
  where: MovieWhereUniqueInput;
};

export type MovieUpdateWithWhereUniqueWithoutUserInput = {
  data: MovieUpdateWithoutUserInput;
  where: MovieWhereUniqueInput;
};

export type MovieUpdateWithWhereUniqueWithoutWatchlistsInput = {
  data: MovieUpdateWithoutWatchlistsInput;
  where: MovieWhereUniqueInput;
};

export type MovieUpdateWithoutCharatersInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<MovieUpdatebackdropsInput>;
  budget?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<MovieCrewMemberUpdateManyWithoutMovieNestedInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutMoviesNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutMoviesNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutMoviesNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<MovieUpdatepostersInput>;
  ratings?: InputMaybe<MovieRatingUpdateManyWithoutMovieNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  revenue?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  reviews?: InputMaybe<MovieReviewUpdateManyWithoutMovieNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutMoviesNestedInput>;
  videos?: InputMaybe<MovieUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutMoviesNestedInput>;
};

export type MovieUpdateWithoutCrewInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<MovieUpdatebackdropsInput>;
  budget?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  charaters?: InputMaybe<MovieCharacterUpdateManyWithoutMovieNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutMoviesNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutMoviesNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutMoviesNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<MovieUpdatepostersInput>;
  ratings?: InputMaybe<MovieRatingUpdateManyWithoutMovieNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  revenue?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  reviews?: InputMaybe<MovieReviewUpdateManyWithoutMovieNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutMoviesNestedInput>;
  videos?: InputMaybe<MovieUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutMoviesNestedInput>;
};

export type MovieUpdateWithoutGenresInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<MovieUpdatebackdropsInput>;
  budget?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  charaters?: InputMaybe<MovieCharacterUpdateManyWithoutMovieNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<MovieCrewMemberUpdateManyWithoutMovieNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutMoviesNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutMoviesNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<MovieUpdatepostersInput>;
  ratings?: InputMaybe<MovieRatingUpdateManyWithoutMovieNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  revenue?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  reviews?: InputMaybe<MovieReviewUpdateManyWithoutMovieNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutMoviesNestedInput>;
  videos?: InputMaybe<MovieUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutMoviesNestedInput>;
};

export type MovieUpdateWithoutKeywordsInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<MovieUpdatebackdropsInput>;
  budget?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  charaters?: InputMaybe<MovieCharacterUpdateManyWithoutMovieNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<MovieCrewMemberUpdateManyWithoutMovieNestedInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutMoviesNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutMoviesNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<MovieUpdatepostersInput>;
  ratings?: InputMaybe<MovieRatingUpdateManyWithoutMovieNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  revenue?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  reviews?: InputMaybe<MovieReviewUpdateManyWithoutMovieNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutMoviesNestedInput>;
  videos?: InputMaybe<MovieUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutMoviesNestedInput>;
};

export type MovieUpdateWithoutListsInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<MovieUpdatebackdropsInput>;
  budget?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  charaters?: InputMaybe<MovieCharacterUpdateManyWithoutMovieNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<MovieCrewMemberUpdateManyWithoutMovieNestedInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutMoviesNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutMoviesNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<MovieUpdatepostersInput>;
  ratings?: InputMaybe<MovieRatingUpdateManyWithoutMovieNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  revenue?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  reviews?: InputMaybe<MovieReviewUpdateManyWithoutMovieNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutMoviesNestedInput>;
  videos?: InputMaybe<MovieUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutMoviesNestedInput>;
};

export type MovieUpdateWithoutRatingsInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<MovieUpdatebackdropsInput>;
  budget?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  charaters?: InputMaybe<MovieCharacterUpdateManyWithoutMovieNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<MovieCrewMemberUpdateManyWithoutMovieNestedInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutMoviesNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutMoviesNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutMoviesNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<MovieUpdatepostersInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  revenue?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  reviews?: InputMaybe<MovieReviewUpdateManyWithoutMovieNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutMoviesNestedInput>;
  videos?: InputMaybe<MovieUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutMoviesNestedInput>;
};

export type MovieUpdateWithoutReviewsInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<MovieUpdatebackdropsInput>;
  budget?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  charaters?: InputMaybe<MovieCharacterUpdateManyWithoutMovieNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<MovieCrewMemberUpdateManyWithoutMovieNestedInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutMoviesNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutMoviesNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutMoviesNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<MovieUpdatepostersInput>;
  ratings?: InputMaybe<MovieRatingUpdateManyWithoutMovieNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  revenue?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutMoviesNestedInput>;
  videos?: InputMaybe<MovieUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutMoviesNestedInput>;
};

export type MovieUpdateWithoutUserInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<MovieUpdatebackdropsInput>;
  budget?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  charaters?: InputMaybe<MovieCharacterUpdateManyWithoutMovieNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<MovieCrewMemberUpdateManyWithoutMovieNestedInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutMoviesNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutMoviesNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutMoviesNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<MovieUpdatepostersInput>;
  ratings?: InputMaybe<MovieRatingUpdateManyWithoutMovieNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  revenue?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  reviews?: InputMaybe<MovieReviewUpdateManyWithoutMovieNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  videos?: InputMaybe<MovieUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutMoviesNestedInput>;
};

export type MovieUpdateWithoutWatchlistsInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<MovieUpdatebackdropsInput>;
  budget?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  charaters?: InputMaybe<MovieCharacterUpdateManyWithoutMovieNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<MovieCrewMemberUpdateManyWithoutMovieNestedInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutMoviesNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutMoviesNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutMoviesNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<MovieUpdatepostersInput>;
  ratings?: InputMaybe<MovieRatingUpdateManyWithoutMovieNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  revenue?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  reviews?: InputMaybe<MovieReviewUpdateManyWithoutMovieNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutMoviesNestedInput>;
  videos?: InputMaybe<MovieUpdatevideosInput>;
};

export type MovieUpdatebackdropsInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type MovieUpdatelockedInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type MovieUpdatepostersInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type MovieUpdatevideosInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type MovieUpsertWithWhereUniqueWithoutGenresInput = {
  create: MovieCreateWithoutGenresInput;
  update: MovieUpdateWithoutGenresInput;
  where: MovieWhereUniqueInput;
};

export type MovieUpsertWithWhereUniqueWithoutKeywordsInput = {
  create: MovieCreateWithoutKeywordsInput;
  update: MovieUpdateWithoutKeywordsInput;
  where: MovieWhereUniqueInput;
};

export type MovieUpsertWithWhereUniqueWithoutListsInput = {
  create: MovieCreateWithoutListsInput;
  update: MovieUpdateWithoutListsInput;
  where: MovieWhereUniqueInput;
};

export type MovieUpsertWithWhereUniqueWithoutUserInput = {
  create: MovieCreateWithoutUserInput;
  update: MovieUpdateWithoutUserInput;
  where: MovieWhereUniqueInput;
};

export type MovieUpsertWithWhereUniqueWithoutWatchlistsInput = {
  create: MovieCreateWithoutWatchlistsInput;
  update: MovieUpdateWithoutWatchlistsInput;
  where: MovieWhereUniqueInput;
};

export type MovieUpsertWithoutCharatersInput = {
  create: MovieCreateWithoutCharatersInput;
  update: MovieUpdateWithoutCharatersInput;
};

export type MovieUpsertWithoutCrewInput = {
  create: MovieCreateWithoutCrewInput;
  update: MovieUpdateWithoutCrewInput;
};

export type MovieUpsertWithoutRatingsInput = {
  create: MovieCreateWithoutRatingsInput;
  update: MovieUpdateWithoutRatingsInput;
};

export type MovieUpsertWithoutReviewsInput = {
  create: MovieCreateWithoutReviewsInput;
  update: MovieUpdateWithoutReviewsInput;
};

export type MovieWhereInput = {
  AND?: InputMaybe<Array<MovieWhereInput>>;
  NOT?: InputMaybe<Array<MovieWhereInput>>;
  OR?: InputMaybe<Array<MovieWhereInput>>;
  adult?: InputMaybe<BoolNullableFilter>;
  age_rating?: InputMaybe<EnumAgeRatingNullableFilter>;
  backdrops?: InputMaybe<StringNullableListFilter>;
  budget?: InputMaybe<IntNullableFilter>;
  charaters?: InputMaybe<MovieCharacterListRelationFilter>;
  contentScore?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  crew?: InputMaybe<MovieCrewMemberListRelationFilter>;
  genres?: InputMaybe<GenreListRelationFilter>;
  homepage?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<UuidFilter>;
  keywords?: InputMaybe<KeywordListRelationFilter>;
  language?: InputMaybe<StringNullableFilter>;
  lists?: InputMaybe<ListListRelationFilter>;
  locked?: InputMaybe<StringNullableListFilter>;
  overview?: InputMaybe<StringFilter>;
  popularity?: InputMaybe<FloatNullableFilter>;
  posters?: InputMaybe<StringNullableListFilter>;
  ratings?: InputMaybe<MovieRatingListRelationFilter>;
  releaseDate?: InputMaybe<DateTimeNullableFilter>;
  revenue?: InputMaybe<IntNullableFilter>;
  reviews?: InputMaybe<MovieReviewListRelationFilter>;
  runtime?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<EnumStatusNullableFilter>;
  tagline?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
  videos?: InputMaybe<StringNullableListFilter>;
  watchlists?: InputMaybe<WatchlistListRelationFilter>;
};

export type MovieWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGenre: Genre;
  createKeyword: Keyword;
  createList: List;
  createMovie: Movie;
  createMovieCharacter: MovieCharacter;
  createMovieRating: MovieRating;
  createPerson: Person;
  createUser: User;
  deleteList: List;
  deleteMovieRating: MovieRating;
  destroyAccount: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  getBulkSignedS3UrlForPut?: Maybe<Array<SignedResponse>>;
  getSignedS3UrlForPut?: Maybe<SignedResponse>;
  lock: Movie;
  login: AuthResponse;
  register: AuthResponse;
  resetPassword: Scalars['Boolean'];
  updateGenre: Genre;
  updateKeyword: Keyword;
  updateList: List;
  updateMe: User;
  updateMovie: Movie;
  updateMovieCharacter: MovieCharacter;
  updatePerson: Person;
  updateWatchlist: Watchlist;
};


export type MutationCreateGenreArgs = {
  data: GenreCreateInput;
};


export type MutationCreateKeywordArgs = {
  data: KeywordCreateInput;
};


export type MutationCreateListArgs = {
  data: ListInput;
};


export type MutationCreateMovieArgs = {
  data: MovieInput;
};


export type MutationCreateMovieCharacterArgs = {
  data: MovieCharacterInput;
};


export type MutationCreateMovieRatingArgs = {
  data: MovieRatingInput;
};


export type MutationCreatePersonArgs = {
  data: PersonInput;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationDeleteListArgs = {
  where: ListWhereUniqueInput;
};


export type MutationDeleteMovieRatingArgs = {
  where: MovieRatingWhereUniqueInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationGetBulkSignedS3UrlForPutArgs = {
  data: S3BulkSignedUrlInput;
};


export type MutationGetSignedS3UrlForPutArgs = {
  data: S3SignedUrlInput;
};


export type MutationLockArgs = {
  data: MovieUpdatelockedInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationUpdateGenreArgs = {
  data: GenreUpdateInput;
  where: GenreWhereUniqueInput;
};


export type MutationUpdateKeywordArgs = {
  data: KeywordUpdateInput;
  where: KeywordWhereUniqueInput;
};


export type MutationUpdateListArgs = {
  data: ListInput;
  where: ListWhereUniqueInput;
};


export type MutationUpdateMeArgs = {
  data: UpdateUserInput;
};


export type MutationUpdateMovieArgs = {
  data: MovieUpdateInput;
  where: MovieWhereUniqueInput;
};


export type MutationUpdateMovieCharacterArgs = {
  data: MovieCharacterInput;
  where: MovieCharacterWhereUniqueInput;
};


export type MutationUpdatePersonArgs = {
  data: PersonInput;
  where: PersonWhereUniqueInput;
};


export type MutationUpdateWatchlistArgs = {
  data: WatchlistInput;
  where: WatchlistWhereUniqueInput;
};

export type NestedBoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedEnumAgeRatingNullableFilter = {
  equals?: InputMaybe<AgeRating>;
  in?: InputMaybe<Array<AgeRating>>;
  not?: InputMaybe<NestedEnumAgeRatingNullableFilter>;
  notIn?: InputMaybe<Array<AgeRating>>;
};

export type NestedEnumMediaTypeFilter = {
  equals?: InputMaybe<MediaType>;
  in?: InputMaybe<Array<MediaType>>;
  not?: InputMaybe<NestedEnumMediaTypeFilter>;
  notIn?: InputMaybe<Array<MediaType>>;
};

export type NestedEnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type NestedEnumStatusNullableFilter = {
  equals?: InputMaybe<Status>;
  in?: InputMaybe<Array<Status>>;
  not?: InputMaybe<NestedEnumStatusNullableFilter>;
  notIn?: InputMaybe<Array<Status>>;
};

export type NestedFloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedUuidFilter = {
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedUuidFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type NestedUuidNullableFilter = {
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedUuidNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type NullableBoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type NullableEnumAgeRatingFieldUpdateOperationsInput = {
  set?: InputMaybe<AgeRating>;
};

export type NullableEnumStatusFieldUpdateOperationsInput = {
  set?: InputMaybe<Status>;
};

export type NullableIntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type PeopleResponse = {
  __typename?: 'PeopleResponse';
  count: Scalars['Int'];
  items: Array<Person>;
};

export type Person = {
  __typename?: 'Person';
  _count?: Maybe<PersonCount>;
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  movies: Array<Movie>;
  name: Scalars['String'];
  shows: Array<Show>;
  updatedAt: Scalars['DateTime'];
};

export type PersonCount = {
  __typename?: 'PersonCount';
  movieCrews: Scalars['Int'];
  movies: Scalars['Int'];
  showCrews: Scalars['Int'];
  shows: Scalars['Int'];
};

export type PersonCreateNestedOneWithoutMovieCrewsInput = {
  connect?: InputMaybe<PersonWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonCreateOrConnectWithoutMovieCrewsInput>;
  create?: InputMaybe<PersonCreateWithoutMovieCrewsInput>;
};

export type PersonCreateNestedOneWithoutMoviesInput = {
  connect?: InputMaybe<PersonWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonCreateOrConnectWithoutMoviesInput>;
  create?: InputMaybe<PersonCreateWithoutMoviesInput>;
};

export type PersonCreateNestedOneWithoutShowCrewsInput = {
  connect?: InputMaybe<PersonWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonCreateOrConnectWithoutShowCrewsInput>;
  create?: InputMaybe<PersonCreateWithoutShowCrewsInput>;
};

export type PersonCreateNestedOneWithoutShowsInput = {
  connect?: InputMaybe<PersonWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonCreateOrConnectWithoutShowsInput>;
  create?: InputMaybe<PersonCreateWithoutShowsInput>;
};

export type PersonCreateOrConnectWithoutMovieCrewsInput = {
  create: PersonCreateWithoutMovieCrewsInput;
  where: PersonWhereUniqueInput;
};

export type PersonCreateOrConnectWithoutMoviesInput = {
  create: PersonCreateWithoutMoviesInput;
  where: PersonWhereUniqueInput;
};

export type PersonCreateOrConnectWithoutShowCrewsInput = {
  create: PersonCreateWithoutShowCrewsInput;
  where: PersonWhereUniqueInput;
};

export type PersonCreateOrConnectWithoutShowsInput = {
  create: PersonCreateWithoutShowsInput;
  where: PersonWhereUniqueInput;
};

export type PersonCreateWithoutMovieCrewsInput = {
  avatar?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  movies?: InputMaybe<MovieCharacterCreateNestedManyWithoutPersonInput>;
  name: Scalars['String'];
  showCrews?: InputMaybe<ShowCrewMemberCreateNestedManyWithoutPersonInput>;
  shows?: InputMaybe<ShowCharacterCreateNestedManyWithoutPersonInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonCreateWithoutMoviesInput = {
  avatar?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  movieCrews?: InputMaybe<MovieCrewMemberCreateNestedManyWithoutPersonInput>;
  name: Scalars['String'];
  showCrews?: InputMaybe<ShowCrewMemberCreateNestedManyWithoutPersonInput>;
  shows?: InputMaybe<ShowCharacterCreateNestedManyWithoutPersonInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonCreateWithoutShowCrewsInput = {
  avatar?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  movieCrews?: InputMaybe<MovieCrewMemberCreateNestedManyWithoutPersonInput>;
  movies?: InputMaybe<MovieCharacterCreateNestedManyWithoutPersonInput>;
  name: Scalars['String'];
  shows?: InputMaybe<ShowCharacterCreateNestedManyWithoutPersonInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonCreateWithoutShowsInput = {
  avatar?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  movieCrews?: InputMaybe<MovieCrewMemberCreateNestedManyWithoutPersonInput>;
  movies?: InputMaybe<MovieCharacterCreateNestedManyWithoutPersonInput>;
  name: Scalars['String'];
  showCrews?: InputMaybe<ShowCrewMemberCreateNestedManyWithoutPersonInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonInput = {
  name: Scalars['String'];
};

export type PersonOrderByWithRelationInput = {
  avatar?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  movieCrews?: InputMaybe<MovieCrewMemberOrderByRelationAggregateInput>;
  movies?: InputMaybe<MovieCharacterOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  showCrews?: InputMaybe<ShowCrewMemberOrderByRelationAggregateInput>;
  shows?: InputMaybe<ShowCharacterOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PersonRelationFilter = {
  is?: InputMaybe<PersonWhereInput>;
  isNot?: InputMaybe<PersonWhereInput>;
};

export enum PersonScalarFieldEnum {
  Avatar = 'avatar',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type PersonUpdateOneRequiredWithoutMovieCrewsNestedInput = {
  connect?: InputMaybe<PersonWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonCreateOrConnectWithoutMovieCrewsInput>;
  create?: InputMaybe<PersonCreateWithoutMovieCrewsInput>;
  update?: InputMaybe<PersonUpdateWithoutMovieCrewsInput>;
  upsert?: InputMaybe<PersonUpsertWithoutMovieCrewsInput>;
};

export type PersonUpdateOneRequiredWithoutMoviesNestedInput = {
  connect?: InputMaybe<PersonWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonCreateOrConnectWithoutMoviesInput>;
  create?: InputMaybe<PersonCreateWithoutMoviesInput>;
  update?: InputMaybe<PersonUpdateWithoutMoviesInput>;
  upsert?: InputMaybe<PersonUpsertWithoutMoviesInput>;
};

export type PersonUpdateOneRequiredWithoutShowCrewsNestedInput = {
  connect?: InputMaybe<PersonWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonCreateOrConnectWithoutShowCrewsInput>;
  create?: InputMaybe<PersonCreateWithoutShowCrewsInput>;
  update?: InputMaybe<PersonUpdateWithoutShowCrewsInput>;
  upsert?: InputMaybe<PersonUpsertWithoutShowCrewsInput>;
};

export type PersonUpdateOneRequiredWithoutShowsNestedInput = {
  connect?: InputMaybe<PersonWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonCreateOrConnectWithoutShowsInput>;
  create?: InputMaybe<PersonCreateWithoutShowsInput>;
  update?: InputMaybe<PersonUpdateWithoutShowsInput>;
  upsert?: InputMaybe<PersonUpsertWithoutShowsInput>;
};

export type PersonUpdateWithoutMovieCrewsInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  movies?: InputMaybe<MovieCharacterUpdateManyWithoutPersonNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  showCrews?: InputMaybe<ShowCrewMemberUpdateManyWithoutPersonNestedInput>;
  shows?: InputMaybe<ShowCharacterUpdateManyWithoutPersonNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonUpdateWithoutMoviesInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  movieCrews?: InputMaybe<MovieCrewMemberUpdateManyWithoutPersonNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  showCrews?: InputMaybe<ShowCrewMemberUpdateManyWithoutPersonNestedInput>;
  shows?: InputMaybe<ShowCharacterUpdateManyWithoutPersonNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonUpdateWithoutShowCrewsInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  movieCrews?: InputMaybe<MovieCrewMemberUpdateManyWithoutPersonNestedInput>;
  movies?: InputMaybe<MovieCharacterUpdateManyWithoutPersonNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  shows?: InputMaybe<ShowCharacterUpdateManyWithoutPersonNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonUpdateWithoutShowsInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  movieCrews?: InputMaybe<MovieCrewMemberUpdateManyWithoutPersonNestedInput>;
  movies?: InputMaybe<MovieCharacterUpdateManyWithoutPersonNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  showCrews?: InputMaybe<ShowCrewMemberUpdateManyWithoutPersonNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonUpsertWithoutMovieCrewsInput = {
  create: PersonCreateWithoutMovieCrewsInput;
  update: PersonUpdateWithoutMovieCrewsInput;
};

export type PersonUpsertWithoutMoviesInput = {
  create: PersonCreateWithoutMoviesInput;
  update: PersonUpdateWithoutMoviesInput;
};

export type PersonUpsertWithoutShowCrewsInput = {
  create: PersonCreateWithoutShowCrewsInput;
  update: PersonUpdateWithoutShowCrewsInput;
};

export type PersonUpsertWithoutShowsInput = {
  create: PersonCreateWithoutShowsInput;
  update: PersonUpdateWithoutShowsInput;
};

export type PersonWhereInput = {
  AND?: InputMaybe<Array<PersonWhereInput>>;
  NOT?: InputMaybe<Array<PersonWhereInput>>;
  OR?: InputMaybe<Array<PersonWhereInput>>;
  avatar?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  movieCrews?: InputMaybe<MovieCrewMemberListRelationFilter>;
  movies?: InputMaybe<MovieCharacterListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  showCrews?: InputMaybe<ShowCrewMemberListRelationFilter>;
  shows?: InputMaybe<ShowCharacterListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PersonWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  characters: Array<MovieCharacter>;
  genre: Array<Genre>;
  getSignedS3UrlForGet?: Maybe<Scalars['String']>;
  keyword: Array<Keyword>;
  list: List;
  lists: Array<List>;
  logs: Array<Log>;
  me?: Maybe<User>;
  movie: Movie;
  movies: Array<Movie>;
  people: PeopleResponse;
  person: Person;
  popularMovies: Array<Movie>;
  refreshToken?: Maybe<RefreshTokenResponse>;
  user?: Maybe<User>;
  users: UsersResponse;
  watchlist: Watchlist;
};


export type QueryGetSignedS3UrlForGetArgs = {
  key: Scalars['String'];
};


export type QueryListArgs = {
  id: Scalars['String'];
};


export type QueryMovieArgs = {
  id: Scalars['String'];
};


export type QueryMoviesArgs = {
  cursor?: InputMaybe<MovieWhereUniqueInput>;
  distinct?: InputMaybe<Array<MovieScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<MovieOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MovieWhereInput>;
};


export type QueryPeopleArgs = {
  cursor?: InputMaybe<PersonWhereUniqueInput>;
  distinct?: InputMaybe<Array<PersonScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PersonOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PersonWhereInput>;
};


export type QueryPersonArgs = {
  id: Scalars['String'];
};


export type QueryRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type QueryUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type RefreshTokenResponse = {
  __typename?: 'RefreshTokenResponse';
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type S3BulkSignedUrlInput = {
  files: Array<S3SignedUrlInput>;
};

export type S3SignedUrlInput = {
  fileType: Scalars['String'];
  key: Scalars['String'];
};

export type Show = {
  __typename?: 'Show';
  _count?: Maybe<ShowCount>;
  adult?: Maybe<Scalars['Boolean']>;
  age_rating?: Maybe<AgeRating>;
  backdrops: Array<Scalars['String']>;
  contentScore?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  locked: Array<Scalars['String']>;
  overview: Scalars['String'];
  popularity?: Maybe<Scalars['Float']>;
  posters: Array<Scalars['String']>;
  releaseDate?: Maybe<Scalars['DateTime']>;
  runtime?: Maybe<Scalars['Int']>;
  status?: Maybe<Status>;
  tagline?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  videos: Array<Scalars['String']>;
};

export type ShowCharacterCreateManyPersonInput = {
  name: Scalars['String'];
  showId: Scalars['String'];
};

export type ShowCharacterCreateManyPersonInputEnvelope = {
  data: Array<ShowCharacterCreateManyPersonInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ShowCharacterCreateManyShowInput = {
  name: Scalars['String'];
  personId: Scalars['String'];
};

export type ShowCharacterCreateManyShowInputEnvelope = {
  data: Array<ShowCharacterCreateManyShowInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ShowCharacterCreateNestedManyWithoutPersonInput = {
  connect?: InputMaybe<Array<ShowCharacterWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCharacterCreateOrConnectWithoutPersonInput>>;
  create?: InputMaybe<Array<ShowCharacterCreateWithoutPersonInput>>;
  createMany?: InputMaybe<ShowCharacterCreateManyPersonInputEnvelope>;
};

export type ShowCharacterCreateNestedManyWithoutShowInput = {
  connect?: InputMaybe<Array<ShowCharacterWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCharacterCreateOrConnectWithoutShowInput>>;
  create?: InputMaybe<Array<ShowCharacterCreateWithoutShowInput>>;
  createMany?: InputMaybe<ShowCharacterCreateManyShowInputEnvelope>;
};

export type ShowCharacterCreateOrConnectWithoutPersonInput = {
  create: ShowCharacterCreateWithoutPersonInput;
  where: ShowCharacterWhereUniqueInput;
};

export type ShowCharacterCreateOrConnectWithoutShowInput = {
  create: ShowCharacterCreateWithoutShowInput;
  where: ShowCharacterWhereUniqueInput;
};

export type ShowCharacterCreateWithoutPersonInput = {
  name: Scalars['String'];
  show: ShowCreateNestedOneWithoutCharatersInput;
};

export type ShowCharacterCreateWithoutShowInput = {
  name: Scalars['String'];
  person: PersonCreateNestedOneWithoutShowsInput;
};

export type ShowCharacterListRelationFilter = {
  every?: InputMaybe<ShowCharacterWhereInput>;
  none?: InputMaybe<ShowCharacterWhereInput>;
  some?: InputMaybe<ShowCharacterWhereInput>;
};

export type ShowCharacterOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ShowCharacterPersonIdShowIdCompoundUniqueInput = {
  personId: Scalars['String'];
  showId: Scalars['String'];
};

export type ShowCharacterScalarWhereInput = {
  AND?: InputMaybe<Array<ShowCharacterScalarWhereInput>>;
  NOT?: InputMaybe<Array<ShowCharacterScalarWhereInput>>;
  OR?: InputMaybe<Array<ShowCharacterScalarWhereInput>>;
  name?: InputMaybe<StringFilter>;
  personId?: InputMaybe<UuidFilter>;
  showId?: InputMaybe<UuidFilter>;
};

export type ShowCharacterUpdateManyMutationInput = {
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ShowCharacterUpdateManyWithWhereWithoutPersonInput = {
  data: ShowCharacterUpdateManyMutationInput;
  where: ShowCharacterScalarWhereInput;
};

export type ShowCharacterUpdateManyWithWhereWithoutShowInput = {
  data: ShowCharacterUpdateManyMutationInput;
  where: ShowCharacterScalarWhereInput;
};

export type ShowCharacterUpdateManyWithoutPersonNestedInput = {
  connect?: InputMaybe<Array<ShowCharacterWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCharacterCreateOrConnectWithoutPersonInput>>;
  create?: InputMaybe<Array<ShowCharacterCreateWithoutPersonInput>>;
  createMany?: InputMaybe<ShowCharacterCreateManyPersonInputEnvelope>;
  delete?: InputMaybe<Array<ShowCharacterWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ShowCharacterScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ShowCharacterWhereUniqueInput>>;
  set?: InputMaybe<Array<ShowCharacterWhereUniqueInput>>;
  update?: InputMaybe<Array<ShowCharacterUpdateWithWhereUniqueWithoutPersonInput>>;
  updateMany?: InputMaybe<Array<ShowCharacterUpdateManyWithWhereWithoutPersonInput>>;
  upsert?: InputMaybe<Array<ShowCharacterUpsertWithWhereUniqueWithoutPersonInput>>;
};

export type ShowCharacterUpdateManyWithoutShowNestedInput = {
  connect?: InputMaybe<Array<ShowCharacterWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCharacterCreateOrConnectWithoutShowInput>>;
  create?: InputMaybe<Array<ShowCharacterCreateWithoutShowInput>>;
  createMany?: InputMaybe<ShowCharacterCreateManyShowInputEnvelope>;
  delete?: InputMaybe<Array<ShowCharacterWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ShowCharacterScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ShowCharacterWhereUniqueInput>>;
  set?: InputMaybe<Array<ShowCharacterWhereUniqueInput>>;
  update?: InputMaybe<Array<ShowCharacterUpdateWithWhereUniqueWithoutShowInput>>;
  updateMany?: InputMaybe<Array<ShowCharacterUpdateManyWithWhereWithoutShowInput>>;
  upsert?: InputMaybe<Array<ShowCharacterUpsertWithWhereUniqueWithoutShowInput>>;
};

export type ShowCharacterUpdateWithWhereUniqueWithoutPersonInput = {
  data: ShowCharacterUpdateWithoutPersonInput;
  where: ShowCharacterWhereUniqueInput;
};

export type ShowCharacterUpdateWithWhereUniqueWithoutShowInput = {
  data: ShowCharacterUpdateWithoutShowInput;
  where: ShowCharacterWhereUniqueInput;
};

export type ShowCharacterUpdateWithoutPersonInput = {
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  show?: InputMaybe<ShowUpdateOneRequiredWithoutCharatersNestedInput>;
};

export type ShowCharacterUpdateWithoutShowInput = {
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  person?: InputMaybe<PersonUpdateOneRequiredWithoutShowsNestedInput>;
};

export type ShowCharacterUpsertWithWhereUniqueWithoutPersonInput = {
  create: ShowCharacterCreateWithoutPersonInput;
  update: ShowCharacterUpdateWithoutPersonInput;
  where: ShowCharacterWhereUniqueInput;
};

export type ShowCharacterUpsertWithWhereUniqueWithoutShowInput = {
  create: ShowCharacterCreateWithoutShowInput;
  update: ShowCharacterUpdateWithoutShowInput;
  where: ShowCharacterWhereUniqueInput;
};

export type ShowCharacterWhereInput = {
  AND?: InputMaybe<Array<ShowCharacterWhereInput>>;
  NOT?: InputMaybe<Array<ShowCharacterWhereInput>>;
  OR?: InputMaybe<Array<ShowCharacterWhereInput>>;
  name?: InputMaybe<StringFilter>;
  person?: InputMaybe<PersonRelationFilter>;
  personId?: InputMaybe<UuidFilter>;
  show?: InputMaybe<ShowRelationFilter>;
  showId?: InputMaybe<UuidFilter>;
};

export type ShowCharacterWhereUniqueInput = {
  personId_showId?: InputMaybe<ShowCharacterPersonIdShowIdCompoundUniqueInput>;
};

export type ShowCount = {
  __typename?: 'ShowCount';
  charaters: Scalars['Int'];
  crew: Scalars['Int'];
  genres: Scalars['Int'];
  keywords: Scalars['Int'];
  lists: Scalars['Int'];
  ratings: Scalars['Int'];
  reviews: Scalars['Int'];
  watchlists: Scalars['Int'];
};

export type ShowCreateManyUserInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<ShowCreatebackdropsInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  overview: Scalars['String'];
  posters?: InputMaybe<ShowCreatepostersInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  videos?: InputMaybe<ShowCreatevideosInput>;
};

export type ShowCreateManyUserInputEnvelope = {
  data: Array<ShowCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ShowCreateNestedManyWithoutGenresInput = {
  connect?: InputMaybe<Array<ShowWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCreateOrConnectWithoutGenresInput>>;
  create?: InputMaybe<Array<ShowCreateWithoutGenresInput>>;
};

export type ShowCreateNestedManyWithoutListsInput = {
  connect?: InputMaybe<Array<ShowWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCreateOrConnectWithoutListsInput>>;
  create?: InputMaybe<Array<ShowCreateWithoutListsInput>>;
};

export type ShowCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ShowWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ShowCreateWithoutUserInput>>;
  createMany?: InputMaybe<ShowCreateManyUserInputEnvelope>;
};

export type ShowCreateNestedManyWithoutWatchlistsInput = {
  connect?: InputMaybe<Array<ShowWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCreateOrConnectWithoutWatchlistsInput>>;
  create?: InputMaybe<Array<ShowCreateWithoutWatchlistsInput>>;
};

export type ShowCreateNestedOneWithoutCharatersInput = {
  connect?: InputMaybe<ShowWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ShowCreateOrConnectWithoutCharatersInput>;
  create?: InputMaybe<ShowCreateWithoutCharatersInput>;
};

export type ShowCreateNestedOneWithoutCrewInput = {
  connect?: InputMaybe<ShowWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ShowCreateOrConnectWithoutCrewInput>;
  create?: InputMaybe<ShowCreateWithoutCrewInput>;
};

export type ShowCreateNestedOneWithoutKeywordsInput = {
  connect?: InputMaybe<ShowWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ShowCreateOrConnectWithoutKeywordsInput>;
  create?: InputMaybe<ShowCreateWithoutKeywordsInput>;
};

export type ShowCreateNestedOneWithoutRatingsInput = {
  connect?: InputMaybe<ShowWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ShowCreateOrConnectWithoutRatingsInput>;
  create?: InputMaybe<ShowCreateWithoutRatingsInput>;
};

export type ShowCreateNestedOneWithoutReviewsInput = {
  connect?: InputMaybe<ShowWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ShowCreateOrConnectWithoutReviewsInput>;
  create?: InputMaybe<ShowCreateWithoutReviewsInput>;
};

export type ShowCreateOrConnectWithoutCharatersInput = {
  create: ShowCreateWithoutCharatersInput;
  where: ShowWhereUniqueInput;
};

export type ShowCreateOrConnectWithoutCrewInput = {
  create: ShowCreateWithoutCrewInput;
  where: ShowWhereUniqueInput;
};

export type ShowCreateOrConnectWithoutGenresInput = {
  create: ShowCreateWithoutGenresInput;
  where: ShowWhereUniqueInput;
};

export type ShowCreateOrConnectWithoutKeywordsInput = {
  create: ShowCreateWithoutKeywordsInput;
  where: ShowWhereUniqueInput;
};

export type ShowCreateOrConnectWithoutListsInput = {
  create: ShowCreateWithoutListsInput;
  where: ShowWhereUniqueInput;
};

export type ShowCreateOrConnectWithoutRatingsInput = {
  create: ShowCreateWithoutRatingsInput;
  where: ShowWhereUniqueInput;
};

export type ShowCreateOrConnectWithoutReviewsInput = {
  create: ShowCreateWithoutReviewsInput;
  where: ShowWhereUniqueInput;
};

export type ShowCreateOrConnectWithoutUserInput = {
  create: ShowCreateWithoutUserInput;
  where: ShowWhereUniqueInput;
};

export type ShowCreateOrConnectWithoutWatchlistsInput = {
  create: ShowCreateWithoutWatchlistsInput;
  where: ShowWhereUniqueInput;
};

export type ShowCreateWithoutCharatersInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<ShowCreatebackdropsInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crew?: InputMaybe<ShowCrewMemberCreateNestedManyWithoutShowInput>;
  genres?: InputMaybe<GenreCreateNestedManyWithoutShowsInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<KeywordCreateNestedManyWithoutShowInput>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutShowsInput>;
  overview: Scalars['String'];
  posters?: InputMaybe<ShowCreatepostersInput>;
  ratings?: InputMaybe<ShowRatingCreateNestedManyWithoutShowInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  reviews?: InputMaybe<ShowReviewCreateNestedManyWithoutShowInput>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutShowInput;
  videos?: InputMaybe<ShowCreatevideosInput>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutShowsInput>;
};

export type ShowCreateWithoutCrewInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<ShowCreatebackdropsInput>;
  charaters?: InputMaybe<ShowCharacterCreateNestedManyWithoutShowInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  genres?: InputMaybe<GenreCreateNestedManyWithoutShowsInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<KeywordCreateNestedManyWithoutShowInput>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutShowsInput>;
  overview: Scalars['String'];
  posters?: InputMaybe<ShowCreatepostersInput>;
  ratings?: InputMaybe<ShowRatingCreateNestedManyWithoutShowInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  reviews?: InputMaybe<ShowReviewCreateNestedManyWithoutShowInput>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutShowInput;
  videos?: InputMaybe<ShowCreatevideosInput>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutShowsInput>;
};

export type ShowCreateWithoutGenresInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<ShowCreatebackdropsInput>;
  charaters?: InputMaybe<ShowCharacterCreateNestedManyWithoutShowInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crew?: InputMaybe<ShowCrewMemberCreateNestedManyWithoutShowInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<KeywordCreateNestedManyWithoutShowInput>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutShowsInput>;
  overview: Scalars['String'];
  posters?: InputMaybe<ShowCreatepostersInput>;
  ratings?: InputMaybe<ShowRatingCreateNestedManyWithoutShowInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  reviews?: InputMaybe<ShowReviewCreateNestedManyWithoutShowInput>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutShowInput;
  videos?: InputMaybe<ShowCreatevideosInput>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutShowsInput>;
};

export type ShowCreateWithoutKeywordsInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<ShowCreatebackdropsInput>;
  charaters?: InputMaybe<ShowCharacterCreateNestedManyWithoutShowInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crew?: InputMaybe<ShowCrewMemberCreateNestedManyWithoutShowInput>;
  genres?: InputMaybe<GenreCreateNestedManyWithoutShowsInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutShowsInput>;
  overview: Scalars['String'];
  posters?: InputMaybe<ShowCreatepostersInput>;
  ratings?: InputMaybe<ShowRatingCreateNestedManyWithoutShowInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  reviews?: InputMaybe<ShowReviewCreateNestedManyWithoutShowInput>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutShowInput;
  videos?: InputMaybe<ShowCreatevideosInput>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutShowsInput>;
};

export type ShowCreateWithoutListsInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<ShowCreatebackdropsInput>;
  charaters?: InputMaybe<ShowCharacterCreateNestedManyWithoutShowInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crew?: InputMaybe<ShowCrewMemberCreateNestedManyWithoutShowInput>;
  genres?: InputMaybe<GenreCreateNestedManyWithoutShowsInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<KeywordCreateNestedManyWithoutShowInput>;
  language?: InputMaybe<Scalars['String']>;
  overview: Scalars['String'];
  posters?: InputMaybe<ShowCreatepostersInput>;
  ratings?: InputMaybe<ShowRatingCreateNestedManyWithoutShowInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  reviews?: InputMaybe<ShowReviewCreateNestedManyWithoutShowInput>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutShowInput;
  videos?: InputMaybe<ShowCreatevideosInput>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutShowsInput>;
};

export type ShowCreateWithoutRatingsInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<ShowCreatebackdropsInput>;
  charaters?: InputMaybe<ShowCharacterCreateNestedManyWithoutShowInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crew?: InputMaybe<ShowCrewMemberCreateNestedManyWithoutShowInput>;
  genres?: InputMaybe<GenreCreateNestedManyWithoutShowsInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<KeywordCreateNestedManyWithoutShowInput>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutShowsInput>;
  overview: Scalars['String'];
  posters?: InputMaybe<ShowCreatepostersInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  reviews?: InputMaybe<ShowReviewCreateNestedManyWithoutShowInput>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutShowInput;
  videos?: InputMaybe<ShowCreatevideosInput>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutShowsInput>;
};

export type ShowCreateWithoutReviewsInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<ShowCreatebackdropsInput>;
  charaters?: InputMaybe<ShowCharacterCreateNestedManyWithoutShowInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crew?: InputMaybe<ShowCrewMemberCreateNestedManyWithoutShowInput>;
  genres?: InputMaybe<GenreCreateNestedManyWithoutShowsInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<KeywordCreateNestedManyWithoutShowInput>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutShowsInput>;
  overview: Scalars['String'];
  posters?: InputMaybe<ShowCreatepostersInput>;
  ratings?: InputMaybe<ShowRatingCreateNestedManyWithoutShowInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutShowInput;
  videos?: InputMaybe<ShowCreatevideosInput>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutShowsInput>;
};

export type ShowCreateWithoutUserInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<ShowCreatebackdropsInput>;
  charaters?: InputMaybe<ShowCharacterCreateNestedManyWithoutShowInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crew?: InputMaybe<ShowCrewMemberCreateNestedManyWithoutShowInput>;
  genres?: InputMaybe<GenreCreateNestedManyWithoutShowsInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<KeywordCreateNestedManyWithoutShowInput>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutShowsInput>;
  overview: Scalars['String'];
  posters?: InputMaybe<ShowCreatepostersInput>;
  ratings?: InputMaybe<ShowRatingCreateNestedManyWithoutShowInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  reviews?: InputMaybe<ShowReviewCreateNestedManyWithoutShowInput>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  videos?: InputMaybe<ShowCreatevideosInput>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutShowsInput>;
};

export type ShowCreateWithoutWatchlistsInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrops?: InputMaybe<ShowCreatebackdropsInput>;
  charaters?: InputMaybe<ShowCharacterCreateNestedManyWithoutShowInput>;
  contentScore?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crew?: InputMaybe<ShowCrewMemberCreateNestedManyWithoutShowInput>;
  genres?: InputMaybe<GenreCreateNestedManyWithoutShowsInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<KeywordCreateNestedManyWithoutShowInput>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutShowsInput>;
  overview: Scalars['String'];
  posters?: InputMaybe<ShowCreatepostersInput>;
  ratings?: InputMaybe<ShowRatingCreateNestedManyWithoutShowInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  reviews?: InputMaybe<ShowReviewCreateNestedManyWithoutShowInput>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutShowInput;
  videos?: InputMaybe<ShowCreatevideosInput>;
};

export type ShowCreatebackdropsInput = {
  set: Array<Scalars['String']>;
};

export type ShowCreatepostersInput = {
  set: Array<Scalars['String']>;
};

export type ShowCreatevideosInput = {
  set: Array<Scalars['String']>;
};

export type ShowCrewMemberCreateManyPersonInput = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  showId: Scalars['String'];
};

export type ShowCrewMemberCreateManyPersonInputEnvelope = {
  data: Array<ShowCrewMemberCreateManyPersonInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ShowCrewMemberCreateManyShowInput = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  personId: Scalars['String'];
};

export type ShowCrewMemberCreateManyShowInputEnvelope = {
  data: Array<ShowCrewMemberCreateManyShowInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ShowCrewMemberCreateNestedManyWithoutPersonInput = {
  connect?: InputMaybe<Array<ShowCrewMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCrewMemberCreateOrConnectWithoutPersonInput>>;
  create?: InputMaybe<Array<ShowCrewMemberCreateWithoutPersonInput>>;
  createMany?: InputMaybe<ShowCrewMemberCreateManyPersonInputEnvelope>;
};

export type ShowCrewMemberCreateNestedManyWithoutShowInput = {
  connect?: InputMaybe<Array<ShowCrewMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCrewMemberCreateOrConnectWithoutShowInput>>;
  create?: InputMaybe<Array<ShowCrewMemberCreateWithoutShowInput>>;
  createMany?: InputMaybe<ShowCrewMemberCreateManyShowInputEnvelope>;
};

export type ShowCrewMemberCreateNestedManyWithoutTypeInput = {
  connect?: InputMaybe<Array<ShowCrewMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCrewMemberCreateOrConnectWithoutTypeInput>>;
  create?: InputMaybe<Array<ShowCrewMemberCreateWithoutTypeInput>>;
};

export type ShowCrewMemberCreateOrConnectWithoutPersonInput = {
  create: ShowCrewMemberCreateWithoutPersonInput;
  where: ShowCrewMemberWhereUniqueInput;
};

export type ShowCrewMemberCreateOrConnectWithoutShowInput = {
  create: ShowCrewMemberCreateWithoutShowInput;
  where: ShowCrewMemberWhereUniqueInput;
};

export type ShowCrewMemberCreateOrConnectWithoutTypeInput = {
  create: ShowCrewMemberCreateWithoutTypeInput;
  where: ShowCrewMemberWhereUniqueInput;
};

export type ShowCrewMemberCreateWithoutPersonInput = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  show: ShowCreateNestedOneWithoutCrewInput;
  type?: InputMaybe<CrewMemberRoleCreateNestedManyWithoutShowsInput>;
};

export type ShowCrewMemberCreateWithoutShowInput = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  person: PersonCreateNestedOneWithoutShowCrewsInput;
  type?: InputMaybe<CrewMemberRoleCreateNestedManyWithoutShowsInput>;
};

export type ShowCrewMemberCreateWithoutTypeInput = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  person: PersonCreateNestedOneWithoutShowCrewsInput;
  show: ShowCreateNestedOneWithoutCrewInput;
};

export type ShowCrewMemberListRelationFilter = {
  every?: InputMaybe<ShowCrewMemberWhereInput>;
  none?: InputMaybe<ShowCrewMemberWhereInput>;
  some?: InputMaybe<ShowCrewMemberWhereInput>;
};

export type ShowCrewMemberOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ShowCrewMemberPersonIdShowIdCompoundUniqueInput = {
  personId: Scalars['String'];
  showId: Scalars['String'];
};

export type ShowCrewMemberScalarWhereInput = {
  AND?: InputMaybe<Array<ShowCrewMemberScalarWhereInput>>;
  NOT?: InputMaybe<Array<ShowCrewMemberScalarWhereInput>>;
  OR?: InputMaybe<Array<ShowCrewMemberScalarWhereInput>>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  personId?: InputMaybe<UuidFilter>;
  showId?: InputMaybe<UuidFilter>;
};

export type ShowCrewMemberUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ShowCrewMemberUpdateManyWithWhereWithoutPersonInput = {
  data: ShowCrewMemberUpdateManyMutationInput;
  where: ShowCrewMemberScalarWhereInput;
};

export type ShowCrewMemberUpdateManyWithWhereWithoutShowInput = {
  data: ShowCrewMemberUpdateManyMutationInput;
  where: ShowCrewMemberScalarWhereInput;
};

export type ShowCrewMemberUpdateManyWithWhereWithoutTypeInput = {
  data: ShowCrewMemberUpdateManyMutationInput;
  where: ShowCrewMemberScalarWhereInput;
};

export type ShowCrewMemberUpdateManyWithoutPersonNestedInput = {
  connect?: InputMaybe<Array<ShowCrewMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCrewMemberCreateOrConnectWithoutPersonInput>>;
  create?: InputMaybe<Array<ShowCrewMemberCreateWithoutPersonInput>>;
  createMany?: InputMaybe<ShowCrewMemberCreateManyPersonInputEnvelope>;
  delete?: InputMaybe<Array<ShowCrewMemberWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ShowCrewMemberScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ShowCrewMemberWhereUniqueInput>>;
  set?: InputMaybe<Array<ShowCrewMemberWhereUniqueInput>>;
  update?: InputMaybe<Array<ShowCrewMemberUpdateWithWhereUniqueWithoutPersonInput>>;
  updateMany?: InputMaybe<Array<ShowCrewMemberUpdateManyWithWhereWithoutPersonInput>>;
  upsert?: InputMaybe<Array<ShowCrewMemberUpsertWithWhereUniqueWithoutPersonInput>>;
};

export type ShowCrewMemberUpdateManyWithoutShowNestedInput = {
  connect?: InputMaybe<Array<ShowCrewMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCrewMemberCreateOrConnectWithoutShowInput>>;
  create?: InputMaybe<Array<ShowCrewMemberCreateWithoutShowInput>>;
  createMany?: InputMaybe<ShowCrewMemberCreateManyShowInputEnvelope>;
  delete?: InputMaybe<Array<ShowCrewMemberWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ShowCrewMemberScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ShowCrewMemberWhereUniqueInput>>;
  set?: InputMaybe<Array<ShowCrewMemberWhereUniqueInput>>;
  update?: InputMaybe<Array<ShowCrewMemberUpdateWithWhereUniqueWithoutShowInput>>;
  updateMany?: InputMaybe<Array<ShowCrewMemberUpdateManyWithWhereWithoutShowInput>>;
  upsert?: InputMaybe<Array<ShowCrewMemberUpsertWithWhereUniqueWithoutShowInput>>;
};

export type ShowCrewMemberUpdateManyWithoutTypeNestedInput = {
  connect?: InputMaybe<Array<ShowCrewMemberWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCrewMemberCreateOrConnectWithoutTypeInput>>;
  create?: InputMaybe<Array<ShowCrewMemberCreateWithoutTypeInput>>;
  delete?: InputMaybe<Array<ShowCrewMemberWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ShowCrewMemberScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ShowCrewMemberWhereUniqueInput>>;
  set?: InputMaybe<Array<ShowCrewMemberWhereUniqueInput>>;
  update?: InputMaybe<Array<ShowCrewMemberUpdateWithWhereUniqueWithoutTypeInput>>;
  updateMany?: InputMaybe<Array<ShowCrewMemberUpdateManyWithWhereWithoutTypeInput>>;
  upsert?: InputMaybe<Array<ShowCrewMemberUpsertWithWhereUniqueWithoutTypeInput>>;
};

export type ShowCrewMemberUpdateWithWhereUniqueWithoutPersonInput = {
  data: ShowCrewMemberUpdateWithoutPersonInput;
  where: ShowCrewMemberWhereUniqueInput;
};

export type ShowCrewMemberUpdateWithWhereUniqueWithoutShowInput = {
  data: ShowCrewMemberUpdateWithoutShowInput;
  where: ShowCrewMemberWhereUniqueInput;
};

export type ShowCrewMemberUpdateWithWhereUniqueWithoutTypeInput = {
  data: ShowCrewMemberUpdateWithoutTypeInput;
  where: ShowCrewMemberWhereUniqueInput;
};

export type ShowCrewMemberUpdateWithoutPersonInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  show?: InputMaybe<ShowUpdateOneRequiredWithoutCrewNestedInput>;
  type?: InputMaybe<CrewMemberRoleUpdateManyWithoutShowsNestedInput>;
};

export type ShowCrewMemberUpdateWithoutShowInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  person?: InputMaybe<PersonUpdateOneRequiredWithoutShowCrewsNestedInput>;
  type?: InputMaybe<CrewMemberRoleUpdateManyWithoutShowsNestedInput>;
};

export type ShowCrewMemberUpdateWithoutTypeInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  person?: InputMaybe<PersonUpdateOneRequiredWithoutShowCrewsNestedInput>;
  show?: InputMaybe<ShowUpdateOneRequiredWithoutCrewNestedInput>;
};

export type ShowCrewMemberUpsertWithWhereUniqueWithoutPersonInput = {
  create: ShowCrewMemberCreateWithoutPersonInput;
  update: ShowCrewMemberUpdateWithoutPersonInput;
  where: ShowCrewMemberWhereUniqueInput;
};

export type ShowCrewMemberUpsertWithWhereUniqueWithoutShowInput = {
  create: ShowCrewMemberCreateWithoutShowInput;
  update: ShowCrewMemberUpdateWithoutShowInput;
  where: ShowCrewMemberWhereUniqueInput;
};

export type ShowCrewMemberUpsertWithWhereUniqueWithoutTypeInput = {
  create: ShowCrewMemberCreateWithoutTypeInput;
  update: ShowCrewMemberUpdateWithoutTypeInput;
  where: ShowCrewMemberWhereUniqueInput;
};

export type ShowCrewMemberWhereInput = {
  AND?: InputMaybe<Array<ShowCrewMemberWhereInput>>;
  NOT?: InputMaybe<Array<ShowCrewMemberWhereInput>>;
  OR?: InputMaybe<Array<ShowCrewMemberWhereInput>>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  person?: InputMaybe<PersonRelationFilter>;
  personId?: InputMaybe<UuidFilter>;
  show?: InputMaybe<ShowRelationFilter>;
  showId?: InputMaybe<UuidFilter>;
  type?: InputMaybe<CrewMemberRoleListRelationFilter>;
};

export type ShowCrewMemberWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  personId_showId?: InputMaybe<ShowCrewMemberPersonIdShowIdCompoundUniqueInput>;
};

export type ShowListRelationFilter = {
  every?: InputMaybe<ShowWhereInput>;
  none?: InputMaybe<ShowWhereInput>;
  some?: InputMaybe<ShowWhereInput>;
};

export type ShowOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ShowOrderByWithRelationInput = {
  adult?: InputMaybe<SortOrder>;
  age_rating?: InputMaybe<SortOrder>;
  backdrops?: InputMaybe<SortOrder>;
  charaters?: InputMaybe<ShowCharacterOrderByRelationAggregateInput>;
  contentScore?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  crew?: InputMaybe<ShowCrewMemberOrderByRelationAggregateInput>;
  genres?: InputMaybe<GenreOrderByRelationAggregateInput>;
  homepage?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  keywords?: InputMaybe<KeywordOrderByRelationAggregateInput>;
  language?: InputMaybe<SortOrder>;
  lists?: InputMaybe<ListOrderByRelationAggregateInput>;
  locked?: InputMaybe<SortOrder>;
  overview?: InputMaybe<SortOrder>;
  popularity?: InputMaybe<SortOrder>;
  posters?: InputMaybe<SortOrder>;
  ratings?: InputMaybe<ShowRatingOrderByRelationAggregateInput>;
  releaseDate?: InputMaybe<SortOrder>;
  reviews?: InputMaybe<ShowReviewOrderByRelationAggregateInput>;
  runtime?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  tagline?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
  videos?: InputMaybe<SortOrder>;
  watchlists?: InputMaybe<WatchlistOrderByRelationAggregateInput>;
};

export type ShowRatingCreateManyShowInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId: Scalars['String'];
  value: Scalars['Int'];
};

export type ShowRatingCreateManyShowInputEnvelope = {
  data: Array<ShowRatingCreateManyShowInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ShowRatingCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  showId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  value: Scalars['Int'];
};

export type ShowRatingCreateManyUserInputEnvelope = {
  data: Array<ShowRatingCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ShowRatingCreateNestedManyWithoutShowInput = {
  connect?: InputMaybe<Array<ShowRatingWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowRatingCreateOrConnectWithoutShowInput>>;
  create?: InputMaybe<Array<ShowRatingCreateWithoutShowInput>>;
  createMany?: InputMaybe<ShowRatingCreateManyShowInputEnvelope>;
};

export type ShowRatingCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ShowRatingWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowRatingCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ShowRatingCreateWithoutUserInput>>;
  createMany?: InputMaybe<ShowRatingCreateManyUserInputEnvelope>;
};

export type ShowRatingCreateOrConnectWithoutShowInput = {
  create: ShowRatingCreateWithoutShowInput;
  where: ShowRatingWhereUniqueInput;
};

export type ShowRatingCreateOrConnectWithoutUserInput = {
  create: ShowRatingCreateWithoutUserInput;
  where: ShowRatingWhereUniqueInput;
};

export type ShowRatingCreateWithoutShowInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutShowRatingInput;
  value: Scalars['Int'];
};

export type ShowRatingCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  show: ShowCreateNestedOneWithoutRatingsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  value: Scalars['Int'];
};

export type ShowRatingListRelationFilter = {
  every?: InputMaybe<ShowRatingWhereInput>;
  none?: InputMaybe<ShowRatingWhereInput>;
  some?: InputMaybe<ShowRatingWhereInput>;
};

export type ShowRatingOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ShowRatingScalarWhereInput = {
  AND?: InputMaybe<Array<ShowRatingScalarWhereInput>>;
  NOT?: InputMaybe<Array<ShowRatingScalarWhereInput>>;
  OR?: InputMaybe<Array<ShowRatingScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  showId?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<UuidFilter>;
  value?: InputMaybe<IntFilter>;
};

export type ShowRatingUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  value?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type ShowRatingUpdateManyWithWhereWithoutShowInput = {
  data: ShowRatingUpdateManyMutationInput;
  where: ShowRatingScalarWhereInput;
};

export type ShowRatingUpdateManyWithWhereWithoutUserInput = {
  data: ShowRatingUpdateManyMutationInput;
  where: ShowRatingScalarWhereInput;
};

export type ShowRatingUpdateManyWithoutShowNestedInput = {
  connect?: InputMaybe<Array<ShowRatingWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowRatingCreateOrConnectWithoutShowInput>>;
  create?: InputMaybe<Array<ShowRatingCreateWithoutShowInput>>;
  createMany?: InputMaybe<ShowRatingCreateManyShowInputEnvelope>;
  delete?: InputMaybe<Array<ShowRatingWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ShowRatingScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ShowRatingWhereUniqueInput>>;
  set?: InputMaybe<Array<ShowRatingWhereUniqueInput>>;
  update?: InputMaybe<Array<ShowRatingUpdateWithWhereUniqueWithoutShowInput>>;
  updateMany?: InputMaybe<Array<ShowRatingUpdateManyWithWhereWithoutShowInput>>;
  upsert?: InputMaybe<Array<ShowRatingUpsertWithWhereUniqueWithoutShowInput>>;
};

export type ShowRatingUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<ShowRatingWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowRatingCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ShowRatingCreateWithoutUserInput>>;
  createMany?: InputMaybe<ShowRatingCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<ShowRatingWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ShowRatingScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ShowRatingWhereUniqueInput>>;
  set?: InputMaybe<Array<ShowRatingWhereUniqueInput>>;
  update?: InputMaybe<Array<ShowRatingUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<ShowRatingUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<ShowRatingUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ShowRatingUpdateWithWhereUniqueWithoutShowInput = {
  data: ShowRatingUpdateWithoutShowInput;
  where: ShowRatingWhereUniqueInput;
};

export type ShowRatingUpdateWithWhereUniqueWithoutUserInput = {
  data: ShowRatingUpdateWithoutUserInput;
  where: ShowRatingWhereUniqueInput;
};

export type ShowRatingUpdateWithoutShowInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutShowRatingNestedInput>;
  value?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type ShowRatingUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  show?: InputMaybe<ShowUpdateOneRequiredWithoutRatingsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  value?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type ShowRatingUpsertWithWhereUniqueWithoutShowInput = {
  create: ShowRatingCreateWithoutShowInput;
  update: ShowRatingUpdateWithoutShowInput;
  where: ShowRatingWhereUniqueInput;
};

export type ShowRatingUpsertWithWhereUniqueWithoutUserInput = {
  create: ShowRatingCreateWithoutUserInput;
  update: ShowRatingUpdateWithoutUserInput;
  where: ShowRatingWhereUniqueInput;
};

export type ShowRatingUserIdShowIdCompoundUniqueInput = {
  showId: Scalars['String'];
  userId: Scalars['String'];
};

export type ShowRatingWhereInput = {
  AND?: InputMaybe<Array<ShowRatingWhereInput>>;
  NOT?: InputMaybe<Array<ShowRatingWhereInput>>;
  OR?: InputMaybe<Array<ShowRatingWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  show?: InputMaybe<ShowRelationFilter>;
  showId?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
  value?: InputMaybe<IntFilter>;
};

export type ShowRatingWhereUniqueInput = {
  userId_showId?: InputMaybe<ShowRatingUserIdShowIdCompoundUniqueInput>;
};

export type ShowRelationFilter = {
  is?: InputMaybe<ShowWhereInput>;
  isNot?: InputMaybe<ShowWhereInput>;
};

export type ShowReviewCreateManyShowInput = {
  comment: Scalars['String'];
  userId: Scalars['String'];
};

export type ShowReviewCreateManyShowInputEnvelope = {
  data: Array<ShowReviewCreateManyShowInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ShowReviewCreateManyUserInput = {
  comment: Scalars['String'];
  showId: Scalars['String'];
};

export type ShowReviewCreateManyUserInputEnvelope = {
  data: Array<ShowReviewCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ShowReviewCreateNestedManyWithoutShowInput = {
  connect?: InputMaybe<Array<ShowReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowReviewCreateOrConnectWithoutShowInput>>;
  create?: InputMaybe<Array<ShowReviewCreateWithoutShowInput>>;
  createMany?: InputMaybe<ShowReviewCreateManyShowInputEnvelope>;
};

export type ShowReviewCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ShowReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowReviewCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ShowReviewCreateWithoutUserInput>>;
  createMany?: InputMaybe<ShowReviewCreateManyUserInputEnvelope>;
};

export type ShowReviewCreateOrConnectWithoutShowInput = {
  create: ShowReviewCreateWithoutShowInput;
  where: ShowReviewWhereUniqueInput;
};

export type ShowReviewCreateOrConnectWithoutUserInput = {
  create: ShowReviewCreateWithoutUserInput;
  where: ShowReviewWhereUniqueInput;
};

export type ShowReviewCreateWithoutShowInput = {
  comment: Scalars['String'];
  user: UserCreateNestedOneWithoutShowReviewInput;
};

export type ShowReviewCreateWithoutUserInput = {
  comment: Scalars['String'];
  show: ShowCreateNestedOneWithoutReviewsInput;
};

export type ShowReviewListRelationFilter = {
  every?: InputMaybe<ShowReviewWhereInput>;
  none?: InputMaybe<ShowReviewWhereInput>;
  some?: InputMaybe<ShowReviewWhereInput>;
};

export type ShowReviewOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ShowReviewScalarWhereInput = {
  AND?: InputMaybe<Array<ShowReviewScalarWhereInput>>;
  NOT?: InputMaybe<Array<ShowReviewScalarWhereInput>>;
  OR?: InputMaybe<Array<ShowReviewScalarWhereInput>>;
  comment?: InputMaybe<StringFilter>;
  showId?: InputMaybe<UuidFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type ShowReviewUpdateManyMutationInput = {
  comment?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ShowReviewUpdateManyWithWhereWithoutShowInput = {
  data: ShowReviewUpdateManyMutationInput;
  where: ShowReviewScalarWhereInput;
};

export type ShowReviewUpdateManyWithWhereWithoutUserInput = {
  data: ShowReviewUpdateManyMutationInput;
  where: ShowReviewScalarWhereInput;
};

export type ShowReviewUpdateManyWithoutShowNestedInput = {
  connect?: InputMaybe<Array<ShowReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowReviewCreateOrConnectWithoutShowInput>>;
  create?: InputMaybe<Array<ShowReviewCreateWithoutShowInput>>;
  createMany?: InputMaybe<ShowReviewCreateManyShowInputEnvelope>;
  delete?: InputMaybe<Array<ShowReviewWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ShowReviewScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ShowReviewWhereUniqueInput>>;
  set?: InputMaybe<Array<ShowReviewWhereUniqueInput>>;
  update?: InputMaybe<Array<ShowReviewUpdateWithWhereUniqueWithoutShowInput>>;
  updateMany?: InputMaybe<Array<ShowReviewUpdateManyWithWhereWithoutShowInput>>;
  upsert?: InputMaybe<Array<ShowReviewUpsertWithWhereUniqueWithoutShowInput>>;
};

export type ShowReviewUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<ShowReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowReviewCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ShowReviewCreateWithoutUserInput>>;
  createMany?: InputMaybe<ShowReviewCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<ShowReviewWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ShowReviewScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ShowReviewWhereUniqueInput>>;
  set?: InputMaybe<Array<ShowReviewWhereUniqueInput>>;
  update?: InputMaybe<Array<ShowReviewUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<ShowReviewUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<ShowReviewUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ShowReviewUpdateWithWhereUniqueWithoutShowInput = {
  data: ShowReviewUpdateWithoutShowInput;
  where: ShowReviewWhereUniqueInput;
};

export type ShowReviewUpdateWithWhereUniqueWithoutUserInput = {
  data: ShowReviewUpdateWithoutUserInput;
  where: ShowReviewWhereUniqueInput;
};

export type ShowReviewUpdateWithoutShowInput = {
  comment?: InputMaybe<StringFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutShowReviewNestedInput>;
};

export type ShowReviewUpdateWithoutUserInput = {
  comment?: InputMaybe<StringFieldUpdateOperationsInput>;
  show?: InputMaybe<ShowUpdateOneRequiredWithoutReviewsNestedInput>;
};

export type ShowReviewUpsertWithWhereUniqueWithoutShowInput = {
  create: ShowReviewCreateWithoutShowInput;
  update: ShowReviewUpdateWithoutShowInput;
  where: ShowReviewWhereUniqueInput;
};

export type ShowReviewUpsertWithWhereUniqueWithoutUserInput = {
  create: ShowReviewCreateWithoutUserInput;
  update: ShowReviewUpdateWithoutUserInput;
  where: ShowReviewWhereUniqueInput;
};

export type ShowReviewUserIdShowIdCompoundUniqueInput = {
  showId: Scalars['String'];
  userId: Scalars['String'];
};

export type ShowReviewWhereInput = {
  AND?: InputMaybe<Array<ShowReviewWhereInput>>;
  NOT?: InputMaybe<Array<ShowReviewWhereInput>>;
  OR?: InputMaybe<Array<ShowReviewWhereInput>>;
  comment?: InputMaybe<StringFilter>;
  show?: InputMaybe<ShowRelationFilter>;
  showId?: InputMaybe<UuidFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type ShowReviewWhereUniqueInput = {
  userId_showId?: InputMaybe<ShowReviewUserIdShowIdCompoundUniqueInput>;
};

export enum ShowScalarFieldEnum {
  Adult = 'adult',
  AgeRating = 'age_rating',
  Backdrops = 'backdrops',
  ContentScore = 'contentScore',
  CreatedAt = 'createdAt',
  Homepage = 'homepage',
  Id = 'id',
  Language = 'language',
  Locked = 'locked',
  Overview = 'overview',
  Popularity = 'popularity',
  Posters = 'posters',
  ReleaseDate = 'releaseDate',
  Runtime = 'runtime',
  Status = 'status',
  Tagline = 'tagline',
  Title = 'title',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
  Videos = 'videos'
}

export type ShowScalarWhereInput = {
  AND?: InputMaybe<Array<ShowScalarWhereInput>>;
  NOT?: InputMaybe<Array<ShowScalarWhereInput>>;
  OR?: InputMaybe<Array<ShowScalarWhereInput>>;
  adult?: InputMaybe<BoolNullableFilter>;
  age_rating?: InputMaybe<EnumAgeRatingNullableFilter>;
  backdrops?: InputMaybe<StringNullableListFilter>;
  contentScore?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  homepage?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<UuidFilter>;
  language?: InputMaybe<StringNullableFilter>;
  locked?: InputMaybe<StringNullableListFilter>;
  overview?: InputMaybe<StringFilter>;
  popularity?: InputMaybe<FloatNullableFilter>;
  posters?: InputMaybe<StringNullableListFilter>;
  releaseDate?: InputMaybe<DateTimeNullableFilter>;
  runtime?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<EnumStatusNullableFilter>;
  tagline?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<UuidFilter>;
  videos?: InputMaybe<StringNullableListFilter>;
};

export type ShowUpdateManyMutationInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<ShowUpdatebackdropsInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<ShowUpdatepostersInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  videos?: InputMaybe<ShowUpdatevideosInput>;
};

export type ShowUpdateManyWithWhereWithoutGenresInput = {
  data: ShowUpdateManyMutationInput;
  where: ShowScalarWhereInput;
};

export type ShowUpdateManyWithWhereWithoutListsInput = {
  data: ShowUpdateManyMutationInput;
  where: ShowScalarWhereInput;
};

export type ShowUpdateManyWithWhereWithoutUserInput = {
  data: ShowUpdateManyMutationInput;
  where: ShowScalarWhereInput;
};

export type ShowUpdateManyWithWhereWithoutWatchlistsInput = {
  data: ShowUpdateManyMutationInput;
  where: ShowScalarWhereInput;
};

export type ShowUpdateManyWithoutGenresNestedInput = {
  connect?: InputMaybe<Array<ShowWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCreateOrConnectWithoutGenresInput>>;
  create?: InputMaybe<Array<ShowCreateWithoutGenresInput>>;
  delete?: InputMaybe<Array<ShowWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ShowScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ShowWhereUniqueInput>>;
  set?: InputMaybe<Array<ShowWhereUniqueInput>>;
  update?: InputMaybe<Array<ShowUpdateWithWhereUniqueWithoutGenresInput>>;
  updateMany?: InputMaybe<Array<ShowUpdateManyWithWhereWithoutGenresInput>>;
  upsert?: InputMaybe<Array<ShowUpsertWithWhereUniqueWithoutGenresInput>>;
};

export type ShowUpdateManyWithoutListsNestedInput = {
  connect?: InputMaybe<Array<ShowWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCreateOrConnectWithoutListsInput>>;
  create?: InputMaybe<Array<ShowCreateWithoutListsInput>>;
  delete?: InputMaybe<Array<ShowWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ShowScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ShowWhereUniqueInput>>;
  set?: InputMaybe<Array<ShowWhereUniqueInput>>;
  update?: InputMaybe<Array<ShowUpdateWithWhereUniqueWithoutListsInput>>;
  updateMany?: InputMaybe<Array<ShowUpdateManyWithWhereWithoutListsInput>>;
  upsert?: InputMaybe<Array<ShowUpsertWithWhereUniqueWithoutListsInput>>;
};

export type ShowUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<ShowWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ShowCreateWithoutUserInput>>;
  createMany?: InputMaybe<ShowCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<ShowWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ShowScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ShowWhereUniqueInput>>;
  set?: InputMaybe<Array<ShowWhereUniqueInput>>;
  update?: InputMaybe<Array<ShowUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<ShowUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<ShowUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ShowUpdateManyWithoutWatchlistsNestedInput = {
  connect?: InputMaybe<Array<ShowWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ShowCreateOrConnectWithoutWatchlistsInput>>;
  create?: InputMaybe<Array<ShowCreateWithoutWatchlistsInput>>;
  delete?: InputMaybe<Array<ShowWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ShowScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ShowWhereUniqueInput>>;
  set?: InputMaybe<Array<ShowWhereUniqueInput>>;
  update?: InputMaybe<Array<ShowUpdateWithWhereUniqueWithoutWatchlistsInput>>;
  updateMany?: InputMaybe<Array<ShowUpdateManyWithWhereWithoutWatchlistsInput>>;
  upsert?: InputMaybe<Array<ShowUpsertWithWhereUniqueWithoutWatchlistsInput>>;
};

export type ShowUpdateOneRequiredWithoutCharatersNestedInput = {
  connect?: InputMaybe<ShowWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ShowCreateOrConnectWithoutCharatersInput>;
  create?: InputMaybe<ShowCreateWithoutCharatersInput>;
  update?: InputMaybe<ShowUpdateWithoutCharatersInput>;
  upsert?: InputMaybe<ShowUpsertWithoutCharatersInput>;
};

export type ShowUpdateOneRequiredWithoutCrewNestedInput = {
  connect?: InputMaybe<ShowWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ShowCreateOrConnectWithoutCrewInput>;
  create?: InputMaybe<ShowCreateWithoutCrewInput>;
  update?: InputMaybe<ShowUpdateWithoutCrewInput>;
  upsert?: InputMaybe<ShowUpsertWithoutCrewInput>;
};

export type ShowUpdateOneRequiredWithoutRatingsNestedInput = {
  connect?: InputMaybe<ShowWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ShowCreateOrConnectWithoutRatingsInput>;
  create?: InputMaybe<ShowCreateWithoutRatingsInput>;
  update?: InputMaybe<ShowUpdateWithoutRatingsInput>;
  upsert?: InputMaybe<ShowUpsertWithoutRatingsInput>;
};

export type ShowUpdateOneRequiredWithoutReviewsNestedInput = {
  connect?: InputMaybe<ShowWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ShowCreateOrConnectWithoutReviewsInput>;
  create?: InputMaybe<ShowCreateWithoutReviewsInput>;
  update?: InputMaybe<ShowUpdateWithoutReviewsInput>;
  upsert?: InputMaybe<ShowUpsertWithoutReviewsInput>;
};

export type ShowUpdateOneWithoutKeywordsNestedInput = {
  connect?: InputMaybe<ShowWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ShowCreateOrConnectWithoutKeywordsInput>;
  create?: InputMaybe<ShowCreateWithoutKeywordsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ShowUpdateWithoutKeywordsInput>;
  upsert?: InputMaybe<ShowUpsertWithoutKeywordsInput>;
};

export type ShowUpdateWithWhereUniqueWithoutGenresInput = {
  data: ShowUpdateWithoutGenresInput;
  where: ShowWhereUniqueInput;
};

export type ShowUpdateWithWhereUniqueWithoutListsInput = {
  data: ShowUpdateWithoutListsInput;
  where: ShowWhereUniqueInput;
};

export type ShowUpdateWithWhereUniqueWithoutUserInput = {
  data: ShowUpdateWithoutUserInput;
  where: ShowWhereUniqueInput;
};

export type ShowUpdateWithWhereUniqueWithoutWatchlistsInput = {
  data: ShowUpdateWithoutWatchlistsInput;
  where: ShowWhereUniqueInput;
};

export type ShowUpdateWithoutCharatersInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<ShowUpdatebackdropsInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<ShowCrewMemberUpdateManyWithoutShowNestedInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutShowsNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutShowNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutShowsNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<ShowUpdatepostersInput>;
  ratings?: InputMaybe<ShowRatingUpdateManyWithoutShowNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  reviews?: InputMaybe<ShowReviewUpdateManyWithoutShowNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutShowNestedInput>;
  videos?: InputMaybe<ShowUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutShowsNestedInput>;
};

export type ShowUpdateWithoutCrewInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<ShowUpdatebackdropsInput>;
  charaters?: InputMaybe<ShowCharacterUpdateManyWithoutShowNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutShowsNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutShowNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutShowsNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<ShowUpdatepostersInput>;
  ratings?: InputMaybe<ShowRatingUpdateManyWithoutShowNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  reviews?: InputMaybe<ShowReviewUpdateManyWithoutShowNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutShowNestedInput>;
  videos?: InputMaybe<ShowUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutShowsNestedInput>;
};

export type ShowUpdateWithoutGenresInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<ShowUpdatebackdropsInput>;
  charaters?: InputMaybe<ShowCharacterUpdateManyWithoutShowNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<ShowCrewMemberUpdateManyWithoutShowNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutShowNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutShowsNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<ShowUpdatepostersInput>;
  ratings?: InputMaybe<ShowRatingUpdateManyWithoutShowNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  reviews?: InputMaybe<ShowReviewUpdateManyWithoutShowNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutShowNestedInput>;
  videos?: InputMaybe<ShowUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutShowsNestedInput>;
};

export type ShowUpdateWithoutKeywordsInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<ShowUpdatebackdropsInput>;
  charaters?: InputMaybe<ShowCharacterUpdateManyWithoutShowNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<ShowCrewMemberUpdateManyWithoutShowNestedInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutShowsNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutShowsNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<ShowUpdatepostersInput>;
  ratings?: InputMaybe<ShowRatingUpdateManyWithoutShowNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  reviews?: InputMaybe<ShowReviewUpdateManyWithoutShowNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutShowNestedInput>;
  videos?: InputMaybe<ShowUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutShowsNestedInput>;
};

export type ShowUpdateWithoutListsInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<ShowUpdatebackdropsInput>;
  charaters?: InputMaybe<ShowCharacterUpdateManyWithoutShowNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<ShowCrewMemberUpdateManyWithoutShowNestedInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutShowsNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutShowNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<ShowUpdatepostersInput>;
  ratings?: InputMaybe<ShowRatingUpdateManyWithoutShowNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  reviews?: InputMaybe<ShowReviewUpdateManyWithoutShowNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutShowNestedInput>;
  videos?: InputMaybe<ShowUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutShowsNestedInput>;
};

export type ShowUpdateWithoutRatingsInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<ShowUpdatebackdropsInput>;
  charaters?: InputMaybe<ShowCharacterUpdateManyWithoutShowNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<ShowCrewMemberUpdateManyWithoutShowNestedInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutShowsNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutShowNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutShowsNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<ShowUpdatepostersInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  reviews?: InputMaybe<ShowReviewUpdateManyWithoutShowNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutShowNestedInput>;
  videos?: InputMaybe<ShowUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutShowsNestedInput>;
};

export type ShowUpdateWithoutReviewsInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<ShowUpdatebackdropsInput>;
  charaters?: InputMaybe<ShowCharacterUpdateManyWithoutShowNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<ShowCrewMemberUpdateManyWithoutShowNestedInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutShowsNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutShowNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutShowsNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<ShowUpdatepostersInput>;
  ratings?: InputMaybe<ShowRatingUpdateManyWithoutShowNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutShowNestedInput>;
  videos?: InputMaybe<ShowUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutShowsNestedInput>;
};

export type ShowUpdateWithoutUserInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<ShowUpdatebackdropsInput>;
  charaters?: InputMaybe<ShowCharacterUpdateManyWithoutShowNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<ShowCrewMemberUpdateManyWithoutShowNestedInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutShowsNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutShowNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutShowsNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<ShowUpdatepostersInput>;
  ratings?: InputMaybe<ShowRatingUpdateManyWithoutShowNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  reviews?: InputMaybe<ShowReviewUpdateManyWithoutShowNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  videos?: InputMaybe<ShowUpdatevideosInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutShowsNestedInput>;
};

export type ShowUpdateWithoutWatchlistsInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrops?: InputMaybe<ShowUpdatebackdropsInput>;
  charaters?: InputMaybe<ShowCharacterUpdateManyWithoutShowNestedInput>;
  contentScore?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crew?: InputMaybe<ShowCrewMemberUpdateManyWithoutShowNestedInput>;
  genres?: InputMaybe<GenreUpdateManyWithoutShowsNestedInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  keywords?: InputMaybe<KeywordUpdateManyWithoutShowNestedInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutShowsNestedInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  posters?: InputMaybe<ShowUpdatepostersInput>;
  ratings?: InputMaybe<ShowRatingUpdateManyWithoutShowNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  reviews?: InputMaybe<ShowReviewUpdateManyWithoutShowNestedInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutShowNestedInput>;
  videos?: InputMaybe<ShowUpdatevideosInput>;
};

export type ShowUpdatebackdropsInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type ShowUpdatepostersInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type ShowUpdatevideosInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type ShowUpsertWithWhereUniqueWithoutGenresInput = {
  create: ShowCreateWithoutGenresInput;
  update: ShowUpdateWithoutGenresInput;
  where: ShowWhereUniqueInput;
};

export type ShowUpsertWithWhereUniqueWithoutListsInput = {
  create: ShowCreateWithoutListsInput;
  update: ShowUpdateWithoutListsInput;
  where: ShowWhereUniqueInput;
};

export type ShowUpsertWithWhereUniqueWithoutUserInput = {
  create: ShowCreateWithoutUserInput;
  update: ShowUpdateWithoutUserInput;
  where: ShowWhereUniqueInput;
};

export type ShowUpsertWithWhereUniqueWithoutWatchlistsInput = {
  create: ShowCreateWithoutWatchlistsInput;
  update: ShowUpdateWithoutWatchlistsInput;
  where: ShowWhereUniqueInput;
};

export type ShowUpsertWithoutCharatersInput = {
  create: ShowCreateWithoutCharatersInput;
  update: ShowUpdateWithoutCharatersInput;
};

export type ShowUpsertWithoutCrewInput = {
  create: ShowCreateWithoutCrewInput;
  update: ShowUpdateWithoutCrewInput;
};

export type ShowUpsertWithoutKeywordsInput = {
  create: ShowCreateWithoutKeywordsInput;
  update: ShowUpdateWithoutKeywordsInput;
};

export type ShowUpsertWithoutRatingsInput = {
  create: ShowCreateWithoutRatingsInput;
  update: ShowUpdateWithoutRatingsInput;
};

export type ShowUpsertWithoutReviewsInput = {
  create: ShowCreateWithoutReviewsInput;
  update: ShowUpdateWithoutReviewsInput;
};

export type ShowWhereInput = {
  AND?: InputMaybe<Array<ShowWhereInput>>;
  NOT?: InputMaybe<Array<ShowWhereInput>>;
  OR?: InputMaybe<Array<ShowWhereInput>>;
  adult?: InputMaybe<BoolNullableFilter>;
  age_rating?: InputMaybe<EnumAgeRatingNullableFilter>;
  backdrops?: InputMaybe<StringNullableListFilter>;
  charaters?: InputMaybe<ShowCharacterListRelationFilter>;
  contentScore?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  crew?: InputMaybe<ShowCrewMemberListRelationFilter>;
  genres?: InputMaybe<GenreListRelationFilter>;
  homepage?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<UuidFilter>;
  keywords?: InputMaybe<KeywordListRelationFilter>;
  language?: InputMaybe<StringNullableFilter>;
  lists?: InputMaybe<ListListRelationFilter>;
  locked?: InputMaybe<StringNullableListFilter>;
  overview?: InputMaybe<StringFilter>;
  popularity?: InputMaybe<FloatNullableFilter>;
  posters?: InputMaybe<StringNullableListFilter>;
  ratings?: InputMaybe<ShowRatingListRelationFilter>;
  releaseDate?: InputMaybe<DateTimeNullableFilter>;
  reviews?: InputMaybe<ShowReviewListRelationFilter>;
  runtime?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<EnumStatusNullableFilter>;
  tagline?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
  videos?: InputMaybe<StringNullableListFilter>;
  watchlists?: InputMaybe<WatchlistListRelationFilter>;
};

export type ShowWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type SignedResponse = {
  __typename?: 'SignedResponse';
  key: Scalars['String'];
  uploadUrl: Scalars['String'];
  url: Scalars['String'];
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum Status {
  Cancelled = 'CANCELLED',
  InProduction = 'IN_PRODUCTION',
  Planned = 'PLANNED',
  PostProduction = 'POST_PRODUCTION',
  Released = 'RELEASED',
  Rumored = 'RUMORED'
}

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['String']>>;
  has?: InputMaybe<Scalars['String']>;
  hasEvery?: InputMaybe<Array<Scalars['String']>>;
  hasSome?: InputMaybe<Array<Scalars['String']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['String'];
  instagram?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  role: Role;
  twitter?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type UserCreateInput = {
  MovieReview?: InputMaybe<MovieReviewCreateNestedManyWithoutUserInput>;
  Show?: InputMaybe<ShowCreateNestedManyWithoutUserInput>;
  ShowRating?: InputMaybe<ShowRatingCreateNestedManyWithoutUserInput>;
  ShowReview?: InputMaybe<ShowReviewCreateNestedManyWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  lists?: InputMaybe<ListCreateNestedManyWithoutUserInput>;
  logs?: InputMaybe<LogCreateNestedManyWithoutUserInput>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  ratings?: InputMaybe<MovieRatingCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  twitter?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  watchlist?: InputMaybe<WatchlistCreateNestedOneWithoutUserInput>;
};

export type UserCreateNestedOneWithoutListsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutListsInput>;
  create?: InputMaybe<UserCreateWithoutListsInput>;
};

export type UserCreateNestedOneWithoutMovieReviewInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutMovieReviewInput>;
  create?: InputMaybe<UserCreateWithoutMovieReviewInput>;
};

export type UserCreateNestedOneWithoutMoviesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutMoviesInput>;
  create?: InputMaybe<UserCreateWithoutMoviesInput>;
};

export type UserCreateNestedOneWithoutRatingsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutRatingsInput>;
  create?: InputMaybe<UserCreateWithoutRatingsInput>;
};

export type UserCreateNestedOneWithoutShowInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutShowInput>;
  create?: InputMaybe<UserCreateWithoutShowInput>;
};

export type UserCreateNestedOneWithoutShowRatingInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutShowRatingInput>;
  create?: InputMaybe<UserCreateWithoutShowRatingInput>;
};

export type UserCreateNestedOneWithoutShowReviewInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutShowReviewInput>;
  create?: InputMaybe<UserCreateWithoutShowReviewInput>;
};

export type UserCreateNestedOneWithoutWatchlistInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutWatchlistInput>;
  create?: InputMaybe<UserCreateWithoutWatchlistInput>;
};

export type UserCreateOrConnectWithoutListsInput = {
  create: UserCreateWithoutListsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutMovieReviewInput = {
  create: UserCreateWithoutMovieReviewInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutMoviesInput = {
  create: UserCreateWithoutMoviesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutRatingsInput = {
  create: UserCreateWithoutRatingsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutShowInput = {
  create: UserCreateWithoutShowInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutShowRatingInput = {
  create: UserCreateWithoutShowRatingInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutShowReviewInput = {
  create: UserCreateWithoutShowReviewInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutWatchlistInput = {
  create: UserCreateWithoutWatchlistInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutListsInput = {
  MovieReview?: InputMaybe<MovieReviewCreateNestedManyWithoutUserInput>;
  Show?: InputMaybe<ShowCreateNestedManyWithoutUserInput>;
  ShowRating?: InputMaybe<ShowRatingCreateNestedManyWithoutUserInput>;
  ShowReview?: InputMaybe<ShowReviewCreateNestedManyWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  logs?: InputMaybe<LogCreateNestedManyWithoutUserInput>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  ratings?: InputMaybe<MovieRatingCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  twitter?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  watchlist?: InputMaybe<WatchlistCreateNestedOneWithoutUserInput>;
};

export type UserCreateWithoutMovieReviewInput = {
  Show?: InputMaybe<ShowCreateNestedManyWithoutUserInput>;
  ShowRating?: InputMaybe<ShowRatingCreateNestedManyWithoutUserInput>;
  ShowReview?: InputMaybe<ShowReviewCreateNestedManyWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  lists?: InputMaybe<ListCreateNestedManyWithoutUserInput>;
  logs?: InputMaybe<LogCreateNestedManyWithoutUserInput>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  ratings?: InputMaybe<MovieRatingCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  twitter?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  watchlist?: InputMaybe<WatchlistCreateNestedOneWithoutUserInput>;
};

export type UserCreateWithoutMoviesInput = {
  MovieReview?: InputMaybe<MovieReviewCreateNestedManyWithoutUserInput>;
  Show?: InputMaybe<ShowCreateNestedManyWithoutUserInput>;
  ShowRating?: InputMaybe<ShowRatingCreateNestedManyWithoutUserInput>;
  ShowReview?: InputMaybe<ShowReviewCreateNestedManyWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  lists?: InputMaybe<ListCreateNestedManyWithoutUserInput>;
  logs?: InputMaybe<LogCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  ratings?: InputMaybe<MovieRatingCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  twitter?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  watchlist?: InputMaybe<WatchlistCreateNestedOneWithoutUserInput>;
};

export type UserCreateWithoutRatingsInput = {
  MovieReview?: InputMaybe<MovieReviewCreateNestedManyWithoutUserInput>;
  Show?: InputMaybe<ShowCreateNestedManyWithoutUserInput>;
  ShowRating?: InputMaybe<ShowRatingCreateNestedManyWithoutUserInput>;
  ShowReview?: InputMaybe<ShowReviewCreateNestedManyWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  lists?: InputMaybe<ListCreateNestedManyWithoutUserInput>;
  logs?: InputMaybe<LogCreateNestedManyWithoutUserInput>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  role?: InputMaybe<Role>;
  twitter?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  watchlist?: InputMaybe<WatchlistCreateNestedOneWithoutUserInput>;
};

export type UserCreateWithoutShowInput = {
  MovieReview?: InputMaybe<MovieReviewCreateNestedManyWithoutUserInput>;
  ShowRating?: InputMaybe<ShowRatingCreateNestedManyWithoutUserInput>;
  ShowReview?: InputMaybe<ShowReviewCreateNestedManyWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  lists?: InputMaybe<ListCreateNestedManyWithoutUserInput>;
  logs?: InputMaybe<LogCreateNestedManyWithoutUserInput>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  ratings?: InputMaybe<MovieRatingCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  twitter?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  watchlist?: InputMaybe<WatchlistCreateNestedOneWithoutUserInput>;
};

export type UserCreateWithoutShowRatingInput = {
  MovieReview?: InputMaybe<MovieReviewCreateNestedManyWithoutUserInput>;
  Show?: InputMaybe<ShowCreateNestedManyWithoutUserInput>;
  ShowReview?: InputMaybe<ShowReviewCreateNestedManyWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  lists?: InputMaybe<ListCreateNestedManyWithoutUserInput>;
  logs?: InputMaybe<LogCreateNestedManyWithoutUserInput>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  ratings?: InputMaybe<MovieRatingCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  twitter?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  watchlist?: InputMaybe<WatchlistCreateNestedOneWithoutUserInput>;
};

export type UserCreateWithoutShowReviewInput = {
  MovieReview?: InputMaybe<MovieReviewCreateNestedManyWithoutUserInput>;
  Show?: InputMaybe<ShowCreateNestedManyWithoutUserInput>;
  ShowRating?: InputMaybe<ShowRatingCreateNestedManyWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  lists?: InputMaybe<ListCreateNestedManyWithoutUserInput>;
  logs?: InputMaybe<LogCreateNestedManyWithoutUserInput>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  ratings?: InputMaybe<MovieRatingCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  twitter?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  watchlist?: InputMaybe<WatchlistCreateNestedOneWithoutUserInput>;
};

export type UserCreateWithoutWatchlistInput = {
  MovieReview?: InputMaybe<MovieReviewCreateNestedManyWithoutUserInput>;
  Show?: InputMaybe<ShowCreateNestedManyWithoutUserInput>;
  ShowRating?: InputMaybe<ShowRatingCreateNestedManyWithoutUserInput>;
  ShowReview?: InputMaybe<ShowReviewCreateNestedManyWithoutUserInput>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  lists?: InputMaybe<ListCreateNestedManyWithoutUserInput>;
  logs?: InputMaybe<LogCreateNestedManyWithoutUserInput>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  ratings?: InputMaybe<MovieRatingCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  twitter?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UserOrderByWithRelationInput = {
  MovieReview?: InputMaybe<MovieReviewOrderByRelationAggregateInput>;
  Show?: InputMaybe<ShowOrderByRelationAggregateInput>;
  ShowRating?: InputMaybe<ShowRatingOrderByRelationAggregateInput>;
  ShowReview?: InputMaybe<ShowReviewOrderByRelationAggregateInput>;
  avatar?: InputMaybe<SortOrder>;
  bio?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  instagram?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  lists?: InputMaybe<ListOrderByRelationAggregateInput>;
  logs?: InputMaybe<LogOrderByRelationAggregateInput>;
  movies?: InputMaybe<MovieOrderByRelationAggregateInput>;
  password?: InputMaybe<SortOrder>;
  ratings?: InputMaybe<MovieRatingOrderByRelationAggregateInput>;
  role?: InputMaybe<SortOrder>;
  twitter?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  watchlist?: InputMaybe<WatchlistOrderByWithRelationInput>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export enum UserScalarFieldEnum {
  Avatar = 'avatar',
  Bio = 'bio',
  CreatedAt = 'createdAt',
  Email = 'email',
  FirstName = 'firstName',
  Id = 'id',
  Instagram = 'instagram',
  LastName = 'lastName',
  Password = 'password',
  Role = 'role',
  Twitter = 'twitter',
  UpdatedAt = 'updatedAt'
}

export type UserUpdateOneRequiredWithoutListsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutListsInput>;
  create?: InputMaybe<UserCreateWithoutListsInput>;
  update?: InputMaybe<UserUpdateWithoutListsInput>;
  upsert?: InputMaybe<UserUpsertWithoutListsInput>;
};

export type UserUpdateOneRequiredWithoutMovieReviewNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutMovieReviewInput>;
  create?: InputMaybe<UserCreateWithoutMovieReviewInput>;
  update?: InputMaybe<UserUpdateWithoutMovieReviewInput>;
  upsert?: InputMaybe<UserUpsertWithoutMovieReviewInput>;
};

export type UserUpdateOneRequiredWithoutMoviesNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutMoviesInput>;
  create?: InputMaybe<UserCreateWithoutMoviesInput>;
  update?: InputMaybe<UserUpdateWithoutMoviesInput>;
  upsert?: InputMaybe<UserUpsertWithoutMoviesInput>;
};

export type UserUpdateOneRequiredWithoutRatingsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutRatingsInput>;
  create?: InputMaybe<UserCreateWithoutRatingsInput>;
  update?: InputMaybe<UserUpdateWithoutRatingsInput>;
  upsert?: InputMaybe<UserUpsertWithoutRatingsInput>;
};

export type UserUpdateOneRequiredWithoutShowNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutShowInput>;
  create?: InputMaybe<UserCreateWithoutShowInput>;
  update?: InputMaybe<UserUpdateWithoutShowInput>;
  upsert?: InputMaybe<UserUpsertWithoutShowInput>;
};

export type UserUpdateOneRequiredWithoutShowRatingNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutShowRatingInput>;
  create?: InputMaybe<UserCreateWithoutShowRatingInput>;
  update?: InputMaybe<UserUpdateWithoutShowRatingInput>;
  upsert?: InputMaybe<UserUpsertWithoutShowRatingInput>;
};

export type UserUpdateOneRequiredWithoutShowReviewNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutShowReviewInput>;
  create?: InputMaybe<UserCreateWithoutShowReviewInput>;
  update?: InputMaybe<UserUpdateWithoutShowReviewInput>;
  upsert?: InputMaybe<UserUpsertWithoutShowReviewInput>;
};

export type UserUpdateOneRequiredWithoutWatchlistNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutWatchlistInput>;
  create?: InputMaybe<UserCreateWithoutWatchlistInput>;
  update?: InputMaybe<UserUpdateWithoutWatchlistInput>;
  upsert?: InputMaybe<UserUpsertWithoutWatchlistInput>;
};

export type UserUpdateWithoutListsInput = {
  MovieReview?: InputMaybe<MovieReviewUpdateManyWithoutUserNestedInput>;
  Show?: InputMaybe<ShowUpdateManyWithoutUserNestedInput>;
  ShowRating?: InputMaybe<ShowRatingUpdateManyWithoutUserNestedInput>;
  ShowReview?: InputMaybe<ShowReviewUpdateManyWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  instagram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  logs?: InputMaybe<LogUpdateManyWithoutUserNestedInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  ratings?: InputMaybe<MovieRatingUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  watchlist?: InputMaybe<WatchlistUpdateOneWithoutUserNestedInput>;
};

export type UserUpdateWithoutMovieReviewInput = {
  Show?: InputMaybe<ShowUpdateManyWithoutUserNestedInput>;
  ShowRating?: InputMaybe<ShowRatingUpdateManyWithoutUserNestedInput>;
  ShowReview?: InputMaybe<ShowReviewUpdateManyWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  instagram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutUserNestedInput>;
  logs?: InputMaybe<LogUpdateManyWithoutUserNestedInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  ratings?: InputMaybe<MovieRatingUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  watchlist?: InputMaybe<WatchlistUpdateOneWithoutUserNestedInput>;
};

export type UserUpdateWithoutMoviesInput = {
  MovieReview?: InputMaybe<MovieReviewUpdateManyWithoutUserNestedInput>;
  Show?: InputMaybe<ShowUpdateManyWithoutUserNestedInput>;
  ShowRating?: InputMaybe<ShowRatingUpdateManyWithoutUserNestedInput>;
  ShowReview?: InputMaybe<ShowReviewUpdateManyWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  instagram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutUserNestedInput>;
  logs?: InputMaybe<LogUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  ratings?: InputMaybe<MovieRatingUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  watchlist?: InputMaybe<WatchlistUpdateOneWithoutUserNestedInput>;
};

export type UserUpdateWithoutRatingsInput = {
  MovieReview?: InputMaybe<MovieReviewUpdateManyWithoutUserNestedInput>;
  Show?: InputMaybe<ShowUpdateManyWithoutUserNestedInput>;
  ShowRating?: InputMaybe<ShowRatingUpdateManyWithoutUserNestedInput>;
  ShowReview?: InputMaybe<ShowReviewUpdateManyWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  instagram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutUserNestedInput>;
  logs?: InputMaybe<LogUpdateManyWithoutUserNestedInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  watchlist?: InputMaybe<WatchlistUpdateOneWithoutUserNestedInput>;
};

export type UserUpdateWithoutShowInput = {
  MovieReview?: InputMaybe<MovieReviewUpdateManyWithoutUserNestedInput>;
  ShowRating?: InputMaybe<ShowRatingUpdateManyWithoutUserNestedInput>;
  ShowReview?: InputMaybe<ShowReviewUpdateManyWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  instagram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutUserNestedInput>;
  logs?: InputMaybe<LogUpdateManyWithoutUserNestedInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  ratings?: InputMaybe<MovieRatingUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  watchlist?: InputMaybe<WatchlistUpdateOneWithoutUserNestedInput>;
};

export type UserUpdateWithoutShowRatingInput = {
  MovieReview?: InputMaybe<MovieReviewUpdateManyWithoutUserNestedInput>;
  Show?: InputMaybe<ShowUpdateManyWithoutUserNestedInput>;
  ShowReview?: InputMaybe<ShowReviewUpdateManyWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  instagram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutUserNestedInput>;
  logs?: InputMaybe<LogUpdateManyWithoutUserNestedInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  ratings?: InputMaybe<MovieRatingUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  watchlist?: InputMaybe<WatchlistUpdateOneWithoutUserNestedInput>;
};

export type UserUpdateWithoutShowReviewInput = {
  MovieReview?: InputMaybe<MovieReviewUpdateManyWithoutUserNestedInput>;
  Show?: InputMaybe<ShowUpdateManyWithoutUserNestedInput>;
  ShowRating?: InputMaybe<ShowRatingUpdateManyWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  instagram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutUserNestedInput>;
  logs?: InputMaybe<LogUpdateManyWithoutUserNestedInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  ratings?: InputMaybe<MovieRatingUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  watchlist?: InputMaybe<WatchlistUpdateOneWithoutUserNestedInput>;
};

export type UserUpdateWithoutWatchlistInput = {
  MovieReview?: InputMaybe<MovieReviewUpdateManyWithoutUserNestedInput>;
  Show?: InputMaybe<ShowUpdateManyWithoutUserNestedInput>;
  ShowRating?: InputMaybe<ShowRatingUpdateManyWithoutUserNestedInput>;
  ShowReview?: InputMaybe<ShowReviewUpdateManyWithoutUserNestedInput>;
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  instagram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutUserNestedInput>;
  logs?: InputMaybe<LogUpdateManyWithoutUserNestedInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  ratings?: InputMaybe<MovieRatingUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserUpsertWithoutListsInput = {
  create: UserCreateWithoutListsInput;
  update: UserUpdateWithoutListsInput;
};

export type UserUpsertWithoutMovieReviewInput = {
  create: UserCreateWithoutMovieReviewInput;
  update: UserUpdateWithoutMovieReviewInput;
};

export type UserUpsertWithoutMoviesInput = {
  create: UserCreateWithoutMoviesInput;
  update: UserUpdateWithoutMoviesInput;
};

export type UserUpsertWithoutRatingsInput = {
  create: UserCreateWithoutRatingsInput;
  update: UserUpdateWithoutRatingsInput;
};

export type UserUpsertWithoutShowInput = {
  create: UserCreateWithoutShowInput;
  update: UserUpdateWithoutShowInput;
};

export type UserUpsertWithoutShowRatingInput = {
  create: UserCreateWithoutShowRatingInput;
  update: UserUpdateWithoutShowRatingInput;
};

export type UserUpsertWithoutShowReviewInput = {
  create: UserCreateWithoutShowReviewInput;
  update: UserUpdateWithoutShowReviewInput;
};

export type UserUpsertWithoutWatchlistInput = {
  create: UserCreateWithoutWatchlistInput;
  update: UserUpdateWithoutWatchlistInput;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  MovieReview?: InputMaybe<MovieReviewListRelationFilter>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  Show?: InputMaybe<ShowListRelationFilter>;
  ShowRating?: InputMaybe<ShowRatingListRelationFilter>;
  ShowReview?: InputMaybe<ShowReviewListRelationFilter>;
  avatar?: InputMaybe<StringNullableFilter>;
  bio?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  instagram?: InputMaybe<StringNullableFilter>;
  lastName?: InputMaybe<StringFilter>;
  lists?: InputMaybe<ListListRelationFilter>;
  logs?: InputMaybe<LogListRelationFilter>;
  movies?: InputMaybe<MovieListRelationFilter>;
  password?: InputMaybe<StringFilter>;
  ratings?: InputMaybe<MovieRatingListRelationFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  twitter?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  watchlist?: InputMaybe<WatchlistRelationFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  count: Scalars['Int'];
  items: Array<User>;
};

export type UuidFilter = {
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedUuidFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type UuidNullableFilter = {
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedUuidNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type Watchlist = {
  __typename?: 'Watchlist';
  _count?: Maybe<WatchlistCount>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  movies: Array<Movie>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};


export type WatchlistMoviesArgs = {
  cursor?: InputMaybe<MovieWhereUniqueInput>;
  distinct?: InputMaybe<Array<MovieScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<MovieOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MovieWhereInput>;
};

export type WatchlistCount = {
  __typename?: 'WatchlistCount';
  movies: Scalars['Int'];
  shows: Scalars['Int'];
};

export type WatchlistCreateNestedManyWithoutMoviesInput = {
  connect?: InputMaybe<Array<WatchlistWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<WatchlistCreateOrConnectWithoutMoviesInput>>;
  create?: InputMaybe<Array<WatchlistCreateWithoutMoviesInput>>;
};

export type WatchlistCreateNestedManyWithoutShowsInput = {
  connect?: InputMaybe<Array<WatchlistWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<WatchlistCreateOrConnectWithoutShowsInput>>;
  create?: InputMaybe<Array<WatchlistCreateWithoutShowsInput>>;
};

export type WatchlistCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<WatchlistWhereUniqueInput>;
  connectOrCreate?: InputMaybe<WatchlistCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<WatchlistCreateWithoutUserInput>;
};

export type WatchlistCreateOrConnectWithoutMoviesInput = {
  create: WatchlistCreateWithoutMoviesInput;
  where: WatchlistWhereUniqueInput;
};

export type WatchlistCreateOrConnectWithoutShowsInput = {
  create: WatchlistCreateWithoutShowsInput;
  where: WatchlistWhereUniqueInput;
};

export type WatchlistCreateOrConnectWithoutUserInput = {
  create: WatchlistCreateWithoutUserInput;
  where: WatchlistWhereUniqueInput;
};

export type WatchlistCreateWithoutMoviesInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  shows?: InputMaybe<ShowCreateNestedManyWithoutWatchlistsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutWatchlistInput;
};

export type WatchlistCreateWithoutShowsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutWatchlistsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutWatchlistInput;
};

export type WatchlistCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutWatchlistsInput>;
  shows?: InputMaybe<ShowCreateNestedManyWithoutWatchlistsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type WatchlistInput = {
  ids: Array<Scalars['String']>;
};

export type WatchlistListRelationFilter = {
  every?: InputMaybe<WatchlistWhereInput>;
  none?: InputMaybe<WatchlistWhereInput>;
  some?: InputMaybe<WatchlistWhereInput>;
};

export type WatchlistOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type WatchlistOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  movies?: InputMaybe<MovieOrderByRelationAggregateInput>;
  shows?: InputMaybe<ShowOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export type WatchlistRelationFilter = {
  is?: InputMaybe<WatchlistWhereInput>;
  isNot?: InputMaybe<WatchlistWhereInput>;
};

export type WatchlistScalarWhereInput = {
  AND?: InputMaybe<Array<WatchlistScalarWhereInput>>;
  NOT?: InputMaybe<Array<WatchlistScalarWhereInput>>;
  OR?: InputMaybe<Array<WatchlistScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type WatchlistUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type WatchlistUpdateManyWithWhereWithoutMoviesInput = {
  data: WatchlistUpdateManyMutationInput;
  where: WatchlistScalarWhereInput;
};

export type WatchlistUpdateManyWithWhereWithoutShowsInput = {
  data: WatchlistUpdateManyMutationInput;
  where: WatchlistScalarWhereInput;
};

export type WatchlistUpdateManyWithoutMoviesNestedInput = {
  connect?: InputMaybe<Array<WatchlistWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<WatchlistCreateOrConnectWithoutMoviesInput>>;
  create?: InputMaybe<Array<WatchlistCreateWithoutMoviesInput>>;
  delete?: InputMaybe<Array<WatchlistWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<WatchlistScalarWhereInput>>;
  disconnect?: InputMaybe<Array<WatchlistWhereUniqueInput>>;
  set?: InputMaybe<Array<WatchlistWhereUniqueInput>>;
  update?: InputMaybe<Array<WatchlistUpdateWithWhereUniqueWithoutMoviesInput>>;
  updateMany?: InputMaybe<Array<WatchlistUpdateManyWithWhereWithoutMoviesInput>>;
  upsert?: InputMaybe<Array<WatchlistUpsertWithWhereUniqueWithoutMoviesInput>>;
};

export type WatchlistUpdateManyWithoutShowsNestedInput = {
  connect?: InputMaybe<Array<WatchlistWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<WatchlistCreateOrConnectWithoutShowsInput>>;
  create?: InputMaybe<Array<WatchlistCreateWithoutShowsInput>>;
  delete?: InputMaybe<Array<WatchlistWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<WatchlistScalarWhereInput>>;
  disconnect?: InputMaybe<Array<WatchlistWhereUniqueInput>>;
  set?: InputMaybe<Array<WatchlistWhereUniqueInput>>;
  update?: InputMaybe<Array<WatchlistUpdateWithWhereUniqueWithoutShowsInput>>;
  updateMany?: InputMaybe<Array<WatchlistUpdateManyWithWhereWithoutShowsInput>>;
  upsert?: InputMaybe<Array<WatchlistUpsertWithWhereUniqueWithoutShowsInput>>;
};

export type WatchlistUpdateOneWithoutUserNestedInput = {
  connect?: InputMaybe<WatchlistWhereUniqueInput>;
  connectOrCreate?: InputMaybe<WatchlistCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<WatchlistCreateWithoutUserInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<WatchlistUpdateWithoutUserInput>;
  upsert?: InputMaybe<WatchlistUpsertWithoutUserInput>;
};

export type WatchlistUpdateWithWhereUniqueWithoutMoviesInput = {
  data: WatchlistUpdateWithoutMoviesInput;
  where: WatchlistWhereUniqueInput;
};

export type WatchlistUpdateWithWhereUniqueWithoutShowsInput = {
  data: WatchlistUpdateWithoutShowsInput;
  where: WatchlistWhereUniqueInput;
};

export type WatchlistUpdateWithoutMoviesInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  shows?: InputMaybe<ShowUpdateManyWithoutWatchlistsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutWatchlistNestedInput>;
};

export type WatchlistUpdateWithoutShowsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutWatchlistsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutWatchlistNestedInput>;
};

export type WatchlistUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutWatchlistsNestedInput>;
  shows?: InputMaybe<ShowUpdateManyWithoutWatchlistsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type WatchlistUpsertWithWhereUniqueWithoutMoviesInput = {
  create: WatchlistCreateWithoutMoviesInput;
  update: WatchlistUpdateWithoutMoviesInput;
  where: WatchlistWhereUniqueInput;
};

export type WatchlistUpsertWithWhereUniqueWithoutShowsInput = {
  create: WatchlistCreateWithoutShowsInput;
  update: WatchlistUpdateWithoutShowsInput;
  where: WatchlistWhereUniqueInput;
};

export type WatchlistUpsertWithoutUserInput = {
  create: WatchlistCreateWithoutUserInput;
  update: WatchlistUpdateWithoutUserInput;
};

export type WatchlistWhereInput = {
  AND?: InputMaybe<Array<WatchlistWhereInput>>;
  NOT?: InputMaybe<Array<WatchlistWhereInput>>;
  OR?: InputMaybe<Array<WatchlistWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  movies?: InputMaybe<MovieListRelationFilter>;
  shows?: InputMaybe<ShowListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type WatchlistWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type AdminCreateUserMutationVariables = Exact<{
  data: UserCreateInput;
}>;


export type AdminCreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string } };

export type MeFragment = { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, avatar?: string | null, email: string, role: Role };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, avatar?: string | null, email: string, role: Role } | null };

export type GetSignedUrlForPutMutationVariables = Exact<{
  data: S3SignedUrlInput;
}>;


export type GetSignedUrlForPutMutation = { __typename?: 'Mutation', getSignedS3UrlForPut?: { __typename?: 'SignedResponse', url: string, uploadUrl: string } | null };

export type GetBulkSignedUrlForPutMutationVariables = Exact<{
  data: S3BulkSignedUrlInput;
}>;


export type GetBulkSignedUrlForPutMutation = { __typename?: 'Mutation', getBulkSignedS3UrlForPut?: Array<{ __typename?: 'SignedResponse', url: string, uploadUrl: string, key: string }> | null };

export type UserDetailFragment = { __typename?: 'User', id: string, fullName: string, bio?: string | null, avatar?: string | null, email: string, createdAt: string };

export type GetUserQueryVariables = Exact<{
  where?: InputMaybe<UserWhereInput>;
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, fullName: string, bio?: string | null, avatar?: string | null, email: string, createdAt: string } | null };

export type UserItemFragment = { __typename?: 'User', id: string, fullName: string, email: string, createdAt: string };

export type GetUsersQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput> | UserOrderByWithRelationInput>;
  where?: InputMaybe<UserWhereInput>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: { __typename?: 'UsersResponse', count: number, items: Array<{ __typename?: 'User', id: string, fullName: string, email: string, createdAt: string }> } };

export type RefreshTokenQueryVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokenQuery = { __typename?: 'Query', refreshToken?: { __typename?: 'RefreshTokenResponse', token: string, refreshToken: string } | null };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token: string, refreshToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, avatar?: string | null, email: string, role: Role } } };

export type PersonItemFragment = { __typename?: 'Person', id: string, name: string, avatar?: string | null, createdAt: string, updatedAt: string };

export type PeopleQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<PersonOrderByWithRelationInput> | PersonOrderByWithRelationInput>;
  where?: InputMaybe<PersonWhereInput>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type PeopleQuery = { __typename?: 'Query', people: { __typename?: 'PeopleResponse', count: number, items: Array<{ __typename?: 'Person', id: string, name: string, avatar?: string | null, createdAt: string, updatedAt: string }> } };

export type MoviesQueryVariables = Exact<{
  where?: InputMaybe<MovieWhereInput>;
  orderBy?: InputMaybe<Array<MovieOrderByWithRelationInput> | MovieOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type MoviesQuery = { __typename?: 'Query', movies: Array<{ __typename?: 'Movie', id: string, title: string, posters: Array<string> }> };

export type UpdateMeMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, avatar?: string | null, email: string, role: Role } };

export type DestroyAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DestroyAccountMutation = { __typename?: 'Mutation', destroyAccount: boolean };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', token: string, refreshToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, avatar?: string | null, email: string, role: Role } } };

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export const MeFragmentDoc = gql`
    fragment Me on User {
  id
  firstName
  lastName
  fullName
  avatar
  email
  role
}
    `;
export const UserDetailFragmentDoc = gql`
    fragment UserDetail on User {
  id
  fullName
  bio
  avatar
  email
  createdAt
}
    `;
export const UserItemFragmentDoc = gql`
    fragment UserItem on User {
  id
  fullName
  email
  createdAt
}
    `;
export const PersonItemFragmentDoc = gql`
    fragment PersonItem on Person {
  id
  name
  avatar
  createdAt
  updatedAt
}
    `;
export const AdminCreateUserDocument = gql`
    mutation AdminCreateUser($data: UserCreateInput!) {
  createUser(data: $data) {
    id
  }
}
    `;
export function useAdminCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreateUserMutation, AdminCreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreateUserMutation, AdminCreateUserMutationVariables>(AdminCreateUserDocument, options);
      }
export type AdminCreateUserMutationHookResult = ReturnType<typeof useAdminCreateUserMutation>;
export type AdminCreateUserMutationResult = Apollo.MutationResult<AdminCreateUserMutation>;
export type AdminCreateUserMutationOptions = Apollo.BaseMutationOptions<AdminCreateUserMutation, AdminCreateUserMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...Me
  }
}
    ${MeFragmentDoc}`;
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetSignedUrlForPutDocument = gql`
    mutation GetSignedUrlForPut($data: S3SignedUrlInput!) {
  getSignedS3UrlForPut(data: $data) {
    url
    uploadUrl
  }
}
    `;
export function useGetSignedUrlForPutMutation(baseOptions?: Apollo.MutationHookOptions<GetSignedUrlForPutMutation, GetSignedUrlForPutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetSignedUrlForPutMutation, GetSignedUrlForPutMutationVariables>(GetSignedUrlForPutDocument, options);
      }
export type GetSignedUrlForPutMutationHookResult = ReturnType<typeof useGetSignedUrlForPutMutation>;
export type GetSignedUrlForPutMutationResult = Apollo.MutationResult<GetSignedUrlForPutMutation>;
export type GetSignedUrlForPutMutationOptions = Apollo.BaseMutationOptions<GetSignedUrlForPutMutation, GetSignedUrlForPutMutationVariables>;
export const GetBulkSignedUrlForPutDocument = gql`
    mutation GetBulkSignedUrlForPut($data: S3BulkSignedUrlInput!) {
  getBulkSignedS3UrlForPut(data: $data) {
    url
    uploadUrl
    key
  }
}
    `;
export function useGetBulkSignedUrlForPutMutation(baseOptions?: Apollo.MutationHookOptions<GetBulkSignedUrlForPutMutation, GetBulkSignedUrlForPutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetBulkSignedUrlForPutMutation, GetBulkSignedUrlForPutMutationVariables>(GetBulkSignedUrlForPutDocument, options);
      }
export type GetBulkSignedUrlForPutMutationHookResult = ReturnType<typeof useGetBulkSignedUrlForPutMutation>;
export type GetBulkSignedUrlForPutMutationResult = Apollo.MutationResult<GetBulkSignedUrlForPutMutation>;
export type GetBulkSignedUrlForPutMutationOptions = Apollo.BaseMutationOptions<GetBulkSignedUrlForPutMutation, GetBulkSignedUrlForPutMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($where: UserWhereInput) {
  user(where: $where) {
    ...UserDetail
  }
}
    ${UserDetailFragmentDoc}`;
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers($orderBy: [UserOrderByWithRelationInput!], $where: UserWhereInput, $skip: Int) {
  users(take: 10, orderBy: $orderBy, where: $where, skip: $skip) {
    items {
      ...UserItem
    }
    count
  }
}
    ${UserItemFragmentDoc}`;
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const RefreshTokenDocument = gql`
    query RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    token
    refreshToken
  }
}
    `;
export function useRefreshTokenQuery(baseOptions: Apollo.QueryHookOptions<RefreshTokenQuery, RefreshTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RefreshTokenQuery, RefreshTokenQueryVariables>(RefreshTokenDocument, options);
      }
export function useRefreshTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RefreshTokenQuery, RefreshTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RefreshTokenQuery, RefreshTokenQueryVariables>(RefreshTokenDocument, options);
        }
export type RefreshTokenQueryHookResult = ReturnType<typeof useRefreshTokenQuery>;
export type RefreshTokenLazyQueryHookResult = ReturnType<typeof useRefreshTokenLazyQuery>;
export type RefreshTokenQueryResult = Apollo.QueryResult<RefreshTokenQuery, RefreshTokenQueryVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    user {
      ...Me
    }
    token
    refreshToken
  }
}
    ${MeFragmentDoc}`;
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const PeopleDocument = gql`
    query People($orderBy: [PersonOrderByWithRelationInput!], $where: PersonWhereInput, $skip: Int) {
  people(orderBy: $orderBy, where: $where, skip: $skip) {
    count
    items {
      ...PersonItem
    }
  }
}
    ${PersonItemFragmentDoc}`;
export function usePeopleQuery(baseOptions?: Apollo.QueryHookOptions<PeopleQuery, PeopleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PeopleQuery, PeopleQueryVariables>(PeopleDocument, options);
      }
export function usePeopleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PeopleQuery, PeopleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PeopleQuery, PeopleQueryVariables>(PeopleDocument, options);
        }
export type PeopleQueryHookResult = ReturnType<typeof usePeopleQuery>;
export type PeopleLazyQueryHookResult = ReturnType<typeof usePeopleLazyQuery>;
export type PeopleQueryResult = Apollo.QueryResult<PeopleQuery, PeopleQueryVariables>;
export const MoviesDocument = gql`
    query Movies($where: MovieWhereInput, $orderBy: [MovieOrderByWithRelationInput!], $skip: Int) {
  movies(where: $where, orderBy: $orderBy, skip: $skip) {
    id
    title
    posters
  }
}
    `;
export function useMoviesQuery(baseOptions?: Apollo.QueryHookOptions<MoviesQuery, MoviesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MoviesQuery, MoviesQueryVariables>(MoviesDocument, options);
      }
export function useMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoviesQuery, MoviesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MoviesQuery, MoviesQueryVariables>(MoviesDocument, options);
        }
export type MoviesQueryHookResult = ReturnType<typeof useMoviesQuery>;
export type MoviesLazyQueryHookResult = ReturnType<typeof useMoviesLazyQuery>;
export type MoviesQueryResult = Apollo.QueryResult<MoviesQuery, MoviesQueryVariables>;
export const UpdateMeDocument = gql`
    mutation UpdateMe($data: UpdateUserInput!) {
  updateMe(data: $data) {
    ...Me
  }
}
    ${MeFragmentDoc}`;
export function useUpdateMeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, options);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = Apollo.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = Apollo.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;
export const DestroyAccountDocument = gql`
    mutation DestroyAccount {
  destroyAccount
}
    `;
export function useDestroyAccountMutation(baseOptions?: Apollo.MutationHookOptions<DestroyAccountMutation, DestroyAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DestroyAccountMutation, DestroyAccountMutationVariables>(DestroyAccountDocument, options);
      }
export type DestroyAccountMutationHookResult = ReturnType<typeof useDestroyAccountMutation>;
export type DestroyAccountMutationResult = Apollo.MutationResult<DestroyAccountMutation>;
export type DestroyAccountMutationOptions = Apollo.BaseMutationOptions<DestroyAccountMutation, DestroyAccountMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    user {
      ...Me
    }
    token
    refreshToken
  }
}
    ${MeFragmentDoc}`;
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($data: ResetPasswordInput!) {
  resetPassword(data: $data)
}
    `;
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;