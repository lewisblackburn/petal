import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { Character, CharacterWhereUniqueInput } from "@generated"
import { Inject, Service } from "typedi"
import { CharacterService } from "./character.service"
import { UseAuth } from "../shared/middleware/UseAuth"
import { CharacterInput } from "./inputs/create.input"

@Service()
@Resolver(() => Character)
export default class CharacterResolver {
  @Inject(() => CharacterService)
  characterService: CharacterService

  @Query(() => [Character])
  async people() {
    return await this.characterService.getAll()
  }

  @UseAuth()
  @Mutation(() => Character)
  async createCharacter(@Arg("data") data: CharacterInput) {
    return await this.characterService.create(data)
  }

  @UseAuth()
  @Mutation(() => Character)
  async updateCharacter(@Arg("data") data: CharacterInput, @Arg("where") where: CharacterWhereUniqueInput) {
    return await this.characterService.update(data, where)
  }
}
