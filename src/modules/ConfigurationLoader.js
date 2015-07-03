var fs = require('fs');
var EventHub = require('../notifications/EventHub');
var ConsoleMessages = require('../messages/ConsoleMessages');
var ConfigurationNotifications = require('../notifications/ConfigurationNotifications');
var ConfigurationVO = require('../VOs/ConfigurationVO');
var Console = require('./Console');

var CONFIGURATION_FILENAME = "hx-watch.json";
var file;

function ConfigurationLoader(){
  file = process.cwd() + '/' + CONFIGURATION_FILENAME;

  return{
    load: loadConfigurationFile
  }
}

function loadConfigurationFile(){
  if(!fs.existsSync(file)){
    EventHub.emit(ConfigurationNotifications.DATA_UNAVAILABLE, "fromConfigLoader");
    return;
  }

  fs.readFile(file, 'utf8', handleLoadResults);
}

function handleLoadResults(error, data){
    var jsonData;

    if (error) {
      Console.configurationError(error);
      process.exit(1);
    }

    try{
      jsonData = JSON.parse(data);
    } catch(parsingJSONError){
      Console.configurationError(parsingJSONError);
      process.exit(1);
    }

    var configVO = new ConfigurationVO();
    configVO.setData(jsonData);

    EventHub.emit(ConfigurationNotifications.COMPLETE, configVO);
}

module.exports = ConfigurationLoader;
