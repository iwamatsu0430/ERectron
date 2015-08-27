var app           = require('app');
var menu          = require('menu');
var BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  menu.setApplicationMenu(menu.buildFromTemplate([
    {
      label: "ERectron",
      submenu: [
        {label: "Quit", accelerator: "Command+Q", click: function() {app.quit(); }}
      ]
    },
    {
      label: "File",
      submenu: [
        {label: "Open", accelerator: "Command+O", click: function() { console.log("Open"); }},
        {label: "Save", accelerator: "Command+S", click: function() { console.log("Save"); }},
        {label: "Save as", accelerator: "Command+Shift+S", click: function() { console.log("Save as"); }},
        {label: "Close", accelerator: "Command+W", click: function() { console.log("Close"); }},
      ]
    },
    {
      label: "View",
      submenu: [
        {label: 'Reload', accelerator: 'Command+R', click: function() { mainWindow.restart(); }},
        {label: 'Toggle Full Screen', accelerator: 'Ctrl+Command+F', click: function() { mainWindow.setFullScreen(!mainWindow.isFullScreen()); }},
        {label: 'Toggle Developer Tools', accelerator: 'Alt+Command+I', click: function() { mainWindow.toggleDevTools(); }}
      ]
    }
  ]));

  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
