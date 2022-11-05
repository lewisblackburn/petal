import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { Watchlist, WatchlistWhereUniqueInput } from "@generated"
import { WatchlistInput } from "./inputs/create.input"
import { User } from "../user/user.model"

@Service()
@Resolver(() => Watchlist)
export class WatchlistService {
  async get(user: User) {
    return await prisma.watchlist.findUnique({ where: { userId: user.id } })
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
