console.log('Hello from Electron 👋')

const { app,BrowserWindow} = require('electron')
const env = process.env.NODE_ENV || 'development';

const path = require('node:path')
const createWindow = () =>{
    const win = new BrowserWindow({
        width:800,
        height:600,
        resizable:false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
      
    })

    win.loadFile('index.html')
}

app.whenReady().then(()=>{
    createWindow();

    app.on('activate',()=>{
        if(BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})

app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin') app.quit();
})

// If development environment
if (env === 'development') {
    require('electron-reload')(__dirname,{
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
        hardResetMethod: 'exit'
    })
}