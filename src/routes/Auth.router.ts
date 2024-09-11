import {Router} from "express";
import AuthController from "../controller/AuthController";

const AuthRouter = Router();

AuthRouter.post("/registry" , AuthController.registry);
AuthRouter.post("/login" , AuthController.login);
AuthRouter.post("/refreshAccessToken" , AuthController.refreshAccessToken);

export default AuthRouter;