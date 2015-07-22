var exec = require('child_process').exec;
var path = require('path');
var Console = require('./Console');

var DEFAULT_URL = "http://localhost:35722";
var LIVERELOAD_COMMAND = "livereloadx.js -s -p 35722 ";
var livereloadPath, livereloadx;

function LiveReload(){
  livereloadPath = path.normalize(process.mainModule.filename + "/../../node_modules/livereloadx/bin/");

  return{
    start: start,
    close: close
  }
}

function close(){
  livereloadx.kill("SIGINT");
}

function start(src){
  var normalizePath = path.normalize(src);
  livereloadx = exec(getLivereloadCommand(normalizePath), handleServerResult);
}

function handleServerResult(error, stdout, stderr){
  if(error){

    close();
    Console.livereloadError(error);
    return;
  }

  Console.livereloadStarted(DEFAULT_URL);
}

function getLivereloadCommand(src){
  return livereloadPath + LIVERELOAD_COMMAND + src;
}

module.exports = LiveReload;
