import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { Rating, DeleteOneRatingArgs } from "@generated"
import { RatingInput } from "./inputs/create.input"

@Service()
@Resolver(() => Rating)
export class RatingService {
  async upsert(data: RatingInput) {
    return await prisma.rating.upsert({
      where: { userId_movieId: { userId: data.userId, movieId: data.movieId } },
      create: { value: data.value, movieId: data.movieId, userId: data.userId },
      update: { value: data.value },
    })
  }

  async delete(args: DeleteOneRatingArgs) {
    return await prisma.rating.delete(args)
  }

  async getAllRatings() {
    return await prisma.rating.findMany()
  }
}
