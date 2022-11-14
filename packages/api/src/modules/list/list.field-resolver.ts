import { prisma } from "../../lib/prisma"
import { Args, FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"
import { Movie, Show, List, FindManyMovieArgs, FindManyShowArgs } from "@generated"

@Service()
@Resolver(() => List)
export default class ListFieldResolver {
  @FieldResolver(() => [Movie])
  movies(@Root() list: List, @Args() args: FindManyMovieArgs) {
    return prisma.list.findUnique({ where: { id: list.id } }).movies(args)
  }

  @FieldResolver(() => [Show])
  shows(@Root() list: List, @Args() args: FindManyShowArgs) {
    return prisma.list.findUnique({ where: { id: list.id } }).shows(args)
  }
}
