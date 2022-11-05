import { Arg, Args, Mutation, Query, Resolver } from "type-graphql"
import { Inject, Service } from "typedi"
import { Rating, DeleteOneRatingArgs } from "@generated"
import { RatingService } from "./rating.service"
import { RatingInput } from "./inputs/create.input"

@Service()
@Resolver(() => Rating)
export default class RatingResolver {
  @Inject(() => RatingService)
  ratingService: RatingService

  @Query(() => [Rating])
  async ratings() {
    return await this.ratingService.getAllRatings()
  }

  @Mutation(() => Rating)
  async createRating(@Arg("data") data: RatingInput) {
    return this.ratingService.upsert(data)
  }

  @Mutation(() => Rating)
  async deleteRating(@Args() args: DeleteOneRatingArgs) {
    return await this.ratingService.delete(args)
  }
}
