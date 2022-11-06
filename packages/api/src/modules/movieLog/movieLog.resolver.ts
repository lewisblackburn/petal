import { Query, Resolver } from "type-graphql"
import { MovieLogService } from "./movieLog.service"
import { Inject, Service } from "typedi"
import { MovieLog } from "@generated"

@Service()
@Resolver(() => MovieLog)
export default class MovieLogResolver {
  @Inject(() => MovieLogService)
  movieLogService: MovieLogService

  @Query(() => MovieLog)
  @Query(() => [MovieLog])
  async logs() {
    return await this.movieLogService.getAll()
  }
}
