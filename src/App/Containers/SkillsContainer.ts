import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import * as SkillActions from "../Actions/SkillActions";
import { AppState } from "../Reducers/appReducer";
import { getAttributesForSheet } from "../Selectors/attributeSelectors";
import { getDerivedCharacteristicsMap } from "../Selectors/derivedCharacteristicsSelectors";
import { getIsRemovingEnabled } from "../Selectors/phaseSelectors";
import { getFilteredSkills, getSkillRating } from "../Selectors/skillsSelectors";
import { getSkillsFilterText } from "../Selectors/stateSelectors";
import { getSkillsCultureRatingVisibility, getSkillsSortOrder } from "../Selectors/uisettingsSelectors";
import { Skills, SkillsDispatchProps, SkillsOwnProps, SkillsStateProps } from "../Views/Skills/Skills";

const mapStateToProps = (state: AppState, ownProps: SkillsOwnProps): SkillsStateProps => ({
  attributes: getAttributesForSheet (state),
  derivedCharacteristics: getDerivedCharacteristicsMap (state, ownProps),
  isRemovingEnabled: getIsRemovingEnabled (state),
  list: getFilteredSkills (state, ownProps),
  sortOrder: getSkillsSortOrder (state),
  filterText: getSkillsFilterText (state),
  ratingVisibility: getSkillsCultureRatingVisibility (state),
  skillRating: getSkillRating (state),
})

const mapDispatchToProps = (
  dispatch: Dispatch<Action, AppState>,
  { locale }: SkillsOwnProps
): SkillsDispatchProps => ({
  addPoint (id: string) {
    dispatch (SkillActions.addSkillPoint (locale) (id))
  },
  removePoint (id: string) {
    dispatch (SkillActions.removeSkillPoint (id))
  },
  setSortOrder (sortOrder: string) {
    dispatch (SkillActions.setSkillsSortOrder (sortOrder))
  },
  switchRatingVisibility () {
    dispatch (SkillActions.switchSkillRatingVisibility ())
  },
  setFilterText (filterText: string) {
    dispatch (SkillActions.setSkillsFilterText (filterText))
  },
})

export const connectSkills =
  connect<SkillsStateProps, SkillsDispatchProps, SkillsOwnProps, AppState> (
    mapStateToProps,
    mapDispatchToProps
  )

export const SkillsContainer = connectSkills (Skills)
