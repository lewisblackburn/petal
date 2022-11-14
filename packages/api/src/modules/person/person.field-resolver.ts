import { FieldResolver, Resolver, Root } from "type-graphql"
import { Person, Movie, Show } from "@generated"
import { Service } from "typedi"
import { prisma } from "../../lib/prisma"

@Service()
@Resolver(() => Person)
export default class PersonFieldResolver {
  @FieldResolver(() => [Movie])
  movies(@Root() person: Person) {
    return prisma.person
      .findUnique({
        where: { id: person.id },
      })
      .movies()
  }
  @FieldResolver(() => [Show])
  shows(@Root() person: Person) {
    return prisma.person
      .findUnique({
        where: { id: person.id },
      })
      .shows()
  }
}
