// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Json_decode from "@glennsl/bs-json/src/Json_decode.bs.js";
import * as Ley_List$OptolithClient from "../../Data/Ley_List.bs.js";
import * as JsonStrict$OptolithClient from "../Utilities/JsonStrict.bs.js";
import * as Ley_IntMap$OptolithClient from "../../Data/Ley_IntMap.bs.js";
import * as Ley_Option$OptolithClient from "../../Data/Ley_Option.bs.js";

function partial_arg_000(param) {
  return Json_decode.map((function (id) {
                return /* One */Block.__(0, [id]);
              }), Json_decode.$$int, param);
}

var partial_arg_001 = /* :: */[
  (function (param) {
      return Json_decode.map((function (id) {
                    return /* Many */Block.__(1, [id]);
                  }), (function (param) {
                    return Json_decode.list(Json_decode.$$int, param);
                  }), param);
    }),
  /* [] */0
];

var partial_arg = /* :: */[
  partial_arg_000,
  partial_arg_001
];

function oneOrManyInt(param) {
  return Json_decode.oneOf(partial_arg, param);
}

function sex(json) {
  var str = Json_decode.string(json);
  switch (str) {
    case "f" :
        return /* Female */1;
    case "m" :
        return /* Male */0;
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown sex prerequisite: " + str
          ];
  }
}

function partial_arg_000$1(json) {
  return {
          id: Curry._1(oneOrManyInt, json),
          active: true
        };
}

var partial_arg_001$1 = /* :: */[
  (function (json) {
      return {
              id: Json_decode.field("id", oneOrManyInt, json),
              active: Json_decode.field("active", Json_decode.bool, json)
            };
    }),
  /* [] */0
];

var partial_arg$1 = /* :: */[
  partial_arg_000$1,
  partial_arg_001$1
];

function race(param) {
  return Json_decode.oneOf(partial_arg$1, param);
}

function primaryAttribute(json) {
  var str = Json_decode.field("type", Json_decode.string, json);
  var tmp;
  switch (str) {
    case "blessed" :
        tmp = /* Blessed */1;
        break;
    case "magical" :
        tmp = /* Magical */0;
        break;
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown primary attribute type: " + str
          ];
  }
  return {
          value: Json_decode.field("value", Json_decode.$$int, json),
          scope: tmp
        };
}

function pact(json) {
  return {
          category: Json_decode.field("category", Json_decode.$$int, json),
          domain: Json_decode.field("domain", (function (param) {
                  return JsonStrict$OptolithClient.maybe(oneOrManyInt, param);
                }), json),
          level: Json_decode.field("level", (function (param) {
                  return JsonStrict$OptolithClient.maybe(Json_decode.$$int, param);
                }), json)
        };
}

function activatableId(json) {
  var scope = Json_decode.field("scope", Json_decode.string, json);
  switch (scope) {
    case "Advantage" :
        return /* `Advantage */[
                -41058677,
                Json_decode.field("value", Json_decode.$$int, json)
              ];
    case "Disadvantage" :
        return /* `Disadvantage */[
                255955901,
                Json_decode.field("value", Json_decode.$$int, json)
              ];
    case "SpecialAbility" :
        return /* `SpecialAbility */[
                -789492591,
                Json_decode.field("value", Json_decode.$$int, json)
              ];
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown activatable ID scope: " + scope
          ];
  }
}

function activatableIds(json) {
  var scope = Json_decode.field("scope", Json_decode.string, json);
  switch (scope) {
    case "Advantage" :
        return /* Advantages */Block.__(0, [Json_decode.field("value", (function (param) {
                          return Json_decode.list(Json_decode.$$int, param);
                        }), json)]);
    case "Disadvantage" :
        return /* Disadvantages */Block.__(1, [Json_decode.field("value", (function (param) {
                          return Json_decode.list(Json_decode.$$int, param);
                        }), json)]);
    case "SpecialAbility" :
        return /* SpecialAbilities */Block.__(2, [Json_decode.field("value", (function (param) {
                          return Json_decode.list(Json_decode.$$int, param);
                        }), json)]);
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown activatable ID scope: " + scope
          ];
  }
}

