const net = require('net');
const { ipcMain } = require('electron');

const DEFAULT_PORT = 3334,
      DEFAULT_ADDRESS = '127.0.0.1';

const translations = {
    error: 'message.reader.error',
    not_connected: 'message.reader.not_connected',
    connected: 'message.reader.connected'
}

function status(success, message, data) {
    return {
        success,
        message,
        data
    }
}

class Reader {
    send(event, data) {
        if(this.targetWindow) this.targetWindow.webContents.send(event, data);
    }

    on(event, callback) {
        ipcMain.on(event, callback);
    }

    info() {
        return {
            address: this.address,
            port: this.port
        } 
    }

    setPort(value) {
        value = parseInt(value);

        if(!value ||
            value <= 0 ||
            value >= 65536) value = DEFAULT_PORT;

        this.port = value;
    }

    setAddress(value) {
        if(!value ||
            value === '') value = DEFAULT_ADDRESS;

        this.address = value;
    }

    constructor(targetWindow) {
        this.targetWindow = targetWindow;

        this.on('reader:address', (e, address) => setAddress(address));

        this.on('reader:port', (e, port) => setPort(port));

        this.on('reader:connect', (e, port, address) => this.connect(port, address));

        this.on('reader:status', () => {
            this.send('reader:status', status(
                this.socket ? true : false,
                this.socket ? 'Connected to SPIR reader' : 'Not connected to SPIR reader',
                this.info()
            ));
        })

        this.on('reader', () => {
            this.send('reader', info());
        })
    }

    connect(port, address) {
        this._reset(port, address);

        try {
            this.socket = net.createConnection(this.port, this.address);

            this.socket.on('connect', () => {
                this.socket.setEncoding('utf-8');

                this.send('reader:status', status(
                    true,
                    'Connected to SPIR reader',
                    this.info()
                ));
            });

            this.socket.on('error', err => {
                this.send('reader:status', status(
                    false,
                    err.message
                ));

                this._reset();
            });


            this.socket.on('end', () => {
                this.send('reader:status', status(
                    false,
                    'Connection to SPIR reader ended'
                ));

                this._reset();
            });

            this.socket.on('data', data => {
                this.send('reader:data', data);
            });

        } catch(e) {
            this.send('reader:status', status(
                false,
                e.message
            ));
        }
    }

    _reset(port, address) {
        if(this.socket) this.socket.destroy();
        this.socket = null;
        this.setPort(port);
        this.setAddress(address);
    }
}

module.exports = {
    Reader
}
