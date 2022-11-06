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
    return await prisma.movie.create({ data: { userId: user.id, ...data } })
  }

  async update(data: MovieInput, where: MovieWhereUniqueInput) {
    return await prisma.movie.update({
      data,
      where,
    })
  }
}
