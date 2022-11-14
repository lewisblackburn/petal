import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { Genre, CreateOneGenreArgs, UpdateOneGenreArgs } from "@generated"

@Service()
@Resolver(() => Genre)
export class GenreService {
  async getAll() {
    return await prisma.genre.findMany()
  }

  async create(data: CreateOneGenreArgs) {
    return await prisma.genre.create(data)
  }

  async update(data: UpdateOneGenreArgs) {
    return await prisma.genre.update(data)
  }
}
