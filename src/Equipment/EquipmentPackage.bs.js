// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Json_decode from "@glennsl/bs-json/src/Json_decode.bs.js";
import * as Decoder$OptolithClient from "../Utilities/Decoder.bs.js";
import * as Erratum$OptolithClient from "../Sources/Erratum.bs.js";
import * as JsonStrict$OptolithClient from "../Misc/JsonStrict.bs.js";
import * as Ley_IntMap$OptolithClient from "../Data/Ley_IntMap.bs.js";
import * as Ley_Option$OptolithClient from "../Data/Ley_Option.bs.js";
import * as PublicationRef$OptolithClient from "../Sources/PublicationRef.bs.js";
import * as TranslationMap$OptolithClient from "../Misc/TranslationMap.bs.js";

function t(json) {
  return {
          name: JsonStrict$OptolithClient.field("name", JsonStrict$OptolithClient.string, json),
          errata: JsonStrict$OptolithClient.optionalField("errata", Erratum$OptolithClient.Decode.list, json)
        };
}

var Translation = {
  t: t
};

var TranslationMap = TranslationMap$OptolithClient.Make(Translation);

function item(json) {
  return [
          JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          JsonStrict$OptolithClient.optionalField("amount", JsonStrict$OptolithClient.$$int, json)
        ];
}

function multilingual(json) {
  return {
          id: Json_decode.field("id", Json_decode.$$int, json),
          items: Curry._2(Ley_IntMap$OptolithClient.map, (function (param) {
                  return Ley_Option$OptolithClient.fromOption(1, param);
                }), Curry._1(Ley_IntMap$OptolithClient.fromList, Json_decode.field("items", (function (param) {
                          return Json_decode.list(item, param);
                        }), json))),
          src: Json_decode.field("src", PublicationRef$OptolithClient.Decode.multilingualList, json),
          translations: Json_decode.field("translations", TranslationMap.Decode.t, json)
        };
}

function resolveTranslations(langs, x) {
  return Curry._2(Ley_Option$OptolithClient.Infix.$less$amp$great, Curry._2(TranslationMap.Decode.getFromLanguageOrder, langs, x.translations), (function (translation) {
                return {
                        id: x.id,
                        name: translation.name,
                        items: x.items,
                        src: PublicationRef$OptolithClient.Decode.resolveTranslationsList(langs, x.src),
                        errata: Ley_Option$OptolithClient.fromOption(/* [] */0, translation.errata)
                      };
              }));
}

function t$1(langs, json) {
  return resolveTranslations(langs, multilingual(json));
}

function toAssoc(x) {
  return [
          x.id,
          x
        ];
}

function assoc(param, param$1) {
  return Decoder$OptolithClient.decodeAssoc(t$1, toAssoc, param, param$1);
}

var Decode = {
  Translation: Translation,
  TranslationMap: TranslationMap,
  item: item,
  multilingual: multilingual,
  resolveTranslations: resolveTranslations,
  t: t$1,
  toAssoc: toAssoc,
  assoc: assoc
};

export {
  Decode ,
  
}
/* TranslationMap Not a pure module */
