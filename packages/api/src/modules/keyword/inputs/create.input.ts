import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"
import { Keyword } from "@generated"

@InputType()
export class KeywordInput implements Partial<Keyword> {
  @IsNotEmpty()
  @Field()
  name: string
}
