import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"

import { S3_URL } from "../../lib/config"
import { RatingAverage } from "../movie/movie.field-resolver"
import { UseCacheControl } from "../shared/middleware/UseCacheControl"
import { User } from "./user.model"
import { prisma } from "../../lib/prisma"

@Service()
@Resolver(() => User)
export default class UserFieldResolver {
  @FieldResolver(() => String)
  fullName(@Root() user: User) {
    if (!user.firstName && !user.lastName) return ""
    return (user.firstName + " " + user.lastName).trim()
  }

  @FieldResolver(() => RatingAverage)
  rating(@Root() user: User) {
    return prisma.rating.aggregate({
      where: { userId: user.id },
      _avg: { value: true },
      _count: { value: true },
    })
  }

  @UseCacheControl({ maxAge: 3600 })
  @FieldResolver(() => String, { nullable: true })
  avatar(@Root() user: User) {
    if (!user.avatar) return null
    return S3_URL + user.avatar
  }
}
