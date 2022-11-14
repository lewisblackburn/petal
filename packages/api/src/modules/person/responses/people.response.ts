import { ObjectType } from "type-graphql"

import { ConnectionResponse } from "../../shared/response/connection.response"
import { Person } from "@generated"

@ObjectType()
export class PeopleResponse extends ConnectionResponse(() => [Person]) {}
