const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)
app.use(cors());


const io = require('socket.io')(server, {
    cors: {
        origin: "*",

    }
})

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('joinRoom', (data) => {
        socket.join(data.room);
        console.log(`User With Id ${socket.id} join room ${data.room}`)

    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('onMessage', data)
    })
    socket.on('disconnect', () => {
        console.log("Disconnected", socket.id);
    })

})


server.listen(port, () => { console.log("Welcome") }) 