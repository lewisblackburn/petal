import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { Watchlist, CreateOneWatchlistArgs, UpdateOneWatchlistArgs, DeleteOneWatchlistArgs } from "@generated"

@Service()
@Resolver(() => Watchlist)
export class WatchlistService {
  async create(args: CreateOneWatchlistArgs) {
    return await prisma.watchlist.create(args)
  }

  async update(args: UpdateOneWatchlistArgs) {
    return await prisma.watchlist.update(args)
  }

  async delete(args: DeleteOneWatchlistArgs) {
    return await prisma.watchlist.delete(args)
  }

  async getWatchlist(id: string) {
    return await prisma.watchlist.findUnique({ where: { id } })
  }
}
