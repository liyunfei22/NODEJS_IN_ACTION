const net = require('net')
const server = net.createServer(socket => {
  socket.on('data', data => {
    console.log('ssssss')
    socket.write(data)
  })
}).listen(5555, function() {
  console.log('3333')
})