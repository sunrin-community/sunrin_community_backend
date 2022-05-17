import { model, Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    name: string
    username: string
    email: string
    password: string
    role: string
    thumbnail: string
    joinDate: Date
    comparePassword: (password: string) => Promise<Boolean>
}

const userSchema = new Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    thumbnail: {
        type: String,
        default: "/images/blank_profile.png"
    },
    likedPost: [{
        type: String,
    }]
}, {timestamps: true})

userSchema.pre<IUser>('save', async function (next) {
    const user = this
    if (!user.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
});

userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

export default model<IUser>('User', userSchema)