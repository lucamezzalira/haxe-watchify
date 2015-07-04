var EventHub = require('../notifications/EventHub');
var ConsoleMessages = require('../messages/ConsoleMessages');
var WatcherNotifications = require('../notifications/WatcherNotifications');
var FilesManagerNotifications = require('../notifications/FilesManagerNotifications');
var Console = require('./Console');

var program;

function FilesManager(){

  return{
    init: initialise
  }
}

function initialise(){
  addFilesNotificationListeners();
}

function addFilesNotificationListeners(){
  EventHub.on(WatcherNotifications.READY, onReady);
  EventHub.on(WatcherNotifications.ERROR, onError);
  EventHub.on(WatcherNotifications.FILE_CHANGED, onFileChange);
  EventHub.on(WatcherNotifications.FILE_ADDED, onFileAdd);
  EventHub.on(WatcherNotifications.FILE_REMOVED, onFileRemove);
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
  EventHub.emit(FilesManagerNotifications.LAUNCH_BUILD);
}

module.exports = FilesManager;
