var program = require('commander');
var ConfigurationNotifications = require('../notifications/ConfigurationNotifications');
var packageJSON = require('../../package.json');
var ConfigurationVO = require('../VOs/ConfigurationVO');
var EventHub = require('../notifications/EventHub');
var ConsoleMessages = require('../messages/ConsoleMessages');

function ArgsParser(){
  return{
    parse: init
  }
}

function init(arguments){
  program
  .version(packageJSON.version)
  .option('--hxml <value>', ConsoleMessages.HXML_HELP_DESCR)
  .option('--compiler <value>', ConsoleMessages.COMPILER_HELP_DESCR, /^(server|local)$/i, 'local')
  .option('--port <value>', ConsoleMessages.PORT_HELP_DESCR)
  .parse(arguments);

  if(!program.hxml){
    EventHub.emit(ConfigurationNotifications.DATA_UNAVAILABLE);
  } else {
    EventHub.emit(ConfigurationNotifications.COMPLETE, buildConfigVO());
  }
}

function buildConfigVO(){
  var data = {
    "build":{
      "program" : "haxe",
      "hxml" : program.hxml,
      "compiler" : program.compiler,
      "port" : program.port,
      "params" : {}
    }
  };

  var configVO = new ConfigurationVO();
  configVO.setData(data);

  return configVO;
}


module.exports = ArgsParser;
