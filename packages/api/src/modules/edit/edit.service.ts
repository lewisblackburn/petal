import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { Edit } from "@generated"

@Service()
@Resolver(() => Edit)
export class EditService {
  async getAll() {
    return await prisma.edit.findMany()
  }
}
