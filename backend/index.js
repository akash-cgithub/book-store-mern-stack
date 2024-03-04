import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose"
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app=express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling cors policy
//option1: Allow all origins with default of cors(*)
app.use(cors());

//option2:Allow custom origins
// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],
// }))

app.get('/',(req,res)=>{
    console.log(req);
    return res.status(234).send("Welcome to MERNStack");
});

//We use middleware to handle routes with /books 
app.use("/books",booksRoute)


mongoose.connect(mongoDBURL)
.then(()=>{
console.log("App connected to database");
app.listen(PORT,()=>{           //we wanted to listen to port only when db was connected 
    console.log(`App is listening to port:${PORT}`);
});
})
.catch((error)=>{
console.log(error);
})