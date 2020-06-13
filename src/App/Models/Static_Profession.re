[@genType]
[@genType.as "NameBySex"]
type nameBySex = {
  m: string,
  f: string,
};

[@genType]
[@genType.as "ProfessionName"]
type name =
  | Const(string)
  | BySex(nameBySex);

[@genType]
[@genType.as "VariantOverride"]
type variantOverride('a) =
  | Remove
  | Override('a);

[@genType]
[@genType.as "SkillSpecializationOption"]
type skillSpecializationOption = GenericHelpers.oneOrMany(int);

[@genType]
[@genType.as "VariantSkillSpecializationOption"]
type variantSkillSpecializationOption =
  variantOverride(skillSpecializationOption);

[@genType]
[@genType.as "LanguageAndScriptOption"]
type languageAndScriptOption = int;

[@genType]
[@genType.as "VariantLanguageAndScriptOption"]
type variantLanguageAndScriptOption =
  variantOverride(languageAndScriptOption);

[@genType]
[@genType.as "CombatTechniqueSecondOption"]
type combatTechniqueSecondOption = {
  amount: int,
  value: int,
};

[@genType]
[@genType.as "CombatTechniqueOption"]
type combatTechniqueOption = {
  amount: int,
  value: int,
  second: option(combatTechniqueSecondOption),
  sid: list(int),
};

[@genType]
[@genType.as "VariantCombatTechniqueOption"]
type variantCombatTechniqueOption = variantOverride(combatTechniqueOption);

[@genType]
[@genType.as "CantripOption"]
type cantripOption = {
  amount: int,
  sid: list(int),
};

[@genType]
[@genType.as "CurseOption"]
type curseOption = int;

[@genType]
[@genType.as "TerrainKnowledgeOption"]
type terrainKnowledgeOption = list(int);

[@genType]
[@genType.as "SkillOption"]
type skillOption = {
  /**
   * If specified, only choose from skills of the specified group.
   */
  gr: option(int),
  /**
   * The AP value the user can spend.
   */
  value: int,
};

[@genType]
[@genType.as "ProfessionOptions"]
type options = {
  skillSpecialization: option(skillSpecializationOption),
  languageScript: option(languageAndScriptOption),
  combatTechnique: option(combatTechniqueOption),
  cantrip: option(cantripOption),
  curse: option(curseOption),
  terrainKnowledge: option(terrainKnowledgeOption),
  skill: option(skillOption),
  guildMageUnfamiliarSpell: bool,
};

[@genType]
[@genType.as "ProfessionVariantOptions"]
type variantOptions = {
  skillSpecialization: option(variantSkillSpecializationOption),
  languageScript: option(variantLanguageAndScriptOption),
  combatTechnique: option(variantCombatTechniqueOption),
  cantrip: option(cantripOption),
  curse: option(curseOption),
  terrainKnowledge: option(terrainKnowledgeOption),
  skill: option(skillOption),
  guildMageUnfamiliarSpell: bool,
};

[@genType]
[@genType.as "ProfessionVariant"]
type variant = {
  id: int,
  name,
  cost: int,
  prerequisites: Static_Prerequisites.tProfession,
  options: variantOptions,
  specialAbilities: list(Static_Prerequisites.activatable),
  combatTechniques: Ley_IntMap.t(int),
  skills: Ley_IntMap.t(int),
  spells: Ley_IntMap.t(GenericHelpers.oneOrMany(int)),
  liturgicalChants: Ley_IntMap.t(GenericHelpers.oneOrMany(int)),
  blessings: list(int),
  precedingText: option(string),
  fullText: option(string),
  concludingText: option(string),
  errata: list(Static_Erratum.t),
};

[@genType]
[@genType.as "Profession"]
type t = {
  id: int,
  name,
  subname: option(name),
  cost: int,
  prerequisites: Static_Prerequisites.tProfession,
  prerequisitesStart: option(string),
  options,
  specialAbilities: list(Static_Prerequisites.activatable),
  combatTechniques: Ley_IntMap.t(int),
  skills: Ley_IntMap.t(int),
  spells: Ley_IntMap.t(GenericHelpers.oneOrMany(int)),
  liturgicalChants: Ley_IntMap.t(GenericHelpers.oneOrMany(int)),
  blessings: list(int),
  suggestedAdvantages: list(int),
  suggestedAdvantagesText: option(string),
  suggestedDisadvantages: list(int),
  suggestedDisadvantagesText: option(string),
  unsuitableAdvantages: list(int),
  unsuitableAdvantagesText: option(string),
  unsuitableDisadvantages: list(int),
  unsuitableDisadvantagesText: option(string),
  variants: Ley_IntMap.t(variant),
  isVariantRequired: bool,
  gr: int,
  /**
   * Divides the groups into smaller subgroups, e.g. "Mage", "Blessed One of the
   * Twelve Gods" or "Fighter".
   */
  sgr: int,
  src: list(Static_SourceRef.t),
  errata: list(Static_Erratum.t),
};

module Decode = {
  open Json.Decode;
  open JsonStrict;

  let nameBySex = json => {
    m: json |> field("m", string),
    f: json |> field("f", string),
  };

  let name =
    oneOf([
      json => json |> nameBySex |> (x => BySex(x)),
      json => json |> string |> (x => Const(x)),
    ]);

  type variantL10n = {
    id: int,
    name,
    activatablePrerequisites: option(list(Static_Prerequisites.activatable)),
    precedingText: option(string),
    fullText: option(string),
    concludingText: option(string),
    errata: list(Static_Erratum.t),
  };

  let variantL10n = json => {
    id: json |> field("id", int),
    name: json |> field("name", name),
    activatablePrerequisites:
      json
      |> optionalField(
           "activatablePrerequisites",
           list(Static_Prerequisites.Decode.activatable),
         ),
    precedingText: json |> optionalField("precedingText", string),
    fullText: json |> optionalField("fullText", string),
    concludingText: json |> optionalField("concludingText", string),
    errata: json |> field("errata", Static_Erratum.Decode.list),
  };

  let variantOverride = (decoder, json) =>
    oneOf(
      [
        json => json |> const(false) |> (_ => Remove),
        json => json |> decoder |> (x => Override(x)),
      ],
      json,
    );

  let skillSpecializationOption = Static_Prerequisites.Decode.oneOrManyInt;

  let variantSkillSpecializationOption =
    variantOverride(skillSpecializationOption);

  let languageAndScriptOption = int;

  let variantLanguageAndScriptOption =
    variantOverride(languageAndScriptOption);

  let combatTechniqueSecondOption = json => {
    amount: json |> field("amount", int),
    value: json |> field("value", int),
  };

  let combatTechniqueOption = json => {
    amount: json |> field("amount", int),
    value: json |> field("value", int),
    second: json |> optionalField("second", combatTechniqueSecondOption),
    sid: json |> field("sid", list(int)),
  };

  let variantCombatTechniqueOption = variantOverride(combatTechniqueOption);

  let cantripOption = json => {
    amount: json |> field("amount", int),
    sid: json |> field("sid", list(int)),
  };

  let curseOption = int;

  let terrainKnowledgeOption = list(int);

  let skillOption = json => {
    gr: json |> optionalField("gr", int),
    value: json |> field("value", int),
  };

  type variantUniv = {
    id: int,
    cost: int,
    sexDependency: option(Static_Prerequisites.sex),
    raceDependency: option(Static_Prerequisites.race),
    cultureDependency: option(Static_Prerequisites.culture),
    activatablePrerequisites: option(list(Static_Prerequisites.activatable)),
    increasablePrerequisites: option(list(Static_Prerequisites.increasable)),
    skillSpecializationSelectOptions:
      option(variantSkillSpecializationOption),
    languageScriptSelectOptions: option(variantLanguageAndScriptOption),
    combatTechniqueSelectOptions: option(variantCombatTechniqueOption),
    cantripSelectOptions: option(cantripOption),
    curseSelectOptions: option(curseOption),
    terrainKnowledgeSelectOptions: option(terrainKnowledgeOption),
    skillSelectOptions: option(skillOption),
    specialAbilities: option(list(Static_Prerequisites.activatable)),
    combatTechniques: option(list((int, int))),
    skills: option(list((int, int))),
    spells: option(list((int, GenericHelpers.oneOrMany(int)))),
    liturgicalChants: option(list((int, GenericHelpers.oneOrMany(int)))),
    blessings: option(list(int)),
  };

  let variantUniv = json => {
    id: json |> field("id", int),
    cost: json |> field("cost", int),
    sexDependency:
      json |> optionalField("sexDependency", Static_Prerequisites.Decode.sex),
    raceDependency:
      json
      |> optionalField("raceDependency", Static_Prerequisites.Decode.race),
    cultureDependency:
      json
      |> optionalField(
           "cultureDependency",
           Static_Prerequisites.Decode.culture,
         ),
    activatablePrerequisites:
      json
      |> optionalField(
           "activatablePrerequisites",
           list(Static_Prerequisites.Decode.activatable),
         ),
    increasablePrerequisites:
      json
      |> optionalField(
           "increasablePrerequisites",
           list(Static_Prerequisites.Decode.increasable),
         ),
    skillSpecializationSelectOptions:
      json
      |> optionalField(
           "skillSpecializationSelectOptions",
           variantSkillSpecializationOption,
         ),
    languageScriptSelectOptions:
      json
      |> optionalField(
           "languageScriptSelectOptions",
           variantLanguageAndScriptOption,
         ),
    combatTechniqueSelectOptions:
      json
      |> optionalField(
           "combatTechniqueSelectOptions",
           variantCombatTechniqueOption,
         ),
    cantripSelectOptions:
      json |> optionalField("cantripSelectOptions", cantripOption),
    curseSelectOptions:
      json |> optionalField("curseSelectOptions", curseOption),
    terrainKnowledgeSelectOptions:
      json
      |> optionalField(
           "terrainKnowledgeSelectOptions",
           terrainKnowledgeOption,
         ),
    skillSelectOptions:
      json |> optionalField("skillSelectOptions", skillOption),
    specialAbilities:
      json
      |> optionalField(
           "specialAbilities",
           list(Static_Prerequisites.Decode.activatable),
         ),
    combatTechniques:
      json
      |> optionalField(
           "combatTechniques",
           list(json =>
             (json |> field("id", int), json |> field("value", int))
           ),
         ),
    skills:
      json
      |> optionalField(
           "skills",
           list(json =>
             (json |> field("id", int), json |> field("value", int))
           ),
         ),
    spells:
      json
      |> optionalField(
           "spells",
           list(json =>
             (
               json |> field("id", int),
               json
               |> field("value", Static_Prerequisites.Decode.oneOrManyInt),
             )
           ),
         ),
    liturgicalChants:
      json
      |> optionalField(
           "liturgicalChants",
           list(json =>
             (
               json |> field("id", int),
               json
               |> field("value", Static_Prerequisites.Decode.oneOrManyInt),
             )
           ),
         ),
    blessings: json |> optionalField("blessings", list(int)),
  };

  let variant = (univ, l10n) => (
    univ.id,
    {
      id: univ.id,
      name: l10n.name,
      cost: univ.cost,
      prerequisites: {
        sex: univ.sexDependency,
        race: univ.raceDependency,
        culture: univ.cultureDependency,
        activatable:
          univ.activatablePrerequisites |> Ley.Option.fromOption([]),
        increasable:
          univ.increasablePrerequisites |> Ley.Option.fromOption([]),
      },
      options: {
        skillSpecialization: univ.skillSpecializationSelectOptions,
        languageScript: univ.languageScriptSelectOptions,
        combatTechnique: univ.combatTechniqueSelectOptions,
        cantrip: univ.cantripSelectOptions,
        curse: univ.curseSelectOptions,
        terrainKnowledge: univ.terrainKnowledgeSelectOptions,
        skill: univ.skillSelectOptions,
        guildMageUnfamiliarSpell:
          Ley.Option.option(
            false,
            Ley.List.Foldable.any((x: Static_Prerequisites.activatable) =>
              x.id
              == `SpecialAbility(Id.specialAbilityToInt(TraditionGuildMages))
              && x.active
            ),
            univ.activatablePrerequisites,
          ),
      },
      specialAbilities: univ.specialAbilities |> Ley.Option.fromOption([]),
      combatTechniques:
        univ.combatTechniques
        |> Ley.Option.option(Ley.IntMap.empty, Ley.IntMap.fromList),
      skills:
        univ.skills
        |> Ley.Option.option(Ley.IntMap.empty, Ley.IntMap.fromList),
      spells:
        univ.spells
        |> Ley.Option.option(Ley.IntMap.empty, Ley.IntMap.fromList),
      liturgicalChants:
        univ.liturgicalChants
        |> Ley.Option.option(Ley.IntMap.empty, Ley.IntMap.fromList),
      blessings: univ.blessings |> Ley.Option.fromOption([]),
      precedingText: l10n.precedingText,
      fullText: l10n.fullText,
      concludingText: l10n.concludingText,
      errata: l10n.errata,
    },
  );

  type tL10n = {
    id: int,
    name,
    subname: option(name),
    activatablePrerequisites: option(list(Static_Prerequisites.activatable)),
    prerequisitesStart: option(string),
    suggestedAdvantages: option(string),
    suggestedDisadvantages: option(string),
    unsuitableAdvantages: option(string),
    unsuitableDisadvantages: option(string),
    variants: option(list(variantL10n)),
    src: list(Static_SourceRef.t),
    errata: list(Static_Erratum.t),
  };

  let tL10n = json => {
    id: json |> field("id", int),
    name: json |> field("name", name),
    subname: json |> optionalField("subname", name),
    activatablePrerequisites:
      json
      |> optionalField(
           "activatablePrerequisites",
           list(Static_Prerequisites.Decode.activatable),
         ),
    prerequisitesStart: json |> optionalField("prerequisitesStart", string),
    suggestedAdvantages: json |> optionalField("suggestedAdvantages", string),
    suggestedDisadvantages:
      json |> optionalField("suggestedDisadvantages", string),
    unsuitableAdvantages:
      json |> optionalField("unsuitableAdvantages", string),
    unsuitableDisadvantages:
      json |> optionalField("unsuitableDisadvantages", string),
    variants: json |> optionalField("variants", list(variantL10n)),
    src: json |> field("src", Static_SourceRef.Decode.list),
    errata: json |> field("errata", Static_Erratum.Decode.list),
  };

  type tUniv = {
    id: int,
    cost: int,
    sexDependency: option(Static_Prerequisites.sex),
    raceDependency: option(Static_Prerequisites.race),
    cultureDependency: option(Static_Prerequisites.culture),
    activatablePrerequisites: option(list(Static_Prerequisites.activatable)),
    increasablePrerequisites: option(list(Static_Prerequisites.increasable)),
    skillSpecializationSelectOptions: option(skillSpecializationOption),
    languageScriptSelectOptions: option(languageAndScriptOption),
    combatTechniqueSelectOptions: option(combatTechniqueOption),
    cantripSelectOptions: option(cantripOption),
    curseSelectOptions: option(curseOption),
    terrainKnowledgeSelectOptions: option(terrainKnowledgeOption),
    skillSelectOptions: option(skillOption),
    specialAbilities: option(list(Static_Prerequisites.activatable)),
    combatTechniques: option(list((int, int))),
    skills: option(list((int, int))),
    spells: option(list((int, GenericHelpers.oneOrMany(int)))),
    liturgicalChants: option(list((int, GenericHelpers.oneOrMany(int)))),
    blessings: option(list(int)),
    suggestedAdvantages: option(list(int)),
    suggestedDisadvantages: option(list(int)),
    unsuitableAdvantages: option(list(int)),
    unsuitableDisadvantages: option(list(int)),
    variants: option(list(variantUniv)),
    isVariantRequired: bool,
    gr: int,
    sgr: int,
  };

  let tUniv = json => {
    id: json |> field("id", int),
    cost: json |> field("cost", int),
    sexDependency:
      json |> optionalField("sexDependency", Static_Prerequisites.Decode.sex),
    raceDependency:
      json
      |> optionalField("raceDependency", Static_Prerequisites.Decode.race),
    cultureDependency:
      json
      |> optionalField(
           "cultureDependency",
           Static_Prerequisites.Decode.culture,
         ),
    activatablePrerequisites:
      json
      |> optionalField(
           "activatablePrerequisites",
           list(Static_Prerequisites.Decode.activatable),
         ),
    increasablePrerequisites:
      json
      |> optionalField(
           "increasablePrerequisites",
           list(Static_Prerequisites.Decode.increasable),
         ),
    skillSpecializationSelectOptions:
      json
      |> optionalField(
           "skillSpecializationSelectOptions",
           skillSpecializationOption,
         ),
    languageScriptSelectOptions:
      json
      |> optionalField("languageScriptSelectOptions", languageAndScriptOption),
    combatTechniqueSelectOptions:
      json
      |> optionalField("combatTechniqueSelectOptions", combatTechniqueOption),
    cantripSelectOptions:
      json |> optionalField("cantripSelectOptions", cantripOption),
    curseSelectOptions:
      json |> optionalField("curseSelectOptions", curseOption),
    terrainKnowledgeSelectOptions:
      json
      |> optionalField(
           "terrainKnowledgeSelectOptions",
           terrainKnowledgeOption,
         ),
    skillSelectOptions:
      json |> optionalField("skillSelectOptions", skillOption),
    specialAbilities:
      json
      |> optionalField(
           "specialAbilities",
           list(Static_Prerequisites.Decode.activatable),
         ),
    combatTechniques:
      json
      |> optionalField(
           "combatTechniques",
           list(json =>
             (json |> field("id", int), json |> field("value", int))
           ),
         ),
    skills:
      json
      |> optionalField(
           "skills",
           list(json =>
             (json |> field("id", int), json |> field("value", int))
           ),
         ),
    spells:
      json
      |> optionalField(
           "spells",
           list(json =>
             (
               json |> field("id", int),
               json
               |> field("value", Static_Prerequisites.Decode.oneOrManyInt),
             )
           ),
         ),
    liturgicalChants:
      json
      |> optionalField(
           "liturgicalChants",
           list(json =>
             (
               json |> field("id", int),
               json
               |> field("value", Static_Prerequisites.Decode.oneOrManyInt),
             )
           ),
         ),
    blessings: json |> optionalField("blessings", list(int)),
    suggestedAdvantages:
      json |> optionalField("suggestedAdvantages", list(int)),
    suggestedDisadvantages:
      json |> optionalField("suggestedDisadvantages", list(int)),
    unsuitableAdvantages:
      json |> optionalField("unsuitableAdvantages", list(int)),
    unsuitableDisadvantages:
      json |> optionalField("unsuitableDisadvantages", list(int)),
    variants: json |> optionalField("variants", list(variantUniv)),
    isVariantRequired: json |> field("isVariantRequired", bool),
    gr: json |> field("gr", int),
    sgr: json |> field("sgr", int),
  };

  let t = (univ, l10n) => (
    univ.id,
    {
      id: univ.id,
      name: l10n.name,
      subname: l10n.subname,
      cost: univ.cost,
      prerequisites: {
        sex: univ.sexDependency,
        race: univ.raceDependency,
        culture: univ.cultureDependency,
        activatable:
          univ.activatablePrerequisites |> Ley.Option.fromOption([]),
        increasable:
          univ.increasablePrerequisites |> Ley.Option.fromOption([]),
      },
      prerequisitesStart: l10n.prerequisitesStart,
      options: {
        skillSpecialization: univ.skillSpecializationSelectOptions,
        languageScript: univ.languageScriptSelectOptions,
        combatTechnique: univ.combatTechniqueSelectOptions,
        cantrip: univ.cantripSelectOptions,
        curse: univ.curseSelectOptions,
        terrainKnowledge: univ.terrainKnowledgeSelectOptions,
        skill: univ.skillSelectOptions,
        guildMageUnfamiliarSpell:
          Ley.Option.option(
            false,
            Ley.List.Foldable.any((x: Static_Prerequisites.activatable) =>
              x.id
              == `SpecialAbility(Id.specialAbilityToInt(TraditionGuildMages))
              && x.active
            ),
            univ.activatablePrerequisites,
          ),
      },
      specialAbilities: univ.specialAbilities |> Ley.Option.fromOption([]),
      combatTechniques:
        univ.combatTechniques
        |> Ley.Option.option(Ley.IntMap.empty, Ley.IntMap.fromList),
      skills:
        univ.skills
        |> Ley.Option.option(Ley.IntMap.empty, Ley.IntMap.fromList),
      spells:
        univ.spells
        |> Ley.Option.option(Ley.IntMap.empty, Ley.IntMap.fromList),
      liturgicalChants:
        univ.liturgicalChants
        |> Ley.Option.option(Ley.IntMap.empty, Ley.IntMap.fromList),
      blessings: univ.blessings |> Ley.Option.fromOption([]),
      suggestedAdvantages:
        univ.suggestedAdvantages |> Ley.Option.fromOption([]),
      suggestedAdvantagesText: l10n.suggestedAdvantages,
      suggestedDisadvantages:
        univ.suggestedDisadvantages |> Ley.Option.fromOption([]),
      suggestedDisadvantagesText: l10n.suggestedDisadvantages,
      unsuitableAdvantages:
        univ.unsuitableAdvantages |> Ley.Option.fromOption([]),
      unsuitableAdvantagesText: l10n.unsuitableAdvantages,
      unsuitableDisadvantages:
        univ.unsuitableDisadvantages |> Ley.Option.fromOption([]),
      unsuitableDisadvantagesText: l10n.unsuitableDisadvantages,
      variants:
        Yaml_Zip.zipBy(
          Ley.Int.show,
          variant,
          x => x.id,
          x => x.id,
          univ.variants |> Ley.Option.fromOption([]),
          l10n.variants |> Ley.Option.fromOption([]),
        )
        |> Ley.IntMap.fromList,
      isVariantRequired: univ.isVariantRequired,
      gr: univ.gr,
      sgr: univ.sgr,
      src: l10n.src,
      errata: l10n.errata,
    },
  );

  let all = (yamlData: Yaml_Raw.yamlData) =>
    Yaml_Zip.zipBy(
      Ley.Int.show,
      t,
      x => x.id,
      x => x.id,
      yamlData.professionsUniv |> list(tUniv),
      yamlData.professionsL10n |> list(tL10n),
    )
    |> Ley.IntMap.fromList;
};
