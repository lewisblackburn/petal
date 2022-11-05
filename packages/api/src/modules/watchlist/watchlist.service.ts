import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { Watchlist, WatchlistWhereUniqueInput } from "@generated"
import { WatchlistInput } from "./inputs/create.input"

@Service()
@Resolver(() => Watchlist)
export class WatchlistService {
  async get(id: string) {
    return await prisma.watchlist.findUnique({ where: { id } })
  }

  async update(data: WatchlistInput, where: WatchlistWhereUniqueInput) {
    return await prisma.watchlist.update({
      data: {
        movies: {
          connect: data.ids.map((id) => {
            return { id }
          }),
        },
      },
      where,
    })
  }
}
