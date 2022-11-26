import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { User } from "../user/user.model"
import {
  Movie,
  MovieUpdateInput,
  MovieWhereUniqueInput,
  MovieUpdatelockedInput,
  FindManyMovieArgs,
} from "@generated"
import { MovieInput } from "./inputs/create.input"

@Service()
@Resolver(() => Movie)
export class MovieService {
  async get(id: string) {
    return await prisma.movie.findUnique({ where: { id } })
  }

  async getRecommended(id: string, popularity: number, genre: string) {
    return await prisma.movie.findMany({
      where: {
        id: {
          not: id,
        },
        genres: {
          some: {
            name: genre,
          },
        },
        popularity: {
          gt: popularity - 1,
          lt: popularity + 1,
        },
      },
      orderBy: {
        popularity: "desc",
      },
      take: 5,
    })
  }

  async getPopular() {
    return await prisma.movie.findMany({
      orderBy: {
        popularity: "desc",
      },
    })
  }

  async getAll(args: FindManyMovieArgs) {
    const items = await prisma.movie.findMany(args)
    const count = await prisma.movie.count({ ...args, take: undefined, skip: undefined })
    return { items, count }
  }

  async lock(data: MovieUpdatelockedInput, where: MovieWhereUniqueInput) {
    return await prisma.movie.update({
      where,
      data: {
        locked: data,
      },
    })
  }

  async create(data: MovieInput, user: User) {
    return await prisma.movie.create({ data: { userId: user.id, ...data } })
    // .then((movie) => log(movie.id, user.id, MediaType.MOVIE, data))
  }

  async update(data: MovieUpdateInput, where: MovieWhereUniqueInput, user: User) {
    return await prisma.movie.update({
      data,
      where,
    })
    // .then((movie) => log(movie.id, user.id, MediaType.MOVIE, data))
  }
}
