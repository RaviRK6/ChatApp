const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const socketio = require('socket.io')

const userRouter = require('./router/userRouter')
const messageRouter = require('./router/messageRouter')
const connectDB = require('./config/config')

const app = new express()


app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

const server = http.createServer(app)

const io = socketio(server,{
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection',(socket)=>{
    console.log('new websocket connection')
    socket.emit('connection')
    socket.on('disconnect' , ()=>{
        console.log('user left')
    })
})



require("dotenv").config();

app.use("/user",userRouter)
app.use(messageRouter)

const port = process.env.PORT || 5000

app.get('/', (req,res)=>{
    res.send("hi")
})


server.listen(port, ()=> {
    console.log("server is on port " + port)
    connectDB()
})