import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { Rating, DeleteOneRatingArgs } from "@generated"
import { RatingInput } from "./inputs/create.input"

@Service()
@Resolver(() => Rating)
export class RatingService {
  async create(data: RatingInput) {
    return await prisma.rating.create({ data }).then(
      async (data) =>
        await prisma.rating
          .aggregate({
            where: {
              movieId: data.movieId,
            },
            _avg: {
              value: true,
            },
          })
          .then(async (result) => {
            await prisma.movie.update({
              where: { id: data.movieId },
              data: { avg_rating: result._avg.value },
            })

            return data
          }),
    )
  }

  async delete(args: DeleteOneRatingArgs) {
    return await prisma.rating.delete(args)
  }

  async getAllRatings() {
    return await prisma.rating.findMany()
  }
}
