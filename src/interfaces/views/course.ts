// interfaces
import type { OptionProps } from '../common/Option'
import type { ViewProps } from './default'

export interface CourseViewProps extends ViewProps {
  uniqueProgramOptions: OptionProps[] | []
}
