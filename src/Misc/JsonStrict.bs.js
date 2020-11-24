// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Caml_obj from "bs-platform/lib/es6/caml_obj.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Json_decode from "@glennsl/bs-json/src/Json_decode.bs.js";
import * as Caml_js_exceptions from "bs-platform/lib/es6/caml_js_exceptions.js";

function maybe(decode, json) {
  if (json === undefined || json === null) {
    return ;
  } else {
    return Caml_option.some(Curry._1(decode, json));
  }
}

function optionalField(key, decode, json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    var value = Js_dict.get(json, key);
    if (value === undefined) {
      return ;
    }
    try {
      return Caml_option.some(Curry._1(decode, Caml_option.valFromOption(value)));
    }
    catch (raw_msg){
      var msg = Caml_js_exceptions.internalToOCamlException(raw_msg);
      if (msg.RE_EXN_ID === Json_decode.DecodeError) {
        throw {
              RE_EXN_ID: Json_decode.DecodeError,
              _1: msg._1 + ("\n\tat field '" + (key + "'")),
              Error: new Error()
            };
      }
      throw msg;
    }
  } else {
    throw {
          RE_EXN_ID: Json_decode.DecodeError,
          _1: "Expected object, got " + JSON.stringify(json),
          Error: new Error()
        };
  }
}

function $$const(x, json) {
  if (Caml_obj.caml_equal(json, x)) {
    return x;
  }
  throw {
        RE_EXN_ID: Json_decode.DecodeError,
        _1: "Expected \"" + (JSON.stringify(json) + ("\", but received: " + JSON.stringify(json))),
        Error: new Error()
      };
}

var DecodeError = Json_decode.DecodeError;

var id = Json_decode.id;

var bool = Json_decode.bool;

var $$float = Json_decode.$$float;

var $$int = Json_decode.$$int;

var string = Json_decode.string;

var $$char = Json_decode.$$char;

var date = Json_decode.date;

var nullable = Json_decode.nullable;

var nullAs = Json_decode.nullAs;

var array = Json_decode.array;

var list = Json_decode.list;

var pair = Json_decode.pair;

var tuple2 = Json_decode.tuple2;

var tuple3 = Json_decode.tuple3;

var tuple4 = Json_decode.tuple4;

var dict = Json_decode.dict;

var field = Json_decode.field;

var at = Json_decode.at;

var optional = Json_decode.optional;

var oneOf = Json_decode.oneOf;

var either = Json_decode.either;

var withDefault = Json_decode.withDefault;

var map = Json_decode.map;

var andThen = Json_decode.andThen;

var idTagName = "type";

export {
  DecodeError ,
  id ,
  bool ,
  $$float ,
  $$int ,
  string ,
  $$char ,
  date ,
  nullable ,
  nullAs ,
  array ,
  list ,
  pair ,
  tuple2 ,
  tuple3 ,
  tuple4 ,
  dict ,
  field ,
  at ,
  optional ,
  oneOf ,
  either ,
  withDefault ,
  map ,
  andThen ,
  idTagName ,
  maybe ,
  optionalField ,
  $$const ,
  
}
/* No side effect */
