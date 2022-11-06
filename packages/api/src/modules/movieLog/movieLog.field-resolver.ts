import { prisma } from "../../lib/prisma"
import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"
import { MovieLog } from "@generated"
import { User } from "../user/user.model"

@Service()
@Resolver(() => MovieLog)
export default class MovieLogFieldResolver {
  @FieldResolver(() => User)
  user(@Root() movieLog: MovieLog) {
    return prisma.movieLog.findUnique({ where: { id: movieLog.id } }).user()
  }
}
