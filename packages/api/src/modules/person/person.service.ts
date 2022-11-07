import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { PersonInput } from "./inputs/create.input"
import { Person, PersonWhereUniqueInput } from "@generated"

@Service()
@Resolver(() => Person)
export class PersonService {
  async get(id: string) {
    return await prisma.person.findUnique({ where: { id } })
  }

  async getAll() {
    return await prisma.person.findMany()
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
