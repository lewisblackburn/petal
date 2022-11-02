import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({ log: ["query", "warn", "error"] })

// Max query return limit
prisma.$use(async (params, next) => {
  const limit = 20

  const isFindMany = params.action === "findMany"
  if (!isFindMany) return next(params)

  const takeParameter = params.args.take
  const takeParameterIsUndefined = takeParameter === undefined

  if (takeParameterIsUndefined || takeParameter > limit) {
    params.args.take = limit
  }

  return next(params)
})

prisma.$connect()
