import { Field, InputType, Int } from "type-graphql"
import { MovieRating } from "@generated"
import { IsNotEmpty, Max, Min } from "class-validator"

@InputType()
export class MovieRatingInput implements Partial<MovieRating> {
  @Min(0)
  @Max(10)
  @Field(() => Int)
  value: number

  @IsNotEmpty()
  @Field()
  movieId: string
}
