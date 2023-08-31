// interfaces
import type { ViewProps } from './default'
import type { OptionProps } from '../common/Option'

export interface CourseViewProps extends ViewProps {
  uniqueProgramOptions: OptionProps[] | []
  useOnChangeName: () => void
  useOnChangeTotal: () => void
  hasUniqueProgram: boolean
}
