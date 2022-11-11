import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { Log } from "@generated"

@Service()
@Resolver(() => Log)
export class LogService {
  async getAll() {
    return await prisma.log.findMany()
  }
}
