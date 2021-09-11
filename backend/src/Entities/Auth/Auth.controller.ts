import model from './Auth.model'

export default {
  async signup(req, res) {
    const { email, password, name, region, age } = req.body
    try {
      const newUser = await model.createUser( {id:"0", email, password, name, region, age, isVerified: false })
      return res.send(newUser)
    } catch (error) {
      if (error.message==="User already exists") return res.status(400).send({ error: error.message })
      return res.status(500).send({ error: error.message })
    }
  },

  async login(req, res) {
    const { username, password } = req.body
    try {
      const user = await model.tryLogin(username, password)
      const accessToken = await model.generateAccessToken(user)
      const refreshToken = await model.generateRefreshToken(user)
      return res.json({ accessToken, refreshToken })
    } catch (error) {
      if (error.message==='Invalid username or password') res.status(400).send({ error: error.message })
      if (error.message==='Email or password is missing') res.status(400).send({ error: error.message })
      return res.status(500).send({ error: error.message })
    }
  },

  async renewTokens(req, res) {
    const refreshToken = req.body.token
    
    if (refreshToken == null) return res.sendStatus(401)
    if (await !model.doesRefreshTokenExist(refreshToken)) return res.sendStatus(403)

    const user = await model.getUserFromRefreshToken(refreshToken)
    if (user == null) return res.sendStatus(400)

    const accessToken = await model.generateAccessToken(user)
    if (accessToken === null) return res.sendStatus(403)

    
    const newRefreshToken = await model.generateRefreshToken(user)
    await model.revokeRefreshToken(req.body.token)

    return res.json({ accessToken, refreshToken: newRefreshToken })
  },

  async logout(req, res) {
    await model.revokeRefreshToken(req.body.token)
    return res.sendStatus(204)
  }
}
