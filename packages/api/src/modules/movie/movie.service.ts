import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Arg, Resolver } from "type-graphql"
import { Movie } from "./movie.model"
import { MovieInput } from "./inputs/create.input"
import { CurrentUser } from "../shared/currentUser"
import { User } from "../user/user.model"
import { MovieUpdateInput } from "./inputs/update.input"
import { MovieWhereUniqueInput } from "@generated"

@Service()
@Resolver(() => Movie)
export class MovieService {
  async get(id: string) {
    return await prisma.movie.findUnique({ where: { id } })
  }

  async getPopular() {
    return await prisma.movie.findMany({
      orderBy: {
        popularity: "desc",
      },
    })
  }

  async getAll() {
    return await prisma.movie.findMany()
  }

  async create(@Arg("data") data: MovieInput, @CurrentUser() user: User) {
    return await prisma.movie.create({ data: { userId: user.id, ...data } }).then(async (movie) => {
      await prisma.movie.update({
        where: { id: movie.id },
        data: {
          edits: {
            createMany: {
              skipDuplicates: true,
              data: Object.keys(data).map((key) => {
                return {
                  key,
                  // @ts-ignore
                  value: data[key],
                  userId: user.id || "c914c5ee-e143-426d-9efc-3e6f31c909a9",
                }
              }),
            },
          },
        },
      })
      return movie
    })
  }

  async update(@Arg("data") data: MovieUpdateInput, where: MovieWhereUniqueInput, @CurrentUser() user: User) {
    return await prisma.movie.update({
      data: {
        edits: {
          createMany: {
            skipDuplicates: true,
            data: Object.keys(data).map((key) => {
              return {
                key,
                // @ts-ignore
                value: data[key],
                userId: user.id || "c914c5ee-e143-426d-9efc-3e6f31c909a9",
              }
            }),
          },
        },
        ...data,
      },
      where,
    })
  }
}
