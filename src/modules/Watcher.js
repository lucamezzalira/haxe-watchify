var chokidar = require('chokidar');
var EventHub = require('../notifications/EventHub');
var WatcherNotifications = require('../notifications/WatcherNotifications');

var HAXE_FILES_GLOBAL_PATH = ['/**/*.(hx|hxml|nmml)', '!Export/**/*.(hx|hxml|nmml)'];
var DEFAULT_INTERVAL = 500;

var watcher, isOpenFL;

function Watcher(program){
  isOpenFL = (program === "openfl") ? true : false;

  return{
    init: initialise
  }
}

function initialise(src){
  var pathToWatch = validatePath(src) + HAXE_FILES_GLOBAL_PATH;

  watcher = chokidar.watch(pathToWatch, {
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

function validatePath(path){
  var validPath = (path.charAt(path.length-1) === "/") ? path.substr(0, path.length-1) : path;
  if(!path){
    validPath = ".";
  }
  return validPath;
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
