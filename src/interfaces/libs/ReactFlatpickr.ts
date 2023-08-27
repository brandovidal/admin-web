import type { DateTimePickerProps } from 'react-flatpickr'
import type DatePicker from 'react-flatpickr'

import type { DateOption, BaseOptions } from 'flatpickr/dist/types/options'

export interface ReactFlatpickrProps extends DateTimePickerProps {
  invalid?: boolean
  maxDate?: DateOption
  minDate?: DateOption
}

export interface DatePickerProps extends DatePicker { }

export interface ReactFlatpickrOptionsProps extends Partial<BaseOptions> { }
