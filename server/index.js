const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/usersRoutes')
const mesageRoute = require('./routes/messageRoutes')
const socket = require('socket.io')


const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoute)
app.use("/api/message",mesageRoute)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("DB connection successfully")
})
.catch((err)=>{
    console.log("Failed in ", err)
})
const server = app.listen(process.env.POST,()=>{
    console.log(`Server start on ${process.env.POST}`);
})
const io = socket(server,{
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
})

// Tạo một Map để lưu trữ danh sách người dùng trực tuyến
global.onlineUsers = new Map()

// Xử lý kết nối từ máy khách
io.on("connection", (socket) => {
    // Gán đối tượng socket của người dùng vào biến toàn cục chatSocket
    global.chatSocket = socket;

    // Nghe sự kiện "add-user" từ máy khách
    socket.on("add-user", (userId) => {
        // Lưu trữ ID của socket máy khách trong Map onlineUsers với khóa là userId
        onlineUsers.set(userId, socket.id)
    })


    // Nghe sự kiện "send-msg" từ máy khách
    socket.on("send-msg", (data) => {
        console.log(data.to)
        // Lấy socket ID của người nhận từ Map onlineUsers
        const sendUserSocket = onlineUsers.get(data.to);
        // Kiểm tra xem người nhận có trực tuyến không
        console.log(sendUserSocket)
        if (sendUserSocket) {
            // Gửi thông điệp đến socket của người nhận
            socket.to(sendUserSocket).emit("msg-recieve", data.message)
        }else{
        }
    })
})
