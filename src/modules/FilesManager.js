var EventHub = require('../notifications/EventHub');
var ConsoleMessages = require('../messages/ConsoleMessages');
var WatcherNotification = require('../notifications/WatcherNotification');
var HaxeCompiler = require('./HaxeCompiler');
var Console = require('./Console');

var NEW_LINE = "";
var haxe;

function FilesManager(configuration){
  haxe = new HaxeCompiler(configuration);

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
  console.log("building ->", path);
  haxe.build(handleBuildResults);
}

function handleBuildResults(error, stdout, stderr){
console.log("->", stdout, error);
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
