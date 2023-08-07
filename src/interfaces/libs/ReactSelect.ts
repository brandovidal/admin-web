
import type { ActionMeta, GroupBase, MultiValue, OptionsOrGroups, PropsValue, SingleValue } from 'react-select'

export interface IconOptionProps {
  id?: string
  name?: string
  label?: string
  value: string | number
  flag?: string
}

export interface ReactSelectProps {
  options?: OptionsOrGroups<IconOptionProps, GroupBase<IconOptionProps>> | IconOptionProps[] | []
  onChange?: (newValue: MultiValue<IconOptionProps> | SingleValue<IconOptionProps>, actionMeta: ActionMeta<IconOptionProps>) => void
  value?: PropsValue<IconOptionProps>
  placeholder?: string
  noOptionsMessage?: string
  isMulti?: boolean
  isSearchable?: boolean
  isClearable?: boolean
  isDisabled?: boolean
}
