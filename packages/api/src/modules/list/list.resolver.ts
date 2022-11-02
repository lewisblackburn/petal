import { Arg, Args, Mutation, Query, Resolver } from "type-graphql"
import { ListService } from "./list.service"
import { Inject, Service } from "typedi"
import { List, CreateOneListArgs, UpdateOneListArgs, DeleteOneListArgs } from "@generated"

@Service()
@Resolver(() => List)
export default class ListResolver {
  @Inject(() => ListService)
  listService: ListService

  @Query(() => [List])
  async lists() {
    return await this.listService.getAllLists()
  }

  @Query(() => List)
  async list(@Arg("id") id: string) {
    return this.listService.getList(id)
  }

  @Mutation(() => List)
  async createList(@Args() args: CreateOneListArgs) {
    return await this.listService.create(args)
  }

  @Mutation(() => List)
  async updateList(@Args() args: UpdateOneListArgs) {
    return await this.listService.update(args)
  }

  @Mutation(() => List)
  async deleteList(@Args() args: DeleteOneListArgs) {
    return await this.listService.delete(args)
  }
}
