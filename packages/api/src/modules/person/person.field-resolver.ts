import { FieldResolver, Resolver, Root } from "type-graphql"
import { Person, Character } from "@generated"
import { Service } from "typedi"
import { prisma } from "../../lib/prisma"

@Service()
@Resolver(() => Person)
export default class PersonFieldResolver {
  @FieldResolver(() => [Character])
  characters(@Root() person: Person) {
    return prisma.person
      .findUnique({
        where: { id: person.id },
      })
      .characters()
  }
}
