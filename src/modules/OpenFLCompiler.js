var exec = require('child_process').exec;
var Console = require('./Console');

var TEST_COMMAND = "openfl test";
var BUILD_COMMAND = "openfl build";
var configVO, compiler, platforms;

function OpenFLCompiler(configuration){
  configVO = configuration;
  compiler = BUILD_COMMAND;
  platforms = useAsIterator(configVO.getPlatforms());

  return{
    build: launchBuild
  }
}

function launchBuild(callback){
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

//TODO: EXTRACT ME PLEASE!!!!
function useAsIterator(array){
    var nextIndex = 0;

    return {
       next: function(){
          return nextIndex < array.length ? array[nextIndex++] : null;
       }

       reset: function(){
         nextIndex = 0;
       }
    }
}

module.exports = OpenFLCompiler;
