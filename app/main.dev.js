/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import initListener from './main/listener'
import log from 'electron-log';
import MenuBuilder from './menu';

let mainWindow = null;
export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.on('checking-for-update', ()=> {
      mainWindow && mainWindow.webContents.send('checking-for-update')
    })
    autoUpdater.on('update-available', (ev, info)=> {
      mainWindow && mainWindow.webContents.send('update-available')
    })
    autoUpdater.on('update-not-available', (ev, info)=> {
      mainWindow && mainWindow.webContents.send('update-not-available')
    })
    autoUpdater.on('error', (ev, err) => {
      mainWindow && mainWindow.webContents.send('update-error')
    })
    autoUpdater.on('download-progress', (progressObj)=> {
      mainWindow && mainWindow.webContents.send('download-progress', progressObj)
    })
    autoUpdater.on('update-downloaded', ()=> {
      mainWindow && mainWindow.webContents.send('update-downloaded')
      setTimeout(() => {
        autoUpdater.quitAndInstall()
      },         1000)

    })
    autoUpdater.checkForUpdatesAndNotify();
  }
}

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async ()=>{
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};
function setAppUserModelId() {
  var updateDotExe = path.join(path.dirname(process.execPath), '..', 'update.exe');

  var packageDir = path.dirname(path.resolve(updateDotExe));
  var packageName = path.basename(packageDir);
  var exeName = path.basename(process.execPath).replace(/\.exe$/i, '');

  global.appUserModelId = `com.squirrel.${exeName}`;
  app.setAppUserModelId(global.appUserModelId);
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', ()=> {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async ()=> {
  app.setAppUserModelId('com.mi.demo.test')
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1366,
    height: 768,
    backgroundColor: '#FFFFFF'
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    try {
      BrowserWindow.getFocusedWindow().webContents.toggleDevTools()
    } catch (e) {
      console.log(e)
    }
  })
  initListener()
  mainWindow.on('closed', ()=> {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
});
