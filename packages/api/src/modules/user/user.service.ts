import bcrypt from "bcryptjs"
import { Service } from "typedi"

import { UserWhereInput } from "@generated"

import { createAuthToken, createRefreshToken } from "../../lib/jwt"
import { prisma } from "../../lib/prisma"
import { LoginInput } from "./inputs/login.input"
import { RegisterInput } from "./inputs/register.input"
import { RefreshTokenResponse } from "./responses/refreshToken.response"
import { User } from "./user.model"
import { AppError } from "../../lib/appError"

@Service()
export class UserService {
  async login(data: LoginInput): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email: data.email } })
    if (!user) throw new AppError("Incorrect email or password")
    const isValidPassword = await bcrypt.compare(data.password, user.password)
    if (!isValidPassword) throw new AppError("Incorrect email or password")
    return user
  }

  async register(data: RegisterInput) {
    const email = data.email.toLowerCase().trim()
    await this.checkUserExists({ email: { equals: email } })
    const user = await prisma.user.create({ data }).then(async (data) => {
      await prisma.watchlist.create({
        data: {
          user: {
            connect: {
              id: data.id,
            },
          },
        },
      })

      return data
    })
    return user
  }

  async checkUserExists(where: UserWhereInput) {
    const user = await prisma.user.findFirst({ where })
    if (user) {
      throw new AppError("User with these details already exists")
    }
  }

  createAuthTokens(user: User): RefreshTokenResponse {
    const token = createAuthToken({ id: user.id })
    const refreshToken = createRefreshToken({ id: user.id })
    return { token, refreshToken }
  }
}
