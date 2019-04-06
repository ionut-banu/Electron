const electron = require('electron') //package

const countdown = require('./countdown')

const app = electron.app //module
const BrowserWindow = electron.BrowserWindow //allows to see UI
const ipc = electron.ipcMain

const windows = []

app.on('ready', _ => {
    [1, 2, 3].forEach(_ => {
        let win = new BrowserWindow({
            height: 400,
            width: 400
        })
    
        win.loadURL(`file://${__dirname}/countdown.html`)
    
        win.on('closed', _ => {
            win = null
        })
    
        windows.push(win)
    })    
})

ipc.on('countdown-start', _ => {
    countdown(count => {
        console.log("count: " + count)
        windows.forEach(win => {
            win.webContents.send('countdown', count)
        })
    })
})