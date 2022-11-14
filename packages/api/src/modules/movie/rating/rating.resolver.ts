import { Arg, Args, Mutation, Resolver } from "type-graphql"
import { Inject, Service } from "typedi"
import { MovieRating, DeleteOneMovieRatingArgs } from "@generated"
import { MovieRatingService } from "./rating.service"
import { MovieRatingInput } from "./inputs/create.input"
import { CurrentUser } from "../../shared/currentUser"
import { User } from "../../user/user.model"
import { UseAuth } from "../../shared/middleware/UseAuth"

@Service()
@Resolver(() => MovieRating)
export default class MovieRatingResolver {
  @Inject(() => MovieRatingService)
  movieRatingService: MovieRatingService

  @UseAuth()
  @Mutation(() => MovieRating)
  async createMovieRating(@Arg("data") data: MovieRatingInput, @CurrentUser() user: User) {
    return this.movieRatingService.upsert(data, user)
  }

  @UseAuth()
  @Mutation(() => MovieRating)
  async deleteMovieRating(@Args() args: DeleteOneMovieRatingArgs) {
    return await this.movieRatingService.delete(args)
  }
}
