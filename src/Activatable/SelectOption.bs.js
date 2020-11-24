// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Json_decode from "@glennsl/bs-json/src/Json_decode.bs.js";
import * as Id$OptolithClient from "../Misc/Id.bs.js";
import * as Erratum$OptolithClient from "../Sources/Erratum.bs.js";
import * as Ley_Int$OptolithClient from "../Data/Ley_Int.bs.js";
import * as Ley_Map$OptolithClient from "../Data/Ley_Map.bs.js";
import * as Ley_List$OptolithClient from "../Data/Ley_List.bs.js";
import * as JsonStrict$OptolithClient from "../Misc/JsonStrict.bs.js";
import * as Ley_IntMap$OptolithClient from "../Data/Ley_IntMap.bs.js";
import * as Ley_Option$OptolithClient from "../Data/Ley_Option.bs.js";
import * as Ley_Function$OptolithClient from "../Data/Ley_Function.bs.js";
import * as Prerequisite$OptolithClient from "../Prerequisites/Prerequisite.bs.js";
import * as PublicationRef$OptolithClient from "../Sources/PublicationRef.bs.js";
import * as TranslationMap$OptolithClient from "../Misc/TranslationMap.bs.js";

function showId(id) {
  switch (id.TAG | 0) {
    case /* Generic */0 :
        return "Generic(" + (Ley_Int$OptolithClient.show(id._0) + ")");
    case /* Skill */1 :
        return "Skill(" + (Ley_Int$OptolithClient.show(id._0) + ")");
    case /* CombatTechnique */2 :
        return "CombatTechnique(" + (Ley_Int$OptolithClient.show(id._0) + ")");
    case /* Spell */3 :
        return "Spell(" + (Ley_Int$OptolithClient.show(id._0) + ")");
    case /* Cantrip */4 :
        return "Cantrip(" + (Ley_Int$OptolithClient.show(id._0) + ")");
    case /* LiturgicalChant */5 :
        return "LiturgicalChant(" + (Ley_Int$OptolithClient.show(id._0) + ")");
    case /* Blessing */6 :
        return "Blessing(" + (Ley_Int$OptolithClient.show(id._0) + ")");
    case /* SpecialAbility */7 :
        return "SpecialAbility(" + (Ley_Int$OptolithClient.show(id._0) + ")");
    case /* TradeSecret */8 :
        return "TradeSecret(" + (Ley_Int$OptolithClient.show(id._0) + ")");
    case /* Language */9 :
        return "Language(" + (Ley_Int$OptolithClient.show(id._0) + ")");
    case /* Script */10 :
        return "Script(" + (Ley_Int$OptolithClient.show(id._0) + ")");
    case /* AnimalShape */11 :
        return "AnimalShape(" + (Ley_Int$OptolithClient.show(id._0) + ")");
    
  }
}

var $$Map = Ley_Map$OptolithClient.Make(Id$OptolithClient.Activatable.SelectOption);

function t(json) {
  return {
          name: JsonStrict$OptolithClient.field("name", JsonStrict$OptolithClient.string, json),
          description: JsonStrict$OptolithClient.optionalField("description", JsonStrict$OptolithClient.string, json),
          errata: JsonStrict$OptolithClient.optionalField("errata", Erratum$OptolithClient.Decode.list, json)
        };
}

var Translation = {
  t: t
};

var TranslationMap = TranslationMap$OptolithClient.Make(Translation);

function selectOptionId(param) {
  return Json_decode.map((function (x) {
                return {
                        TAG: /* Generic */0,
                        _0: x
                      };
              }), Json_decode.$$int, param);
}

function multilingual(json) {
  return {
          id: JsonStrict$OptolithClient.field("id", selectOptionId, json),
          apValue: JsonStrict$OptolithClient.optionalField("apValue", JsonStrict$OptolithClient.$$int, json),
          prerequisites: JsonStrict$OptolithClient.field("prerequisites", Prerequisite$OptolithClient.Collection.General.Decode.multilingual, json),
          src: JsonStrict$OptolithClient.field("src", PublicationRef$OptolithClient.Decode.multilingualList, json),
          translations: JsonStrict$OptolithClient.field("translations", TranslationMap.Decode.t, json)
        };
}

