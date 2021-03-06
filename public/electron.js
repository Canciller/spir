const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

const spir = require('./spir');
const Reader = spir.Reader;

let mainWindow; 
let reader;

/*
require('update-electron-app')({
    repo: 'kitze/react-electron-example',
    updateInterval: '1 hour'
});
*/

function createWindow() {

    mainWindow = new BrowserWindow({ 
        width: 900, height: 680,
        webPreferences: {
            nodeIntegrationInWorker: true,
            'web-security': false
        },
        title: 'SPIR',
        icon: __dirname + './favicon2.png',
        titleBarStyle: 'hidden'
    });
    mainWindow.loadURL(
        isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    );

    let reader = new Reader(mainWindow);

    mainWindow.on('closed', () => (mainWindow = null));
    mainWindow.on('close', () => {
        if(reader) reader.destroy();
    })

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) 
        createWindow();
});
