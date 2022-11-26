import { Arg, Args, Float, Mutation, Query, Resolver } from "type-graphql"
import { MovieService } from "./movie.service"
import { Inject, Service } from "typedi"
import {
  Movie,
  MovieUpdateInput,
  MovieWhereUniqueInput,
  MovieUpdatelockedInput,
  FindManyMovieArgs,
} from "@generated"
import { UseAuth } from "../shared/middleware/UseAuth"
import { CurrentUser } from "../shared/currentUser"
import { User } from "../user/user.model"
import { MovieInput } from "./inputs/create.input"
import { Role } from "@prisma/client"
import { MoviesResponse } from "./responses/movies.response"

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
  async recommendations(
    @Arg("id") id: string,
    @Arg("popularity", () => Float) popularity: number,
    @Arg("genre") genre: string,
  ) {
    return this.movieService.getRecommended(id, popularity, genre)
  }

  @Query(() => [Movie])
  async popularMovies() {
    return await this.movieService.getPopular()
  }

  @Query(() => MoviesResponse)
  async movies(@Args() args: FindManyMovieArgs) {
    return await this.movieService.getAll(args)
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
