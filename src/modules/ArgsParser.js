var commander = require('commander');
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
  commander
  .version(packageJSON.version)
  .option('--program <value>', ConsoleMessages.PROGRAM_HELP_DESCR, /^(haxe|openfl)$/i, 'haxe')
  .option('--hxml <value>', ConsoleMessages.HXML_HELP_DESCR)
  .option('--compiler <value>', ConsoleMessages.COMPILER_HELP_DESCR, /^(server|local)$/i, 'local')
  .option('--port <value>', ConsoleMessages.PORT_HELP_DESCR)
  .option('--platforms <values>', ConsoleMessages.PLATFORMS_HELP_DESCR, splitPlatforms)
  .parse(arguments);

  console.log(commander.platforms);
  console.log(commander.program);

  if(!commander.hxml){
    EventHub.emit(ConfigurationNotifications.DATA_UNAVAILABLE);
  } else {
    EventHub.emit(ConfigurationNotifications.COMPLETE, buildConfigVO());
  }
}

function splitPlatforms(val) {
  return val.split(',');
}

function buildConfigVO(){
  var data = {
    "build":{
      "program" :commander.program,
      "hxml" : commander.hxml,
      "compiler" : commander.compiler,
      "port" : commander.port,
      "platforms": commander.platforms,
      "params" : {}
    }
  };

  var configVO = new ConfigurationVO();
  configVO.setData(data);

  return configVO;
}


module.exports = ArgsParser;
