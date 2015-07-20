var chokidar = require('chokidar');
var path = require('path');
var EventHub = require('../notifications/EventHub');
var WatcherNotifications = require('../notifications/WatcherNotifications');

var FILES_EXTENSIONS = '/**/*.(hx|hxml|nmml)';
var EXCLUDE_FILES = '!Export/**/*.(hx|hxml|nmml)';
var DEFAULT_INTERVAL = 500;

var watcher, isOpenFL;

function Watcher(program){
  isOpenFL = (program === "openfl") ? true : false;

  return{
    init: initialise
  }
}

function initialise(src){
  var srcFolder = validatePath(src) + FILES_EXTENSIONS;
  var rulesPaths = [srcFolder, EXCLUDE_FILES];

  watcher = chokidar.watch(rulesPaths, {
    ignored: /[\/\\]\./,
    persistent: true,
    interval: DEFAULT_INTERVAL,
    followSymlinks: false,
    ignoreInitial: true
  });

  if(isOpenFL){
    addProjectXML();
  }

  addWatcherListeners();
}

function validatePath(pathToCheck){
  return path.normalize(pathToCheck);
}

function addProjectXML(){
  watcher.add("./project.xml");
}

function addWatcherListeners(){
  watcher
    .on('error', onError)
    .on('ready', onReady)
    .on('add', onAddFile)
    .on('change', onChangeFile)
    .on('unlink', onUnlinkFile);
}

function onReady(){
  EventHub.emit(WatcherNotifications.READY);
}

function onAddFile(path){
  watcher.add(path);
  EventHub.emit(WatcherNotifications.FILE_ADDED, path);
}

function onChangeFile(path){
  EventHub.emit(WatcherNotifications.FILE_CHANGED, path);
}

function onUnlinkFile(path){
  watcher.unwatch(path);
  EventHub.emit(WatcherNotifications.FILE_REMOVED, path);
}

function onError(error){
  watcher.close();
  EventHub.emit(WatcherNotifications.ERROR, error);
}

module.exports = Watcher;
