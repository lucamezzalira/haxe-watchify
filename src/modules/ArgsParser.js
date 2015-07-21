var commander = require('commander');
var ConfigurationNotifications = require('../notifications/ConfigurationNotifications');
var packageJSON = require('../../package.json');
var ConfigurationVO = require('../VOs/ConfigurationVO');
var EventHub = require('../notifications/EventHub');
var ConsoleMessages = require('../messages/ConsoleMessages');

function ArgsParser(){
  return{
    parse: parse
  };
}

function parse(args){
  var argsToParse = args;
  if(!argsToParse){
    argsToParse = "";
  }

  commander
  .version(packageJSON.version)
  .option('--program <value>', ConsoleMessages.PROGRAM_HELP_DESCR, /^(haxe|openfl)$/i, 'haxe')
  .option('--hxml <value>', ConsoleMessages.HXML_HELP_DESCR)
  .option('--compiler <value>', ConsoleMessages.COMPILER_HELP_DESCR, /^(server|local)$/i, 'local')
  .option('--port <value>', ConsoleMessages.PORT_HELP_DESCR)
  .option('--buildType <value>', ConsoleMessages.BUILD_TYPE_HELP_DESCR, /^(build|test)$/i, 'build')
  .option('--src <value>', ConsoleMessages.SOURCE_FOLDER_HELP_DESCR)
  .option('--livereload <value>', ConsoleMessages.LIVERELOAD_HELP_DESCR)
  .option('--platforms <values>', ConsoleMessages.PLATFORMS_HELP_DESCR, splitPlatforms)
  .parse(argsToParse);

  if(!isHaxeBuildDefined() && !isOpenFLBuildDefined()){
    EventHub.emit(ConfigurationNotifications.DATA_UNAVAILABLE, "fromArgsParser");
  } else {
    EventHub.emit(ConfigurationNotifications.COMPLETE, buildConfigVO());
  }
}

function splitPlatforms(val) {
  return val.toString().split(',');
}

function buildConfigVO(){
  var data = {
    "build":{
      "program" :commander.program,
      "hxml" : commander.hxml,
      "compiler" : commander.compiler,
      "port" : commander.port,
      "platforms": commander.platforms,
      "buildType": commander.buildType,
      "src": commander.src,
      "livereload" : commander.livereload,
      "params" : {}
    }
  };

  var configVO = new ConfigurationVO();
  configVO.setData(data);

  return configVO;
}

function isHaxeBuildDefined(){
  return commander.program === "haxe" && commander.hxml !== undefined;
}

function isOpenFLBuildDefined(){
  return commander.program === "openfl" && commander.platforms !== undefined;
}

module.exports = ArgsParser;
