const { createServer } = require('net');

// brew install telnet

function parseHeaders(source) {
    const headers = {};
    for (const line of source.split('\n')) {
        const [name, value] = line.split(':');
        headers[name.trim()] = value.trim();
    }

    return headers;
}

const server = createServer(client => {
    console.log('connection from', client.remoteAddress, ':', client.remotePort);

    let request = null, input = '';

    client.on('data', (buffer) => {
        const message = buffer.toString('utf-8');
        process.stdout.write(message);
        input += message;
        const index = input.indexOf('\n\n');
        if (index !== -1) {
            request = {
                raw: { headers: '', body: '' },
                headers: {},
                body: {
                    expectedLength: 0,
                    data: ''
                }
            };

            request.raw.headers = request.buffer.substring(0, index);
            request.headers = parseHeaders(request.raw.headers);
            console.log('request', request);

            input = input.substring(index + 2);

            request.body.expectedLength = parseInt(request.headers['content-length']);
        }
        
        if (!!request) {
            if (request.body.expectedLength > 0) {
                if (request.body.data.length >= request.body.expectedLength) {
                    body.data = '';
                }
            } else {
                request = null;
                input = input.substring
            }
        }
    });
    client.on('end', () => {
        console.log('closed', client.remoteAddress, ':', client.remotePort);
    });
})

server.maxConnections = 50;
server.listen(8081, 'localhost');