var chokidar = require('chokidar');
var path = require('path');
var EventHub = require('../notifications/EventHub');
var WatcherNotifications = require('../notifications/WatcherNotifications');

var FILES_EXTENSIONS = '/**/*.(hx|hxml|nmml|jpg|jpeg|gif|png|xml|json|yml|css|html|php|ogg|wav|mp3|mp4|m4a|ttf|otf|txt)';
var EXCLUDE_FILES = '/**/*.*';
var DEFAULT_EXCLUDED_FOLDERS = "!(output|dist|bin|export|Export)";
var DEFAULT_INTERVAL = 500;

var watcher, isOpenFL, src, foldersToExclude;

function Watcher(config){
  isOpenFL = (config.getProgram() === "openfl") ? true : false;
  src = config.getSrcPath();
  foldersToExclude = (config.getLivereloadPath()) ? "!(" + config.getLivereloadPath() + ")" : DEFAULT_EXCLUDED_FOLDERS;
  return{
    init: initialise
  }
}

function initialise(){
  var srcFolder = path.normalize(src + FILES_EXTENSIONS);
  var rulesPaths = [srcFolder, (foldersToExclude + EXCLUDE_FILES)];
//TODO: to test
  watcher = chokidar.watch(rulesPaths, {
    ignored: /[\/\\]\./,
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
