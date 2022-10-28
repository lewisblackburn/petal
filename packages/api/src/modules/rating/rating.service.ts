import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { Rating, DeleteOneRatingArgs } from "@generated"
import { RatingInput } from "./inputs/create.input"

@Service()
@Resolver(() => Rating)
export class RatingService {
  async create(data: RatingInput) {
    return await prisma.rating.create({ data })
  }

  async delete(args: DeleteOneRatingArgs) {
    return await prisma.rating.delete(args)
  }

  async getAllRatings() {
    return await prisma.rating.findMany()
  }
}
