var EventHub = require('../notifications/EventHub');
var ConsoleMessages = require('../messages/ConsoleMessages');
var WatcherNotification = require('../notifications/WatcherNotification');
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
  EventHub.emit(FilesManagerNotifications.LAUNCH_BUILD);
}

module.exports = FilesManager;
