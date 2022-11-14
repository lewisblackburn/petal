import { FieldResolver, Resolver, Root } from "type-graphql"
import { MovieCharacter, Movie } from "@generated"
import { Service } from "typedi"
import { prisma } from "../../../lib/prisma"

@Service()
@Resolver(() => MovieCharacter)
export default class MovieCharacterFieldResolver {
  @FieldResolver(() => Movie)
  movie(@Root() character: MovieCharacter) {
    return prisma.movieCharacter
      .findUnique({
        where: { personId_movieId: { personId: character.personId, movieId: character.movieId } },
      })
      .movie()
  }
}
