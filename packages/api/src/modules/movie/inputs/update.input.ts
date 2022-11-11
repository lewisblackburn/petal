import { Field, InputType } from "type-graphql"
import * as Prisma from "@prisma/client"
import { Movie, Genre } from "@generated"

@InputType()
export class MovieUpdateInput implements Partial<Movie> {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  overview?: string

  @Field(() => [Genre], { nullable: true })
  genres?: Prisma.Genre[]
}
