import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/test', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send(req.body.user)
})

export default router