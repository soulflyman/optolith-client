// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Ley_List$OptolithClient from "../Data/Ley_List.bs.js";
import * as Ley_Option$OptolithClient from "../Data/Ley_Option.bs.js";

function isActive(x) {
  return Ley_List$OptolithClient.Extra.notNull(x.active);
}

function isActiveM(param) {
  return Ley_Option$OptolithClient.option(false, isActive, param);
}

function id(x) {
  switch (x.TAG | 0) {
    case /* Advantage */0 :
        return {
                HASH: /* Advantage */-41058677,
                VAL: x._0.id
              };
    case /* Disadvantage */1 :
        return {
                HASH: /* Disadvantage */255955901,
                VAL: x._0.id
              };
    case /* SpecialAbility */2 :
        return {
                HASH: /* SpecialAbility */-789492591,
                VAL: x._0.id
              };
    
  }
}

function id$prime(x) {
  return x._0.id;
}

function name(x) {
  return x._0.name;
}

function selectOptions(x) {
  switch (x.TAG | 0) {
    case /* Advantage */0 :
    case /* Disadvantage */1 :
        return x._0.selectOptions;
    case /* SpecialAbility */2 :
        return x._0.selectOptions;
    
  }
}

function input(x) {
  switch (x.TAG | 0) {
    case /* Advantage */0 :
    case /* Disadvantage */1 :
        return x._0.input;
    case /* SpecialAbility */2 :
        return x._0.input;
    
  }
}

function apValue(x) {
  switch (x.TAG | 0) {
    case /* Advantage */0 :
    case /* Disadvantage */1 :
        return x._0.apValue;
    case /* SpecialAbility */2 :
        return x._0.apValue;
    
  }
}

function apValue$prime(x) {
  var match = apValue(x);
  if (match !== undefined) {
    if (match.TAG) {
      return {
              TAG: /* Many */1,
              _0: match._0
            };
    } else {
      return {
              TAG: /* One */0,
              _0: match._0
            };
    }
  }
  
}

function max(x) {
  switch (x.TAG | 0) {
    case /* Advantage */0 :
    case /* Disadvantage */1 :
        return x._0.max;
    case /* SpecialAbility */2 :
        return x._0.max;
    
  }
}

export {
  isActive ,
  isActiveM ,
  id ,
  id$prime ,
  name ,
  selectOptions ,
  input ,
  apValue ,
  apValue$prime ,
  max ,
  
}
/* No side effect */
