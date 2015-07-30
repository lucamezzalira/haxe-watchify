var fs = require('fs');
var EventHub = require('../notifications/EventHub');
var ConsoleMessages = require('../messages/ConsoleMessages');
var ConfigurationNotifications = require('../notifications/ConfigurationNotifications');
var ConfigurationModel = require('../models/ConfigurationModel');
var Console = require('./Console');

var CONFIGURATION_FILENAME = "hx-watch.json";
var file, model;

function ConfigurationLoader(configurationModel){
  mainModel = configurationModel;
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

    mainModel.setData(jsonData);
}

module.exports = ConfigurationLoader;
