const {app,BrowserWindow} = require('electron');

app.whenReady().then(() => {
    const win = new BrowserWindow({
        webPreferences:{
            devTools: false
        }
    });
    win.loadURL('https://dbms-project-admin-portal.herokuapp.com/');
    win.removeMenu();
})