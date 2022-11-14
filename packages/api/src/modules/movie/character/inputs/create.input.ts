import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"
import { MovieCharacter } from "@generated"

@InputType()
export class MovieCharacterInput implements Partial<MovieCharacter> {
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
