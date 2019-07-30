import { Platform, build } from 'electron-builder'
import CONFIG from './config.json'
import versionControl from './version.control.js'
const platform = Platform.MAC

const isTest = true
const config = () => {
  versionControl()
  return {
    targets: platform.createTarget(),
    config: {
      appId: isTest?CONFIG.APP_ID.TEST:CONFIG.APP_ID.RELEASE,
      productName: isTest? CONFIG.PRODUCT_NAME.TEST :CONFIG.PRODUCT_NAME.RELEASE,
      publish: {
        provider: 'generic',
        url: isTest? CONFIG.UPDATE_URL.TEST : CONFIG.UPDATE_URL.RELEASE,
        useMultipleRangeRequest: false,
        channel: 'latest'
      },
      mac:{
        target: 'dmg',
        icon: 'build/resource/icons/icon.icns'
      }
    }
  }
}
build(config())
      .then(() => console.log('build success'))
      .catch(error => console.log(error))
