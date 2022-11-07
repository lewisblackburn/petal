import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"
import { Character } from "@generated"

@InputType()
export class CharacterInput implements Partial<Character> {
  @IsNotEmpty()
  @Field()
  name: string

  @IsNotEmpty()
  @Field()
  personId: string

  @IsNotEmpty()
  @Field()
  movieId: string
}
