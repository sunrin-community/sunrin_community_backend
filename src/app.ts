import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import passportMiddleWare from './middlewares/passport'

import authRoutes from './routes/auth.routes'
import testRoutes from './routes/test.routes'

// initalizations
const app = express()

// settings
app.set('port', process.env.PORT || 8000)

// middlewares
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(passport.initialize())
passport.use(passportMiddleWare)

// routes
app.get('/', (req, res) => {
    res.send(`The API is at http://localhost:${app.get('port')}`)
})

app.use(authRoutes)
app.use(testRoutes)

export default app