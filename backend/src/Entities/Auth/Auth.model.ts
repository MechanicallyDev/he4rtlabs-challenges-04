import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import database from '../../Database/client'
import { User } from '.prisma/client'

let refreshTokens = []

export default {
  async createUser(data:User) {
    const userExists = await this.doesUserExist(data.email)
    if (userExists) throw new Error('User already exists')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.password, salt)
    data.password = hashedPassword

    delete data.id
    delete data.createdAt
    delete data.updatedAt

    const user = await database.user.create({data})
    delete user.password
    return user
  },

  async generateAccessToken(user) {
    const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1200s'
    })
    if (!accessToken) throw new Error('Error generating access token')
    return accessToken
  },

  async generateRefreshToken(user) {
    const refreshToken = await jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    return refreshToken
  },

  async doesRefreshTokenExist(token) {
    if (token == null) throw new Error('No token provided')
    const exists =  await refreshTokens.includes(token)
    if (!exists) throw new Error('Invalid token')
    return exists
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
    if (user == null) throw new Error('Invalid token')
    return user
  },

  async revokeRefreshToken(revokedToken) {
    refreshTokens = refreshTokens.filter(token => token !== revokedToken)
  },

  async doesUserExist(email) {
    const user = await database.user.findFirst({
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
