var exec = require('child_process').exec;
var path = require('path');

var LIVERELOAD_COMMAND = "livereloadx.js -s -p 35729 ";
var livereloadPath;

function LiveReload(){
  //start server: livereloadx -s -p 35729 ./resources
  //check on path
  //close server
  //handle errors?

  livereloadPath = path.normalize(process.mainModule.filename + "/../../node_modules/livereloadx/bin/");

  return{
    start: start,
    close: close
  }
}

function close(){}

function start(path){
  console.log("1", path);
  console.log("2", getLivereloadCommand(path));
  exec(getLivereloadCommand(path), function(error, stdout, stderr){

    if(error){
      console.log("error on start livereload server " + error);
      return;
    }

    console.log(stdout);
  });
}

function getLivereloadCommand(path){
  return livereloadPath + LIVERELOAD_COMMAND + path;
}

module.exports = LiveReload;
