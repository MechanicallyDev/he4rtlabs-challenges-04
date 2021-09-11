import express from 'express'

import controller from './Pokemon.controller'
import authMiddlewares from '../Auth/Middlewares/AuthenticateToken'

const app = express.Router()

app.get('/pokemons', authMiddlewares.authenticateToken, controller.listPokemon)

export default app
