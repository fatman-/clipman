"use strict"

const electron = require("electron")
// Module to control application life
const app = electron.app
// Module to create native browser window
const BrowserWindow = electron.BrowserWindow
// Module which provides APIs to interact with the system clipboard
const clipboard = electron.clipboard

// Keep a global ref. of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected
let mainWindow

function createMainWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // Load the main html file of the app
  mainWindow.loadURL("file://" + __dirname + "/build/views/clips.html")

  // Open DevTools
  mainWindow.webContents.openDevTools()

  // Emitted when the "mainWindow" is closed...
  mainWindow.on("closed", function() {
    // Dereference the window object
    mainWindow = null
  })
}

// Emitted when electron has finished initialization
app.on("ready", createMainWindow)

// Emitted when all windows are closed
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", function() {
  // On OS X it is common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createMainWindow()
  }
})
