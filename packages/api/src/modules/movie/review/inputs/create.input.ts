import { Field, InputType } from "type-graphql"
import { MovieReview } from "@generated"
import { IsNotEmpty } from "class-validator"

@InputType()
export class MovieReviewInput implements Partial<MovieReview> {
  @IsNotEmpty()
  @Field()
  comment: string

  @IsNotEmpty()
  @Field()
  movieId: string
}
