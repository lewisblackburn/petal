import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { CharacterInput } from "./inputs/create.input"
import { Character, CharacterWhereUniqueInput } from "@generated"

@Service()
@Resolver(() => Character)
export class CharacterService {
  async getAll() {
    return await prisma.character.findMany()
  }

  async create(data: CharacterInput) {
    return await prisma.character.create({ data })
  }

  async update(data: CharacterInput, where: CharacterWhereUniqueInput) {
    return await prisma.character.update({
      data,
      where,
    })
  }
}
