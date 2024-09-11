import {Request,Response} from "express";
import {CreateUserRequest} from "./UserController";
import UserService from "../service/UserService";
import AuthService from "../service/AuthService";
import {generateAccessToken} from "../utils/generateAccessToken";
import {generateRefreshToken} from "../utils/generateRefreshToken";
import {pool} from "../config/db";
import jwt from "jsonwebtoken";


interface LoginRequestInterface{
    username:string,
    password:string,
}
interface RefreshAccessTokenInterface {
    refreshToken:string,
}
class AuthController {

    async registry(req:Request<{},{},CreateUserRequest>,res:Response){
        try{
            const {user} = req.body;
            console.log(req.body);
            const newUser = await UserService.create(user);

            res.status(200).json(newUser.rows[0]);
        }catch (e:any) {
           switch (e.name){
               case "TypeError":
                   res.status(500).json({name:e.name,message: e.message});
                   break;
               default:
                   res.status(500).json({name:e.name,message: e.message});
           }
        }
    }
    async login(req:Request<{},{},LoginRequestInterface>,res:Response){
        try{
            const {username,password} = req.body;
            const user = await AuthService.login(username,password);

            const access_token = generateAccessToken(user.id, user.username);
            const refresh_token = generateRefreshToken(user.id);

            const userUpdated = await UserService.setRefreshToken(user.id,refresh_token);

            res.status(200).json({
                user:userUpdated.rows[0],
                access_token,
                refresh_token
            });
        }catch (e:any) {
            res.status(500).json({name:e.name,message:e.message});
        }
    }
    async refreshAccessToken(req:Request<{},{},RefreshAccessTokenInterface>,res:Response){
        try {
            const {refreshToken} = req.body;

            jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);

            const accessToken = await AuthService.refreshAccessToken(refreshToken);

            res.status(200).json({accessToken});
        }catch (e:any){
            if (e.name === 'TokenExpiredError') {
                return res.status(403).json({ message: "Refresh token expired, please login again" });
            } else if (e.name === 'JsonWebTokenError') {
                return res.status(403).json({ message: "Invalid refresh token" });
            }
            res.status(500).json({message: e.message});
        }
    }
}

export default new AuthController();