import { prisma } from "../../lib/prisma"

prisma.$use(async (params, next) => {
  if (params.model !== "Movie") return next(params)
  if (params.action === "create" || params.action === "update") {
    return next(params).then(async (data) => {
      // updaate movie contentScore here
      return data
    })
  }

  return next(params)
})
