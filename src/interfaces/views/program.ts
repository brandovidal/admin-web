// interfaces
import type { CountryProps, OptionProps } from '../common/Option'
import type { ViewProps } from './default'

export interface ProgramViewProps extends ViewProps {
  countryOptions: CountryProps[] | []
  trainingOptions: OptionProps[] | []
  statusOptions: OptionProps[] | []
}
