// export default function () {
//   const isTest = process.env.NODE_ENV !== 'production'
//   console.log('is testing mode?:',isTest)
//   const currentConfig = builderConfigJSON[process.env.PACKAGE_VER || 'default']

//   packageJSON.version = isTest ? currentConfig.VERSION.TEST : currentConfig.VERSION.RELEASE
//   packageJSON.productName = isTest ? currentConfig.PRODUCT_NAME.TEST : currentConfig.PRODUCT_NAME.RELEASE
//   packageJSON.name = isTest ? currentConfig.PRODUCT_NAME.TEST.toLowerCase() : currentConfig.PRODUCT_NAME.RELEASE.toLowerCase()
//   packageJSON.description = currentConfig.DESCRIPTION
//   fs.writeFileSync(path.resolve(__dirname, './package.json'), jsonFormat(packageJSON))
// }