var exec = require('child_process').exec;
var EventHub = require('../notifications/EventHub');
var Console = require('./Console');
var Array2Iterator = require("../utils/Array2Iterator");
var FilesManagerNotifications = require("../notifications/FilesManagerNotifications");
var cmdOpts = require('../utils/DefaultCMDOptions');

var BASE_BUILD_COMMAND = "haxelib run openfl";
var NEW_LINE = "";
var TIMER_ID = "build-time";
var configVO, compiler, platforms, platformToBuild, buildProcess;
var isWorking, isChangingDuringCompile;

function OpenFLCompiler(configuration){
  configVO = configuration;
  compiler = BASE_BUILD_COMMAND + " " + configVO.getBuildType();
  platforms = new Array2Iterator(configVO.getPlatforms());

  EventHub.on(FilesManagerNotifications.LAUNCH_BUILD, launchBuild);
}

function launchBuild(){
  if(!isWorking){
    platforms.reset();
    Console.startTimer(TIMER_ID);
    Console.terminalMessage(NEW_LINE);
    Console.buildStarted();

    checkPlatformAndBuild();
  } else {
    isChangingDuringCompile = true;
  }
}

function checkIfOtherFilesChanged(){
  if(isChangingDuringCompile){
    isChangingDuringCompile = false;
    launchBuild();
  }
}

function checkPlatformAndBuild(){
  if(!platforms.hasNext()){
    isWorking = false;
    Console.buildCompleted();
    Console.stopTimer(TIMER_ID);

    checkIfOtherFilesChanged();
    return;
  }

  isWorking = true;
  platformToBuild = platforms.next();
  var cmd = getBuildCommand(platformToBuild);
  launchBuildPerPlatform(cmd);
}

function launchBuildPerPlatform(cmd){
  if(buildProcess){
    buildProcess.kill("SIGTERM");
  }

  buildProcess = exec(cmd, cmdOpts, handleBuildResults);
  buildProcess.on("close", buildProcessEnds);
}

function buildProcessEnds(){
    buildProcess = null;
    checkPlatformAndBuild();
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
  return  compiler + " " + platform;
}

module.exports = OpenFLCompiler;
