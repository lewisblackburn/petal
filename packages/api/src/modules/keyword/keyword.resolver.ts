import { Args, Mutation, Query, Resolver } from "type-graphql"
import { Inject, Service } from "typedi"
import { Keyword, UpdateOneKeywordArgs, CreateOneKeywordArgs } from "@generated"
import { UseAuth } from "../shared/middleware/UseAuth"
import { KeywordService } from "./keyword.service"

@Service()
@Resolver(() => Keyword)
export default class KeywordResolver {
  @Inject(() => KeywordService)
  keywordService: KeywordService

  @Query(() => [Keyword])
  async keyword() {
    return await this.keywordService.getAll()
  }

  @UseAuth()
  @Mutation(() => Keyword)
  async createKeyword(@Args() data: CreateOneKeywordArgs) {
    return await this.keywordService.create(data)
  }

  @UseAuth()
  @Mutation(() => Keyword)
  async updateKeyword(@Args() data: UpdateOneKeywordArgs) {
    return await this.keywordService.update(data)
  }
}
