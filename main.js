const { app, BrowserWindow, Menu} = require('electron')

process.env.NODE_ENV = 'development'
const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true :false
const isWin = process.platform === 'win32' ? true:false
const isLinux = process.platform === 'linux' ? true:false

let win


function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: `${__dirname}/assets/icon_256x256.png`,
    resizable:'isDev',
    webPreferences: {
      contextIsolation: true
    }
  })

  win.loadFile(`index.html`)
}

app.on('ready', ()=>{
    createWindow()
    const mainMenu = Menu.buildFromTemplate(menu)
    //Menu.setApplicationMenu(mainMenu)
    win.on('closed',()=> win = null)
})

  

const menu = [
    ...(isMac ? [{role:"appMenu"}]:[]),
    {
        label:"File",
        submenu:[
            {
                label:"Quit",
                click: ()=>app.quit()
            }
        ]
    },{
        label:"About"
    }
]

    //on a mac the window wont close when the user presses on the 'x'
    //button (this is a commen functionality for mac users)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//if the process is still active but no window is present then
//it will create a new window.
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})