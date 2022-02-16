import express from "express"
import cors from 'cors'
import 'dotenv/config'
import {dbConnect} from "./config/db"

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const start = () => {
    return dbConnect().then(() => {
        console.log('DB connected')
        app.listen(port, function () {
            console.log(`Listening to port: ${port}`);
        });
    });
};

export default start