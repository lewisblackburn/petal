import { prisma } from "../../lib/prisma"
import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"
import { Edit } from "@generated"
import { User } from "../user/user.model"

@Service()
@Resolver(() => Edit)
export default class EditFieldResolver {
  @FieldResolver(() => User)
  user(@Root() edit: Edit) {
    return prisma.edit.findUnique({ where: { id: edit.id } }).user()
  }
}
