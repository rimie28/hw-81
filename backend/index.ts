import express from "express";
import cors from 'cors';
import linksRouter from "./routers/linksRouter";
import mongoose from "mongoose";


const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());
app.use('/', linksRouter);

const run = async () => {
    try {
        await mongoose.connect('mongodb://localhost/hw81');

        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });

        process.on('exit', () => {
            mongoose.disconnect();
        });
    } catch (error) {
        console.error(error);
    }
};

run();
