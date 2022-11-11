import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { MovieService } from "./movie.service"
import { Inject, Service } from "typedi"
import { Movie, MovieWhereUniqueInput, MovieUpdatelockedInput } from "@generated"
import { UseAuth } from "../shared/middleware/UseAuth"
import { CurrentUser } from "../shared/currentUser"
import { User } from "../user/user.model"
import { MovieInput } from "./inputs/create.input"
import { MovieUpdateInput } from "./inputs/update.input"
import { Role } from "@prisma/client"

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

  @UseAuth([Role.ADMIN])
  @Mutation(() => Movie)
  async lock(@Arg("data") data: MovieUpdatelockedInput, where: MovieWhereUniqueInput) {
    return await this.movieService.lock(data, where)
  }

  @UseAuth()
  @Mutation(() => Movie)
  async createMovie(@Arg("data") data: MovieInput, @CurrentUser() user: User) {
    return await this.movieService.create(data, user)
  }

  @UseAuth()
  @Mutation(() => Movie)
  async updateMovie(
    @Arg("data") data: MovieUpdateInput,
    @Arg("where") where: MovieWhereUniqueInput,
    @CurrentUser() user: User,
  ) {
    return await this.movieService.update(data, where, user)
  }
}
