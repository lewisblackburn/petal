import { prisma } from "../../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { MovieRating, DeleteOneMovieRatingArgs } from "@generated"
import { MovieRatingInput } from "./inputs/create.input"
import { User } from "../../user/user.model"

@Service()
@Resolver(() => MovieRating)
export class MovieRatingService {
  async upsert(data: MovieRatingInput, user: User) {
    return await prisma.movieRating.upsert({
      where: { userId_movieId: { userId: user.id, movieId: data.movieId } },
      create: { userId: user.id, movieId: data.movieId, value: data.value },
      update: { value: data.value },
    })
  }

  async delete(args: DeleteOneMovieRatingArgs) {
    return await prisma.movieRating.delete(args)
  }
}
