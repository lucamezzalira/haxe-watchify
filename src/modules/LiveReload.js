var exec = require('child_process').exec;
var path = require('path');
var Console = require('./Console');
var cmdOpts = require('../utils/DefaultCMDOptions');

var DEFAULT_URL = "http://localhost:35729";
var LIVERELOAD_COMMAND = "livereloadx.js -s -p 35729 ";
var livereloadPath, livereloadx;

function LiveReload(){
  livereloadPath = path.normalize(process.mainModule.filename + "/../../node_modules/livereloadx/bin/");

  return{
    start: start,
    close: close
  }
}

function close(){
  livereloadx.kill("SIGTERM");
}

function start(src){
  if(src){
    var normalizePath = path.normalize(src);
    Console.livereloadStarted(DEFAULT_URL);
    livereloadx = exec(getLivereloadCommand(normalizePath), cmdOpts, handleServerResult);
  }
}

function handleServerResult(error, stdout, stderr){
  if(error){
    close();
    Console.livereloadError(error);
    return;
  }
}

function getLivereloadCommand(src){
  return "node " + livereloadPath + LIVERELOAD_COMMAND + src;
}

module.exports = LiveReload;
