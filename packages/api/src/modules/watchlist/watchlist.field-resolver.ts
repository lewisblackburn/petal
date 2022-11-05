import { prisma } from "../../lib/prisma"
import { Args, FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"
import { Movie, Watchlist, FindManyMovieArgs } from "@generated"

@Service()
@Resolver(() => Watchlist)
export default class WatchlistFieldResolver {
  @FieldResolver(() => [Movie])
  movies(@Root() watchlist: Watchlist, @Args() args: FindManyMovieArgs) {
    return prisma.watchlist.findUnique({ where: { id: watchlist.id } }).movies(args)
  }
}
