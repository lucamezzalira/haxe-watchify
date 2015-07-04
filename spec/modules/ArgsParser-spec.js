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
    var argsToParse;

    beforeEach(function(){
      spyOn(this.argsParser, 'parse');

      argsToParse = [ 'node',
                      './haxe-watchify.js',
                      '--program',
                      'haxe',
                      '--hxml',
                      'a.haxml' ];

      this.argsParser.parse(argsToParse);
    });

    it("parse method should have been called", function(){
      expect(this.argsParser.parse).toHaveBeenCalled();
    });

    it("parse method should have been called with '--program haxe --hxml a.hxml'", function(){
      expect(this.argsParser.parse).toHaveBeenCalledWith(argsToParse);
    });

    describe("ConfigurationNotifications.DATA_UNAVAILABLE emitted test", function(){

      beforeEach(function(){
          spyOn(EventHub, "emit");
          var ap = new ArgsParser();
          ap.parse();
      });

      it("parse method should dispatch a ConfigurationNotifications.DATA_UNAVAILABLE and fromArgsParser when there isn't any arguments passed", function(){
        expect(EventHub.emit).toHaveBeenCalledWith(ConfigurationNotifications.DATA_UNAVAILABLE, "fromArgsParser");
      });
    });

    describe("ConfigurationNotifications.DATA_UNAVAILABLE emitted test", function(){

      beforeEach(function(){
          spyOn(EventHub, "emit");

          var toParse = [ 'node',
                          './haxe-watchify.js',
                          '--program',
                          'haxe' ];

          var ap = new ArgsParser();
          ap.parse(toParse);
      });

      it("parse method should dispatch a ConfigurationNotifications.DATA_UNAVAILABLE and fromArgsParser hxml arg is not set", function(){
        expect(EventHub.emit).toHaveBeenCalledWith(ConfigurationNotifications.DATA_UNAVAILABLE, "fromArgsParser");
      });
    });

    describe("ConfigurationNotifications.DATA_UNAVAILABLE emitted test", function(){

      beforeEach(function(){
          spyOn(EventHub, "emit");

          var toParse = [ 'node',
                          './haxe-watchify.js',
                          '--program',
                          'openfl' ];

          var ap = new ArgsParser();
          ap.parse(toParse);
      });

      it("parse method should dispatch a ConfigurationNotifications.DATA_UNAVAILABLE and fromArgsParser platforms arg is not set", function(){
        expect(EventHub.emit).toHaveBeenCalledWith(ConfigurationNotifications.DATA_UNAVAILABLE, "fromArgsParser");
      });
    });

    describe("ConfigurationNotifications.DATA_UNAVAILABLE emitted test", function(){

      beforeEach(function(){
          spyOn(EventHub, "emit");

          var toParse = [ 'node',
                          './haxe-watchify.js',
                          '--program',
                          'openfel',
                          'platforms',
                          'html5,flash,tizen'];

          var ap = new ArgsParser();
          ap.parse(toParse);
      });

      it("parse method should dispatch a ConfigurationNotifications.DATA_UNAVAILABLE and fromArgsParser program arg is set with wrong parameter", function(){
        expect(EventHub.emit).toHaveBeenCalledWith(ConfigurationNotifications.DATA_UNAVAILABLE, "fromArgsParser");
      });
    });

    describe("ConfigurationNotifications.DATA_UNAVAILABLE emitted test", function(){

      beforeEach(function(){
          spyOn(EventHub, "emit");

          var toParse = [ 'node',
                          './haxe-watchify.js',
                          '--program',
                          'openfel',
                          'platforms',
                          'html5',
                          'tizen'];

          var ap = new ArgsParser();
          ap.parse(toParse);
      });

      it("parse method should dispatch a ConfigurationNotifications.DATA_UNAVAILABLE and fromArgsParser platforms arg is set with multiple strings instead of a coma separeted value", function(){
        expect(EventHub.emit).toHaveBeenCalledWith(ConfigurationNotifications.DATA_UNAVAILABLE, "fromArgsParser");
      });
    });

    describe("ConfigurationNotifications.COMPLETE emitted test", function(){

      beforeEach(function(){
          spyOn(EventHub, "emit");
          var ap = new ArgsParser();
          ap.parse(argsToParse);
      });

      it("parse method should dispatch a ConfigurationNotifications.COMPLETE when it's specified the program and the builder on Haxe project", function(){
        expect(EventHub.emit).toHaveBeenCalledWith(ConfigurationNotifications.COMPLETE, jasmine.any(Object));
      });
    });

  });
});
