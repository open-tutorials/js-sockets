const { createServer } = require('net');

// brew install telnet

const server = createServer(client => {
    console.log('connection from', client.remoteAddress, ':', client.remotePort);

    client.on('data', (buffer) => {
        //console.log('data from', client.remoteAddress, 'port', client.remotePort);
        const message = buffer.toString('utf-8');
        console.log(message);
    });
    client.on('end', () => {
        console.log('closed', client.remoteAddress, ':', client.remotePort);
        removeClient(client);
    });
})

server.maxConnections = 50;
server.listen(8081, 'localhost');