import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { Watchlist, WatchlistWhereUniqueInput } from "@generated"
import { Inject, Service } from "typedi"
import { WatchlistService } from "./watchlist.service"
import { WatchlistInput } from "./inputs/create.input"
import { CurrentUser } from "../shared/currentUser"

import { User } from "../user/user.model"
import { UseAuth } from "../shared/middleware/UseAuth"

@Service()
@Resolver(() => Watchlist)
export default class WatchlistResolver {
  @Inject(() => WatchlistService)
  watchlistService: WatchlistService

  @UseAuth()
  @Query(() => Watchlist)
  async watchlist(@CurrentUser() user: User) {
    return this.watchlistService.get(user)
  }

  @UseAuth()
  @Mutation(() => Watchlist)
  async updateWatchlist(@Arg("data") data: WatchlistInput, @Arg("where") where: WatchlistWhereUniqueInput) {
    return await this.watchlistService.update(data, where)
  }
}
