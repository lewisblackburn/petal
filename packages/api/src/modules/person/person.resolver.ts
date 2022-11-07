import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { Person, PersonWhereUniqueInput } from "@generated"
import { Inject, Service } from "typedi"
import { PersonService } from "./person.service"
import { UseAuth } from "../shared/middleware/UseAuth"
import { PersonInput } from "./inputs/create.input"

@Service()
@Resolver(() => Person)
export default class PersonResolver {
  @Inject(() => PersonService)
  personService: PersonService

  @Query(() => Person)
  async person(@Arg("id") id: string) {
    return this.personService.get(id)
  }

  @Query(() => [Person])
  async people() {
    return await this.personService.getAll()
  }

  @UseAuth()
  @Mutation(() => Person)
  async createPerson(@Arg("data") data: PersonInput) {
    return await this.personService.create(data)
  }

  @UseAuth()
  @Mutation(() => Person)
  async updatePerson(@Arg("data") data: PersonInput, @Arg("where") where: PersonWhereUniqueInput) {
    return await this.personService.update(data, where)
  }
}
