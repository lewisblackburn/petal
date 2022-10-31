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

export type EnumGenreNullableListFilter = {
  equals?: InputMaybe<Array<Genre>>;
  has?: InputMaybe<Genre>;
  hasEvery?: InputMaybe<Array<Genre>>;
  hasSome?: InputMaybe<Array<Genre>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type EnumPlatformNullableListFilter = {
  equals?: InputMaybe<Array<Platform>>;
  has?: InputMaybe<Platform>;
  hasEvery?: InputMaybe<Array<Platform>>;
  hasSome?: InputMaybe<Array<Platform>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
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

export enum Genre {
  Action = 'ACTION',
  Adventure = 'ADVENTURE',
  Animation = 'ANIMATION',
  Comedy = 'COMEDY',
  Crime = 'CRIME',
  Cyberpunk = 'CYBERPUNK',
  Fantasy = 'FANTASY',
  Historical = 'HISTORICAL',
  Horror = 'HORROR',
  Mystery = 'MYSTERY',
  Romance = 'ROMANCE',
  Satire = 'SATIRE',
  ScienceFiction = 'SCIENCE_FICTION',
  Speculative = 'SPECULATIVE',
  Thriller = 'THRILLER',
  Western = 'WESTERN'
}

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

export type List = {
  __typename?: 'List';
  _count?: Maybe<ListCount>;
  backdrop?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  movies: Array<Movie>;
  public?: Maybe<Scalars['Boolean']>;
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

export type ListCount = {
  __typename?: 'ListCount';
  movies: Scalars['Int'];
};

export type ListCreateInput = {
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
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
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

export type ListUpdateInput = {
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
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ListUpsertWithWhereUniqueWithoutMoviesInput = {
  create: ListCreateWithoutMoviesInput;
  update: ListUpdateWithoutMoviesInput;
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
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type ListWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Movie = {
  __typename?: 'Movie';
  adult?: Maybe<Scalars['Boolean']>;
  backdrop?: Maybe<Scalars['String']>;
  budget?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  genres: Array<Genre>;
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  locked?: Maybe<Scalars['Boolean']>;
  overview: Scalars['String'];
  poster?: Maybe<Scalars['String']>;
  releaseDate?: Maybe<Scalars['DateTime']>;
  revenue?: Maybe<Scalars['Float']>;
  runtime?: Maybe<Scalars['Float']>;
  status?: Maybe<Status>;
  tagline?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type MovieCreateManyUserInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrop?: InputMaybe<Scalars['String']>;
  budget?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  genres?: InputMaybe<MovieCreategenresInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  locked?: InputMaybe<Scalars['Boolean']>;
  overview: Scalars['String'];
  platform?: InputMaybe<MovieCreateplatformInput>;
  poster?: InputMaybe<Scalars['String']>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  revenue?: InputMaybe<Scalars['Int']>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MovieCreateManyUserInputEnvelope = {
  data: Array<MovieCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
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

export type MovieCreateNestedOneWithoutRatingsInput = {
  connect?: InputMaybe<MovieWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MovieCreateOrConnectWithoutRatingsInput>;
  create?: InputMaybe<MovieCreateWithoutRatingsInput>;
};

export type MovieCreateOrConnectWithoutListsInput = {
  create: MovieCreateWithoutListsInput;
  where: MovieWhereUniqueInput;
};

export type MovieCreateOrConnectWithoutRatingsInput = {
  create: MovieCreateWithoutRatingsInput;
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

export type MovieCreateWithoutListsInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrop?: InputMaybe<Scalars['String']>;
  budget?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  genres?: InputMaybe<MovieCreategenresInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  locked?: InputMaybe<Scalars['Boolean']>;
  overview: Scalars['String'];
  platform?: InputMaybe<MovieCreateplatformInput>;
  poster?: InputMaybe<Scalars['String']>;
  ratings?: InputMaybe<RatingCreateNestedManyWithoutMovieInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  revenue?: InputMaybe<Scalars['Int']>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutMoviesInput;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutMoviesInput>;
};

export type MovieCreateWithoutRatingsInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrop?: InputMaybe<Scalars['String']>;
  budget?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  genres?: InputMaybe<MovieCreategenresInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutMoviesInput>;
  locked?: InputMaybe<Scalars['Boolean']>;
  overview: Scalars['String'];
  platform?: InputMaybe<MovieCreateplatformInput>;
  poster?: InputMaybe<Scalars['String']>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  revenue?: InputMaybe<Scalars['Int']>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutMoviesInput;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutMoviesInput>;
};

export type MovieCreateWithoutUserInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrop?: InputMaybe<Scalars['String']>;
  budget?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  genres?: InputMaybe<MovieCreategenresInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutMoviesInput>;
  locked?: InputMaybe<Scalars['Boolean']>;
  overview: Scalars['String'];
  platform?: InputMaybe<MovieCreateplatformInput>;
  poster?: InputMaybe<Scalars['String']>;
  ratings?: InputMaybe<RatingCreateNestedManyWithoutMovieInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  revenue?: InputMaybe<Scalars['Int']>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  watchlists?: InputMaybe<WatchlistCreateNestedManyWithoutMoviesInput>;
};

export type MovieCreateWithoutWatchlistsInput = {
  adult?: InputMaybe<Scalars['Boolean']>;
  age_rating?: InputMaybe<AgeRating>;
  backdrop?: InputMaybe<Scalars['String']>;
  budget?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  genres?: InputMaybe<MovieCreategenresInput>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  lists?: InputMaybe<ListCreateNestedManyWithoutMoviesInput>;
  locked?: InputMaybe<Scalars['Boolean']>;
  overview: Scalars['String'];
  platform?: InputMaybe<MovieCreateplatformInput>;
  poster?: InputMaybe<Scalars['String']>;
  ratings?: InputMaybe<RatingCreateNestedManyWithoutMovieInput>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  revenue?: InputMaybe<Scalars['Int']>;
  runtime?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Status>;
  tagline?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutMoviesInput;
};

export type MovieCreategenresInput = {
  set: Array<Genre>;
};

export type MovieCreateplatformInput = {
  set: Array<Platform>;
};

export type MovieInput = {
  genres: Array<Genre>;
  overview: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['String'];
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
  backdrop?: InputMaybe<SortOrder>;
  budget?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  genres?: InputMaybe<SortOrder>;
  homepage?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  language?: InputMaybe<SortOrder>;
  lists?: InputMaybe<ListOrderByRelationAggregateInput>;
  locked?: InputMaybe<SortOrder>;
  overview?: InputMaybe<SortOrder>;
  platform?: InputMaybe<SortOrder>;
  poster?: InputMaybe<SortOrder>;
  ratings?: InputMaybe<RatingOrderByRelationAggregateInput>;
  releaseDate?: InputMaybe<SortOrder>;
  revenue?: InputMaybe<SortOrder>;
  runtime?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  tagline?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
  watchlists?: InputMaybe<WatchlistOrderByRelationAggregateInput>;
};

export type MovieRelationFilter = {
  is?: InputMaybe<MovieWhereInput>;
  isNot?: InputMaybe<MovieWhereInput>;
};

export enum MovieScalarFieldEnum {
  Adult = 'adult',
  AgeRating = 'age_rating',
  Backdrop = 'backdrop',
  Budget = 'budget',
  CreatedAt = 'createdAt',
  Genres = 'genres',
  Homepage = 'homepage',
  Id = 'id',
  Language = 'language',
  Locked = 'locked',
  Overview = 'overview',
  Platform = 'platform',
  Poster = 'poster',
  ReleaseDate = 'releaseDate',
  Revenue = 'revenue',
  Runtime = 'runtime',
  Status = 'status',
  Tagline = 'tagline',
  Title = 'title',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type MovieScalarWhereInput = {
  AND?: InputMaybe<Array<MovieScalarWhereInput>>;
  NOT?: InputMaybe<Array<MovieScalarWhereInput>>;
  OR?: InputMaybe<Array<MovieScalarWhereInput>>;
  adult?: InputMaybe<BoolNullableFilter>;
  age_rating?: InputMaybe<EnumAgeRatingNullableFilter>;
  backdrop?: InputMaybe<StringNullableFilter>;
  budget?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  genres?: InputMaybe<EnumGenreNullableListFilter>;
  homepage?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<UuidFilter>;
  language?: InputMaybe<StringNullableFilter>;
  locked?: InputMaybe<BoolNullableFilter>;
  overview?: InputMaybe<StringFilter>;
  platform?: InputMaybe<EnumPlatformNullableListFilter>;
  poster?: InputMaybe<StringNullableFilter>;
  releaseDate?: InputMaybe<DateTimeNullableFilter>;
  revenue?: InputMaybe<IntNullableFilter>;
  runtime?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<EnumStatusNullableFilter>;
  tagline?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type MovieUpdateManyMutationInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrop?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  budget?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  genres?: InputMaybe<MovieUpdategenresInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  locked?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<MovieUpdateplatformInput>;
  poster?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  revenue?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
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

export type MovieUpdateOneRequiredWithoutRatingsNestedInput = {
  connect?: InputMaybe<MovieWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MovieCreateOrConnectWithoutRatingsInput>;
  create?: InputMaybe<MovieCreateWithoutRatingsInput>;
  update?: InputMaybe<MovieUpdateWithoutRatingsInput>;
  upsert?: InputMaybe<MovieUpsertWithoutRatingsInput>;
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

export type MovieUpdateWithoutListsInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrop?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  budget?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  genres?: InputMaybe<MovieUpdategenresInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  locked?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<MovieUpdateplatformInput>;
  poster?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  ratings?: InputMaybe<RatingUpdateManyWithoutMovieNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  revenue?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutMoviesNestedInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutMoviesNestedInput>;
};

export type MovieUpdateWithoutRatingsInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrop?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  budget?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  genres?: InputMaybe<MovieUpdategenresInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutMoviesNestedInput>;
  locked?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<MovieUpdateplatformInput>;
  poster?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  revenue?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutMoviesNestedInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutMoviesNestedInput>;
};

export type MovieUpdateWithoutUserInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrop?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  budget?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  genres?: InputMaybe<MovieUpdategenresInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutMoviesNestedInput>;
  locked?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<MovieUpdateplatformInput>;
  poster?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  ratings?: InputMaybe<RatingUpdateManyWithoutMovieNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  revenue?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  watchlists?: InputMaybe<WatchlistUpdateManyWithoutMoviesNestedInput>;
};

export type MovieUpdateWithoutWatchlistsInput = {
  adult?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age_rating?: InputMaybe<NullableEnumAgeRatingFieldUpdateOperationsInput>;
  backdrop?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  budget?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  genres?: InputMaybe<MovieUpdategenresInput>;
  homepage?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutMoviesNestedInput>;
  locked?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  overview?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<MovieUpdateplatformInput>;
  poster?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  ratings?: InputMaybe<RatingUpdateManyWithoutMovieNestedInput>;
  releaseDate?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  revenue?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  runtime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<NullableEnumStatusFieldUpdateOperationsInput>;
  tagline?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutMoviesNestedInput>;
};

export type MovieUpdategenresInput = {
  push?: InputMaybe<Array<Genre>>;
  set?: InputMaybe<Array<Genre>>;
};

export type MovieUpdateplatformInput = {
  push?: InputMaybe<Array<Platform>>;
  set?: InputMaybe<Array<Platform>>;
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

export type MovieUpsertWithoutRatingsInput = {
  create: MovieCreateWithoutRatingsInput;
  update: MovieUpdateWithoutRatingsInput;
};

export type MovieWhereInput = {
  AND?: InputMaybe<Array<MovieWhereInput>>;
  NOT?: InputMaybe<Array<MovieWhereInput>>;
  OR?: InputMaybe<Array<MovieWhereInput>>;
  adult?: InputMaybe<BoolNullableFilter>;
  age_rating?: InputMaybe<EnumAgeRatingNullableFilter>;
  backdrop?: InputMaybe<StringNullableFilter>;
  budget?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  genres?: InputMaybe<EnumGenreNullableListFilter>;
  homepage?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<UuidFilter>;
  language?: InputMaybe<StringNullableFilter>;
  lists?: InputMaybe<ListListRelationFilter>;
  locked?: InputMaybe<BoolNullableFilter>;
  overview?: InputMaybe<StringFilter>;
  platform?: InputMaybe<EnumPlatformNullableListFilter>;
  poster?: InputMaybe<StringNullableFilter>;
  ratings?: InputMaybe<RatingListRelationFilter>;
  releaseDate?: InputMaybe<DateTimeNullableFilter>;
  revenue?: InputMaybe<IntNullableFilter>;
  runtime?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<EnumStatusNullableFilter>;
  tagline?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
  watchlists?: InputMaybe<WatchlistListRelationFilter>;
};

export type MovieWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createList: List;
  createMovie: Movie;
  createRating: Rating;
  createUser: User;
  deleteRating: Rating;
  destroyAccount: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  getBulkSignedS3UrlForPut?: Maybe<Array<SignedResponse>>;
  getSignedS3UrlForPut?: Maybe<SignedResponse>;
  login: AuthResponse;
  register: AuthResponse;
  resetPassword: Scalars['Boolean'];
  updateList: List;
  updateMe: User;
};


export type MutationCreateListArgs = {
  data: ListCreateInput;
};


export type MutationCreateMovieArgs = {
  data: MovieInput;
};


export type MutationCreateRatingArgs = {
  data: RatingInput;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationDeleteRatingArgs = {
  where: RatingWhereUniqueInput;
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


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationUpdateListArgs = {
  data: ListUpdateInput;
  where: ListWhereUniqueInput;
};


export type MutationUpdateMeArgs = {
  data: UpdateUserInput;
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

export enum Platform {
  Netflix = 'NETFLIX',
  Youtube = 'YOUTUBE'
}

export type Query = {
  __typename?: 'Query';
  getSignedS3UrlForGet?: Maybe<Scalars['String']>;
  list: List;
  lists: Array<List>;
  me?: Maybe<User>;
  movie: Movie;
  movies: Array<Movie>;
  ratings: Array<Rating>;
  refreshToken?: Maybe<RefreshTokenResponse>;
  user?: Maybe<User>;
  users: UsersResponse;
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

export type Rating = {
  __typename?: 'Rating';
  createdAt: Scalars['DateTime'];
  movie: Movie;
  movieId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  value: Scalars['Int'];
};

export type RatingCreateManyMovieInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId: Scalars['String'];
  value: Scalars['Int'];
};

export type RatingCreateManyMovieInputEnvelope = {
  data: Array<RatingCreateManyMovieInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type RatingCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  movieId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  value: Scalars['Int'];
};

export type RatingCreateManyUserInputEnvelope = {
  data: Array<RatingCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type RatingCreateNestedManyWithoutMovieInput = {
  connect?: InputMaybe<Array<RatingWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RatingCreateOrConnectWithoutMovieInput>>;
  create?: InputMaybe<Array<RatingCreateWithoutMovieInput>>;
  createMany?: InputMaybe<RatingCreateManyMovieInputEnvelope>;
};

export type RatingCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<RatingWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RatingCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<RatingCreateWithoutUserInput>>;
  createMany?: InputMaybe<RatingCreateManyUserInputEnvelope>;
};

export type RatingCreateOrConnectWithoutMovieInput = {
  create: RatingCreateWithoutMovieInput;
  where: RatingWhereUniqueInput;
};

export type RatingCreateOrConnectWithoutUserInput = {
  create: RatingCreateWithoutUserInput;
  where: RatingWhereUniqueInput;
};

export type RatingCreateWithoutMovieInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutRatingsInput;
  value: Scalars['Int'];
};

export type RatingCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  movie: MovieCreateNestedOneWithoutRatingsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  value: Scalars['Int'];
};

export type RatingInput = {
  movieId: Scalars['String'];
  userId: Scalars['String'];
  value: Scalars['Int'];
};

export type RatingListRelationFilter = {
  every?: InputMaybe<RatingWhereInput>;
  none?: InputMaybe<RatingWhereInput>;
  some?: InputMaybe<RatingWhereInput>;
};

export type RatingOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RatingScalarWhereInput = {
  AND?: InputMaybe<Array<RatingScalarWhereInput>>;
  NOT?: InputMaybe<Array<RatingScalarWhereInput>>;
  OR?: InputMaybe<Array<RatingScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  movieId?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<UuidFilter>;
  value?: InputMaybe<IntFilter>;
};

export type RatingUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  value?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type RatingUpdateManyWithWhereWithoutMovieInput = {
  data: RatingUpdateManyMutationInput;
  where: RatingScalarWhereInput;
};

export type RatingUpdateManyWithWhereWithoutUserInput = {
  data: RatingUpdateManyMutationInput;
  where: RatingScalarWhereInput;
};

export type RatingUpdateManyWithoutMovieNestedInput = {
  connect?: InputMaybe<Array<RatingWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RatingCreateOrConnectWithoutMovieInput>>;
  create?: InputMaybe<Array<RatingCreateWithoutMovieInput>>;
  createMany?: InputMaybe<RatingCreateManyMovieInputEnvelope>;
  delete?: InputMaybe<Array<RatingWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<RatingScalarWhereInput>>;
  disconnect?: InputMaybe<Array<RatingWhereUniqueInput>>;
  set?: InputMaybe<Array<RatingWhereUniqueInput>>;
  update?: InputMaybe<Array<RatingUpdateWithWhereUniqueWithoutMovieInput>>;
  updateMany?: InputMaybe<Array<RatingUpdateManyWithWhereWithoutMovieInput>>;
  upsert?: InputMaybe<Array<RatingUpsertWithWhereUniqueWithoutMovieInput>>;
};

export type RatingUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<RatingWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RatingCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<RatingCreateWithoutUserInput>>;
  createMany?: InputMaybe<RatingCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<RatingWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<RatingScalarWhereInput>>;
  disconnect?: InputMaybe<Array<RatingWhereUniqueInput>>;
  set?: InputMaybe<Array<RatingWhereUniqueInput>>;
  update?: InputMaybe<Array<RatingUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<RatingUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<RatingUpsertWithWhereUniqueWithoutUserInput>>;
};

export type RatingUpdateWithWhereUniqueWithoutMovieInput = {
  data: RatingUpdateWithoutMovieInput;
  where: RatingWhereUniqueInput;
};

export type RatingUpdateWithWhereUniqueWithoutUserInput = {
  data: RatingUpdateWithoutUserInput;
  where: RatingWhereUniqueInput;
};

export type RatingUpdateWithoutMovieInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutRatingsNestedInput>;
  value?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type RatingUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  movie?: InputMaybe<MovieUpdateOneRequiredWithoutRatingsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  value?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type RatingUpsertWithWhereUniqueWithoutMovieInput = {
  create: RatingCreateWithoutMovieInput;
  update: RatingUpdateWithoutMovieInput;
  where: RatingWhereUniqueInput;
};

export type RatingUpsertWithWhereUniqueWithoutUserInput = {
  create: RatingCreateWithoutUserInput;
  update: RatingUpdateWithoutUserInput;
  where: RatingWhereUniqueInput;
};

export type RatingUserIdMovieIdCompoundUniqueInput = {
  movieId: Scalars['String'];
  userId: Scalars['String'];
};

export type RatingWhereInput = {
  AND?: InputMaybe<Array<RatingWhereInput>>;
  NOT?: InputMaybe<Array<RatingWhereInput>>;
  OR?: InputMaybe<Array<RatingWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  movie?: InputMaybe<MovieRelationFilter>;
  movieId?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
  value?: InputMaybe<IntFilter>;
};

export type RatingWhereUniqueInput = {
  userId_movieId?: InputMaybe<RatingUserIdMovieIdCompoundUniqueInput>;
};

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
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  lists?: InputMaybe<ListCreateNestedManyWithoutUserInput>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  ratings?: InputMaybe<RatingCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  twitter?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  watchlist: WatchlistCreateNestedOneWithoutUserInput;
};

export type UserCreateNestedOneWithoutListsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutListsInput>;
  create?: InputMaybe<UserCreateWithoutListsInput>;
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

export type UserCreateNestedOneWithoutWatchlistInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutWatchlistInput>;
  create?: InputMaybe<UserCreateWithoutWatchlistInput>;
};

export type UserCreateOrConnectWithoutListsInput = {
  create: UserCreateWithoutListsInput;
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

export type UserCreateOrConnectWithoutWatchlistInput = {
  create: UserCreateWithoutWatchlistInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutListsInput = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  movies?: InputMaybe<MovieCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  ratings?: InputMaybe<RatingCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  twitter?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  watchlist: WatchlistCreateNestedOneWithoutUserInput;
};

export type UserCreateWithoutMoviesInput = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  lists?: InputMaybe<ListCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  ratings?: InputMaybe<RatingCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  twitter?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  watchlist: WatchlistCreateNestedOneWithoutUserInput;
};

export type UserCreateWithoutRatingsInput = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  lists?: InputMaybe<ListCreateNestedManyWithoutUserInput>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  role?: InputMaybe<Role>;
  twitter?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  watchlist: WatchlistCreateNestedOneWithoutUserInput;
};

export type UserCreateWithoutWatchlistInput = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  lists?: InputMaybe<ListCreateNestedManyWithoutUserInput>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  ratings?: InputMaybe<RatingCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  twitter?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UserOrderByWithRelationInput = {
  avatar?: InputMaybe<SortOrder>;
  bio?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  instagram?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  lists?: InputMaybe<ListOrderByRelationAggregateInput>;
  movies?: InputMaybe<MovieOrderByRelationAggregateInput>;
  password?: InputMaybe<SortOrder>;
  ratings?: InputMaybe<RatingOrderByRelationAggregateInput>;
  role?: InputMaybe<SortOrder>;
  twitter?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  watchlist?: InputMaybe<WatchlistOrderByWithRelationInput>;
  watchlistId?: InputMaybe<SortOrder>;
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
  UpdatedAt = 'updatedAt',
  WatchlistId = 'watchlistId'
}

export type UserUpdateOneRequiredWithoutListsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutListsInput>;
  create?: InputMaybe<UserCreateWithoutListsInput>;
  update?: InputMaybe<UserUpdateWithoutListsInput>;
  upsert?: InputMaybe<UserUpsertWithoutListsInput>;
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

export type UserUpdateOneWithoutWatchlistNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutWatchlistInput>;
  create?: InputMaybe<UserCreateWithoutWatchlistInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserUpdateWithoutWatchlistInput>;
  upsert?: InputMaybe<UserUpsertWithoutWatchlistInput>;
};

export type UserUpdateWithoutListsInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  instagram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  ratings?: InputMaybe<RatingUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  watchlist?: InputMaybe<WatchlistUpdateOneRequiredWithoutUserNestedInput>;
};

export type UserUpdateWithoutMoviesInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  instagram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  ratings?: InputMaybe<RatingUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  watchlist?: InputMaybe<WatchlistUpdateOneRequiredWithoutUserNestedInput>;
};

export type UserUpdateWithoutRatingsInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  instagram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutUserNestedInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  watchlist?: InputMaybe<WatchlistUpdateOneRequiredWithoutUserNestedInput>;
};

export type UserUpdateWithoutWatchlistInput = {
  avatar?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  instagram?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<StringFieldUpdateOperationsInput>;
  lists?: InputMaybe<ListUpdateManyWithoutUserNestedInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  ratings?: InputMaybe<RatingUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  twitter?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserUpsertWithoutListsInput = {
  create: UserCreateWithoutListsInput;
  update: UserUpdateWithoutListsInput;
};

export type UserUpsertWithoutMoviesInput = {
  create: UserCreateWithoutMoviesInput;
  update: UserUpdateWithoutMoviesInput;
};

export type UserUpsertWithoutRatingsInput = {
  create: UserCreateWithoutRatingsInput;
  update: UserUpdateWithoutRatingsInput;
};

export type UserUpsertWithoutWatchlistInput = {
  create: UserCreateWithoutWatchlistInput;
  update: UserUpdateWithoutWatchlistInput;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  avatar?: InputMaybe<StringNullableFilter>;
  bio?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  instagram?: InputMaybe<StringNullableFilter>;
  lastName?: InputMaybe<StringFilter>;
  lists?: InputMaybe<ListListRelationFilter>;
  movies?: InputMaybe<MovieListRelationFilter>;
  password?: InputMaybe<StringFilter>;
  ratings?: InputMaybe<RatingListRelationFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  twitter?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  watchlist?: InputMaybe<WatchlistRelationFilter>;
  watchlistId?: InputMaybe<UuidFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  watchlistId?: InputMaybe<Scalars['String']>;
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

export type WatchlistCreateNestedManyWithoutMoviesInput = {
  connect?: InputMaybe<Array<WatchlistWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<WatchlistCreateOrConnectWithoutMoviesInput>>;
  create?: InputMaybe<Array<WatchlistCreateWithoutMoviesInput>>;
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

export type WatchlistCreateOrConnectWithoutUserInput = {
  create: WatchlistCreateWithoutUserInput;
  where: WatchlistWhereUniqueInput;
};

export type WatchlistCreateWithoutMoviesInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserCreateNestedOneWithoutWatchlistInput>;
  userId: Scalars['String'];
};

export type WatchlistCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  movies?: InputMaybe<MovieCreateNestedManyWithoutWatchlistsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId: Scalars['String'];
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
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type WatchlistUpdateManyWithWhereWithoutMoviesInput = {
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

export type WatchlistUpdateOneRequiredWithoutUserNestedInput = {
  connect?: InputMaybe<WatchlistWhereUniqueInput>;
  connectOrCreate?: InputMaybe<WatchlistCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<WatchlistCreateWithoutUserInput>;
  update?: InputMaybe<WatchlistUpdateWithoutUserInput>;
  upsert?: InputMaybe<WatchlistUpsertWithoutUserInput>;
};

export type WatchlistUpdateWithWhereUniqueWithoutMoviesInput = {
  data: WatchlistUpdateWithoutMoviesInput;
  where: WatchlistWhereUniqueInput;
};

export type WatchlistUpdateWithoutMoviesInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutWatchlistNestedInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type WatchlistUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  movies?: InputMaybe<MovieUpdateManyWithoutWatchlistsNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type WatchlistUpsertWithWhereUniqueWithoutMoviesInput = {
  create: WatchlistCreateWithoutMoviesInput;
  update: WatchlistUpdateWithoutMoviesInput;
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

export type MoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type MoviesQuery = { __typename?: 'Query', movies: Array<{ __typename?: 'Movie', id: string, createdAt: string, updatedAt: string, title: string, overview: string, userId: string, adult?: boolean | null, budget?: boolean | null, genres: Array<Genre>, locked?: boolean | null, backdrop?: string | null, poster?: string | null, status?: Status | null, revenue?: number | null, runtime?: number | null, tagline?: string | null, homepage?: string | null, language?: string | null, releaseDate?: string | null }> };

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
export const MoviesDocument = gql`
    query Movies {
  movies {
    id
    createdAt
    updatedAt
    title
    overview
    userId
    adult
    budget
    genres
    locked
    backdrop
    poster
    status
    revenue
    runtime
    tagline
    homepage
    language
    releaseDate
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