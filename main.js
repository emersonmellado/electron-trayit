'use strict';
const electron = require('electron');
var menubar = require('menubar');

const ipcMain = require('electron').ipcMain;

var mb = menubar({dir:__dirname, tooltip: "Tray IT", icon:__dirname + "/resource/icon-tray.png", width:278, height:250, resizable: false, alwaysOnTop :true});

const contextMenu = electron.Menu.buildFromTemplate([
  {
    label: 'About',
    click() {
      electron.dialog.showMessageBox({title: "Tray IT", type:"info", message: "Manage you menubar/tray. \nMIT Copyright (c) 2017 Emerson Mellado <emersonmellado@gmail.com>", buttons: ["Close"] });
    }
  },
  {
    label: 'Website',
    click() {
      electron.shell.openExternal("https://github.com/emersonmellado/trayit");
    }
  },
  {
    type: 'separator'
  },
  {
    label: 'Quit',
    click() {
      mb.app.quit();
    }
  }

]);

ipcMain.on('closeApp', (event, close) => {
  mb.app.quit();
});

mb.on('ready', function ready () {
  global.sharedObj = {
    hide: mb.hideWindow,
    quit: mb.app.quit,
    pinned: false
  }

  console.log('App is ready to serve in the menubar.');

  if (process.platform == 'win32') {
    mb.tray.setContextMenu(contextMenu);
  }
});

mb.on('after-create-window', function(){
  //mb.window.openDevTools()
})
