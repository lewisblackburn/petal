import { prisma } from "../../lib/prisma"

prisma.$use(async (params, next) => {
  if (params.model !== "Movie") return next(params)
  if (params.action === "create" || params.action === "update") {
    // TODO: THIS WON'T WORK AS THE UPDATES WILL ALL BE LKINKED TO WHOMEVER CREATED THE MOVIE
    // E.G. FIND A DIFFERENT WAY AND REMOVE THE LINK BETWEEN THE USER AND MOVIE MODEL AGAIN
    return next(params).then(async (data) => {
      await prisma.movieLog.createMany({
        skipDuplicates: true,
        data: Object.keys(params.args.data)
          .filter((arg) => arg !== "userId")
          .map((key) => {
            return {
              key,
              // @ts-ignore
              value: params.args.data[key],
              movieId: data.id,
              userId: data.userId,
            }
          }),
      })
      return data
    })
  }

  return next(params)
})