function multilingualAssoc(json) {
  var x = multilingual(json);
  return [
          x.id,
          x
        ];
}

function resolveTranslations(langs, x) {
  return Curry._2(Ley_Option$OptolithClient.Infix.$less$amp$great, Curry._2(TranslationMap.Decode.getFromLanguageOrder, langs, x.translations), (function (translation) {
                return {
                        id: x.id,
                        name: translation.name,
                        apValue: x.apValue,
                        prerequisites: Curry._2(Prerequisite$OptolithClient.Collection.General.Decode.resolveTranslations, langs, x.prerequisites),
                        description: translation.description,
                        isSecret: undefined,
                        languages: undefined,
                        continent: undefined,
                        isExtinct: undefined,
                        specializations: undefined,
                        specializationInput: undefined,
                        animalGr: undefined,
                        animalLevel: undefined,
                        enhancementTarget: undefined,
                        enhancementLevel: undefined,
                        staticEntry: undefined,
                        applications: undefined,
                        src: PublicationRef$OptolithClient.Decode.resolveTranslationsList(langs, x.src),
                        errata: Ley_Option$OptolithClient.fromOption(/* [] */0, translation.errata)
                      };
              }));
}

function t$1(param) {
  return JsonStrict$OptolithClient.andThen((function (str) {
                switch (str) {
                  case "AnimalShapes" :
                      return function (param) {
                        return /* AnimalShapes */5;
                      };
                  case "Blessings" :
                      return function (param) {
                        return /* Blessings */0;
                      };
                  case "Cantrips" :
                      return function (param) {
                        return /* Cantrips */1;
                      };
                  case "CombatTechniques" :
                      return function (json) {
                        return {
                                TAG: /* CombatTechniques */0,
                                _0: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("groups", (function (param) {
                                            return JsonStrict$OptolithClient.list(JsonStrict$OptolithClient.$$int, param);
                                          }), json))
                              };
                      };
                  case "Languages" :
                      return function (param) {
                        return /* Languages */3;
                      };
                  case "LiturgicalChantEnhancements" :
                      return function (param) {
                        return /* LiturgicalChantEnhancements */7;
                      };
                  case "LiturgicalChants" :
                      return function (json) {
                        return {
                                TAG: /* LiturgicalChants */1,
                                _0: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("groups", (function (param) {
                                            return JsonStrict$OptolithClient.list(JsonStrict$OptolithClient.$$int, param);
                                          }), json))
                              };
                      };
                  case "Scripts" :
                      return function (param) {
                        return /* Scripts */4;
                      };
                  case "Skills" :
                      return function (json) {
                        return {
                                TAG: /* Skills */2,
                                _0: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("groups", (function (param) {
                                            return JsonStrict$OptolithClient.list(JsonStrict$OptolithClient.$$int, param);
                                          }), json))
                              };
                      };
                  case "SpellEnhancements" :
                      return function (param) {
                        return /* SpellEnhancements */6;
                      };
                  case "Spells" :
                      return function (json) {
                        return {
                                TAG: /* Spells */3,
                                _0: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("groups", (function (param) {
                                            return JsonStrict$OptolithClient.list(JsonStrict$OptolithClient.$$int, param);
                                          }), json))
                              };
                      };
                  case "TradeSecrets" :
                      return function (param) {
                        return /* TradeSecrets */2;
                      };
                  default:
                    throw {
                          RE_EXN_ID: JsonStrict$OptolithClient.DecodeError,
                          _1: "Unknown select option category: " + str,
                          Error: new Error()
                        };
                }
              }), (function (param) {
                return JsonStrict$OptolithClient.field("category", JsonStrict$OptolithClient.string, param);
              }), param);
}

var Category = {
  t: t$1
};

function entryToSelectOption(id, name, staticEntry, src, errata) {
  return {
          id: id,
          name: name,
          apValue: undefined,
          prerequisites: {
            TAG: /* Plain */0,
            _0: /* [] */0
          },
          description: undefined,
          isSecret: undefined,
          languages: undefined,
          continent: undefined,
          isExtinct: undefined,
          specializations: undefined,
          specializationInput: undefined,
          animalGr: undefined,
          animalLevel: undefined,
          enhancementTarget: undefined,
          enhancementLevel: undefined,
          staticEntry: staticEntry,
          applications: undefined,
          src: src,
          errata: errata
        };
}

