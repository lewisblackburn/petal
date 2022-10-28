import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { Movie } from "./movie.model"
import { MovieInput } from "./inputs/create.input"
import { MovieService } from "./movie.service"
import { Inject, Service } from "typedi"

@Service()
@Resolver(() => Movie)
export default class MovieResolver {
  @Inject(() => MovieService)
  movieService: MovieService

  @Query(() => [Movie])
  async movies() {
    return await this.movieService.getAllMovies()
  }

  @Query(() => Movie)
  async movie(@Arg("id") id: string) {
    return this.movieService.getMovie(id)
  }

  @Mutation(() => Movie)
  async createMovie(@Arg("data") data: MovieInput) {
    return await this.movieService.create(data)
  }
}
