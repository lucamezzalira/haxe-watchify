var chalk = require("chalk");
var ConsoleMessages = require('../messages/ConsoleMessages');

var log;

function Console(){
  log = console.log.bind(console);

  return {
    terminalMessage: genericTerminalMessage,
    haxeBuildMessage: terminalGreenMessage,
    buildSucced: buildSuccedMessage,
    projectReady : haxeProjectReady,
    projectError : haxeProjectError,
    fileAdded : fileAddedToProject,
    fileRemoved : fileRemovedFromProject,
    fileChanged : fileChangedInProject,
    terminalError: execCommandError,
    errorServerStart: errorStartHaxeServer,
    serverStarted: serverHaxeStarted,
    configurationError: errorOnLoadingConfigurationFile,
    missingParametersError: missingParamsError
  }
}

function errorOnLoadingConfigurationFile(error){
  log(chalk.bgRed(ConsoleMessages.ERROR_LOADING_CONFIG_FILE + error));
}

function execCommandError(error){
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

function buildSuccedMessage(){
  log(chalk.underline(ConsoleMessages.BUILD_COMPLETED));
}

function terminalGreenMessage(message){
  log(chalk.green(message));
}

module.exports = new Console();
