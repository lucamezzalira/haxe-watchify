var ConfigurationModel = require("../../src/models/ConfigurationModel");

describe("ConfigurationModel testsuite", function(){

  describe("Setup ConfigurationModel", function(){

    beforeEach(function(){
      this.model = new ConfigurationModel();
    });

    afterEach(function(){
      this.model = null;
    });

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
  });

  describe("test setData method", function(){

    beforeEach(function(){
      this.model = new ConfigurationModel();
    });

    afterEach(function(){
      this.model = null;
    });

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

    beforeEach(function(){
      this.model = new ConfigurationModel();
    });

    afterEach(function(){
      this.model = null;
    });

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

    beforeEach(function(){
      this.model = new ConfigurationModel();
    });

    afterEach(function(){
      this.model = null;
    });

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

    beforeEach(function(){
      this.model = new ConfigurationModel();
    });

    afterEach(function(){
      this.model = null;
    });

    it("should return the hxml file set in the build configuration object", function(){
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

})
