import { useRef } from 'react'

import classNames from 'classnames'

import Flatpickr from 'react-flatpickr'
import type DatePicker from 'react-flatpickr'
import { Spanish } from 'flatpickr/dist/l10n/es.js'

import 'flatpickr/dist/themes/airbnb.css'

import { Flex, IconButton, useColorMode } from '@chakra-ui/react'
import { FiX } from 'react-icons/fi'

import Tooltip from '@/common/ToolTip/default'

import { DELETE, NO_OP } from '@/constants/default'

import { type ReactFlatpickrProps } from '@/interfaces/libs/ReactFlatpickr'

import isEmpty from 'just-is-empty'

export const ReactFlatpickr = ({ placeholder = 'DD-MM-YYYY', value = '', onChange = NO_OP, invalid = false, disabled = false }: ReactFlatpickrProps): JSX.Element => {
  const refElm = useRef<DatePicker>(null)

  const clearDate = (): void => refElm.current?.flatpickr.clear()

  const options = { dateFormat: 'd-m-Y', locale: Spanish, clickOpens: !disabled }

  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  if (isDark) {
    import('flatpickr/dist/themes/dark.css')
  }

  const className = classNames(
    'custom-datapicker-input',
    !isDark || 'custom-datapicker-input-dark',
    !invalid || 'custom-datapicker-input-error',
    (!invalid && isDark) || 'custom-datapicker-input-error-dark'
  )

  return (
    <Flex gap={2}>
      <Flatpickr
        ref={refElm}
        autoComplete='off'
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        options={options}
      />
      {
        !isEmpty(value) && (<Tooltip label={DELETE}>
          <IconButton colorScheme='blue' variant='outline' aria-label={DELETE} size='md' borderRadius={8} icon={<FiX />} onClick={clearDate} />
        </Tooltip>)
      }

    </Flex>
  )
}
