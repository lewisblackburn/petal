import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { Rating, DeleteOneRatingArgs } from "@generated"
import { RatingInput } from "./inputs/create.input"
import { User } from "../user/user.model"

@Service()
@Resolver(() => Rating)
export class RatingService {
  async upsert(data: RatingInput, user: User) {
    return await prisma.rating.upsert({
      where: { userId_movieId: { userId: user.id, movieId: data.movieId } },
      create: { userId: user.id, movieId: data.movieId, value: data.value },
      update: { value: data.value },
    })
  }

  async delete(args: DeleteOneRatingArgs) {
    return await prisma.rating.delete(args)
  }
}
