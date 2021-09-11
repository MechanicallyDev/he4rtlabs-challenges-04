import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import database from '../../Database/client'
import { Trainer } from '.prisma/client'

let refreshTokens = []

export default {
  async createUser(data:Trainer) {
    const userExists = await this.doesUserExist(data.email)
    if (userExists) throw new Error('User already exists')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.password, salt)
    data.password = hashedPassword

    delete data.id
    const user = await database.trainer.create({data})
    return user
  },

  async generateAccessToken(user) {
    return await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1200s'
    })
  },

  async generateRefreshToken(user) {
    const refreshToken = await jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    return refreshToken
  },

  async doesRefreshTokenExist(token) {
    return await refreshTokens.includes(token)
  },

  async getUserFromRefreshToken(token) {
    const user = await jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err) return null
        return user
      }
    )
    return user
  },

  async revokeRefreshToken(revokedToken) {
    refreshTokens = refreshTokens.filter(token => token !== revokedToken)
  },

  async doesUserExist(email) {
    const user = await database.trainer.findFirst({
      where: {
        email: email
      }
    })
    return user
  },

  async hashPassword(password) {
    return await bcrypt.hash(password, 10)
  },

  async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash)
  },

  async tryLogin(email, password) {
    if (!email || !password) throw new Error('Email or password is missing')

    const user = await this.doesUserExist(email)
    if (!user) throw new Error('Invalid username or password' )

    const isPasswordValid = await this.comparePassword(password, user.password)
    if (!isPasswordValid) throw new Error('Invalid username or password' )
    delete user.password
    return user
  }
}
