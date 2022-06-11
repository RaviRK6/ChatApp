const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const userRouter = require('./router/userRouter')
const connectDB = require('./config/config')

const app = new express()


app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

require("dotenv").config();

app.use("/user",userRouter)


const port = process.env.PORT || 5000

app.get('/', (req,res)=>{
    res.send("hi")
})


app.listen(port, ()=> {
    console.log("server is on port " + port)
    connectDB()
})