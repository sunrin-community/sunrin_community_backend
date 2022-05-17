import { Router } from 'express'
import passport from 'passport'
import { addPost, updateSinglePost, removeSinglePost, getPosts, getSinglePost, likePost } from '../controllers/post.controller'
const router = Router();

// 유저 검증 미들웨어 추가 (passport)

router.post('/add', passport.authenticate('jwt', { session: false }), addPost)
router.get('/posts', getPosts)
router.get('/:id', getSinglePost)
router.patch('/:id', updateSinglePost)
router.patch("/:id/likedPost", likePost);
router.delete('/:id', removeSinglePost)



export default router;