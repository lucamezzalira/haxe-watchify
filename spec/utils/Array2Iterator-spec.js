var Array2Iterator = require("../../src/utils/Array2Iterator");

describe("Array2Iterator testsuite", function(){

  describe("Setup Array2Iterator", function(){

    beforeEach(function(){
      var arr = [];
      this.array2iterator = new Array2Iterator(arr);
    });

    afterEach(function(){
      this.array2iterator = null;
    });

    it("create Array2Iterator", function(){
      expect(this.array2iterator).toBeDefined();
    });

    it("should have a reset method", function(){
      expect(this.array2iterator.reset).toEqual(jasmine.any(Function));
    });

    it("should have a next method", function(){
      expect(this.array2iterator.next).toEqual(jasmine.any(Function));
    });

    it("should have a hasNext method", function(){
      expect(this.array2iterator.hasNext).toEqual(jasmine.any(Function));
    });

    it("should trigger an error if in the constructor I don't pass any argument", function(){
      expect(Array2Iterator).toThrowError(TypeError);
    });

    it("should trigger an error if in the constructor I don't pass an array as argument", function(){
      var createA2IwithString = function(){
        return new Array2Iterator("abc");
      };

      expect(createA2IwithString).toThrowError(TypeError);
    });
  });

  describe("test on hasNext method", function(){
    it("should return a false value when it is arrived to the end of the iterator", function(){
      var a2i = new Array2Iterator([]);
      expect(a2i.hasNext()).toBeFalsy();
    });

    it("should return a true value when there are other values to iterate", function(){
      var a2i = new Array2Iterator(["a", "b", "c"]);
      expect(a2i.hasNext()).toBeTruthy();
    });
  });

  describe("test on nextElement method", function(){
    it("should return the next array value", function(){
      var arr = [1, 2, 3, 4, 5];
      var a2i = new Array2Iterator(arr);

      expect(a2i.next()).toEqual(1);
      expect(a2i.next()).toEqual(2);
      expect(a2i.next()).toEqual(3);

    });

    it("should return the null when it finishes to iterate all values", function(){
      var arr = [1];
      var a2i = new Array2Iterator(arr);

      expect(a2i.next()).toEqual(1);
      expect(a2i.next()).toBeNull();

    });
  });

  describe("test on reset method", function(){
    it("should restart the itrator from the beginning", function(){
      var arr = [1, 2, 3, 4, 5];
      var a2i = new Array2Iterator(arr);

      expect(a2i.next()).toEqual(1);
      expect(a2i.next()).toEqual(2);
      expect(a2i.next()).toEqual(3);

      a2i.reset();

      expect(a2i.next()).toEqual(1);
    });
  });
});
