import { prisma } from "../../lib/prisma"
import { Service } from "typedi"
import { Resolver } from "type-graphql"
import { Keyword, CreateOneKeywordArgs, UpdateOneKeywordArgs } from "@generated"

@Service()
@Resolver(() => Keyword)
export class KeywordService {
  async getAll() {
    return await prisma.keyword.findMany()
  }

  async create(data: CreateOneKeywordArgs) {
    return await prisma.keyword.create(data)
  }

  async update(data: UpdateOneKeywordArgs) {
    return await prisma.keyword.update(data)
  }
}
