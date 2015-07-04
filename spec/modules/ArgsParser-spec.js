var ArgsParser = require("../../src/modules/ArgsParser");
var EventHub = require("../../src/notifications/EventHub");
var ConfigurationNotifications = require('../../src/notifications/ConfigurationNotifications');

describe("ArgsParser testsuite", function(){

  beforeEach(function(){
    this.argsParser = new ArgsParser();
  });

  describe("Setup ArgsParser", function(){

    it("create ArgsParser", function(){
      expect(this.argsParser).toBeDefined();
    });

    it("should have a parse method", function(){
      expect(this.argsParser.parse).toEqual(jasmine.any(Function));
    });
  });

  describe("input arguments tests", function(){

    beforeEach(function(){
      spyOn(this.argsParser, 'parse');
    });

    it("parse method should have been called", function(){
      this.argsParser.parse("--hxml a.hxml");
      expect(this.argsParser.parse).toHaveBeenCalled();
    });

    it("parse method should have been called with '--hxml a.hxml'", function(){
      this.argsParser.parse("--hxml a.hxml");
      expect(this.argsParser.parse).toHaveBeenCalledWith("--hxml a.hxml");
    });

    it("parse method should dispatch a ConfigurationNotifications.DATA_UNAVAILABLE notification when --haxe flag is not passed as argument", function(done){

      this.argsParser.parse();

      pending('TODO: check if the object emit DATA_UNAVAILABLE');
    });

  });
});
