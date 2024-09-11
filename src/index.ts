import express from "express";
import dotenv from "dotenv";
import UserRouter from "./routes/User.router";
import AuthRouter from "./routes/Auth.router";
import {pool} from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;
const BASEURL = '/api'

app.use(express.json());

app.use( BASEURL+'/auth', AuthRouter);
app.use( BASEURL, UserRouter);

async function startApp (){

    await pool.query('SELECT NOW()',(err) => {
        if(err) {
            console.error('Error connecting to the database', err.stack);
        } else {
            console.log('Connected to the database');
        }
    })

    app.listen(PORT, () => {
        console.log(`Server has been started on port:  ${PORT}`);
    })
}
startApp();