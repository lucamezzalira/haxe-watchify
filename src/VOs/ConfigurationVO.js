var DEFAULT_PORT = 6000;
var configData;

function ConfigurationVO(){
  return{
    setData: setRawData,
    getCompilerType: getCompiler,
    getHXML: getHXMLFile,
    getParameters: getParams,
    getPort: getServerPort,
    getCmd: getCmdCommand
  }
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
  return configData.build.compiler.toLowerCase();
}

function getServerPort(){
  var port = configData.build.port;

  if(!port){
    port = DEFAULT_PORT;
  }

  return port;
}

function setRawData(data){
  configData = data;
}

module.exports = ConfigurationVO;