function scopedSelectOptionId(json) {
  var scope = Json_decode.field("scope", Json_decode.string, json);
  switch (scope) {
    case "Blessing" :
        return /* `Blessing */[
                797131559,
                Json_decode.field("value", Json_decode.$$int, json)
              ];
    case "Cantrip" :
        return /* `Cantrip */[
                -841776939,
                Json_decode.field("value", Json_decode.$$int, json)
              ];
    case "CombatTechnique" :
        return /* `CombatTechnique */[
                -920806756,
                Json_decode.field("value", Json_decode.$$int, json)
              ];
    case "LiturgicalChant" :
        return /* `LiturgicalChant */[
                -384382742,
                Json_decode.field("value", Json_decode.$$int, json)
              ];
    case "Skill" :
        return /* `Skill */[
                290194801,
                Json_decode.field("value", Json_decode.$$int, json)
              ];
    case "SpecialAbility" :
        return /* `SpecialAbility */[
                -789492591,
                Json_decode.field("value", Json_decode.$$int, json)
              ];
    case "Spell" :
        return /* `Spell */[
                345443720,
                Json_decode.field("value", Json_decode.$$int, json)
              ];
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown select option ID scope: " + scope
          ];
  }
}

function selectOptionId(json) {
  return Json_decode.oneOf(/* :: */[
              (function (param) {
                  return Json_decode.map((function (x) {
                                return /* `Generic */[
                                        61643255,
                                        x
                                      ];
                              }), Json_decode.$$int, param);
                }),
              /* :: */[
                scopedSelectOptionId,
                /* [] */0
              ]
            ], json);
}

function activatable(json) {
  return {
          id: Json_decode.field("id", activatableId, json),
          active: Json_decode.field("active", Json_decode.bool, json),
          sid: Json_decode.field("sid", (function (param) {
                  return JsonStrict$OptolithClient.maybe(selectOptionId, param);
                }), json),
          sid2: Json_decode.field("sid2", (function (param) {
                  return JsonStrict$OptolithClient.maybe(selectOptionId, param);
                }), json),
          level: Json_decode.field("level", (function (param) {
                  return JsonStrict$OptolithClient.maybe(Json_decode.$$int, param);
                }), json)
        };
}

function activatableMultiEntry(json) {
  return {
          id: Json_decode.field("id", activatableIds, json),
          active: Json_decode.field("active", Json_decode.bool, json),
          sid: Json_decode.field("sid", (function (param) {
                  return JsonStrict$OptolithClient.maybe(selectOptionId, param);
                }), json),
          sid2: Json_decode.field("sid2", (function (param) {
                  return JsonStrict$OptolithClient.maybe(selectOptionId, param);
                }), json),
          level: Json_decode.field("level", (function (param) {
                  return JsonStrict$OptolithClient.maybe(Json_decode.$$int, param);
                }), json)
        };
}

function activatableMultiSelect(json) {
  return {
          id: Json_decode.field("id", activatableId, json),
          active: Json_decode.field("active", Json_decode.bool, json),
          sid: Json_decode.field("sid", (function (param) {
                  return Json_decode.list(selectOptionId, param);
                }), json),
          sid2: Json_decode.field("sid2", (function (param) {
                  return JsonStrict$OptolithClient.maybe(selectOptionId, param);
                }), json),
          level: Json_decode.field("tier", (function (param) {
                  return JsonStrict$OptolithClient.maybe(Json_decode.$$int, param);
                }), json)
        };
}

function increasableId(json) {
  var scope = Json_decode.field("scope", Json_decode.string, json);
  switch (scope) {
    case "Attribute" :
        return /* `Attribute */[
                482562044,
                Json_decode.field("value", Json_decode.$$int, json)
              ];
    case "CombatTechnique" :
        return /* `CombatTechnique */[
                -920806756,
                Json_decode.field("value", Json_decode.$$int, json)
              ];
    case "LiturgicalChant" :
        return /* `LiturgicalChant */[
                -384382742,
                Json_decode.field("value", Json_decode.$$int, json)
              ];
    case "Skill" :
        return /* `Skill */[
                290194801,
                Json_decode.field("value", Json_decode.$$int, json)
              ];
    case "Spell" :
        return /* `Spell */[
                345443720,
                Json_decode.field("value", Json_decode.$$int, json)
              ];
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown increasable ID scope: " + scope
          ];
  }
}

