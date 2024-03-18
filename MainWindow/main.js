const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');

let mainWindow;
let hasConfirmedClose = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
    visibleOnAllWorkspaces: true,
  });

  mainWindow.loadFile('./HTML/index.html');
  mainWindow.maximize();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('close', (event) => {
    if (!hasConfirmedClose) {
      event.preventDefault();
      confirmClose();
    }
  });
}

async function confirmClose() {
  const choice = await dialog.showMessageBox(mainWindow, {
    type: 'question',
    buttons: ['Yes', 'No'],
    title: 'Confirm',
    message: 'Are you sure you want to quit?'
  });

  if (choice.response === 0) {
    hasConfirmedClose = true;
    app.quit();
  } else {
    if (mainWindow) {
      mainWindow.show();
    }
  }
}


app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', (event) => {
  if (!hasConfirmedClose) {
    event.preventDefault();
    confirmClose();
  }
});

const express = require('express');
const eapp = express();
const port = 3000;

  eapp.get('/startServer', (req, res) => {
        console.log('Express server started.');
        res.send('Express server started.');
      });
      
      eapp.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
      });
      