var exec = require('child_process').exec;
var EventHub = require('../notifications/EventHub');
var Console = require('./Console');
var Array2Iterator = require("../utils/Array2Iterator");
var FilesManagerNotifications = require("../notifications/FilesManagerNotifications");

var TEST_COMMAND = "haxelib run openfl test";
var BUILD_COMMAND = "haxelib run openfl build";
var NEW_LINE = "";
var configVO, compiler, platforms, platformToBuild;

function OpenFLCompiler(configuration){
  configVO = configuration;
  compiler = BUILD_COMMAND;
  platforms = new Array2Iterator(configVO.getPlatforms());

  EventHub.on(FilesManagerNotifications.LAUNCH_BUILD, launchBuild);
}

function launchBuild(){
  platforms.reset();

  Console.terminalMessage(NEW_LINE);
  Console.buildStarted();

  checkPlatformAndBuild();
}

function checkPlatformAndBuild(){
  if(!platforms.hasNext()){
    Console.buildCompleted();
    return;
  }

  platformToBuild = platforms.next();
  var cmd = getBuildCommand(platformToBuild);
  launchBuildPerPlatform(cmd);
}

function launchBuildPerPlatform(cmd){
  exec(cmd, handleBuildResults);
}

function handleBuildResults(error, stdout){
  if(error){
    Console.terminalError(error);
  } else {
    showBuildOutput(platformToBuild);
  }

  checkPlatformAndBuild();
}

function showBuildOutput(platform){
  Console.openflBuildMessage(platform);
  Console.terminalMessage(NEW_LINE);
}

function getBuildCommand(platform){
  return  compiler + " " + platform + " ";
}

module.exports = OpenFLCompiler;