function increasableIds(json) {
  var scope = Json_decode.field("scope", Json_decode.string, json);
  switch (scope) {
    case "Attribute" :
        return /* Attributes */Block.__(0, [Json_decode.field("value", (function (param) {
                          return Json_decode.list(Json_decode.$$int, param);
                        }), json)]);
    case "CombatTechnique" :
        return /* CombatTechniques */Block.__(2, [Json_decode.field("value", (function (param) {
                          return Json_decode.list(Json_decode.$$int, param);
                        }), json)]);
    case "LiturgicalChant" :
        return /* LiturgicalChants */Block.__(4, [Json_decode.field("value", (function (param) {
                          return Json_decode.list(Json_decode.$$int, param);
                        }), json)]);
    case "Skill" :
        return /* Skills */Block.__(1, [Json_decode.field("value", (function (param) {
                          return Json_decode.list(Json_decode.$$int, param);
                        }), json)]);
    case "Spell" :
        return /* Spells */Block.__(3, [Json_decode.field("value", (function (param) {
                          return Json_decode.list(Json_decode.$$int, param);
                        }), json)]);
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown increasable ID scope: " + scope
          ];
  }
}

function increasable(json) {
  return {
          id: Json_decode.field("id", increasableId, json),
          value: Json_decode.field("value", Json_decode.$$int, json)
        };
}

function increasableMultiEntry(json) {
  return {
          id: Json_decode.field("id", increasableIds, json),
          value: Json_decode.field("value", Json_decode.$$int, json)
        };
}

function tProfession(json) {
  return {
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", sex, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", race, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", oneOrManyInt, json),
          activatable: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                      return Json_decode.list(activatable, param);
                    }), json)),
          increasable: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                      return Json_decode.list(increasable, param);
                    }), json))
        };
}

function t(json) {
  return {
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", sex, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", race, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", oneOrManyInt, json),
          pact: JsonStrict$OptolithClient.optionalField("pactPrerequisite", pact, json),
          social: JsonStrict$OptolithClient.optionalField("socialStatusPrerequisite", Json_decode.$$int, json),
          primaryAttribute: JsonStrict$OptolithClient.optionalField("primaryAttributePrerequisite", primaryAttribute, json),
          activatable: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                      return Json_decode.list(activatable, param);
                    }), json)),
          activatableMultiEntry: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("activatableMultiEntryPrerequisites", (function (param) {
                      return Json_decode.list(activatableMultiEntry, param);
                    }), json)),
          activatableMultiSelect: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("activatableMultiSelectPrerequisites", (function (param) {
                      return Json_decode.list(activatableMultiSelect, param);
                    }), json)),
          increasable: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                      return Json_decode.list(increasable, param);
                    }), json)),
          increasableMultiEntry: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                      return Json_decode.list(increasableMultiEntry, param);
                    }), json))
        };
}

function level(json) {
  return /* tuple */[
          Json_decode.field("level", Json_decode.$$int, json),
          t(json)
        ];
}

function tWithLevel(json) {
  return {
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", sex, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", race, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", oneOrManyInt, json),
          pact: JsonStrict$OptolithClient.optionalField("pactPrerequisite", pact, json),
          social: JsonStrict$OptolithClient.optionalField("socialStatusPrerequisite", Json_decode.$$int, json),
          primaryAttribute: JsonStrict$OptolithClient.optionalField("primaryAttributePrerequisite", primaryAttribute, json),
          activatable: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                      return Json_decode.list(activatable, param);
                    }), json)),
          activatableMultiEntry: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("activatableMultiEntryPrerequisites", (function (param) {
                      return Json_decode.list(activatableMultiEntry, param);
                    }), json)),
          activatableMultiSelect: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("activatableMultiSelectPrerequisites", (function (param) {
                      return Json_decode.list(activatableMultiSelect, param);
                    }), json)),
          increasable: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                      return Json_decode.list(increasable, param);
                    }), json)),
          increasableMultiEntry: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                      return Json_decode.list(increasableMultiEntry, param);
                    }), json)),
          levels: Curry._1(Ley_IntMap$OptolithClient.fromList, Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("levelPrerequisites", (function (param) {
                          return Json_decode.list(level, param);
                        }), json)))
        };
}

