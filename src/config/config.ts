import 'dotenv/config'

export default {
    node_env: process.env.NODE_ENV,
    jwtAccessToken: process.env.ACCESS_TOKEN_SECRET || 'jwtaccesstoken',
    jwtRefreshToken: process.env.REFRESH_TOKEN_SECRET || 'jwtrefreshtoken',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/mydb',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
}