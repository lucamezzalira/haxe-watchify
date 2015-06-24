#!/usr/bin/env node

//http://cruft.io/posts/node-command-line-utilities/ -> how to create command line tool

var Watcher = require('./modules/Watcher');
var FilesManager = require('./modules/FilesManager');
var EventHub = require('./notifications/EventHub');
var ConfigurationNotifications = require('./notifications/ConfigurationNotifications');
var ConfigurationLoader = require('./modules/ConfigurationLoader');
var ArgsParser = require('./modules/ArgsParser');

function init(){
  loadConfig();
}

function loadConfig(){
  EventHub.on(ConfigurationNotifications.COMPLETE, onConfigReady);
  EventHub.on(ConfigurationNotifications.DATA_UNAVAILABLE, onArgsUnavailable);

  createArgsParser();
}

function onArgsUnavailable(){
  var config = new ConfigurationLoader();
  config.load();
}

function onConfigReady(configuration){
  createFilesManager(configuration);
  createWatcher();
}

function createArgsParser(){
  var parser = new ArgsParser();
  parser.parse(process.argv);
}

function createFilesManager(configuration){
  var filesManager = new FilesManager(configuration);
  filesManager.init();
}

function createWatcher(configuration){
  var watcher = new Watcher(configuration);
  watcher.init();
}

init();