function tWithLevelDisAdv(json) {
  return {
          commonSuggestedByRCP: Json_decode.field("hasToBeCommonOrSuggestedByRCP", Json_decode.bool, json),
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", sex, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", race, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", oneOrManyInt, json),
          pact: JsonStrict$OptolithClient.optionalField("pactPrerequisite", pact, json),
          social: JsonStrict$OptolithClient.optionalField("socialStatusPrerequisite", Json_decode.$$int, json),
          primaryAttribute: JsonStrict$OptolithClient.optionalField("primaryAttributePrerequisite", primaryAttribute, json),
          activatable: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                      return Json_decode.list(activatable, param);
                    }), json)),
          activatableMultiEntry: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("activatableMultiEntryPrerequisites", (function (param) {
                      return Json_decode.list(activatableMultiEntry, param);
                    }), json)),
          activatableMultiSelect: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("activatableMultiSelectPrerequisites", (function (param) {
                      return Json_decode.list(activatableMultiSelect, param);
                    }), json)),
          increasable: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                      return Json_decode.list(increasable, param);
                    }), json)),
          increasableMultiEntry: Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                      return Json_decode.list(increasableMultiEntry, param);
                    }), json)),
          levels: Curry._1(Ley_IntMap$OptolithClient.fromList, Ley_Option$OptolithClient.fromOption(/* [] */0, JsonStrict$OptolithClient.optionalField("levelPrerequisites", (function (param) {
                          return Json_decode.list(level, param);
                        }), json)))
        };
}

function replacementAtIndex(json) {
  return /* tuple */[
          Json_decode.field("index", Json_decode.$$int, json),
          Json_decode.field("replacement", Json_decode.string, json)
        ];
}

function tIndexL10n(json) {
  return {
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", Json_decode.string, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", Json_decode.string, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", Json_decode.string, json),
          pact: JsonStrict$OptolithClient.optionalField("pactPrerequisite", Json_decode.string, json),
          social: JsonStrict$OptolithClient.optionalField("socialStatusPrerequisite", Json_decode.string, json),
          primaryAttribute: JsonStrict$OptolithClient.optionalField("primaryAttributePrerequisite", Json_decode.string, json),
          activatable: JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          activatableMultiEntry: JsonStrict$OptolithClient.optionalField("activatableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          activatableMultiSelect: JsonStrict$OptolithClient.optionalField("activatableMultiSelectPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          increasable: JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          increasableMultiEntry: JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json)
        };
}

function tIndexUniv(json) {
  return {
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", Json_decode.bool, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", Json_decode.bool, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", Json_decode.bool, json),
          pact: JsonStrict$OptolithClient.optionalField("pactPrerequisite", Json_decode.bool, json),
          social: JsonStrict$OptolithClient.optionalField("socialStatusPrerequisite", Json_decode.bool, json),
          primaryAttribute: JsonStrict$OptolithClient.optionalField("primaryAttributePrerequisite", Json_decode.bool, json),
          activatable: JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          activatableMultiEntry: JsonStrict$OptolithClient.optionalField("activatableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          activatableMultiSelect: JsonStrict$OptolithClient.optionalField("activatableMultiSelectPrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          increasable: JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          increasableMultiEntry: JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json)
        };
}

function mergeSingleOverride(univ, l10n) {
  return Ley_Option$OptolithClient.Alternative.$less$pipe$great(Ley_Option$OptolithClient.Functor.$less$amp$great(l10n, (function (x) {
                    return /* ReplaceWith */[x];
                  })), Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                    if (x) {
                      return /* Hide */0;
                    }
                    
                  })));
}

