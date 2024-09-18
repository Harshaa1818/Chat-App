const http = require('http');
const express = require('express');
const { Server } = require('socket.io')
const cors = require('cors')

const app = express();
const server = http.createServer(app)
const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173", // Allow the frontend URL
        methods: ["GET", "POST"],
        credentials: true,
    }
})

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST"],
    credentials: true,

}))
app.use(express.static('public'))

io.on("connection",(socket)=>{
    console.log("user connected",socket.id)
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
    })
    socket.on("user-message",(message)=>{
        io.emit("messages",message)

    })
})
app.get('/',(req,res)=>{
    return res.send("server is running")
})

server.listen(9000,()=>{
    console.log("server is running on PORT: 9000")
})