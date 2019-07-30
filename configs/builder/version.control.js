import CONFIG from './config.json'
import packageJSON from '../../package.json'
import jsonFormat from 'json-format'
const fs = require('fs')
const path = require('path')
export default function () {
  const isTest = process.env.NODE_ENV !== 'production'
  console.log('is testing mode?:',isTest)
  packageJSON.version = isTest ? CONFIG.VERSION.TEST : CONFIG.VERSION.RELEASE
  packageJSON.productName = isTest ? CONFIG.PRODUCT_NAME.TEST : CONFIG.PRODUCT_NAME.RELEASE
  packageJSON.name = isTest ? CONFIG.PRODUCT_NAME.TEST.toLowerCase() : CONFIG.PRODUCT_NAME.RELEASE.toLowerCase()
  packageJSON.description = CONFIG.DESCRIPTION
  fs.writeFileSync(path.resolve(__dirname, '../../package.json'), jsonFormat(packageJSON))
}