function mergeMapOverride(univ, l10n) {
  var mp = Ley_List$OptolithClient.Foldable.foldr((function (x) {
          return Curry._2(Ley_IntMap$OptolithClient.insert, x, /* Hide */0);
        }), Ley_IntMap$OptolithClient.empty, Ley_Option$OptolithClient.fromOption(/* [] */0, univ));
  return Ley_List$OptolithClient.Foldable.foldr((function (param) {
                return Curry._2(Ley_IntMap$OptolithClient.insert, param[0], /* ReplaceWith */[param[1]]);
              }), mp, Ley_Option$OptolithClient.fromOption(/* [] */0, l10n));
}

function tIndex(univ, l10n) {
  return {
          sex: mergeSingleOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.sex;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.sex;
                    }))),
          race: mergeSingleOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.race;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.race;
                    }))),
          culture: mergeSingleOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.culture;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.culture;
                    }))),
          pact: mergeSingleOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.pact;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.pact;
                    }))),
          social: mergeSingleOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.social;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.social;
                    }))),
          primaryAttribute: mergeSingleOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.primaryAttribute;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.primaryAttribute;
                    }))),
          activatable: mergeMapOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.activatable;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.activatable;
                    }))),
          activatableMultiEntry: mergeMapOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.activatableMultiEntry;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.activatableMultiEntry;
                    }))),
          activatableMultiSelect: mergeMapOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.activatableMultiSelect;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.activatableMultiSelect;
                    }))),
          increasable: mergeMapOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.increasable;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.increasable;
                    }))),
          increasableMultiEntry: mergeMapOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.increasableMultiEntry;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.increasableMultiEntry;
                    })))
        };
}

function tIndexL10nAtLevel(json) {
  return /* tuple */[
          Json_decode.field("level", Json_decode.$$int, json),
          Json_decode.field("hide", tIndexL10n, json)
        ];
}

function tIndexWithLevelL10n(json) {
  return {
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", Json_decode.string, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", Json_decode.string, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", Json_decode.string, json),
          pact: JsonStrict$OptolithClient.optionalField("pactPrerequisite", Json_decode.string, json),
          social: JsonStrict$OptolithClient.optionalField("socialStatusPrerequisite", Json_decode.string, json),
          primaryAttribute: JsonStrict$OptolithClient.optionalField("primaryAttributePrerequisite", Json_decode.string, json),
          activatable: JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          activatableMultiEntry: JsonStrict$OptolithClient.optionalField("activatableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          activatableMultiSelect: JsonStrict$OptolithClient.optionalField("activatableMultiSelectPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          increasable: JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          increasableMultiEntry: JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          levels: JsonStrict$OptolithClient.optionalField("levels", (function (param) {
                  return Json_decode.list(tIndexL10nAtLevel, param);
                }), json)
        };
}

function tIndexUnivAtLevel(json) {
  return /* tuple */[
          Json_decode.field("level", Json_decode.$$int, json),
          Json_decode.field("hide", tIndexUniv, json)
        ];
}

function tIndexWithLevelUniv(json) {
  return {
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", Json_decode.bool, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", Json_decode.bool, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", Json_decode.bool, json),
          pact: JsonStrict$OptolithClient.optionalField("pactPrerequisite", Json_decode.bool, json),
          social: JsonStrict$OptolithClient.optionalField("socialStatusPrerequisite", Json_decode.bool, json),
          primaryAttribute: JsonStrict$OptolithClient.optionalField("primaryAttributePrerequisite", Json_decode.bool, json),
          activatable: JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          activatableMultiEntry: JsonStrict$OptolithClient.optionalField("activatableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          activatableMultiSelect: JsonStrict$OptolithClient.optionalField("activatableMultiSelectPrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          increasable: JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          increasableMultiEntry: JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          levels: JsonStrict$OptolithClient.optionalField("levels", (function (param) {
                  return Json_decode.list(tIndexUnivAtLevel, param);
                }), json)
        };
}

function mergeIndexLevels(univ, l10n) {
  var mp = Ley_List$OptolithClient.Foldable.foldr((function (param) {
          return Curry._2(Ley_IntMap$OptolithClient.insert, param[0], /* tuple */[
                      param[1],
                      undefined
                    ]);
        }), Ley_IntMap$OptolithClient.empty, Ley_Option$OptolithClient.fromOption(/* [] */0, univ));
  return Curry._2(Ley_IntMap$OptolithClient.map, (function (param) {
                return tIndex(param[0], param[1]);
              }), Ley_List$OptolithClient.Foldable.foldr((function (param) {
                    var x = param[1];
                    return Curry._2(Ley_IntMap$OptolithClient.alter, (function (my) {
                                  return Ley_Option$OptolithClient.option(/* tuple */[
                                              undefined,
                                              x
                                            ], (function (y) {
                                                return /* tuple */[
                                                        y[0],
                                                        x
                                                      ];
                                              }), my);
                                }), param[0]);
                  }), mp, Ley_Option$OptolithClient.fromOption(/* [] */0, l10n)));
}

function tIndexWithLevel(univ, l10n) {
  return {
          sex: mergeSingleOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.sex;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.sex;
                    }))),
          race: mergeSingleOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.race;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.race;
                    }))),
          culture: mergeSingleOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.culture;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.culture;
                    }))),
          pact: mergeSingleOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.pact;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.pact;
                    }))),
          social: mergeSingleOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.social;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.social;
                    }))),
          primaryAttribute: mergeSingleOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.primaryAttribute;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.primaryAttribute;
                    }))),
          activatable: mergeMapOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.activatable;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.activatable;
                    }))),
          activatableMultiEntry: mergeMapOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.activatableMultiEntry;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.activatableMultiEntry;
                    }))),
          activatableMultiSelect: mergeMapOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.activatableMultiSelect;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.activatableMultiSelect;
                    }))),
          increasable: mergeMapOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.increasable;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.increasable;
                    }))),
          increasableMultiEntry: mergeMapOverride(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.increasableMultiEntry;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.increasableMultiEntry;
                    }))),
          levels: mergeIndexLevels(Ley_Option$OptolithClient.Monad.$great$great$eq(univ, (function (x) {
                      return x.levels;
                    })), Ley_Option$OptolithClient.Monad.$great$great$eq(l10n, (function (x) {
                      return x.levels;
                    })))
        };
}