function insertEntry(s) {
  return Curry._2($$Map.insert, s.id, s);
}

function resolveWithoutGroups(f, mp, xs) {
  return Curry._3(Ley_IntMap$OptolithClient.foldr, (function (x) {
                var s = Curry._1(f, x);
                return Curry._2($$Map.insert, s.id, s);
              }), xs, mp);
}

function resolveGroups(f, g, grs, mp, xs) {
  return Curry._3(Ley_IntMap$OptolithClient.foldr, (function (x) {
                if (!Curry._2(Ley_List$OptolithClient.elem, Curry._1(g, x), grs)) {
                  return Ley_Function$OptolithClient.id;
                }
                var s = Curry._1(f, x);
                return Curry._2($$Map.insert, s.id, s);
              }), xs, mp);
}

function blessingToSelectOption(x) {
  return entryToSelectOption({
              TAG: /* Blessing */6,
              _0: x.id
            }, x.name, {
              TAG: /* Blessing */0,
              _0: x
            }, x.src, x.errata);
}

function cantripToSelectOption(x) {
  return entryToSelectOption({
              TAG: /* Cantrip */4,
              _0: x.id
            }, x.name, {
              TAG: /* Cantrip */1,
              _0: x
            }, x.src, x.errata);
}

function combatTechniqueToSelectOption(x) {
  return entryToSelectOption({
              TAG: /* CombatTechnique */2,
              _0: x.id
            }, x.name, {
              TAG: /* CombatTechnique */2,
              _0: x
            }, x.src, x.errata);
}

function resolveCombatTechniques(grs) {
  if (grs) {
    return function (param, param$1) {
      return resolveGroups(combatTechniqueToSelectOption, (function (x) {
                    return x.gr;
                  }), grs, param, param$1);
    };
  } else {
    return function (param, param$1) {
      return resolveWithoutGroups(combatTechniqueToSelectOption, param, param$1);
    };
  }
}

function liturgicalChantToSelectOption(x) {
  return entryToSelectOption({
              TAG: /* LiturgicalChant */5,
              _0: x.id
            }, x.name, {
              TAG: /* LiturgicalChant */3,
              _0: x
            }, x.src, x.errata);
}

function resolveLiturgicalChants(grs) {
  if (grs) {
    return function (param, param$1) {
      return resolveGroups(liturgicalChantToSelectOption, (function (x) {
                    return x.gr;
                  }), grs, param, param$1);
    };
  } else {
    return function (param, param$1) {
      return resolveWithoutGroups(liturgicalChantToSelectOption, param, param$1);
    };
  }
}

function skillToSelectOption(x) {
  return entryToSelectOption({
              TAG: /* Skill */1,
              _0: x.id
            }, x.name, {
              TAG: /* Skill */4,
              _0: x
            }, x.src, x.errata);
}

function resolveSkills(grs) {
  if (grs) {
    return function (param, param$1) {
      return resolveGroups(skillToSelectOption, (function (x) {
                    return x.gr;
                  }), grs, param, param$1);
    };
  } else {
    return function (param, param$1) {
      return resolveWithoutGroups(skillToSelectOption, param, param$1);
    };
  }
}

function spellToSelectOption(x) {
  return entryToSelectOption({
              TAG: /* Spell */3,
              _0: x.id
            }, x.name, {
              TAG: /* Spell */5,
              _0: x
            }, x.src, x.errata);
}

function resolveSpells(grs) {
  if (grs) {
    return function (param, param$1) {
      return resolveGroups(spellToSelectOption, (function (x) {
                    return x.gr;
                  }), grs, param, param$1);
    };
  } else {
    return function (param, param$1) {
      return resolveWithoutGroups(spellToSelectOption, param, param$1);
    };
  }
}

function tradeSecretToSelectOption(x) {
  return entryToSelectOption({
              TAG: /* TradeSecret */8,
              _0: x.id
            }, x.name, {
              TAG: /* TradeSecret */6,
              _0: x
            }, x.src, x.errata);
}

