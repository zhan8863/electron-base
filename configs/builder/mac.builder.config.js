import { Platform, build } from 'electron-builder'
import CONFIG from './config.json'
const platform = Platform.MAC

const isTest = true
const config = () => {
  return {
    targets: platform.createTarget(),
    config: {
      appId: isTest?CONFIG.APP_ID.TEST:CONFIG.APP_ID.RELEASE,
      productName: isTest? CONFIG.PRODUCT_NAME.TEST :CONFIG.PRODUCT_NAME.RELEASE,
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
