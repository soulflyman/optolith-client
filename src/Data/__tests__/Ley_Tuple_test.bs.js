// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.bs.js");
var Ley_Tuple$OptolithClient = require("../Ley_Tuple.bs.js");

Jest.describe("pair", (function (param) {
        return Jest.test("returns a pair of its arguments", (function (param) {
                      return Jest.Expect.toEqual([
                                  2,
                                  3
                                ], Jest.Expect.expect(Ley_Tuple$OptolithClient.pair(2, 3)));
                    }));
      }));

Jest.describe("Bifunctor", (function (param) {
        Jest.describe("bimap", (function (param) {
                return Jest.test("maps over both values of the pair", (function (param) {
                              return Jest.Expect.toEqual([
                                          5,
                                          4
                                        ], Jest.Expect.expect(Ley_Tuple$OptolithClient.Bifunctor.bimap((function (a) {
                                                    return a + 2 | 0;
                                                  }), (function (b) {
                                                    return b + 3 | 0;
                                                  }), [
                                                  3,
                                                  1
                                                ])));
                            }));
              }));
        Jest.describe("first", (function (param) {
                return Jest.test("maps over the first value of the pair", (function (param) {
                              return Jest.Expect.toEqual([
                                          5,
                                          1
                                        ], Jest.Expect.expect(Ley_Tuple$OptolithClient.Bifunctor.first((function (a) {
                                                    return a + 2 | 0;
                                                  }), [
                                                  3,
                                                  1
                                                ])));
                            }));
              }));
        return Jest.describe("second", (function (param) {
                      return Jest.test("maps over the second value of the pair", (function (param) {
                                    return Jest.Expect.toEqual([
                                                3,
                                                4
                                              ], Jest.Expect.expect(Ley_Tuple$OptolithClient.Bifunctor.second((function (b) {
                                                          return b + 3 | 0;
                                                        }), [
                                                        3,
                                                        1
                                                      ])));
                                  }));
                    }));
      }));

Jest.describe("fst", (function (param) {
        return Jest.test("returns the first element of the pair", (function (param) {
                      return Jest.Expect.toBe(3, Jest.Expect.expect(Ley_Tuple$OptolithClient.fst([
                                          3,
                                          1
                                        ])));
                    }));
      }));

Jest.describe("snd", (function (param) {
        return Jest.test("returns the second element of the pair", (function (param) {
                      return Jest.Expect.toBe(1, Jest.Expect.expect(Ley_Tuple$OptolithClient.snd([
                                          3,
                                          1
                                        ])));
                    }));
      }));

Jest.describe("swap", (function (param) {
        return Jest.test("swaps the elements of the pair", (function (param) {
                      return Jest.Expect.toEqual([
                                  1,
                                  3
                                ], Jest.Expect.expect(Ley_Tuple$OptolithClient.swap([
                                          3,
                                          1
                                        ])));
                    }));
      }));

/*  Not a pure module */
