var DEFAULT_COMPILER = "local";
var DEFAULT_PATH = "./";
var DEFAULT_BUILD_TYPE = "build";
var DEFAULT_PORT = 6000;
var DEFAULT_PROGRAM = "haxe";
var HXML_EXT = "hxml";
var configData;

function ConfigurationModel(){

  configData = {};

  return{
    setData: setRawData,
    getCompilerType: getCompiler,
    getHXML: getHXMLFile,
    getParameters: getParameters,
    getPort: getServerPort,
    getCmd: getCmdCommand,
    getProgram: getProgramDefined,
    getPlatforms: getOpenFLPlatforms,
    getBuildType: getBuildType,
    getLivereloadPath: getLivereloadPath,
    
    getSrcPath: getSrcPath
  }
}

function getLivereloadPath(){
  return configData.livereload;
}

function getSrcPath(){
  return configData.src || DEFAULT_PATH;
}

function getBuildType(){
  var type = configData.buildType || DEFAULT_BUILD_TYPE;
  if(configData.livereload)
    type = DEFAULT_BUILD_TYPE;
  return type;
}

function getCmdCommand(){
  return configData.cmd;
}

function getParameters(){
  return configData.params;
}

function getHXMLFile(){
  if(configData.hxml.split(".")[1] !== HXML_EXT){
    throw new Error("the hxml file should be set with .hxml extension");
  }

  return configData.hxml;
}

function getCompiler(){
  return configData.compiler || DEFAULT_COMPILER;
}

function getServerPort(){
  return configData.port || DEFAULT_PORT;
}

function getOpenFLPlatforms(){
  return configData.platforms || [];
}

function getProgramDefined(){
  return configData.program || DEFAULT_PROGRAM;
}

function setRawData(data){
  if(toString.call(data).toLowerCase().indexOf("object object") < 0){
    throw new Error("configuration should be an object instead of ", toString.call(data));
  }

  if(!data.build || toString.call(data.build).toLowerCase().indexOf("object object") < 0){
    throw new Error("configuration object should contain build as Object to configurate haxe-watchify properly");
  }

  configData = data.build;
}

module.exports = ConfigurationModel;
