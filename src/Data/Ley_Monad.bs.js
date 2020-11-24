// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";

function MakeInfix(Arg) {
  var $great$great$eq = function (x, f) {
    return Curry._2(Arg.bind, f, x);
  };
  var $eq$less$less = function (x, f) {
    return Curry._2(Arg.bind, x, f);
  };
  var $great$great = function (x, y) {
    return Curry._2(Arg.bind, (function (param) {
                  return y;
                }), x);
  };
  var $less$less = function (y, x) {
    return Curry._2(Arg.bind, (function (param) {
                  return y;
                }), x);
  };
  var $great$eq$great = function (f, g, x) {
    var x$1 = Curry._1(f, x);
    return Curry._2(Arg.bind, g, x$1);
  };
  var $less$eq$less = function (g, f, x) {
    var x$1 = Curry._1(f, x);
    return Curry._2(Arg.bind, g, x$1);
  };
  return {
          $great$great$eq: $great$great$eq,
          $eq$less$less: $eq$less$less,
          $great$great: $great$great,
          $less$less: $less$less,
          $great$eq$great: $great$eq$great,
          $less$eq$less: $less$eq$less
        };
}

function Make(Arg) {
  var join = function (x) {
    return Curry._2(Arg.bind, (function (y) {
                  return y;
                }), x);
  };
  var liftM2 = function (f, a, b) {
    return Curry._2(Arg.bind, (function (a$prime) {
                  return Curry._2(Arg.fmap, (function (b$prime) {
                                return Curry._2(f, a$prime, b$prime);
                              }), b);
                }), a);
  };
  var liftM3 = function (f, a, b, c) {
    return Curry._2(Arg.bind, (function (a$prime) {
                  return Curry._2(Arg.bind, (function (b$prime) {
                                return Curry._2(Arg.fmap, (function (c$prime) {
                                              return Curry._3(f, a$prime, b$prime, c$prime);
                                            }), c);
                              }), b);
                }), a);
  };
  var liftM4 = function (f, a, b, c, d) {
    return Curry._2(Arg.bind, (function (a$prime) {
                  return Curry._2(Arg.bind, (function (b$prime) {
                                return Curry._2(Arg.bind, (function (c$prime) {
                                              return Curry._2(Arg.fmap, (function (d$prime) {
                                                            return Curry._4(f, a$prime, b$prime, c$prime, d$prime);
                                                          }), d);
                                            }), c);
                              }), b);
                }), a);
  };
  var liftM5 = function (f, a, b, c, d, e) {
    return Curry._2(Arg.bind, (function (a$prime) {
                  return Curry._2(Arg.bind, (function (b$prime) {
                                return Curry._2(Arg.bind, (function (c$prime) {
                                              return Curry._2(Arg.bind, (function (d$prime) {
                                                            return Curry._2(Arg.fmap, (function (e$prime) {
                                                                          return Curry._5(f, a$prime, b$prime, c$prime, d$prime, e$prime);
                                                                        }), e);
                                                          }), d);
                                            }), c);
                              }), b);
                }), a);
  };
  return {
          $$return: Arg.pure,
          join: join,
          liftM2: liftM2,
          liftM3: liftM3,
          liftM4: liftM4,
          liftM5: liftM5
        };
}

export {
  MakeInfix ,
  Make ,
  
}
/* No side effect */
