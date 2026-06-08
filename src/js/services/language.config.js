const path = require('path')
const { app } = process && process.type == 'renderer'
  ? require('@electron/remote')
  : require('electron')

const SettingsService = require('../utils/SettingsService')

const userDataPath = app.getPath('userData')
const settings = new SettingsService(
  path.join(userDataPath, 'locales', 'language-settings.json')
)

module.exports = { 
    settings
}