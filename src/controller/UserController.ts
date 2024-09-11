import {UserInterface} from "../interfaces/UserInterface";
import {Request,Response} from "express";

export interface CreateUserRequest {
    user: UserInterface
}
class UserController {
    async delete (req:Request,res:Response){}
    async put (req:Request,res:Response){}
    async patch (req:Request,res:Response){}
}

export default new UserController();