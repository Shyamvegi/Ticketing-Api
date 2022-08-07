import express from "express";
import mongoose from "mongoose";
import routes from './routers/routes.js';
import morgan from 'morgan';


const uri = `mongodb+srv://Shyam:Shyam@cluster0.dt4pg.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(
    uri,
    ()=>console.log("db connected"))
    .catch(err=>console.log(err)
    );

const port = process.env.PORT || 3000;
const host = process.env.HOST || "http://localhost";

const app = express();
app.use(morgan('tiny'));
app.use(express.json())
app.use('/',routes)

app.listen(port,
    ()=>console.log(`Server Running on ${host}:${port}`)
    );