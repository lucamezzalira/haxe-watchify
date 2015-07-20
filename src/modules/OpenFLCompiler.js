var exec = require('child_process').exec;
var EventHub = require('../notifications/EventHub');
var Console = require('./Console');
var Array2Iterator = require("../utils/Array2Iterator");
var FilesManagerNotifications = require("../notifications/FilesManagerNotifications");

var BASE_BUILD_COMMAND = "haxelib run openfl";
var NEW_LINE = "";
var TIMER_ID = "build-time";
var configVO, compiler, platforms, platformToBuild, buildProcess;

function OpenFLCompiler(configuration){
  configVO = configuration;
  compiler = BASE_BUILD_COMMAND + " " + configVO.getBuildType();
  platforms = new Array2Iterator(configVO.getPlatforms());

  EventHub.on(FilesManagerNotifications.LAUNCH_BUILD, launchBuild);
}

function launchBuild(){
  platforms.reset();
  Console.startTimer(TIMER_ID);
  Console.terminalMessage(NEW_LINE);
  Console.buildStarted();

  checkPlatformAndBuild();
}

function checkPlatformAndBuild(){
  if(!platforms.hasNext()){
    Console.buildCompleted();
    Console.stopTimer(TIMER_ID);
    return;
  }

  platformToBuild = platforms.next();
  var cmd = getBuildCommand(platformToBuild);
  launchBuildPerPlatform(cmd);
}

function launchBuildPerPlatform(cmd){
  //html5 nn viene killato il processo

  if(buildProcess){
    buildProcess.kill("SIGINT");
  }

  buildProcess = exec(cmd, handleBuildResults);
  buildProcess.on("close", function(){
    buildProcess = null;
    checkPlatformAndBuild();
  })
}

function handleBuildResults(error, stdout){
  if(error){
    Console.terminalError(error);
  } else {
    showBuildOutput(platformToBuild);
  }
}

function showBuildOutput(platform){
  Console.openflBuildMessage(platform);
  Console.terminalMessage(NEW_LINE);
}

function getBuildCommand(platform){
  console.log(compiler, platform);
  return  compiler + " " + platform;
}

module.exports = OpenFLCompiler;
