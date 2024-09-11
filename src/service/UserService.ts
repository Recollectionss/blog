import {UserInterface} from "../interfaces/UserInterface";
import {pool} from "../config/db";
import bcrypt from "bcrypt";

class UserService {
    async create(user:UserInterface){
        const queryFind = "SELECT * FROM Users WHERE username = $1"
        const valuesFind =[user.username]

        const findUser = await pool.query(queryFind,valuesFind);

        if(findUser.rows[0]){
            throw new Error("Username already taken");
        }

        const hashedPassword = await bcrypt.hash(user.password,10);

        const queryInsert = `INSERT INTO Users (username, password, email, last_modified_by) VALUES ($1,$2,$3,$4) RETURNING *`
        const valuesInsert = [user.username, hashedPassword, user.email,1];

        return await pool.query(queryInsert, valuesInsert);
    }
    async setRefreshToken (id:number,refresh_token:string){
        const query = `UPDATE Users SET refresh_token = $1 WHERE ID = $2 RETURNING *`;
        const values = [refresh_token,id];
        const user = await pool.query(query,values);
        if(!user.rows[0]){
            throw new Error("cannot find user by his id")
        }
        return user.rows[0];
    }
}



export default new UserService();