import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"
import { Person } from "@generated"

@InputType()
export class PersonInput implements Partial<Person> {
  @IsNotEmpty()
  @Field()
  name: string

  @Field({ nullable: true })
  avatar?: string | null
}
