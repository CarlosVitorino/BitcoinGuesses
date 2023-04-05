import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import guessRoutes from './routes/guessRoutes'
import playerRoutes from './routes/playerRoutes'

const app = express()
const port = process.env.PORT ?? 3000

// Middlewares
app.use(bodyParser.json())

// Routes
app.use('/guesses', guessRoutes)
app.use('/players', playerRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
