var chokidar = require('chokidar');
var EventHub = require('../notifications/EventHub');
var WatcherNotification = require('../notifications/WatcherNotification');

var HAXE_FILES_GLOBAL_PATH = ['./**/*.(hx|hxml|nmml)', '!Export/**/*.(hx|hxml|nmml)'];
var DEFAULT_INTERVAL = 500;

var watcher, isOpenFL;

function Watcher(program){

  isOpenFL = (program === "openfl") ? true : false;

  return{
    init: initialise
  }
}

function initialise(){
  watcher = chokidar.watch(HAXE_FILES_GLOBAL_PATH, {
    ignored: /[\/\\]\./,
    persistent: true,
    interval: DEFAULT_INTERVAL,
  });

  if(isOpenFL){
    addProjectXML();
  }

  addWatcherListeners();
}

function addProjectXML(){
  watcher.add("./project.xml");
}

function addWatcherListeners(){
  watcher
    .on('error', onError)
    .on('ready', onReady);
}

function onReady(){
  watcher
    .on('add', onAddFile)
    .on('change', onChangeFile)
    .on('unlink', onUnlinkFile);

  EventHub.emit(WatcherNotification.READY);
}

function onAddFile(path){
  watcher.add(path);
  EventHub.emit(WatcherNotification.FILE_ADDED, path);
}

function onChangeFile(path){
  EventHub.emit(WatcherNotification.FILE_CHANGED, path);
}

function onUnlinkFile(path){
  watcher.unwatch(path);
  EventHub.emit(WatcherNotification.FILE_REMOVED, path);
}

function onError(error){
  watcher.close();
  EventHub.emit(WatcherNotification.ERROR, error);
}

module.exports = Watcher;
