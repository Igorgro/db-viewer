const { app, BrowserWindow } = require('electron');

function createWindow() {
    let win = new BrowserWindow({
        width: 1024,
        height: 800,
        minWidth: 1024,
        minHeight: 800,
        show: false,
        icon: 'app/res/favicon.ico',
        webPreferences: {
            nodeIntegration: true
        },
        frame: false
    });
    win.loadFile('app/index.html');
    win.removeMenu();
    win.webContents.openDevTools();
    win.webContents.on('did-finish-load', function() {
        win.show();
    });
    // win.maximize();
}

app.whenReady().then(createWindow);
