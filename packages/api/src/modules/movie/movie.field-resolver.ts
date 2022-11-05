import { prisma } from "../../lib/prisma"
import { Field, FieldResolver, ObjectType, Resolver, Root } from "type-graphql"
import { Service } from "typedi"
import { Movie, RatingAvgAggregate, RatingCountAggregate } from "@generated"

@ObjectType()
export class RatingAverage {
  @Field({ nullable: true })
  _avg: RatingAvgAggregate

  @Field({ nullable: true })
  _count: RatingCountAggregate
}

@Service()
@Resolver(() => Movie)
export default class MovieFieldResolver {
  @FieldResolver(() => RatingAverage)
  rating(@Root() movie: Movie) {
    return prisma.rating.aggregate({
      where: { movieId: movie.id },
      _avg: { value: true },
      _count: { value: true },
    })
  }
}
