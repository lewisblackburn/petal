import { Args, Mutation, Query, Resolver } from "type-graphql"
import { Inject, Service } from "typedi"
import { Genre, UpdateOneGenreArgs, CreateOneGenreArgs } from "@generated"
import { UseAuth } from "../shared/middleware/UseAuth"
import { GenreService } from "./genre.service"

@Service()
@Resolver(() => Genre)
export default class GenreResolver {
  @Inject(() => GenreService)
  genreService: GenreService

  @Query(() => [Genre])
  async genre() {
    return await this.genreService.getAll()
  }

  @UseAuth()
  @Mutation(() => Genre)
  async createGenre(@Args() data: CreateOneGenreArgs) {
    return await this.genreService.create(data)
  }

  @UseAuth()
  @Mutation(() => Genre)
  async updateGenre(@Args() data: UpdateOneGenreArgs) {
    return await this.genreService.update(data)
  }
}
