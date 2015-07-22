var DEFAULT_COMPILER = "local";
var DEFAULT_PATH = "./";
var DEFAULT_BUILD_TYPE = "build";
var DEFAULT_PORT = 6000;
var configData;

function ConfigurationVO(){
  return{
    setData: setRawData,
    getCompilerType: getCompiler,
    getHXML: getHXMLFile,
    getParameters: getParams,
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
  return configData.build.livereload || DEFAULT_PATH;
}

function getSrcPath(){
  return configData.build.src || DEFAULT_PATH;
}

function getBuildType(){
  var type = configData.build.buildType || DEFAULT_BUILD_TYPE;
  if(configData.build.livereload)
    type = DEFAULT_BUILD_TYPE;
  return type;
}

function getCmdCommand(){
  return configData.build.cmd;
}

function getParams(){
  return configData.build.params;
}

function getHXMLFile(){
  return configData.build.hxml;
}

function getCompiler(){
  var compiler = configData.build.compiler;
  if(!compiler){
    compiler = DEFAULT_COMPILER;
  }

  return compiler.toLowerCase();
}

function getServerPort(){
  var port = configData.build.port;

  if(!port){
    port = DEFAULT_PORT;
  }

  return port;
}

function getOpenFLPlatforms(){
  return configData.build.platforms;
}

function getProgramDefined(){
  return configData.build.program;
}

function setRawData(data){
  configData = data;
}

module.exports = ConfigurationVO;
