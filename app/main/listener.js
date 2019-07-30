import {
  ipcMain
} from 'electron'
import { autoUpdater } from 'electron-updater'
export default () => {
  ipcMain.on(`request_CHECK_UPDATE`, async (e, args) => {
    autoUpdater.checkForUpdatesAndNotify()
  })
}
