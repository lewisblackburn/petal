import { FieldResolver, Resolver, Root } from "type-graphql"
import { Character, Movie } from "@generated"
import { Service } from "typedi"
import { prisma } from "../../lib/prisma"

@Service()
@Resolver(() => Character)
export default class CharacterFieldResolver {
  @FieldResolver(() => Movie)
  movie(@Root() character: Character) {
    return prisma.character
      .findUnique({
        where: { personId_movieId: { personId: character.personId, movieId: character.movieId } },
      })
      .movie()
  }
}
