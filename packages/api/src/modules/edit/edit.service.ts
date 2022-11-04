import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { Edit } from "@generated"

@Service()
@Resolver(() => Edit)
export class EditService {
  async getAllEdits() {
    return await prisma.edit.findMany()
  }

  async getEdit(id: string) {
    return await prisma.edit.findUnique({ where: { id } })
  }
}
