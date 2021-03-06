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
var WebSocket = require('./modules/WebSocket');
var WebServer = require('./modules/WebServer');
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

function onConfigReady(){
  createMonitorServer(model);
  setupCompiler(model);
  createFilesManager();
  createWatcher(model);
  createLiveReload(model.getLivereloadPath());
}

function createMonitorServer(model){
  if(model.getMonitorType() === "web"){
    var websocket = new WebSocket();
    websocket.start();
    var webserver = new WebServer();
    webserver.start();
  }
}

function setupCompiler(model){
  if(model.getProgram() === "openfl"){
    compiler = new OpenFLCompiler(model);
  } else {
    compiler = new HaxeCompiler(model);
  }
}

function createArgsParser(){
  var parser = new ArgsParser(model);
  parser.parse(process.argv);
}

function createFilesManager(){
  var filesManager = new FilesManager();
  filesManager.init();
}

function createWatcher(model){
  var watcher = new Watcher(model);
  watcher.init();
}

function createLiveReload(path){
  var liveReload = new LiveReload();
  liveReload.start(path);
}

init();
