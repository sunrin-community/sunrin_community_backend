import { Request, Response } from 'express'
import Post from '../models/post'


export const addPost = async (req: Request, res: Response) => {
    try {
        const { body, is_private, likes, tags, thumbnail, title, slug, creatorId } = req.body

        const user = req.user

        // user.id

        if (!body || !thumbnail || !title || !slug || !creatorId) return res.status(400).json({ msg: 'Please add all fields.' })

        const post = await Post.findOne({ slug })

        if (post) {
            // slug = slug + random 4 text
        }

        const createNewPost = new Post({
            body,
            is_private,
            likes,
            tags,
            thumbnail,
            title,
            slug,
            creatorId
        })

        await createNewPost.save()
        return res.status(200).json({ msg: 'Post create Success!', post: createNewPost })
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

export const updateSinglePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params // slug
        const { body, is_private, liked, likes, tags, thumbnail, title, slug, creatorId } = req.body

        const findPost = await Post.findOne({ slug: id })

        if (!findPost) return res.status(400).json({ msg: `Post ${id} not found.` })

        const updatePost = {
            body,
            is_private,
            likes,
            tags,
            thumbnail,
            title,
            slug,
            creatorId
        }

        const updatedPost = await Post.findOneAndUpdate({ slug: id }, updatePost, { new: true })
        return res.status(200).json({ msg: 'Post update Success!', post: updatedPost })
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

export const removeSinglePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const findPost = await Post.findOne({ slug: id })

        if (!findPost) return res.status(400).json({ msg: `Post ${id} not found.` })

        await Post.findOneAndDelete({ slug: id });

        return res.status(200).json({ msg: 'Post delete Success!' });
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

export const getPosts = async (req: Request, res: Response) => {
    try {
        const blogPosts = await Post.find()

        if (!blogPosts) return res.status(400).json({ msg: 'Posts not found.' })

        return res.status(200).json({ msg: 'Get Posts Success!', posts: blogPosts })
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

export const getSinglePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params // slug

        const singlePost = await Post.findOne({ slug: id })

        if (!singlePost) return res.status(400).json({ msg: `Post ${id} not found.` })

        if (!singlePost.is_private) return res.status(400).json({ msg: `Post ${id} is private` })

        return res.status(200).json({ msg: 'Get post Success!', post: singlePost })
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

export const likePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const findPost = await Post.findOne({ slug: id })

        if (!findPost) return res.status(400).json({ msg: `Post ${id} not found.` })

        // 포스트의 creatorId 와 미들웨어 유저 같은지 확인 
        // 유저에 likedPost에 포스트 Id가 있는지 확인
        // likedPost에 post 추가 or 지우기
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}
