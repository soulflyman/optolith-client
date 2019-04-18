import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import * as ConfigActions from "../Actions/ConfigActions";
import * as SpecialAbilitiesActions from "../Actions/SpecialAbilitiesActions";
import { ActivateArgs, DeactivateArgs } from "../Models/Hero/heroTypeHelpers";
import { AppState } from "../Reducers/appReducer";
import { getFilteredActiveSpecialAbilities } from "../Selectors/activatableSelectors";
import { getFilteredInactiveSpecialAbilities } from "../Selectors/combinedActivatablesSelectors";
import { getIsRemovingEnabled } from "../Selectors/phaseSelectors";
import { getInactiveSpecialAbilitiesFilterText, getSpecialAbilities, getSpecialAbilitiesFilterText, getWikiSpecialAbilities } from "../Selectors/stateSelectors";
import { getEnableActiveItemHints, getSpecialAbilitiesSortOrder } from "../Selectors/uisettingsSelectors";
import { SpecialAbilities, SpecialAbilitiesDispatchProps, SpecialAbilitiesOwnProps, SpecialAbilitiesStateProps } from "../Views/SpecialAbilities/SpecialAbilities";

const mapStateToProps = (
  state: AppState,
  ownProps: SpecialAbilitiesOwnProps
): SpecialAbilitiesStateProps => ({
  activeList: getFilteredActiveSpecialAbilities (state, ownProps),
  deactiveList: getFilteredInactiveSpecialAbilities (state, ownProps),
  enableActiveItemHints: getEnableActiveItemHints (state),
  isRemovingEnabled: getIsRemovingEnabled (state),
  stateEntries: getSpecialAbilities (state),
  wikiEntries: getWikiSpecialAbilities (state),
  sortOrder: getSpecialAbilitiesSortOrder (state),
  filterText: getSpecialAbilitiesFilterText (state),
  inactiveFilterText: getInactiveSpecialAbilitiesFilterText (state),
})

const mapDispatchToProps = (
  dispatch: Dispatch<Action, AppState>,
  { locale }: SpecialAbilitiesOwnProps
): SpecialAbilitiesDispatchProps => ({
  setSortOrder (sortOrder: string) {
    dispatch (SpecialAbilitiesActions.setSpecialAbilitiesSortOrder (sortOrder))
  },
  switchActiveItemHints () {
    dispatch (ConfigActions.switchEnableActiveItemHints ())
  },
  addToList (args: ActivateArgs) {
    dispatch (SpecialAbilitiesActions.addSpecialAbility (locale) (args))
  },
  removeFromList (args: DeactivateArgs) {
    dispatch (SpecialAbilitiesActions.removeSpecialAbility (args))
  },
  setLevel (id: string, index: number, level: number) {
    dispatch (SpecialAbilitiesActions.setSpecialAbilityLevel (locale) (id) (index) (level))
  },
  setFilterText (filterText: string) {
    dispatch (SpecialAbilitiesActions.setActiveSpecialAbilitiesFilterText (filterText))
  },
  setInactiveFilterText (filterText: string) {
    dispatch (SpecialAbilitiesActions.setActiveSpecialAbilitiesFilterText (filterText))
  },
})

export const connectSpecialAbilities =
  connect<
    SpecialAbilitiesStateProps,
    SpecialAbilitiesDispatchProps,
    SpecialAbilitiesOwnProps,
    AppState
  > (
    mapStateToProps,
    mapDispatchToProps
  )

export const SpecialAbilitiesContainer = connectSpecialAbilities (SpecialAbilities)
