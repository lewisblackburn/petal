import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { PersonInput } from "./inputs/create.input"
import { Person, PersonWhereUniqueInput, FindManyPersonArgs } from "@generated"

@Service()
@Resolver(() => Person)
export class PersonService {
  async get(id: string) {
    return await prisma.person.findUnique({ where: { id } })
  }

  async getAll(args: FindManyPersonArgs) {
    const items = await prisma.person.findMany(args)
    const count = await prisma.person.count({ ...args, take: undefined, skip: undefined })
    return { items, count }
  }

  async create(data: PersonInput) {
    return await prisma.person.create({ data })
  }

  async update(data: PersonInput, where: PersonWhereUniqueInput) {
    return await prisma.person.update({
      data,
      where,
    })
  }
}
