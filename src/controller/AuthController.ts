import {Request,Response} from "express";
import {CreateUserRequest} from "./UserController";
import UserService from "../service/UserService";
import AuthService from "../service/AuthService";
import {generateAccessToken} from "../utils/generateAccessToken";
import {generateRefreshToken} from "../utils/generateRefreshToken";
import {pool} from "../config/db";


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

        }catch (e:any){
            res.status(500).json({name: e.name, message: e.message});
        }
    }
}

export default new AuthController();