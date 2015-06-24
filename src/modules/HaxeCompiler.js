var exec = require('child_process').exec;
var Console = require('./Console');

var LOCAL_COMPILER = "haxe";
var SERVER_COMPILER = "haxe --connect";
var START_SERVER = "haxe --wait";
var configVO, compiler;

function HaxeCompiler(configuration){
  configVO = configuration;

  setCompiler();

  return{
    build: launchBuild
  }
}

function setCompiler(){
  compiler = LOCAL_COMPILER;
  if(configVO.getCompilerType() === "server"){
    exec(getStartServerCommand(), onServerStart);

    compiler = SERVER_COMPILER;
  }
}

function onServerStart(error){
    if(error){
      Console.errorServerStart();
      Console.terminalError(error);

      process.exit(1);
    }

    Console.serverStarted();
}

function launchBuild(callback){
  var cmdToExec = getBuildCommand();

  if(configVO.getCmd()){
    cmdToExec = configVO.getCmd();
  }

  if(cmdToExec.indexOf("undefined") >= 0){
    Console.missingParametersError();
    process.exit(1);
  }

  exec(cmdToExec, callback);
}

function getBuildCommand(){
  var cmd = compiler +" "+ getBuildParams();

  if(configVO.getCompilerType() === "server"){
    cmd = getBuildServerCommand() +" "+ getBuildParams();
  }

  return cmd;
}

function getBuildParams(){
  var buildParams = getBuildLocalCommand();

  if(buildParams.indexOf("undefined") >= 0) {
    var configParams = configVO.getParameters();
    if(configParams){
      buildParams = getBuildParamsCommand(configParams);
    }

  }

  return buildParams;
}

function getBuildParamsCommand(args){
  var params = "";

  Object.keys(args).forEach(function(key) {
    params += "-" + key + " " + args[key] + " ";
  });

  return params;
}

function getBuildLocalCommand(){
  return configVO.getHXML() + " ";
}

function getStartServerCommand(){
  return START_SERVER + " " + configVO.getPort();
}

function getBuildServerCommand(){
  return SERVER_COMPILER + " " + configVO.getPort();
}

module.exports = HaxeCompiler;
