import { prisma } from "../../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { MovieCharacterInput } from "./inputs/create.input"
import { MovieCharacter, MovieCharacterWhereUniqueInput } from "@generated"

@Service()
@Resolver(() => MovieCharacter)
export class MovieCharacterService {
  async getAll() {
    return await prisma.movieCharacter.findMany()
  }

  async create(data: MovieCharacterInput) {
    return await prisma.movieCharacter.create({ data })
  }

  async update(data: MovieCharacterInput, where: MovieCharacterWhereUniqueInput) {
    return await prisma.movieCharacter.update({
      data,
      where,
    })
  }
}
