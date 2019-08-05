import {
  ipcMain,
  Notification
} from 'electron'
import { autoUpdater } from 'electron-updater'
export default () => {
  ipcMain.on(`request_CHECK_UPDATE`, async (e, args) => {
    autoUpdater.checkForUpdatesAndNotify()
  })
  ipcMain.on(`request_SEND_MESSATGE`, async (e, args) => {
    new Notification({
      title: 'My Title',
      body: '这是渲染进程调用主进程的通知 '
    }).show()
  })
}
