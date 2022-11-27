import { IsNotEmpty } from "class-validator"
import { Field, InputType, Int } from "type-graphql"
import { Movie } from "@generated"

@InputType()
export class MovieInput implements Partial<Movie> {
  @IsNotEmpty()
  @Field()
  title: string

  @IsNotEmpty()
  @Field()
  overview: string

  @Field({ nullable: true })
  tagline?: string

  @Field(() => Int, { nullable: true })
  runtime?: number

  @Field(() => Int, { nullable: true })
  budget?: number

  @Field(() => Int, { nullable: true })
  revenue?: number

  @Field({ nullable: true })
  homepage?: string
}
