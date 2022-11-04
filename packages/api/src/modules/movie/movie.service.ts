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

  async getPopularMovies() {
    return await prisma.movie.findMany({
      orderBy: {
        avg_rating: "desc",
      },
    })
  }

  async getTrendingMovies() {
    // Find many ratings within the last month and return updates movies in respect to the most updated
    // This won't work as the orderBy statement takes into account all ratings not within the last month
    return await prisma.rating
      .findMany({
        where: {
          updatedAt: {
            gt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            lt: new Date(),
          },
        },
      })
      .then(async (data) => {
        return await prisma.movie.findMany({
          orderBy: {
            ratings: {
              _count: "desc",
            },
          },
          where: {
            id: {
              in: data.map((movie) => movie.movieId),
            },
          },
        })
      })
  }
}
