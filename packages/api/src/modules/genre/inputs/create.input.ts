import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"
import { Genre } from "@generated"

@InputType()
export class GenreInput implements Partial<Genre> {
  @IsNotEmpty()
  @Field()
  name: string
}
