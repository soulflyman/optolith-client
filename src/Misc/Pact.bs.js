// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Decoder$OptolithClient from "../Utilities/Decoder.bs.js";
import * as Erratum$OptolithClient from "../Sources/Erratum.bs.js";
import * as Ley_List$OptolithClient from "../Data/Ley_List.bs.js";
import * as JsonStrict$OptolithClient from "./JsonStrict.bs.js";
import * as Ley_IntMap$OptolithClient from "../Data/Ley_IntMap.bs.js";
import * as Ley_Option$OptolithClient from "../Data/Ley_Option.bs.js";
import * as PublicationRef$OptolithClient from "../Sources/PublicationRef.bs.js";
import * as TranslationMap$OptolithClient from "./TranslationMap.bs.js";

var Dynamic = {};

function t(json) {
  return {
          name: JsonStrict$OptolithClient.field("name", JsonStrict$OptolithClient.string, json)
        };
}

var TypeTranslation = {
  t: t
};

var TypeTranslationMap = TranslationMap$OptolithClient.Make(TypeTranslation);

function typeMultilingual(json) {
  return {
          id: JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          translations: JsonStrict$OptolithClient.field("translations", TypeTranslationMap.Decode.t, json)
        };
}

function t$1(json) {
  return {
          name: JsonStrict$OptolithClient.field("name", JsonStrict$OptolithClient.string, json)
        };
}

var DomainTranslation = {
  t: t$1
};

var DomainTranslationMap = TranslationMap$OptolithClient.Make(DomainTranslation);

function domainMultilingual(json) {
  return {
          id: JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          translations: JsonStrict$OptolithClient.field("translations", DomainTranslationMap.Decode.t, json)
        };
}

function t$2(json) {
  return {
          name: JsonStrict$OptolithClient.field("name", JsonStrict$OptolithClient.string, json),
          errata: JsonStrict$OptolithClient.optionalField("errata", Erratum$OptolithClient.Decode.list, json)
        };
}

var Translation = {
  t: t$2
};

var TranslationMap = TranslationMap$OptolithClient.Make(Translation);

function multilingual(json) {
  return {
          id: JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          types: JsonStrict$OptolithClient.field("types", (function (param) {
                  return JsonStrict$OptolithClient.list(typeMultilingual, param);
                }), json),
          domains: JsonStrict$OptolithClient.field("domains", (function (param) {
                  return JsonStrict$OptolithClient.list(domainMultilingual, param);
                }), json),
          src: JsonStrict$OptolithClient.field("src", PublicationRef$OptolithClient.Decode.multilingualList, json),
          translations: JsonStrict$OptolithClient.field("translations", TranslationMap.Decode.t, json)
        };
}

function t$3(langs, json) {
  var x = multilingual(json);
  return Curry._2(Ley_Option$OptolithClient.Infix.$less$amp$great, Curry._2(TranslationMap.Decode.getFromLanguageOrder, langs, x.translations), (function (translation) {
                return {
                        id: x.id,
                        name: translation.name,
                        types: Curry._3(Ley_List$OptolithClient.foldl, (function (mp, type_) {
                                return Ley_Option$OptolithClient.option(mp, (function (typeTranslation) {
                                              return Curry._3(Ley_IntMap$OptolithClient.insert, type_.id, typeTranslation.name, mp);
                                            }), Curry._2(TypeTranslationMap.Decode.getFromLanguageOrder, langs, type_.translations));
                              }), Ley_IntMap$OptolithClient.empty, x.types),
                        domains: Curry._3(Ley_List$OptolithClient.foldl, (function (mp, domain) {
                                return Ley_Option$OptolithClient.option(mp, (function (domainTranslation) {
                                              return Curry._3(Ley_IntMap$OptolithClient.insert, domain.id, domainTranslation.name, mp);
                                            }), Curry._2(DomainTranslationMap.Decode.getFromLanguageOrder, langs, domain.translations));
                              }), Ley_IntMap$OptolithClient.empty, x.domains),
                        src: PublicationRef$OptolithClient.Decode.resolveTranslationsList(langs, x.src),
                        errata: Ley_Option$OptolithClient.fromOption(/* [] */0, translation.errata)
                      };
              }));
}

function toAssoc(x) {
  return [
          x.id,
          x
        ];
}

function assoc(param, param$1) {
  return Decoder$OptolithClient.decodeAssoc(t$3, toAssoc, param, param$1);
}

var Static = {
  Decode: {
    assoc: assoc
  }
};

export {
  Dynamic ,
  Static ,
  
}
/* TypeTranslationMap Not a pure module */
