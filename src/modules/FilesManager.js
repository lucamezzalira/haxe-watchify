var EventHub = require('../notifications/EventHub');
var ConsoleMessages = require('../messages/ConsoleMessages');
var WatcherNotification = require('../notifications/WatcherNotification');
var HaxeCompiler = require('./HaxeCompiler');
var OpenFLCompiler = require('./OpenFLCompiler');
var Console = require('./Console');

var NEW_LINE = "";
var program;

function FilesManager(configuration){

  if(configuration.getProgram() === "haxe"){
    program = new HaxeCompiler(configuration);
  } else {
    program = new OpenFLCompiler(configuration);
  }

  return{
    init: initialise
  }
}

function initialise(){
  addFilesNotificationListeners();
}

function addFilesNotificationListeners(){
  EventHub.on(WatcherNotification.READY, onReady);
  EventHub.on(WatcherNotification.ERROR, onError);
  EventHub.on(WatcherNotification.FILE_CHANGED, onFileChange);
  EventHub.on(WatcherNotification.FILE_ADDED, onFileAdd);
  EventHub.on(WatcherNotification.FILE_REMOVED, onFileRemove);
}

function onReady(){
  Console.projectReady();
}

function onError(){
  Console.projectError();
}

function onFileAdd(path){
  Console.fileAdded(path);
}

function onFileRemove(path){
  Console.fileRemoved(path);
}

function onFileChange(path){
  Console.fileChanged(path);
  program.build(handleBuildResults);
}

function handleBuildResults(error, stdout, stderr){
  if(error){
    Console.terminalError(error.toString().split("[").pop().split("]").shift() + " - " + stderr);
    return;
  }

  launchBuild(stdout);
}

function launchBuild(message){
  Console.terminalMessage(NEW_LINE);
  Console.buildStarted();
  Console.haxeBuildMessage(message);
  Console.terminalMessage(NEW_LINE);
  Console.buildCompleted();
}

module.exports = FilesManager;
