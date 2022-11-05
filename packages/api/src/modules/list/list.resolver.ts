import { Arg, Args, Mutation, Query, Resolver } from "type-graphql"
import { ListService } from "./list.service"
import { Inject, Service } from "typedi"
import { List, ListWhereUniqueInput, DeleteOneListArgs } from "@generated"
import { UseAuth } from "../shared/middleware/UseAuth"
import { ListInput } from "./inputs/create.input"
import { User } from "../user/user.model"
import { CurrentUser } from "../shared/currentUser"

@Service()
@Resolver(() => List)
export default class ListResolver {
  @Inject(() => ListService)
  listService: ListService

  @Query(() => List)
  async list(@Arg("id") id: string) {
    return this.listService.get(id)
  }

  @Query(() => [List])
  async lists() {
    return await this.listService.getAll()
  }

  @UseAuth()
  @Mutation(() => List)
  async createList(@Arg("data") data: ListInput, @CurrentUser() user: User) {
    return await this.listService.create(data, user)
  }

  @UseAuth()
  @Mutation(() => List)
  async updateList(@Arg("data") data: ListInput, where: ListWhereUniqueInput, @CurrentUser() user: User) {
    return await this.listService.update(data, where, user)
  }

  @UseAuth()
  @Mutation(() => List)
  async deleteList(@Args() args: DeleteOneListArgs) {
    return await this.listService.delete(args)
  }
}
