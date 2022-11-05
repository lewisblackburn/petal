import { prisma } from "../../lib/prisma"

prisma.$use(async (params, next) => {
  if (params.model !== "Rating") return next(params)
  if (params.action === "upsert") {
    // Calculates popularity score for movie
    if (params.args.where.userId_movieId) {
      await prisma.rating
        .aggregate({
          where: {
            movieId: params.args.where.userId_movieId.movieId,
          },
          _count: {
            _all: true,
          },
          _avg: {
            value: true,
          },
        })
        .then(
          async ({ _count: { _all: rating_count }, _avg: { value: average_rating_count } }) =>
            await prisma.rating
              .aggregate({
                _count: {
                  _all: true,
                },
                _avg: {
                  value: true,
                },
              })
              .then(
                async ({
                  _count: { _all: global_rating_count },
                  _avg: { value: global_average_rating_count },
                }) => {
                  if (
                    rating_count &&
                    average_rating_count &&
                    global_rating_count &&
                    global_average_rating_count
                  ) {
                    const WEIGHT = rating_count / global_rating_count
                    const SCORE = WEIGHT * average_rating_count + (1 - WEIGHT) * global_average_rating_count
                    await prisma.movie.update({
                      where: {
                        id: params.args.where.userId_movieId.movieId,
                      },
                      data: { popularity: SCORE },
                    })
                  }
                },
              ),
        )
    }
  }
  return next(params)
})
