const path = require('path');

const { config } = require("@rails/webpacker")
const rootJSPath = config.source_path;

module.exports = {
  resolve: {
    alias: {
      'Staff': path.resolve(rootJSPath, 'staff/'),
      'Client': path.resolve(rootJSPath, 'client/'),
      'Shared': path.resolve(rootJSPath, 'shared/'),
    }
  }
}
