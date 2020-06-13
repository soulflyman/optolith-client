module Magical: {
  /**
   * `getHeroEntries` returns active special ability entries for all active
   * magical traditions.
   */
  let getHeroEntries:
    (Static.t, Ley.IntMap.t(Hero.Activatable.t)) => list(Hero.Activatable.t);

  /**
   * `getStaticEntries` returns static special ability entries for all active
   * magical traditions.
   */
  let getStaticEntries:
    (Static.t, Ley.IntMap.t(Hero.Activatable.t)) =>
    list(Static_SpecialAbility.t);

  type fullTradition = (
    Static.SpecialAbility.t,
    Hero.Activatable.t,
    Static.MagicalTradition.t,
  );

  /**
   * `getEntries` returns active and static special ability entries as well as
   * static tradition entries for active magical traditions.
   */
  let getEntries:
    (Static.t, Ley.IntMap.t(Hero.Activatable.t)) => list(fullTradition);

  /**
   * `idToNumId staticData id` converts a magical tradition's special ability ID
   * into a numeric tradition ID used by spells and cantrips.
   */
  let idToNumId: (Static.t, Ley.IntMap.key) => option(int);

  /**
   * `numIdToId staticData id` converts a numeric tradition ID used by spells
   * and cantrips into a magical tradition's special ability ID.
   */
  let numIdToId: (Static.t, option(int)) => option(int);

  /**
   * Returns the primary attribute ID for the currently active magical
   * tradition.
   */
  let getPrimaryAttributeId:
    (Static.t, Ley.IntMap.t(Hero.Activatable.t)) => option(int);
};
module Blessed: {
  /**
   * `getHeroEntry` returns the active special ability entry for the active
   * blessed traditions.
   */
  let getHeroEntry:
    (Static.t, Ley.IntMap.t(Hero.Activatable.t)) =>
    option(Hero.Activatable.t);

  /**
   * `getStaticEntry` returns the static special ability entry for the active
   * blessed traditions.
   */
  let getStaticEntry:
    (Static.t, Ley.IntMap.t(Hero.Activatable.t)) =>
    option(Static_SpecialAbility.t);

  type fullTradition = (
    Static.SpecialAbility.t,
    Hero.Activatable.t,
    Static.BlessedTradition.t,
  );

  /**
   * `getEntry` returns the active and static special ability entry as well as
   * the static tradition entry for the active blessed traditions.
   */
  let getEntry:
    (Static.t, Ley.IntMap.t(Hero.Activatable.t)) => option(fullTradition);

  /**
   * `idToNumId staticData id` converts a blessed tradition's special ability ID
   * into a numeric tradition ID used by chants and blessings.
   */
  let idToNumId: (Static.t, Ley.IntMap.key) => option(int);

  /**
   * `numIdToId staticData id` converts a numeric tradition ID used by chants
   * and blessings into a blessed tradition's special ability ID.
   */
  let numIdToId: (Static.t, int) => option(int);

  /**
   * Returns the primary attribute ID for the currently active blessed
   * tradition.
   */
  let getPrimaryAttributeId:
    (Static.t, Ley.IntMap.t(Hero.Activatable.t)) => option(int);
};
