// import dotenv from 'dotenv';
// dotenv.config();
// import path from 'path';
import express from "express";
import cors from "cors";
import { sample_foods, sample_tags } from "./data";
// import foodRouter from './routers/food.router';
// import userRouter from './routers/user.router';
// import orderRouter from './routers/order.router';
// import { dbConnect } from './configs/database.config';
// dbConnect();

const app = express();
// app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

// app.use("/api/foods", foodRouter);
// app.use("/api/users", userRouter);
// app.use("/api/orders", orderRouter);

// app.use(express.static('public'));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname,'public', 'index.html'))
// })

app.get("/api/foods",(req,res)=>{
    res.send(sample_foods)
})

app.get("/api/foods/search/:searchTerm",(req,res)=>{
    const searchTerm=req.params.searchTerm;
    const foods=sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));

    res.send(foods);
})


app.get("/api/foods/tags",(req,res)=>{
    res.send(sample_tags)
})

app.get("/api/foods/tag/:tagName",(req,res)=>{
    const tagName=req.params.tagName;
    const foods=sample_foods.filter(food=>food.tags?.includes(tagName));

    res.send(foods);
})

app.get("/api/foods/:foodId",(req, res)=>{
    const foodId = req.params.foodId;
    const food = sample_foods.find(food=>food.id==foodId);
    res.send(food);
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})