const { app, BrowserWindow } = require('electron');

function createWindow () {
    let win = new BrowserWindow({
        width: 1024,
        height: 800,
        show: false,
        icon: 'app/res/favicon.ico',
        webPreferences: {
            nodeIntegration: true
        },
    });
    win.loadFile('app/index.html');
    win.removeMenu();
    win.webContents.on('did-finish-load', function() {
        win.show();
    });
    win.maximize();
}

app.whenReady().then(createWindow);
