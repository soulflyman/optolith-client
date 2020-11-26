// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.bs.js");
var Ley_Function$OptolithClient = require("../Ley_Function.bs.js");

Jest.describe("id", (function (param) {
        return Jest.test("returns its argument", (function (param) {
                      return Jest.Expect.toBe(1023, Jest.Expect.expect(Ley_Function$OptolithClient.id(1023)));
                    }));
      }));

Jest.describe("const", (function (param) {
        return Jest.test("returns its first argument", (function (param) {
                      return Jest.Expect.toBe(956, Jest.Expect.expect(Ley_Function$OptolithClient.$$const(956, "test")));
                    }));
      }));

Jest.describe("flip", (function (param) {
        return Jest.test("flips the first two arguments of the function", (function (param) {
                      return Jest.Expect.toBe("test", Jest.Expect.expect(Ley_Function$OptolithClient.flip(Ley_Function$OptolithClient.$$const, 956, "test")));
                    }));
      }));

Jest.describe("on", (function (param) {
        return Jest.test("applies its functions to its values", (function (param) {
                      return Jest.Expect.toBe(3, Jest.Expect.expect(Ley_Function$OptolithClient.on((function (prim, prim$1) {
                                            return prim + prim$1 | 0;
                                          }), (function (x) {
                                            if (x !== undefined) {
                                              return x;
                                            } else {
                                              return 0;
                                            }
                                          }), 3, undefined)));
                    }));
      }));

/*  Not a pure module */
