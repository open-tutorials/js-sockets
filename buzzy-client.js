const { Socket } = require('net');

const client = new Socket();
client.connect(8081, '127.0.0.1', function() {
	console.log('connected');
	client.write('Hello, server! Love, Client.');

    setInterval(()=> client.write('❤️'), 1000);
});

client.on('data', function(data) {
	console.log('received' + data);
});

client.on('close', function() {
	console.log('closed');
});
