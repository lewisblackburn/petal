import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { Movie } from "./movie.model"
import { MovieInput } from "./inputs/create.input"

@Service()
@Resolver(() => Movie)
export class MovieService {
  async create(data: MovieInput) {
    return await prisma.movie.create({ data })
  }

  async getAllMovies() {
    return await prisma.movie.findMany()
  }

  async getMovie(id: string) {
    return await prisma.movie.findUnique({ where: { id } })
  }
}
