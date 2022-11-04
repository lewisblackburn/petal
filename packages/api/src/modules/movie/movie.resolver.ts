import { Arg, Args, Mutation, Query, Resolver } from "type-graphql"
import { Movie } from "./movie.model"
import { MovieInput } from "./inputs/create.input"
import { MovieService } from "./movie.service"
import { Inject, Service } from "typedi"
import { UpdateOneMovieArgs } from "@generated"
import { prisma } from "../../lib/prisma"
import { ContextUser } from "../shared/contextUser"

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

  @Query(() => [Movie])
  async popularMovies() {
    return await this.movieService.getPopularMovies()
  }

  @Query(() => [Movie])
  async trendingMovies() {
    return await this.movieService.getTrendingMovies()
  }

  @Mutation(() => Movie)
  async createMovie(@Arg("data") data: MovieInput) {
    return await this.movieService.create(data)
  }

  // @UseAuth()
  @Mutation(() => Movie)
  async updateMovie(@Args() args: UpdateOneMovieArgs, @ContextUser() user: ContextUser) {
    return await prisma.movie.update(args).then(async (data) => {
      await prisma.edit.createMany({
        data: Object.keys(args.data).map((key) => {
          return {
            key,
            // @ts-expect-error I need to fix the type issue
            value: data[key as any].toString(),
            movieId: data.id,
            userId: user?.id || "882c62c7-eb29-4e99-bc8b-25eae2a96f93",
          }
        }),
      })
      return data
    })
  }
}
