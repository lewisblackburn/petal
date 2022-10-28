import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { List, CreateOneListArgs, UpdateOneListArgs, DeleteOneListArgs } from "@generated"

@Service()
@Resolver(() => List)
export class ListService {
  async create(args: CreateOneListArgs) {
    return await prisma.list.create(args)
  }

  async update(args: UpdateOneListArgs) {
    return await prisma.list.update(args)
  }

  async delete(args: DeleteOneListArgs) {
    return await prisma.list.delete(args)
  }

  async getAllLists() {
    return await prisma.list.findMany()
  }

  async getList(id: string) {
    return await prisma.list.findUnique({ where: { id } })
  }
}
