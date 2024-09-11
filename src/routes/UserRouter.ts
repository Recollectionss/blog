import {Router} from "express";
import UserController from "../controller/UserController";

const UserRouter = Router();

UserRouter.post('/',UserController.create);

export default UserRouter;
