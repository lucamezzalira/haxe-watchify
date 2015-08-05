var ConfigurationModel = require("../../src/models/ConfigurationModel");

describe("ConfigurationModel testsuite", function(){

  beforeEach(function(){
    this.model = new ConfigurationModel();
  });

  afterEach(function(){
    this.model = null;
  });

  describe("Setup ConfigurationModel", function(){

    it("create ConfigurationModel", function(){
      expect(this.model).toBeDefined();
    });

    it("should have a setData method", function(){
      expect(this.model.setData).toEqual(jasmine.any(Function));
    });

    it("should have a getCompilerType method", function(){
      expect(this.model.getCompilerType).toEqual(jasmine.any(Function));
    });

    it("should have a getHXML method", function(){
      expect(this.model.getHXML).toEqual(jasmine.any(Function));
    });

    it("should have a getParameters method", function(){
      expect(this.model.getParameters).toEqual(jasmine.any(Function));
    });

    it("should have a getPort method", function(){
      expect(this.model.getPort).toEqual(jasmine.any(Function));
    });

    it("should have a getCmd method", function(){
      expect(this.model.getCmd).toEqual(jasmine.any(Function));
    });

    it("should have a getProgram method", function(){
      expect(this.model.getProgram).toEqual(jasmine.any(Function));
    });

    it("should have a getPlatforms method", function(){
      expect(this.model.getPlatforms).toEqual(jasmine.any(Function));
    });

    it("should have a getBuildType method", function(){
      expect(this.model.getBuildType).toEqual(jasmine.any(Function));
    });

    it("should have a getLivereloadPath method", function(){
      expect(this.model.getLivereloadPath).toEqual(jasmine.any(Function));
    });

    it("should have a getSrcPath method", function(){
      expect(this.model.getSrcPath).toEqual(jasmine.any(Function));
    });

    it("should have a getMonitorType method", function(){
      expect(this.model.getMonitorType).toEqual(jasmine.any(Function));
    });
  });

  describe("test setData method", function(){

    it("should be called with an Object as parameter", function(){
      var model = this.model;
      var callSetData = function(){
        model.setData({build:{}});
      };
      expect(callSetData).not.toThrow();
    });

    it("should trigger an error if the argument is a different from an Object", function(){
      var model = this.model;
      var callSetData = function(){
        model.setData(3);
      };
      expect(callSetData).toThrow();
    });

    it("should trigger an error if the argument is an Object but the Object doesn't contain 'build' object", function(){
      var model = this.model;
      var callSetData = function(){
        model.setData({});
      };
      expect(callSetData).toThrow();
    });

    it("should trigger an error if the argument is an Object but 'build' is not an Object", function(){
      var model = this.model;
      var callSetData = function(){
        model.setData({build: []});
      };

      expect(callSetData).toThrow();
    });
  });

  describe("test getCompilerType method", function(){

    it("should return 'server' as compiler when it is set as server", function(){
      var compilerChosen = "server";
      this.model.setData({
        build: {
          compiler: compilerChosen
        }
      });

      expect(this.model.getCompilerType()).toEqual(compilerChosen);
    });

    it("should return 'local' as default compiler ", function(){
      var defaultCompiler = "local";
      this.model.setData({
        build: {}
      });
      expect(this.model.getCompilerType()).toEqual(defaultCompiler);
    });
  });

  describe("test getHXML method", function(){

    it("should return the hxml file set in the build configuration object", function(){
      var hxmlFile = "file.hxml";
      this.model.setData({
        build: {
          hxml: hxmlFile
        }
      });

      expect(this.model.getHXML()).toEqual(hxmlFile);
    });

    it("should trigger an error if the HXML file is not set with extension .hxml", function(){
      var model = this.model;
      var hxmlFile = "file.hxm";
      this.model.setData({
        build: {
          hxml: hxmlFile
        }
      });

      expect(this.model.getHXML).toThrow();
    });
  });

  describe("test getParameters method", function(){

    it("should return the parameters Object set in the build configuration object", function(){
      var paramsObj = {
          cp: "Source",
          js: "dist/Main.js"
        };
      this.model.setData({
        build: {
          params: paramsObj
        }
      });

      expect(this.model.getParameters()).toEqual(paramsObj);
    });

    it("should return a null object if parameters are not set", function(){
      this.model.setData({
        build: {
        }
      });

      expect(this.model.getParameters()).toBe(undefined);
    });
  });

  describe("test getPort method", function(){

    it("should return the port number set in the build configuration object", function(){
      var port = 3030;
      this.model.setData({
        build: {
          port: port
        }
      });

      expect(this.model.getPort()).toEqual(port);
    });

    it("should return the default port if port is not set", function(){
      var defaultPort = 6000;
      this.model.setData({
        build: {
        }
      });

      expect(this.model.getPort()).toBe(defaultPort);
    });
  });

  describe("test getProgram method", function(){

    it("should return the program set in the build configuration object", function(){
      var program = "openfl";
      this.model.setData({
        build: {
          program: program
        }
      });

      expect(this.model.getProgram()).toEqual(program);
    });

    it("should return the default program so 'haxe' if program is not set", function(){
      var defaultProgram = 'haxe';
      this.model.setData({
        build: {
        }
      });

      expect(this.model.getProgram()).toBe(defaultProgram);
    });
  });

  describe("test getPlatforms method", function(){

    it("should return the program set in the build configuration object", function(){
      var platforms = ["html5", "flash", "tizen"];
      this.model.setData({
        build: {
          platforms: platforms
        }
      });

      expect(this.model.getPlatforms()).not.toBeUndefined();
      expect(this.model.getPlatforms().length).toEqual(3);
      expect(this.model.getPlatforms()).toEqual(jasmine.arrayContaining(platforms));
    });

    it("should return an empty array if platforms are not set", function(){
      this.model.setData({
        build: {
        }
      });

      expect(this.model.getPlatforms()).toEqual([]);
    });
  });

  describe("test getBuildType method", function(){

    it("should return the buildtype set in the build configuration object", function(){
      var buildtype = "test";
      this.model.setData({
        build: {
          buildType: buildtype
        }
      });

      expect(this.model.getBuildType()).toEqual(buildtype);
    });

    it("should return the default buildType if buildType are not set", function(){
      var defaultBuildType = "build";
      this.model.setData({
        build: {
        }
      });

      expect(this.model.getBuildType()).toEqual(defaultBuildType);
    });

    it("should return the default buildType if livereload parameter is set are not set", function(){
      var defaultBuildType = "build";
      var buildtype = "test";
      this.model.setData({
        build: {
          buildType: buildtype,
          livereload: "bin"
        }
      });

      expect(this.model.getBuildType()).toEqual(defaultBuildType);
    });
  });

  describe("test getLivereloadPath method", function(){

    it("should return the livereload path to watch if set in the build configuration object", function(){
      var path = "bin";
      this.model.setData({
        build: {
          livereload: path
        }
      });

      expect(this.model.getLivereloadPath()).not.toBeUndefined();
      expect(this.model.getLivereloadPath()).toEqual(path);
    });

    it("should return an undefined object if livereload is not set", function(){
      this.model.setData({
        build: {
        }
      });

      expect(this.model.getLivereloadPath()).toBeUndefined();
    });
  });

  describe("test getSrcPath method", function(){

    it("should return the source path if set in the build configuration object", function(){
      var src = "src";
      this.model.setData({
        build: {
          src: src
        }
      });

      expect(this.model.getSrcPath()).not.toBeUndefined();
      expect(this.model.getSrcPath()).toEqual(src);
    });

    it("should return the default source path ./ if src is not set", function(){
      var defaultPath = "./";
      this.model.setData({
        build: {
        }
      });

      expect(this.model.getSrcPath()).toEqual(defaultPath);
    });
  });

  describe("test getMonitorType method", function(){

    it("should return the monitor type if set in the build configuration object", function(){
      var type = "web";
      this.model.setData({
        build: {
          monitor: type
        }
      });

      expect(this.model.getMonitorType()).not.toBeUndefined();
      expect(this.model.getMonitorType()).toEqual(type);
    });

    it("should return an undefined object if monitor is not set", function(){
      this.model.setData({
        build: {
        }
      });

      expect(this.model.getMonitorType()).toBeUndefined();
    });
  });
})
