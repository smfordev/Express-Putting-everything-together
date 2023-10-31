import mongoose from 'mongoose';
import express, { Express, Request, Response } from 'express';
import booksRouter from "./books";
import dot from 'dotenv'

dot.config()

const app: Express = express();
const PORT = process.env['PORT'] || 3030;
const MONGO_STR = process.env['MONGODB_STR'] || "mongodb://127.0.0.1/TP_typescript";

mongoose.connect(MONGO_STR)
	.then(() => console.log("Connected to DB"))
	.catch(() => console.log("Connection to DB failed !"));

app.use('/books', booksRouter)
app.get('/', (_: Request, res: Response) => res.redirect('/books'));

app.listen(PORT, () => {
	console.log(`⚡️[Server]: Server is running at http://localhost:${PORT}`);
});
