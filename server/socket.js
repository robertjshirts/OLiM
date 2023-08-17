const dal = require('./datahandler/datalayer.js')

const addMessage = (data) => { // Temporary solution to adding messages to queue
    data.timestamp = '12:00:00'
    data.user_id = '0'
    data.content = data.body
    dal.messages.create(false, data, (err, result) => {
        if (err) {
            console.error(err)
            return
        }
        
    })
}


module.exports = (io) => {
    const recieveMessage = (data) => {
        console.log("Message recieved: " + data.body)
        io.emit('chat message', data)
    }
    // addMessage(data) <- This is commented :)
    io.on('connection', (socket) => {
        console.log('user connected')
    
        socket.on('chat message', (data) => {
            recieveMessage(data)
        })
    
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
}