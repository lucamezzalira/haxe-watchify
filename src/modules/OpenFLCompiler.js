var exec = require('child_process').exec;
var Console = require('./Console');
var Array2Iterator = require("../utils/Array2Iterator");

var TEST_COMMAND = "openfl test";
var BUILD_COMMAND = "openfl build";
var configVO, compiler, platforms;

function OpenFLCompiler(configuration){
  configVO = configuration;
  compiler = BUILD_COMMAND;
  platforms = new Array2Iterator(configVO.getPlatforms());

  return{
    build: launchBuild
  }
}

function launchBuild(callback){
  platforms.reset();
  checkPlatformAndBuild();
}

function checkPlatformAndBuild(){
  var platformToBuild = platforms.next();

  if(platformToBuild){
    launchBuildPerPlatform(platformToBuild);
  }
}

function launchBuildPerPlatform(platform){
    exec(cmdToExec, function(error, stdout, stderr){
      if(error){
        console.log("error");
        return;
      }

        checkPlatformAndBuild();
    });
}

function getBuildCommand(id){
  return  compiler + " " + platforms[id] + " ";
}

module.exports = OpenFLCompiler;