function languageToSelectOption(x) {
  return entryToSelectOption({
              TAG: /* Language */9,
              _0: x.id
            }, x.name, {
              TAG: /* Language */7,
              _0: x
            }, x.src, x.errata);
}

function scriptToSelectOption(x) {
  return entryToSelectOption({
              TAG: /* Script */10,
              _0: x.id
            }, x.name, {
              TAG: /* Script */8,
              _0: x
            }, x.src, x.errata);
}

function resolveAnimalShapes(src, errata) {
  return function (param, param$1) {
    return resolveWithoutGroups((function (param) {
                  return entryToSelectOption({
                              TAG: /* AnimalShape */11,
                              _0: param.id
                            }, param.name, {
                              TAG: /* AnimalShape */9,
                              _0: param
                            }, src, errata);
                }), param, param$1);
  };
}

function resolveCategories(blessings, cantrips, combatTechniques, liturgicalChants, skills, spells, tradeSecrets, languages, scripts, animalShapes, spellEnhancements, liturgicalChantEnhancements, src, errata, categories) {
  return Curry._3(Ley_List$OptolithClient.foldr, (function (cat) {
                if (typeof cat === "number") {
                  switch (cat) {
                    case /* Blessings */0 :
                        return function (param) {
                          return resolveWithoutGroups(blessingToSelectOption, blessings, param);
                        };
                    case /* Cantrips */1 :
                        return function (param) {
                          return resolveWithoutGroups(cantripToSelectOption, cantrips, param);
                        };
                    case /* TradeSecrets */2 :
                        return function (param) {
                          return resolveWithoutGroups(tradeSecretToSelectOption, tradeSecrets, param);
                        };
                    case /* Languages */3 :
                        return function (param) {
                          return resolveWithoutGroups(languageToSelectOption, languages, param);
                        };
                    case /* Scripts */4 :
                        return function (param) {
                          return resolveWithoutGroups(scriptToSelectOption, scripts, param);
                        };
                    case /* AnimalShapes */5 :
                        var partial_arg = resolveAnimalShapes(src, errata);
                        return function (param) {
                          return partial_arg(animalShapes, param);
                        };
                    case /* SpellEnhancements */6 :
                        return function (param) {
                          return Curry._3($$Map.foldr, insertEntry, param, spellEnhancements);
                        };
                    case /* LiturgicalChantEnhancements */7 :
                        return function (param) {
                          return Curry._3($$Map.foldr, insertEntry, param, liturgicalChantEnhancements);
                        };
                    
                  }
                } else {
                  switch (cat.TAG | 0) {
                    case /* CombatTechniques */0 :
                        var partial_arg$1 = resolveCombatTechniques(cat._0);
                        return function (param) {
                          return partial_arg$1(combatTechniques, param);
                        };
                    case /* LiturgicalChants */1 :
                        var partial_arg$2 = resolveLiturgicalChants(cat._0);
                        return function (param) {
                          return partial_arg$2(liturgicalChants, param);
                        };
                    case /* Skills */2 :
                        var partial_arg$3 = resolveSkills(cat._0);
                        return function (param) {
                          return partial_arg$3(skills, param);
                        };
                    case /* Spells */3 :
                        var partial_arg$4 = resolveSpells(cat._0);
                        return function (param) {
                          return partial_arg$4(spells, param);
                        };
                    
                  }
                }
              }), $$Map.empty, Ley_Option$OptolithClient.fromOption(/* [] */0, categories));
}

function mergeSelectOptions(explicits, fromCategories) {
  return Curry._3($$Map.foldl, (function (mp, x) {
                return Curry._3($$Map.insert, x.id, x, mp);
              }), fromCategories, explicits);
}

var Decode_ResolveCategories = {
  resolveCategories: resolveCategories,
  mergeSelectOptions: mergeSelectOptions
};

var Decode = {
  multilingualAssoc: multilingualAssoc,
  resolveTranslations: resolveTranslations,
  Category: Category,
  ResolveCategories: Decode_ResolveCategories
};

export {
  showId ,
  $$Map ,
  Decode ,
  
}
/* Map Not a pure module */
