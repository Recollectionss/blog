import express from "express";
import dotenv from "dotenv";
import UserRouter from "./routes/UserRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use('/api',UserRouter);

async function startApp (){
    app.listen(PORT, () => {
        console.log("Server has been started");
    })
}
startApp();