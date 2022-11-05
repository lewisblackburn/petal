import { List } from "@generated"
import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class ListInput implements Partial<List> {
  @IsNotEmpty()
  @Field()
  title: string

  @Field(() => String, { nullable: true })
  description: string | null

  @Field(() => String, { nullable: true })
  public?: boolean | null

  @Field(() => String, { nullable: true })
  backdrop?: string | null
}
