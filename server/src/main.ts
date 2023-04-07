import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import guessRoutes from './routes/guessRoutes'
import playerRoutes from './routes/playerRoutes'

const app = express()
const port = process.env.PORT ?? 8080

// Middlewares
app.use(bodyParser.json())

// Enable CORS
app.use(cors())

// Routes
app.use('/guesses', guessRoutes)
app.use('/players', playerRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
