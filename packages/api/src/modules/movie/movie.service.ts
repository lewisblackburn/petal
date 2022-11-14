import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { User } from "../user/user.model"
import { Movie, MovieUpdateInput, MovieWhereUniqueInput, MovieUpdatelockedInput } from "@generated"
import { MovieInput } from "./inputs/create.input"
import { MediaType } from "@prisma/client"
import log from "../shared/log"

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

  async lock(data: MovieUpdatelockedInput, where: MovieWhereUniqueInput) {
    return await prisma.movie.update({
      where,
      data: {
        locked: data,
      },
    })
  }

  async create(data: MovieInput, user: User) {
    return await prisma.movie
      .create({ data: { userId: user.id, ...data } })
      .then((movie) => log(movie.id, user.id, MediaType.MOVIE, data))
  }

  async update(data: MovieUpdateInput, where: MovieWhereUniqueInput, user: User) {
    return await prisma.movie
      .update({
        data,
        where,
      })
      .then((movie) => log(movie.id, user.id, MediaType.MOVIE, data))
  }
}
