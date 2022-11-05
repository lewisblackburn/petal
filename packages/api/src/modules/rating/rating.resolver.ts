import { Arg, Args, Mutation, Resolver } from "type-graphql"
import { Inject, Service } from "typedi"
import { Rating, DeleteOneRatingArgs } from "@generated"
import { RatingService } from "./rating.service"
import { RatingInput } from "./inputs/create.input"
import { CurrentUser } from "../shared/currentUser"
import { User } from "../user/user.model"
import { UseAuth } from "../shared/middleware/UseAuth"

@Service()
@Resolver(() => Rating)
export default class RatingResolver {
  @Inject(() => RatingService)
  ratingService: RatingService

  @UseAuth()
  @Mutation(() => Rating)
  async createRating(@Arg("data") data: RatingInput, @CurrentUser() user: User) {
    return this.ratingService.upsert(data, user)
  }

  @UseAuth()
  @Mutation(() => Rating)
  async deleteRating(@Args() args: DeleteOneRatingArgs) {
    return await this.ratingService.delete(args)
  }
}
