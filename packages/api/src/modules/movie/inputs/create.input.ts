import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"
import * as Prisma from "@prisma/client"
import { Movie, Genre } from "@generated"

@InputType()
export class MovieInput implements Partial<Movie> {
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
