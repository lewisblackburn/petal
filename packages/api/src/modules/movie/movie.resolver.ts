import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { Movie } from "./movie.model"
import { MovieService } from "./movie.service"
import { Inject, Service } from "typedi"
import { MovieWhereUniqueInput } from "@generated"
import { UseAuth } from "../shared/middleware/UseAuth"
import { CurrentUser } from "../shared/currentUser"
import { User } from "../user/user.model"
import { MovieInput } from "./inputs/create.input"

@Service()
@Resolver(() => Movie)
export default class MovieResolver {
  @Inject(() => MovieService)
  movieService: MovieService

  @Query(() => Movie)
  async movie(@Arg("id") id: string) {
    return this.movieService.get(id)
  }

  @Query(() => [Movie])
  async popularMovies() {
    return await this.movieService.getPopular()
  }

  @Query(() => [Movie])
  async movies() {
    return await this.movieService.getAll()
  }

  @UseAuth()
  @Mutation(() => Movie)
  async createMovie(@Arg("data") data: MovieInput, @CurrentUser() user: User) {
    return await this.movieService.create(data, user)
  }

  @UseAuth()
  @Mutation(() => Movie)
  async updateMovie(@Arg("data") data: MovieInput, where: MovieWhereUniqueInput, @CurrentUser() user: User) {
    return await this.movieService.update(data, where, user)
  }
}
