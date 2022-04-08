require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

//DB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('connected to mongoDB')
}).catch((err)=>{
    console.log(err.message)
})

//MiddleWares
app.use(express.json());
app.use("/users",userRouter);
app.use("/products",productRouter);

app.listen(process.env.PORT, ()=>{
    console.log('listening on port', process.env.PORT)
})
