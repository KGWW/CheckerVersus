

// 
// const sockets = io('localhost:3000');
//
// sockets.on('hello', (data) => {
//     console.log(data);
//     sockets.emit('hi', { hi: 'you' })
// });

$(function() {

    const socket = io(localhost:3000);

    sockets.on('hello', (data) => {
        console.log(data);
        sockets.emit('hi', { hi: 'you' })
    });

    io.emit('connection');
});
