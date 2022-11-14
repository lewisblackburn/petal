import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { MovieCharacter, MovieCharacterWhereUniqueInput } from "@generated"
import { Inject, Service } from "typedi"
import { MovieCharacterService } from "./character.service"
import { UseAuth } from "../../shared/middleware/UseAuth"
import { MovieCharacterInput } from "./inputs/create.input"

@Service()
@Resolver(() => MovieCharacter)
export default class MovieCharacterResolver {
  @Inject(() => MovieCharacterService)
  movieCharacterService: MovieCharacterService

  @Query(() => [MovieCharacter])
  async characters() {
    return await this.movieCharacterService.getAll()
  }

  @UseAuth()
  @Mutation(() => MovieCharacter)
  async createMovieCharacter(@Arg("data") data: MovieCharacterInput) {
    return await this.movieCharacterService.create(data)
  }

  @UseAuth()
  @Mutation(() => MovieCharacter)
  async updateMovieCharacter(
    @Arg("data") data: MovieCharacterInput,
    @Arg("where") where: MovieCharacterWhereUniqueInput,
  ) {
    return await this.movieCharacterService.update(data, where)
  }
}
