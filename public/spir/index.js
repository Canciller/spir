const net = require('net');
const { ipcMain } = require('electron');

const DEFAULT_PORT = 3334,
      DEFAULT_ADDRESS = '127.0.0.1';

class Reader {
    constructor(targetWindow) {
        this.targetWindow = targetWindow;

        ipcMain.on('reader:address', (e, address) => {
            this.address = address || DEFAULT_ADDRESS;
        });

        ipcMain.on('reader:port', (e, port) => {
            this.port = port || DEFAULT_PORT;
        });

        ipcMain.on('reader:connect', (e, port, address) => {
            this.connect(port, address);
        });
    }

    connect(port, address) {
        this.destroy();
        this._init(port, address);

        this.socket = net.createConnection(this.port, this.address);

        this.socket.on('connect', () => {
            this.socket.setEncoding('utf-8');
            this.targetWindow.webContents.send('reader:status', {
                success: true,
                message: `Connected to spir reader at ${this.address}:${this.port}`
            });

            console.log(`Connected to spir reader at ${this.address}:${this.port}`);
        });

        this.socket.on('error', err => {
            this.targetWindow.webContents.send('reader:status', {
                success: false,
                message: `Error connecting to spir reader: ${err.message}`
            });

            console.log(`Error connecting to spir reader: ${err.message}`);
        });

        this.socket.on('data', data => {
            this.targetWindow.webContents.send('reader:data', data);
        });

        this.socket.on('end', () => {
            this.targetWindow.webContents.send('reader:status', {
                success: false,
                message: 'Error connection to spir reader: connection ended'
            });

            console.log('Error connecting to spir reader: connection ended');
        });
    }

    destroy() {
        if(this.socket) this.socket.destroy();
        this.socket = null;
    }

    _init(port, address) {
        this.address = address || this.address || DEFAULT_ADDRESS;
        this.port = port || this.port || DEFAULT_PORT;
    }
}

module.exports = {
    Reader
}
