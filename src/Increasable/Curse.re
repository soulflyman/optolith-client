module Dynamic = ActivatableSkill.Dynamic;

module Static = {
  type t = {
    id: int,
    name: string,
    check: SkillCheck.t,
    checkMod: option(CheckModifier.t),
    effect: string,
    cost: ActivatableSkill.MainParameter.t,
    duration: ActivatableSkill.MainParameter.t,
    property: int,
    src: list(PublicationRef.t),
    errata: list(Erratum.t),
  };

  module Decode = {
    module Translation = {
      type t = {
        name: string,
        effect: string,
        cost: ActivatableSkill.MainParameter.translation,
        duration: ActivatableSkill.MainParameter.translation,
        errata: option(list(Erratum.t)),
      };

      let t = json =>
        JsonStrict.{
          name: json |> field("name", string),
          effect: json |> field("effect", string),
          cost: json |> field("cost", ActivatableSkill.MainParameter.decode),
          duration:
            json |> field("duration", ActivatableSkill.MainParameter.decode),
          errata: json |> optionalField("errata", Erratum.Decode.list),
        };
    };

    module TranslationMap = TranslationMap.Make(Translation);

    type multilingual = {
      id: int,
      check: SkillCheck.t,
      checkMod: option(CheckModifier.t),
      property: int,
      src: list(PublicationRef.Decode.multilingual),
      translations: TranslationMap.t,
    };

    let multilingual = json =>
      JsonStrict.{
        id: json |> field("id", int),
        check: json |> field("check", SkillCheck.Decode.t),
        checkMod: json |> optionalField("checkMod", CheckModifier.Decode.t),
        property: json |> field("property", int),
        src: json |> field("src", PublicationRef.Decode.multilingualList),
        translations: json |> field("translations", TranslationMap.Decode.t),
      };

    let resolveTranslations = (langs, x) =>
      Ley_Option.Infix.(
        x.translations
        |> TranslationMap.Decode.getFromLanguageOrder(langs)
        <&> (
          translation => {
            id: x.id,
            name: translation.name,
            check: x.check,
            checkMod: x.checkMod,
            effect: translation.effect,
            cost:
              ActivatableSkill.MainParameter.make(false, translation.cost),
            duration:
              ActivatableSkill.MainParameter.make(
                false,
                translation.duration,
              ),
            property: x.property,
            src: PublicationRef.Decode.resolveTranslationsList(langs, x.src),
            errata: translation.errata |> Ley_Option.fromOption([]),
          }
        )
      );

    let t = (langs, json) =>
      json |> multilingual |> resolveTranslations(langs);

    let toAssoc = (x: t) => (x.id, x);

    let assoc = Decoder.decodeAssoc(t, toAssoc);
  };
};
