import { prisma } from "../../lib/prisma"
import { Args, FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"
import { Movie } from "../movie/movie.model"
import { Edit, FindManyEditArgs } from "@generated"

@Service()
@Resolver(() => Movie)
export default class ListFieldResolver {
  @FieldResolver(() => [Edit])
  edits(@Root() movie: Movie, @Args() args: FindManyEditArgs) {
    return prisma.movie.findUnique({ where: { id: movie.id } }).edits(args)
  }
}
