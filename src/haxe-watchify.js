#!/usr/bin/env node

//http://cruft.io/posts/node-command-line-utilities/ -> how to create command line tool

var Watcher = require('./modules/Watcher');
var FilesManager = require('./modules/FilesManager');
var EventHub = require('./notifications/EventHub');
var ConfigurationNotifications = require('./notifications/ConfigurationNotifications');
var FilesManagerNotifications = require('./notifications/FilesManagerNotifications');
var ConfigurationLoader = require('./modules/ConfigurationLoader');
var ArgsParser = require('./modules/ArgsParser');
var HaxeCompiler = require('./modules/HaxeCompiler');
var OpenFLCompiler = require('./modules/OpenFLCompiler');

var compiler;

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
  setupCompiler(configuration);
  createFilesManager();
  createWatcher(configuration.getProgram());
}

function setupCompiler(configuration){
  if(configuration.getProgram() === "haxe"){
    compiler = new HaxeCompiler(configuration);
  } else {
    compiler = new OpenFLCompiler(configuration);
  }
}

function createArgsParser(){
  var parser = new ArgsParser();
  parser.parse(process.argv);
}

function createFilesManager(configuration){
  var filesManager = new FilesManager();
  filesManager.init();
}

function createWatcher(program){
  var watcher = new Watcher(program);
  watcher.init();
}

init();
