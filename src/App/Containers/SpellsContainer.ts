import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import * as ConfigActions from "../Actions/ConfigActions";
import * as SpellsActions from "../Actions/SpellsActions";
import { AppState } from "../Reducers/appReducer";
import { getAttributesForSheet } from "../Selectors/attributeSelectors";
import { getDerivedCharacteristicsMap } from "../Selectors/derivedCharacteristicsSelectors";
import { getIsRemovingEnabled } from "../Selectors/phaseSelectors";
import { getFilteredActiveSpellsAndCantrips, getFilteredInactiveSpellsAndCantrips, getMagicalTraditionsFromWiki, isActivationDisabled } from "../Selectors/spellsSelectors";
import { getInactiveSpellsFilterText, getSpellsFilterText } from "../Selectors/stateSelectors";
import { getEnableActiveItemHints, getSpellsSortOrder } from "../Selectors/uisettingsSelectors";
import { Spells, SpellsDispatchProps, SpellsOwnProps, SpellsStateProps } from "../Views/Spells/Spells";

const mapStateToProps = (state: AppState, ownProps: SpellsOwnProps): SpellsStateProps => ({
  activeList: getFilteredActiveSpellsAndCantrips (state, ownProps),
  inactiveList: getFilteredInactiveSpellsAndCantrips (state, ownProps),
  attributes: getAttributesForSheet (state),
  derivedCharacteristics: getDerivedCharacteristicsMap (state, ownProps),
  addSpellsDisabled: isActivationDisabled (state),
  enableActiveItemHints: getEnableActiveItemHints (state),
  isRemovingEnabled: getIsRemovingEnabled (state),
  traditions: getMagicalTraditionsFromWiki (state),
  sortOrder: getSpellsSortOrder (state),
  filterText: getSpellsFilterText (state),
  inactiveFilterText: getInactiveSpellsFilterText (state),
})

const mapDispatchToProps = (
  dispatch: Dispatch<Action, AppState>,
  { locale }: SpellsOwnProps
): SpellsDispatchProps => ({
  addPoint (id: string) {
    dispatch (SpellsActions.addSpellPoint (locale) (id))
  },
  addToList (id: string) {
    dispatch (SpellsActions.addSpell (locale) (id))
  },
  addCantripToList (id: string) {
    dispatch (SpellsActions.addCantrip (locale) (id))
  },
  removePoint (id: string) {
    dispatch (SpellsActions.removeSpellPoint (id))
  },
  removeFromList (id: string) {
    dispatch (SpellsActions.removeSpell (id))
  },
  removeCantripFromList (id: string) {
    dispatch (SpellsActions.removeCantrip (id))
  },
  setSortOrder (sortOrder: string) {
    dispatch (SpellsActions.setSpellsSortOrder (sortOrder))
  },
  switchActiveItemHints () {
    dispatch (ConfigActions.switchEnableActiveItemHints ())
  },
  setFilterText (filterText: string) {
    dispatch (SpellsActions.setActiveSpellsFilterText (filterText))
  },
  setInactiveFilterText (filterText: string) {
    dispatch (SpellsActions.setInactiveSpellsFilterText (filterText))
  },
})

export const connectSpells =
  connect<SpellsStateProps, SpellsDispatchProps, SpellsOwnProps, AppState> (
    mapStateToProps,
    mapDispatchToProps
  )

export const SpellsContainer = connectSpells (Spells)
