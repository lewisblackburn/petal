import { Field, InputType, Int } from "type-graphql"
import { Rating } from "@generated"
import { IsNotEmpty, Max, Min } from "class-validator"

@InputType()
export class RatingInput implements Partial<Rating> {
  @Min(0)
  @Max(10)
  @Field(() => Int)
  value: number

  @IsNotEmpty()
  @Field()
  movieId: string

  @IsNotEmpty()
  @Field()
  userId: string
}
