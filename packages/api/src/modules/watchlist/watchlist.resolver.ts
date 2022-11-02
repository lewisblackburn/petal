import { Arg, Args, Mutation, Query, Resolver } from "type-graphql"
import { Watchlist, CreateOneWatchlistArgs, UpdateOneWatchlistArgs, DeleteOneWatchlistArgs } from "@generated"
import { Inject, Service } from "typedi"
import { WatchlistService } from "./watchlist.service"

@Service()
@Resolver(() => Watchlist)
export default class WatchlistResolver {
  @Inject(() => WatchlistService)
  watchlistService: WatchlistService

  @Query(() => Watchlist)
  async watchlist(@Arg("id") id: string) {
    return this.watchlistService.getWatchlist(id)
  }

  @Mutation(() => Watchlist)
  async createWatchlist(@Args() args: CreateOneWatchlistArgs) {
    return await this.watchlistService.create(args)
  }

  @Mutation(() => Watchlist)
  async updateWatchlist(@Args() args: UpdateOneWatchlistArgs) {
    return await this.watchlistService.update(args)
  }

  @Mutation(() => Watchlist)
  async deleteWatchlist(@Args() args: DeleteOneWatchlistArgs) {
    return await this.watchlistService.delete(args)
  }
}