var Decode = {
  oneOrManyInt: oneOrManyInt,
  sex: sex,
  race: race,
  culture: oneOrManyInt,
  primaryAttribute: primaryAttribute,
  pact: pact,
  socialStatus: Json_decode.$$int,
  activatableId: activatableId,
  activatableIds: activatableIds,
  scopedSelectOptionId: scopedSelectOptionId,
  selectOptionId: selectOptionId,
  activatable: activatable,
  activatableMultiEntry: activatableMultiEntry,
  activatableMultiSelect: activatableMultiSelect,
  increasableId: increasableId,
  increasableIds: increasableIds,
  increasable: increasable,
  increasableMultiEntry: increasableMultiEntry,
  tProfession: tProfession,
  t: t,
  level: level,
  tWithLevel: tWithLevel,
  tWithLevelDisAdv: tWithLevelDisAdv,
  replacementAtIndex: replacementAtIndex,
  tIndexL10n: tIndexL10n,
  tIndexUniv: tIndexUniv,
  mergeSingleOverride: mergeSingleOverride,
  mergeMapOverride: mergeMapOverride,
  tIndex: tIndex,
  tIndexL10nAtLevel: tIndexL10nAtLevel,
  tIndexWithLevelL10n: tIndexWithLevelL10n,
  tIndexUnivAtLevel: tIndexUnivAtLevel,
  tIndexWithLevelUniv: tIndexWithLevelUniv,
  mergeIndexLevels: mergeIndexLevels,
  tIndexWithLevel: tIndexWithLevel
};

var empty = {
  sex: undefined,
  race: undefined,
  culture: undefined,
  pact: undefined,
  social: undefined,
  primaryAttribute: undefined,
  activatable: /* [] */0,
  activatableMultiEntry: /* [] */0,
  activatableMultiSelect: /* [] */0,
  increasable: /* [] */0,
  increasableMultiEntry: /* [] */0
};

export {
  empty ,
  Decode ,
  
}
/* Ley_IntMap-OptolithClient Not a pure module */
