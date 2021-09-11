import model from './Auth.model'

export default {
  async signup(req, res) {
    const { email, password, name } = req.body
    try {
      const newUser = await model.createUser({
        id: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
        email,
        password,
        name,
        isVerified: false
      })
      return res.status(201).json(newUser)
    } catch (error) {
      if (error.message === 'User already exists')
        return res.status(400).send({ error: error.message })
      return res.status(500).json({ error: error.message })
    }
  },

  async login(req, res) {
    const { username, password } = req.body
    try {
      const user = await model.tryLogin(username, password)
      const accessToken = await model.generateAccessToken(user)
      const refreshToken = await model.generateRefreshToken(user)
      return res.status(202).json({ accessToken, refreshToken })
    } catch (error) {
      if (error.message === 'Invalid username or password')
        return res.status(400).send({ error: error.message })
      if (error.message === 'Email or password is missing')
        return res.status(400).send({ error: error.message })
      if (error.message === 'User is not verified')
        return res.status(401).send({ error: error.message })
      return res.status(500).json({ error: error.message })
    }
  },

  async renewTokens(req, res) {
    const refreshToken = req.body.token

    try {
      await model.doesRefreshTokenExist(refreshToken)
      const user = await model.getUserFromRefreshToken(refreshToken)
      const accessToken = await model.generateAccessToken(user)
      const newRefreshToken = await model.generateRefreshToken(user)
      await model.revokeRefreshToken(req.body.token)
      return res
        .status(202)
        .json({ accessToken, refreshToken: newRefreshToken })
    } catch (error) {
      if (error.message === 'No token provided')
        return res.status(400).json({ error: error.message })
      if (error.message === 'Invalid token')
        return res.status(403).json({ error: error.message })
      if (error.message === 'Error generating access token')
        return res.status(403).json({ error: error.message })
      return res.status(500).json({ error: error.message })
    }
  },

  async logout(req, res) {
    await model.revokeRefreshToken(req.body.token)
    return res.sendStatus(204)
  }
}
