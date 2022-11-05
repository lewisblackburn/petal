import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"
import * as Prisma from "@prisma/client"
import { Genre } from "@generated"

import { Movie } from "../movie.model"

@InputType()
export class MovieUpdateInput implements Partial<Movie> {
  @IsNotEmpty()
  @Field()
  title: string

  @IsNotEmpty()
  @Field()
  overview: string

  @IsNotEmpty()
  @Field(() => [Genre])
  genres?: Prisma.Genre[]
}
