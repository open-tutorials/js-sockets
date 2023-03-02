const { createServer } = require('net');

// brew install telnet

const clients = [];
function addClient(client) {
    clients.push(client);
}

function removeClient(client) {
    const index = clients.indexOf(client);
    if (index !== -1) {
        clients.splice(index, 1);
    }
}

function dispatch(from, message) {
    for (const client of clients) {
        if (client !== from) {
            client.write(message);
        }
    }

}

const server = createServer(client => {
    console.log('connection from', client.remoteAddress, ':', client.remotePort);
    addClient(client);

    client.on('data', (buffer) => {
        //console.log('data from', client.remoteAddress, 'port', client.remotePort);
        const message = buffer.toString('utf-8');
        console.log(message);
        dispatch(client, message);
    });
    client.on('end', () => {
        console.log('closed', client.remoteAddress, ':', client.remotePort);
        removeClient(client);
    });
})

server.maxConnections = 50;
server.listen(8081, '0.0.0.0');
console.log('server has been started');