import { model, Schema, Document } from 'mongoose'

export interface IPost extends Document {
    body: string
    // comments: [{created_at , text , user { username, thumbnail }}]
    // comments_count: number
    is_private: boolean
    likes: number
    // linked_posts: { next: {}, previous: {}}
    tags: string[]
    thumbnail: string
    title: string
    slug: string
    creatorId: string
}

const postSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    is_private: {
        type: Boolean,
        default: true
    },
    likes: {
        type: Number,
        default: 0
    },
    tags: [{
        type: String,
    }],
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
}, {timestamps: true})

export default model<IPost>('Post', postSchema)