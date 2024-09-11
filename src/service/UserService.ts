import {UserInterface} from "../interfaces/UserInterface";
import {pool} from "../config/db";

class UserService {
    async create(user:UserInterface){
        const queryFind = "SELECT * FROM Users WHERE username = 1$"
        const valuesFind =[user.username]

        const findUser = await pool.query(queryFind,valuesFind);

        if(findUser){
            throw new Error("Username already taken");
        }

        const queryInsert = "INSERT INTO USERS (username, password, email, last_modified_by) VALUES (1$,2$,3$,$4) RETURNING *"
        const valuesInsert = [user.username, user.password, user.email,1];

        return await pool.query(queryInsert, valuesInsert);
    }
}



export default new UserService();