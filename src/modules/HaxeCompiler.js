var exec = require('child_process').exec;
var EventHub = require('../notifications/EventHub');
var Console = require('./Console');
var FilesManagerNotifications = require("../notifications/FilesManagerNotifications");

var LOCAL_COMPILER = "haxe";
var SERVER_COMPILER = "haxe --connect";
var START_SERVER = "haxe --wait";
var NEW_LINE = "";
var TIMER_ID = "build-time";
var configVO, compiler;

function HaxeCompiler(configuration){
  configVO = configuration;
  setCompiler();

  EventHub.on(FilesManagerNotifications.LAUNCH_BUILD, launchBuild);
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

function launchBuild(){
  Console.startTimer(TIMER_ID);
  var cmdToExec = getBuildCommand();

  if(configVO.getCmd()){
    cmdToExec = configVO.getCmd();
  }

  if(cmdToExec.indexOf("undefined") >= 0){
    Console.missingParametersError();
    process.exit(1);
  }

  exec(cmdToExec, handleBuildResults);
}

function handleBuildResults(error, stdout, stderr){
  if(error){
    Console.terminalError(error.toString().split("[").pop().split("]").shift() + " - " + stderr);
    Console.stopTimer(TIMER_ID);
    return;
  }

  showBuildOutput(stdout);
  Console.stopTimer(TIMER_ID);
}

function showBuildOutput(message){
  Console.terminalMessage(NEW_LINE);
  Console.buildStarted();
  Console.haxeBuildMessage(message);
  Console.terminalMessage(NEW_LINE);
  Console.buildCompleted();
  Console.terminalMessage(NEW_LINE);
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
