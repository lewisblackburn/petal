import { Field, InputType } from "type-graphql"
// import * as Prisma from "@prisma/client"

@InputType()
export class WatchlistInput {
  @Field(() => [String])
  ids: string[]
}
