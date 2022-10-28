import { prisma } from "../../lib/prisma"
import { FieldResolver, Resolver, Root } from "type-graphql"
import { Service } from "typedi"
import { Movie } from "../movie/movie.model"
import { Rating } from "@generated"

@Service()
@Resolver(() => Rating)
export default class RatingFieldResolver {
  @FieldResolver(() => Movie)
  movie(@Root() rating: Rating) {
    return prisma.rating
      .findUnique({
        where: { userId_movieId: { userId: rating.userId, movieId: rating.movieId } },
      })
      .movie()
  }
}
