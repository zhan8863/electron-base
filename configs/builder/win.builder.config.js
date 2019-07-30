import { Platform, build, Arch } from 'electron-builder'
import CONFIG from './config.json'
import VersionControl from './version.control.js'
const platform = Platform.WINDOWS

const isTest = true
const config = () => {
  VersionControl()
  return {
    targets: platform.createTarget(null, Arch.ia32),
    config: {
      appId: isTest?CONFIG.APP_ID.TEST:CONFIG.APP_ID.RELEASE,
      productName: isTest? CONFIG.PRODUCT_NAME.TEST :CONFIG.PRODUCT_NAME.RELEASE,
      copyright: `Copyright © year ${CONFIG.AUTHOR.name}`,
      publish: {
        provider: 'generic',
        url: isTest? CONFIG.UPDATE_URL.TEST : CONFIG.UPDATE_URL.RELEASE,
        useMultipleRangeRequest: false
      },
      asar: true,
      nsisWeb:{
        oneClick: true,
        perMachine: true,
        allowElevation: true,
        differentialPackage: true,
        allowToChangeInstallationDirectory: false,
        artifactName: '${productName}-Setup-${version}.${ext}',
        installerHeaderIcon: CONFIG.ICON,
        // include: isTest? 'build/installer_test.nsh' : 'build/installer.nsh'
      },
      win:{
        target: 'nsis-web',
        signingHashAlgorithms: [ 'sha256' ],
        icon: CONFIG.ICON,
        publisherName: 'xiaomiFE',
        requestedExecutionLevel: "requireAdministrator",
      },
    }
  }
}
build(config())
      .then(() => console.log('build success'))
      .catch(error => console.log(error))
