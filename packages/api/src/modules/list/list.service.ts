import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Arg, Resolver } from "type-graphql"
import { List, ListWhereUniqueInput, DeleteOneListArgs } from "@generated"
import { User } from "../user/user.model"
import { CurrentUser } from "../shared/currentUser"
import { ListInput } from "./inputs/create.input"

@Service()
@Resolver(() => List)
export class ListService {
  async getAll() {
    return await prisma.list.findMany()
  }

  async get(id: string) {
    return await prisma.list.findUnique({ where: { id } })
  }

  async create(@Arg("data") data: ListInput, @CurrentUser() user: User) {
    return await prisma.list.create({ data: { userId: user.id, ...data } })
  }

  async update(@Arg("data") data: ListInput, where: ListWhereUniqueInput, @CurrentUser() user: User) {
    return await prisma.list.update({ data: { userId: user.id, ...data }, where })
  }

  async delete(args: DeleteOneListArgs) {
    return await prisma.list.delete(args)
  }
}
