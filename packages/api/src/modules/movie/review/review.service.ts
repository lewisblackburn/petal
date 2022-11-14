import { prisma } from "../../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { MovieReview, DeleteOneMovieReviewArgs } from "@generated"
import { MovieReviewInput } from "./inputs/create.input"
import { User } from "../../user/user.model"

@Service()
@Resolver(() => MovieReview)
export class MovieReviewService {
  async upsert(data: MovieReviewInput, user: User) {
    return await prisma.movieReview.upsert({
      where: { userId_movieId: { userId: user.id, movieId: data.movieId } },
      create: { userId: user.id, movieId: data.movieId, comment: data.comment },
      update: { comment: data.comment },
    })
  }

  async delete(args: DeleteOneMovieReviewArgs) {
    return await prisma.movieReview.delete(args)
  }
}
