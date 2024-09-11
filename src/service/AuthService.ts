import {pool} from "../config/db";
import bcrypt from "bcrypt";
import {generateAccessToken} from "../utils/generateAccessToken";

class AuthService {
    async login(username:string,password:string){
        const query = "SELECT * FROM Users WHERE username = $1";
        const values = [username];

        const user = await pool.query(query,values);

        if(!user.rows[0]){
            throw new Error("Invalid username")
        }

        const isMath = await bcrypt.compare(password,user.rows[0].password);
        if (!isMath){
            throw new Error("Invalid username or password")
        }

        return user.rows[0];
    }
    async refreshAccessToken(refreshToken:string){
        const query = `SELECT * FROM Users WHERE refresh_token = $1`;
        const values = [refreshToken];

        const user = await pool.query(query,values);

        const userData = user.rows[0]

        if(!userData){
            throw new Error("Invalid refresh token");
        }


        return generateAccessToken(userData.id,userData.username);
    }
}

export default new AuthService();