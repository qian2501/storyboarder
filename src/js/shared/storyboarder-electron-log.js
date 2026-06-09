function configureElectronLog (log) {
  if (log.transports.file) {
    log.transports.file.fileName = 'log.log'
  }

  return log
}

module.exports = configureElectronLog(require('electron-log'))
