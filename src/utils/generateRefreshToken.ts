import jwt from 'jsonwebtoken'
export const generateRefreshToken = (id:number) => {
    if(!process.env.REFRESH_TOKEN_SECRET){
        throw new Error("REFRESH_TOKEN_SECRET is not defined");
    }
    return jwt.sign(
        {
            id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:'7d'
        }
    )
}