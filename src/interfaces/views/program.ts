// interfaces
import type { OptionProps } from '../common/Option'
import type { ViewProps } from './default'

export interface ProgramViewProps extends ViewProps {
  courseOptions: OptionProps[] | []
}
