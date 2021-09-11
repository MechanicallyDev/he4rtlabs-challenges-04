import express from 'express'
import controller from './Auth.controller'

const app = express.Router()

app.post('/signup', controller.signup)
app.post('/login', controller.login)
app.post('/token', controller.renewTokens)
app.delete('/logout', controller.logout)

export default app
