import { Args, Arg, Mutation, Query, Resolver } from "type-graphql"
import { Person, PersonWhereUniqueInput, FindManyPersonArgs } from "@generated"
import { Inject, Service } from "typedi"
import { PersonService } from "./person.service"
import { UseAuth } from "../shared/middleware/UseAuth"
import { PersonInput } from "./inputs/create.input"
import { PeopleResponse } from "./responses/people.response"

@Service()
@Resolver(() => Person)
export default class PersonResolver {
  @Inject(() => PersonService)
  personService: PersonService

  @Query(() => Person)
  async person(@Arg("id") id: string) {
    return this.personService.get(id)
  }

  @UseAuth()
  @Query(() => PeopleResponse)
  async people(@Args() args: FindManyPersonArgs) {
    return await this.personService.getAll(args)
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
