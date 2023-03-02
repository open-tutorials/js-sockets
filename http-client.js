const { Socket } = require('net');

const client = new Socket();
client.connect(8081, '127.0.0.1', function() {
	console.log('connected');
	client.write('method: GET');

    setTimeout(()=> {
		client.write('\npath: /users/1\ncontent-length: 5\n\nhello');
		client.write('method: POST\npath: /users/1/');
	}, 1000);
});

client.on('data', function(data) {
	console.log('received', data);
});

client.on('close', function() {
	console.log('closed');
});
