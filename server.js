const app = require('./app');
const http = require('http');

let port = process.env.PORT || 3000;

const server = http.createServer(app);

const startServer = (port) => {
    server.listen(port);
};

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use. Trying the next available port...`);
        startServer(++port);
    } else {
        console.error('Failed to start server:', error);
    }
});

server.on('listening', () => {
    console.log(`Server is running on port ${port}`);
});

startServer(port);
