import type { DateTimePickerProps } from 'react-flatpickr'
import type DatePicker from 'react-flatpickr'

import { type BaseOptions } from 'flatpickr/dist/types/options'

export interface ReactFlatpickrProps extends DateTimePickerProps {
  invalid?: boolean
}

export interface DatePickerProps extends DatePicker { }

export interface ReactFlatpickrOptionsProps extends Partial<BaseOptions> { }
