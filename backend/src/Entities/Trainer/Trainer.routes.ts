import express from 'express'

import controller from './Trainer.controller'
import auth from '../Auth/Middlewares/AuthenticateToken'

const app = express.Router()


export default app
