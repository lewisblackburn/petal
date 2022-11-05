import * as Prisma from "@prisma/client"
import { Genre, AgeRating, Platform, Status } from "@generated"
import { Field, ObjectType } from "type-graphql"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class Movie extends BaseModel implements Prisma.Movie {
  @Field()
  title: string

  @Field()
  overview: string

  @Field()
  userId: string

  @Field(() => Boolean, { nullable: true })
  adult: boolean | null

  @Field(() => Boolean, { nullable: true })
  budget: number | null

  @Field(() => [Genre])
  genres: Prisma.Genre[]

  @Field(() => [Platform])
  platform: Prisma.Platform[]

  @Field(() => AgeRating, { nullable: true })
  age_rating: Prisma.AgeRating | null

  @Field(() => Boolean, { nullable: true })
  locked: boolean | null

  @Field(() => String, { nullable: true })
  backdrop: string | null

  @Field(() => String, { nullable: true })
  poster: string | null

  @Field(() => Status, { nullable: true })
  status: Prisma.Status | null

  @Field(() => Number, { nullable: true })
  revenue: number | null

  @Field(() => Number, { nullable: true })
  runtime: number | null

  @Field(() => String, { nullable: true })
  tagline: string | null

  @Field(() => String, { nullable: true })
  homepage: string | null

  @Field(() => String, { nullable: true })
  language: string | null

  @Field(() => Date, { nullable: true })
  releaseDate: Date | null

  @Field(() => [String])
  keywords: string[]

  @Field(() => Number, { nullable: true })
  popularity: number | null
}
