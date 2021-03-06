// const EventEmiter = require('events').EventEmitter
// const channel = new EventEmiter()
// channel.on('join', () => {
//   console.log('welcone')
// })
const events = require('events')
const net = require('net')
const channel = new events.EventEmitter();
channel.clients = {}
channel.subscriptions = {}
channel.on('join', function(id, client) {
  this.clients[id] = client;
  this.subscriptions[id] = (senderId, message) => {
    if (id !== senderId) {
      this.clients[id].write(message)
    }
  }
  this.on('broadcast', this.subscriptions[id])
})
channel.on('leave', function(id) {
  channel.removeListener('broadcast', this.subscriptions[id])
  channel.emit('broadcast', id, `${id} has left the chatroom \n`)
})
channel.on('shutdown', () => {
  channel.emit('broadcast', '', 'the server has shut down \n')
  channel.removeAllListeners('broadcast')
})
const server = net.createServer(client => {
  console.log(client)
  const id = `${client.remoteAddress}:${client.remotePort}`
  channel.emit('join', id, client)
  client.on('data', data => {
    data = data.toString();
    if (data === 'shutdown ')
    channel.emit('broadcast', id, data)
  })
  client.on('close', () => {
    channel.emit('leave', id)
  })
})
server.listen(8888)