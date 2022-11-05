import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { MovieInput } from "./inputs/create.input"
import { User } from "../user/user.model"
import { Movie, MovieWhereUniqueInput } from "@generated"

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

  async create(data: MovieInput, user: User) {
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

  async update(data: MovieInput, where: MovieWhereUniqueInput, user: User) {
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
