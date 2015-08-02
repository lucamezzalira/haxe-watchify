var chokidar = require('chokidar');
var path = require('path');
var EventHub = require('../notifications/EventHub');
var WatcherNotifications = require('../notifications/WatcherNotifications');

var FILES_EXTENSIONS = '/**/*.(hx|hxml|nmml|jpg|jpeg|gif|png|xml|json|yml|css|html|php|ogg|wav|mp3|mp4|m4a|ttf|otf|txt)';
var DEFAULT_INTERVAL = 500;
var DEFAULT_EXCLUDED_FOLDERS = "output|dist|bin|export|Export|.idea";

var watcher, src, exludedFoldersRegEx;

function Watcher(config){
  src = config.getSrcPath();
  var folders = (config.getLivereloadPath()) ? "|" + config.getLivereloadPath() : "";
  exludedFoldersRegEx = new RegExp("^("+ DEFAULT_EXCLUDED_FOLDERS + folders + ")$");

  return{
    init: initialise
  }
}

function initialise(){
  var srcFolder = path.normalize(src + FILES_EXTENSIONS);
  var rulesPaths = [srcFolder];

  watcher = chokidar.watch(rulesPaths, {
    ignored: exludedFoldersRegEx,
    persistent: true,
    interval: DEFAULT_INTERVAL,
    followSymlinks: false,
    useFsEvents: false,
    ignoreInitial: true
  });

  addWatcherListeners();
}

function addWatcherListeners(){
  watcher
    .on('add', onAddFile)
    .on('change', onChangeFile)
    .on('unlink', onUnlinkFile)
    .on('error', onError)
    .on('ready', onReady);
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
