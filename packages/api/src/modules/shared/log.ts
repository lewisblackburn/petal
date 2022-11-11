import { MediaType } from "@prisma/client"
import { prisma } from "../../lib/prisma"

async function log(mediaId: string, userId: string, type: keyof typeof MediaType, data: any) {
  return await prisma.log.createMany({
    skipDuplicates: true,
    data: Object.keys(data).map((key) => {
      return {
        mediaId,
        userId,
        type,
        key,
        value: data[key],
      }
    }),
  })
}

export default log
