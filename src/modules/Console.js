var chalk = require("chalk");
var ConsoleMessages = require('../messages/ConsoleMessages');

var log;

function Console(){
  log = console.log.bind(console);

  return {
    terminalMessage: genericTerminalMessage,
    haxeBuildMessage: terminalGreenMessage,
    buildStarted: buildStartedMessage,
    buildCompleted: buildCompletedMessage,
    projectReady : haxeProjectReady,
    projectError : haxeProjectError,
    fileAdded : fileAddedToProject,
    fileRemoved : fileRemovedFromProject,
    fileChanged : fileChangedInProject,
    terminalError: execProgramError,
    errorServerStart: errorStartHaxeServer,
    serverStarted: serverHaxeStarted,
    configurationError: errorOnLoadingConfigurationFile,
    missingParametersError: missingParamsError,
    openflBuildMessage : openflBuildMessage,
    missingParamsAndConfigFile: missingParamsAndConfigFile,
    livereloadStarted: livereloadStarted,
    livereloadError: livereloadError,
    startTimer: startTimer,
    stopTimer: stopTimer
  }
}

function startTimer(id){
  console.time(id);
}

function stopTimer(id){
  console.timeEnd(id);
  genericTerminalMessage(new Date().toGMTString());
  genericTerminalMessage("");
}

function livereloadStarted(url){
  log(chalk.underline(ConsoleMessages.LIVERELOAD_READY + " " + url));
}

function livereloadError(error){
  log(chalk.bgRed(ConsoleMessages.LIVERELOAD_ERROR + " " + error));
}

function missingParamsAndConfigFile(){
  log(chalk.bgRed(ConsoleMessages.ERROR_LAUNCHING_TOOL));
}

function openflBuildMessage(platform){
  log(chalk.green(platform + " " + ConsoleMessages.BUILD_OPENFL_FINISHED));
}

function errorOnLoadingConfigurationFile(error){
  log(chalk.bgRed(ConsoleMessages.ERROR_LOADING_CONFIG_FILE + error));
}

function execProgramError(error){
  log(chalk.red(error));
}

function errorStartHaxeServer(){
  log(chalk.red(ConsoleMessages.ERROR_START_SERVER));
}

function serverHaxeStarted(){
  log(chalk.bgGreen(ConsoleMessages.SERVER_READY));
}

function haxeProjectReady(){
  log(chalk.bgGreen(ConsoleMessages.PROJECT_READY));
}

function haxeProjectError(){
  log(chalk.bgRed(ConsoleMessages.WATCHER_ERROR));
}

function fileAddedToProject(path){
  log(chalk.underline(ConsoleMessages.FILE_ADDED), path);
}

function fileRemovedFromProject(path){
  log(chalk.underline(ConsoleMessages.FILE_REMOVED), path);
}

function fileChangedInProject(path){
  log(chalk.underline(ConsoleMessages.FILE_CHANGED), path);
}

function genericTerminalMessage(message){
  log(message);
}

function missingParamsError(){
  log(chalk.bgRed(ConsoleMessages.MISSING_PARAMS));
}

function buildStartedMessage(){
  log(chalk.underline(ConsoleMessages.BUILD_STARTED));
}

function buildCompletedMessage(){
  log(chalk.underline(ConsoleMessages.BUILD_FINISHED));
}

function terminalGreenMessage(message){
  log(chalk.green(message));
}

module.exports = new Console();