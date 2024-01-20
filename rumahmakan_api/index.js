import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";
import TransactionRoute from "./routes/TransactionRoute.js";
import router from "./routes/index.js";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors({ credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(ProductRoute);
app.use(TransactionRoute);
app.use(router);

app.listen(5000, ()=> console.log('Server up and running...'));