import { useColorMode } from '@chakra-ui/react'

import type { GroupBase, OptionProps, StylesConfig } from 'react-select'
import Select, { components } from 'react-select'

import ReactCountryFlag from 'react-country-flag'

import isEmpty from 'just-is-empty'

import { NO_OP } from '@/constants/default'
import { colors } from '@/constants/select'

import type { IconOptionProps, ReactSelectProps } from '@/interfaces/libs/ReactSelect'
import type { CustomStyles } from '@/types/react-select'
import { useId } from 'react'

function IconOption (props: OptionProps<IconOptionProps, boolean, GroupBase<IconOptionProps>>): JSX.Element {
  const { Option } = components

  return (
    <Option {...props}>
      {!isEmpty(props.data.flag) && !isEmpty(props.data.id) && <ReactCountryFlag svg countryCode={String(props.data.id)} />}
      {!isEmpty(props.data.flag) && ' '}
      {props.data.label}
    </Option>
  )
}

export function ReactSelect ({
  options = [],
  onChange = NO_OP,
  value = null,
  placeholder = 'Seleccione una opción',
  noOptionsMessage = 'No existen opciones',
  invalid = false,
  isMulti = false,
  isSearchable = true,
  isClearable = true,
  isDisabled = false
}: ReactSelectProps): JSX.Element {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const colorValue = isDark ? colors.dark : colors.light
  const colorInput = isDark ? colors.lightColor : colors.darkColor
  const backgroundValue = isDark ? colors.lightBackgroundColor : colors.darkBackgrounColor

  const customStyles: CustomStyles = {
    option: (provided: OptionProps, { isSelected = false }) => ({
      ...provided,
      borderBottom: '1px solid #cccccc',
      backgroundColor: isDark ? (isSelected ? colors.dark : colors.darkColor) : isSelected ? '#BEE3F8' : colors.darkText,
      color: isDark ? (isSelected ? colors.lightText : colors.lightColor) : isSelected ? colors.light : colors.darkBackground,
      padding: 8,
      ':hover': {
        backgroundColor: isDark ? colors.darkBackground : colors.lightBackground,
        color: isDark ? colors.lightColor : colors.light
      }
    }),
    control: (provided: OptionProps) => ({
      ...provided,
      padding: '0 0.25rem',
      minHeight: '2.55rem',
      borderWidth: '2px',
      borderColor: isDark ? invalid ? colors.errorColor : colors.darkBackground : invalid ? colors.errorColor : colors.lightColor,
      backgroundColor: isDark ? colors.darkColor : colors.darkText,
      color: isDark ? colors.lightText : colors.darkBackground,
      ':hover': {
        borderColor: isDark ? invalid ? colors.errorColor : colors.darkBackground : invalid ? colors.errorColor : colors.lightColor
      }
    }),
    singleValue: (provided: OptionProps) => {
      return {
        ...provided,
        opacity: isDisabled ? 0.5 : 1,
        transition: 'opacity 300ms',
        color: 'inherit'
      }
    },
    multiValue: (styles: StylesConfig) => {
      return {
        ...styles,
        backgroundColor: backgroundValue,
        color: colorValue
      }
    },
    multiValueLabel: (styles: StylesConfig) => ({
      ...styles,
      color: colorValue
    }),
    valueContainer: (styles: StylesConfig) => ({
      ...styles,
      margin: '0 0.5rem',
      padding: '0',
      color: isDark ? colors.lightText : colors.darkBackground
    }),
    clearIndicator: (styles: StylesConfig) => ({
      ...styles,
      margin: '0 0.25rem',
      padding: 0
    }),
    dropdownIndicator: (styles: StylesConfig) => ({
      ...styles,
      margin: '0 0.25rem',
      padding: 0
    }),
    input: (styles: StylesConfig) => ({
      ...styles,
      margin: '0',
      padding: '0',
      color: colorInput
    })
  }

  return (
    <Select
      instanceId={useId()}
      styles={customStyles}
      placeholder={placeholder}
      noOptionsMessage={() => noOptionsMessage}
      options={options}
      components={{ Option: IconOption }}
      onChange={onChange}
      value={value}
      isMulti={isMulti}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isDisabled={isDisabled} />
  )
}
