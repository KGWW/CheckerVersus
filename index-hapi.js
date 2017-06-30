const Hapi = require('hapi');
const server = new Hapi.Server();
const Path = require('path');

server.connection({
    host: 'localhost',
    port: 3000
});

const io = require('socket.io')(server.listener);

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
       method: 'GET',
        path: '/',
        handler: (request, reply) => {
            // directory: {
            //     path: Path.join(__dirname, 'public')
            // }
            reply.file('./public/index.html');
        }
    });

    server.start((err) => {

        if (err) {throw err;}

        console.log('Server running at:', server.info.uri);
    });
});

io.on('connection', (socket) => {
    console.log('A user has connected');
    socket.emit('hello', { hello: 'world' });
    socket.on('hi', (data) => {
        console.log(data);
    });
});
