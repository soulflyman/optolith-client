import { SelectOptionId } from "../../../Constants/Id.gen"
import { SelectOption } from "../../Static_SelectOption.gen"
import { DropdownOption } from "../../View/DropdownOption"

export { SelectOption }

export const selectToDropdownOption =
  (x: SelectOption): DropdownOption<SelectOptionId> =>
    ({
      id: x.id,
      name: x.name,
    })
