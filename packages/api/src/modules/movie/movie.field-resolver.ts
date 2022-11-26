import { prisma } from "../../lib/prisma"
import { Field, FieldResolver, ObjectType, Resolver, Root } from "type-graphql"
import { Service } from "typedi"
import {
  Movie,
  Genre,
  MovieCharacter,
  Keyword,
  MovieRatingAvgAggregate,
  MovieRatingCountAggregate,
} from "@generated"
import { UseCacheControl } from "../shared/middleware/UseCacheControl"
import { S3_URL } from "../../lib/config"

@ObjectType()
export class MovieRatingAverage {
  @Field({ nullable: true })
  _avg: MovieRatingAvgAggregate

  @Field({ nullable: true })
  _count: MovieRatingCountAggregate
}

@Service()
@Resolver(() => Movie)
export default class MovieFieldResolver {
  @FieldResolver(() => MovieRatingAverage)
  rating(@Root() movie: Movie) {
    return prisma.movieRating.aggregate({
      where: { movieId: movie.id },
      _avg: { value: true },
      _count: { value: true },
    })
  }

  @FieldResolver(() => [Genre])
  genres(@Root() movie: Movie) {
    return prisma.movie
      .findUnique({
        where: { id: movie.id },
      })
      .genres()
  }

  @FieldResolver(() => [MovieCharacter])
  characters(@Root() movie: Movie) {
    return prisma.movie
      .findUnique({
        where: { id: movie.id },
      })
      .charaters()
  }

  @FieldResolver(() => [Keyword])
  keywords(@Root() movie: Movie) {
    return prisma.movie
      .findUnique({
        where: { id: movie.id },
      })
      .keywords()
  }

  @UseCacheControl({ maxAge: 3600 })
  @FieldResolver(() => [String], { nullable: true })
  backdrops(@Root() movie: Movie) {
    if (movie.backdrops.length < 1) return []
    return movie.backdrops.map((backdrop) => S3_URL + backdrop)
  }

  @UseCacheControl({ maxAge: 3600 })
  @FieldResolver(() => [String])
  posters(@Root() movie: Movie) {
    if (movie.posters.length < 1) return []
    return movie.posters.map((poster) => S3_URL + poster)
  }
}
