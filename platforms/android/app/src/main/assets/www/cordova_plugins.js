cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "phonegap-plugin-push.PushNotification",
    "file": "plugins/phonegap-plugin-push/www/push.js",
    "pluginId": "phonegap-plugin-push",
    "clobbers": [
      "PushNotification"
    ]
  },
  {
    "id": "pushbots-cordova-plugin.PushbotsPlugin",
    "file": "plugins/pushbots-cordova-plugin/www/pushbots.js",
    "pluginId": "pushbots-cordova-plugin",
    "clobbers": [
      "PushbotsPlugin"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "phonegap-plugin-push": "1.8.4",
  "pushbots-cordova-plugin": "1.6.0"
};
// BOTTOM OF METADATA
});