const electron = require('electron')

const { app, BrowserWindow, globalShortcut } = electron

let mainWindow

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 0,
        height: 0,
        resizeable: false,
        frame: false
    })

    mainWindow.loadURL(`file://${__dirname}/capture.html`)

    mainWindow.on('close', _ => {
        mainWindow = null
    })

    globalShortcut.register('Ctrl+Alt+D', _ => {
        mainWindow.webContents.send('capture', app.getPath('pictures'))
    })
})