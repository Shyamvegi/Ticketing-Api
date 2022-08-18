import express from "express";
import mongoose from "mongoose";
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import routes from './routers/routes.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Database connection
const uri = `mongodb+srv://Shyam:Shyam@cluster0.dt4pg.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(
    uri,
    ()=>console.log("db connected"))
    .catch(err=>console.log(err)
    );

const port = process.env.PORT || 3000;
const host = process.env.HOST || "http://localhost";

const app = express();

//Logger Middleware
var __dirname = dirname(fileURLToPath(import.meta.url));
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'requests.log'), { flags: 'a' })
app.use(morgan({ stream: accessLogStream }))

//json middleware
app.use(express.json())
app.use('/',routes)

//start server
app.listen(port,
    ()=>console.log(`Server Running on ${host}:${port}`)
    );