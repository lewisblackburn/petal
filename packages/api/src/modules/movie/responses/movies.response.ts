import { ObjectType } from "type-graphql"

import { ConnectionResponse } from "../../shared/response/connection.response"
import { Movie } from "@generated"

@ObjectType()
export class MoviesResponse extends ConnectionResponse(() => [Movie]) {}
