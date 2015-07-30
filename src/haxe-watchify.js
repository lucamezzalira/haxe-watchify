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
var Console = require('./modules/Console');
var LiveReload = require('./modules/LiveReload');
var ConfigurationModel = require('./models/ConfigurationModel');

var compiler, model;

function init(){
  model = new ConfigurationModel();

  loadConfig();
}

function loadConfig(){
  EventHub.on(ConfigurationNotifications.COMPLETE, onConfigReady);
  EventHub.on(ConfigurationNotifications.DATA_UNAVAILABLE, onDataUnavailable);

  createArgsParser();
}

function onDataUnavailable(fromModule){

  if(fromModule === "fromConfigLoader"){
    Console.missingParamsAndConfigFile();
    process.exit(1);
  }
  var config = new ConfigurationLoader(model);
  config.load();
}

function onConfigReady(configuration){
  setupCompiler(configuration);
  createFilesManager();
  createWatcher(configuration);
  createLiveReload(configuration.getLivereloadPath());
}

function setupCompiler(configuration){
  if(configuration.getProgram() === "openfl"){
    compiler = new OpenFLCompiler(configuration);
  } else {
    compiler = new HaxeCompiler(configuration);
  }
}

function createArgsParser(){
  var parser = new ArgsParser(model);
  parser.parse(process.argv);
}

function createFilesManager(configuration){
  var filesManager = new FilesManager();
  filesManager.init();
}

function createWatcher(config){
  var watcher = new Watcher(config);
  watcher.init();
}

function createLiveReload(path){
  var liveReload = new LiveReload();
  liveReload.start(path);
}

init();
