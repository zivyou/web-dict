// Modules to control application life and create native browser window
const { app, BrowserWindow, BrowserView, globalShortcut } = require('electron');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let baidu;
let bing;
let google;
let youdao;

function windowInit() {
  if (mainWindow) return;
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function baiduInit() {
  if (baidu) {
    mainWindow.setBrowserView(baidu);
    return;
  };
  baidu = new BrowserView({
  });
  mainWindow.setBrowserView(baidu);
  baidu.setAutoResize({
    width: true,
    height: true,
    horizontal: true,
    vertical: true,
  });
  baidu.setBounds({
    x: 0,
    y: 0,
    width: 800,
    height: 600,
  });
  baidu.webContents.loadURL('https://fanyi.baidu.com/');
  baidu.on('closed', () => { baidu = null; });
}

function googleInit() {
  if (google) {
    mainWindow.setBrowserView(google);
    return;
  }
  google = new BrowserView({});
  mainWindow.setBrowserView(google);
  google.setAutoResize({
    width: true,
    height: true,
    horizontal: true,
    vertical: true,
  });
  google.setBounds({
    x: 0,
    y: 0,
    width: 800,
    height: 600,
  });
  google.webContents.loadURL('https://translate.google.com/?sl=en&tl=zh-CN');
  google.on('closed', () => { google = null; });
}

function bingInit() {
  if (bing) {
    mainWindow.setBrowserView(bing);
    return;
  }
  bing = new BrowserView({
  });
  mainWindow.setBrowserView(bing);
  bing.setAutoResize({
    width: true,
    height: true,
    horizontal: true,
    vertical: true,
  });
  bing.setBounds({
    x: 0,
    y: 0,
    width: 800,
    height: 600,
  });
  bing.webContents.loadURL('http://cn.bing.com/dict');
  bing.on('closed', () => { bing = null; });
}

function youdaoInit() {
  if (youdao) {
    mainWindow.setBrowserView(youdao);
    return;
  }
  youdao = new BrowserView({
  });
  mainWindow.setBrowserView(youdao);
  youdao.setAutoResize({
    width: true,
    height: true,
    horizontal: true,
    vertical: true,
  });
  youdao.setBounds({
    x: 0,
    y: 0,
    width: 800,
    height: 600,
  });
  youdao.webContents.loadURL('http://www.youdao.com/');
  youdao.on('closed', () => { youdao = null; });
}

function init() {
  windowInit();
  googleInit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', init);

const pageInits = [googleInit, bingInit, youdaoInit];
let page = 0;
app.whenReady().then(() => {
  globalShortcut.register('Right', () => {
    page++; if (page > 2) page = 2;
    if (typeof pageInits[page] === 'function') {
      pageInits[page]();
    }
    console.log(`page: ${page}`);
  });
  globalShortcut.register('Left', () => {
    page--; if (page < 0) page = 0;
    if (typeof pageInits[page] === 'function') {
      pageInits[page]();
    }
    console.log(`page: ${page}`);
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // if (mainWindow === null) createWindow()
  init();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
