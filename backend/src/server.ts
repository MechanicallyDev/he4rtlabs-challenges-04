import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Trainer from './Entities/Trainer/Trainer.composition'
import Pokemon from './Entities/Pokemon/Pokemon.composition'
import Auth from './Entities/Auth/Auth.composition'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use( Auth)
app.use(Trainer)
app.use(Pokemon)

app.listen(3333)
