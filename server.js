/* :: mvp server :: */

const express = require('express');
const app = express();
const http = require('http'); //always recommended for socket.io
const { Server } = require('socket.io');
const cors = require('cors');


app.use(cors());

const server = http.createServer(app);
const PORT = process.env.PORT || 5500;

const io = new Server(server, {
    cors: {
        /* avoid cors errors, paste the client url here: 'http://localhost:3000', */
        origin: ['http://localhost:3000', 'http://localhost:3000/remoteScreen'],
        methods: ['GET', 'POST'],
    }
});


/** every time a client sends data to the server 
 * the socket is connected/open ==> io.on()
 * the socket id is the id from the user/client
*/
io.on('connection', (socket) => {

    console.log('USER ', socket.id, '__connected!')

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    /* get and send the data from client to remoteScreen: */
    socket.on('color-data', (data) => {
        console.log('color-data: ', data)
        io.emit('send-color-data', data);
    })

    socket.on('brightness-data', (data) => {
        console.log('brightness-data: ', data)
        io.emit('send-brightness-data', data);
    })

});



/* :::: Run the  SERVER :::: */
server.listen(PORT, () => {

    console.log(`server listens to port ${PORT}`);

});