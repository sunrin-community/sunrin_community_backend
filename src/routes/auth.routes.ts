import { Router } from 'express'
import passport from 'passport'
import { signIn, signUp, getUser, getAccessToken, signOut } from '../controllers/user.controller'
const router = Router();

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/signout', signOut)
router.get('/token', getAccessToken)
router.get('/info', passport.authenticate('jwt', { session: false }), getUser)

export default router;