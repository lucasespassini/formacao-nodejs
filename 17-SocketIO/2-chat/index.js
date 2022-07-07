const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

http.listen(3000, () => console.log('http://localhost:3000'));

io.on('connection', (socket) => {
  // socket = client

  socket.on('disconnect', () => {
    // console.log(`${socket.id} desconectou`)
  })

  socket.on('msg', data => {
    console.log(data)
    io.emit('showmsg', data)
  })
})