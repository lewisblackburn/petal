import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { Watchlist, WatchlistWhereUniqueInput } from "@generated"
import { Inject, Service } from "typedi"
import { WatchlistService } from "./watchlist.service"
import { WatchlistInput } from "./inputs/create.input"

@Service()
@Resolver(() => Watchlist)
export default class WatchlistResolver {
  @Inject(() => WatchlistService)
  watchlistService: WatchlistService

  @Query(() => Watchlist)
  async watchlist(@Arg("id") id: string) {
    return this.watchlistService.get(id)
  }

  @Mutation(() => Watchlist)
  async updateWatchlist(@Arg("data") data: WatchlistInput, @Arg("where") where: WatchlistWhereUniqueInput) {
    return await this.watchlistService.update(data, where)
  }
}
