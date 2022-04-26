import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import valid from '../utils/valid'
import { createAccessToken, createRefreshToken } from '../utils/jwt-util'
import config from '../config/config'

interface JwtPayload {
    id: string
    email: string
}

export const signUp = async (req: Request, res: Response) => {
    try {
        const { name, username, email, password, cf_password } = req.body

        const errMsg = valid(name, username, email, password, cf_password)
        if (errMsg) return res.status(400).json({ msg: errMsg })

        const user = await User.findOne({ email })

        if (user) return res.status(400).json({ msg: 'The user already exists.' })

        const newUser = new User(req.body)
        await newUser.save()

        return res.status(200).json({ msg: 'Register success!' })
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password) return res.status(400).json({ msg: 'Please add all fields.' })

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ msg: 'The user does not exists.' })

        const isMatch = await user.comparePassword(password)
        if (!isMatch) return res.status(400).json({ msg: 'The email or password are incorrect.' })

        const refresh_token = createRefreshToken({ id: user.id, email: user.email })
        res.cookie('refreshtoken', refresh_token, {
            sameSite: 'strict',
            httpOnly: true,
            path: '/',
            secure: config.node_env === 'production' ? true : false,
            maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
        })

        return res.status(200).json({ msg: 'Login success!', token: createAccessToken({ id: user.id, email: user.email }) })
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

export const signOut = (req: Request, res: Response) => {
    try {
        res.clearCookie('refreshtoken')
        return res.status(200).json({ msg: 'Logged out.' })
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

export const getUser = (req: Request, res: Response) => {
    try {
        const user = req.user
        if (!user) return res.status(400).json({ msg: 'Expired access token.' })

        return res.status(200).json({ msg: 'Get user info success.', user })
    } catch (err) {
        return res.status(500).json({ msg: err })
    };
}

export const getAccessToken = (req: Request, res: Response) => {
    try {
        const rf_token = req.cookies.refreshtoken
        if (!rf_token) return res.status(400).json({ msg: 'Refresh token not found!' })

        const payload = jwt.verify(rf_token, config.jwtRefreshToken) as JwtPayload
        if (!payload) {
            res.clearCookie('refreshtoken')
            return res.status(400).json({ msg: 'Expired refresh token.' })
        }

        return res.status(200).json({ msg: 'Issue access token.', token: createAccessToken({ id: payload.id, email: payload.email }) })
    } catch (err) {
        return res.status(500).json({ msg: err });
    }
}