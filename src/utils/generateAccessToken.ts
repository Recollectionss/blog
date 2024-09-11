import jwt from 'jsonwebtoken'

export const generateAccessToken = (id:string,username:string) =>{
    if(!process.env.ACCESS_TOKEN_SECRET){
        throw new Error("ACCESS_TOKEN_SECRET is not defined")
    }

    return jwt.sign(
        {
            id,
            username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"1h"
        }
    )
}