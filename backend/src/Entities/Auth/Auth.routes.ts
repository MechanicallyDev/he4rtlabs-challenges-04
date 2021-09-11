import express from 'express'
import controller from './Auth.controller'

const app = express.Router()

app.post('/login', controller.login)
app.post('/token', controller.refreshAccessToken)
app.delete('/logout', controller.logout)

export default app
