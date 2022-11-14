import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"
import { Movie } from "@generated"

@InputType()
export class MovieInput implements Partial<Movie> {
  @IsNotEmpty()
  @Field()
  title: string

  @IsNotEmpty()
  @Field()
  overview: string
}
