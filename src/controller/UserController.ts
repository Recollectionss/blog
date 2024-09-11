import {UserInterface} from "../interfaces/UserInterface";
import {Request,Response} from "express";
import UserService from "../service/UserService";

interface CreateUserRequest {
    user: UserInterface
}
class UserController {
    async create (req: Request<{},{},CreateUserRequest>,res:Response){
        const {user} = req.body;
        await UserService.create(user);
    }
}

export default new UserController();