import { Query, Resolver } from "type-graphql"
import { Log } from "@generated"
import { Inject, Service } from "typedi"
import { LogService } from "./log.service"

@Service()
@Resolver(() => Log)
export default class LogResolver {
  @Inject(() => LogService)
  logService: LogService

  @Query(() => [Log])
  async logs() {
    return await this.logService.getAll()
  }
}
