import jwt from 'jsonwebtoken'
import config from '../config/config'

interface token {
    id: string
    email: string
}

export const createAccessToken = (payload: token) => {
    return jwt.sign(payload, config.jwtAccessToken, { expiresIn: "30m" })
}

export const createRefreshToken = (payload: token) => {
    return jwt.sign(payload, config.jwtRefreshToken, { expiresIn: "14d" })
}
