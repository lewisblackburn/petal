import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { MovieLog } from "@generated"

@Service()
@Resolver(() => MovieLog)
export class MovieLogService {
  async getAll() {
    return await prisma.movieLog.findMany()
  }
}
