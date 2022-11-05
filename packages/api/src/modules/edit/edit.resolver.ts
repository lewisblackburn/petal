import { Query, Resolver } from "type-graphql"
import { EditService } from "./edit.service"
import { Inject, Service } from "typedi"
import { Edit } from "@generated"

@Service()
@Resolver(() => Edit)
export default class EditResolver {
  @Inject(() => EditService)
  editService: EditService

  @Query(() => Edit)
  @Query(() => [Edit])
  async edits() {
    return await this.editService.getAll()
  }
}
