import { Arg, Args, Mutation, Resolver } from "type-graphql"
import { Inject, Service } from "typedi"
import { MovieReview, DeleteOneMovieReviewArgs } from "@generated"
import { MovieReviewService } from "./review.service"
import { MovieReviewInput } from "./inputs/create.input"
import { CurrentUser } from "../../shared/currentUser"
import { User } from "../../user/user.model"
import { UseAuth } from "../../shared/middleware/UseAuth"

@Service()
@Resolver(() => MovieReview)
export default class MovieReviewResolver {
  @Inject(() => MovieReviewService)
  movieReviewService: MovieReviewService

  @UseAuth()
  @Mutation(() => MovieReview)
  async createMovieReview(@Arg("data") data: MovieReviewInput, @CurrentUser() user: User) {
    return this.movieReviewService.upsert(data, user)
  }

  @UseAuth()
  @Mutation(() => MovieReview)
  async deleteMovieReview(@Args() args: DeleteOneMovieReviewArgs) {
    return await this.movieReviewService.delete(args)
  }
}
