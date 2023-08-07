// import { useColorMode } from '@chakra-ui/react'
// import Select, { components } from 'react-select'
// import makeAnimated from 'react-select/animated'

// import ReactCountryFlag from 'react-country-flag'

// import { NO_OP } from '@/constants/default'

// const animatedComponents = makeAnimated()

// export const ReactSelect = ({
//   options = [],
//   onChange = NO_OP,
//   value = '',
//   placeholder = 'Seleccione una opción',
//   noOptionsMessage = 'No existen opciones',
//   isMulti = false,
//   isSearchable = true,
//   isClearable = true,
//   isDisabled = false
// }) => {
//   const { colorMode } = useColorMode()
//   const isDark = colorMode === 'dark'

//   const colorValue = isDark ? '#1a202c' : '#4299e1'
//   const colorInput = isDark ? '#E2E8F0' : '#2D3748'
//   const backgroundValue = isDark ? '#90cdf4' : '#e5f8fb'

//   const customStyles = {
//     option: (provided, { isSelected }) => ({
//       ...provided,
//       borderBottom: '1px solid #cccccc',
//       backgroundColor: isDark ? (isSelected ? '#1a202c' : '#2D3748') : isSelected ? '#BEE3F8' : '#fff',
//       color: isDark ? (isSelected ? '#F7FAFC' : '#E2E8F0') : isSelected ? '#4299e1' : '#171923',
//       padding: 10,
//       ':hover': {
//         backgroundColor: isDark ? '#171923' : '#EBF8FF',
//         color: isDark ? '#E2E8F0' : '#4299e1'
//       }
//     }),
//     control: (provided, state) => ({
//       ...provided,
//       backgroundColor: isDark ? '#2D3748' : '#fff',
//       color: isDark ? '#F7FAFC' : '#171923'
//     }),
//     singleValue: (provided, { isSelected }) => {
//       const opacity = isDisabled ? 0.5 : 1
//       const transition = 'opacity 300ms'
//       return { ...provided, opacity, transition, color: 'inherit' }
//     },
//     multiValue: (styles) => {
//       return {
//         ...styles,
//         backgroundColor: backgroundValue,
//         color: colorValue
//       }
//     },
//     multiValueLabel: (styles) => ({
//       ...styles,
//       color: colorValue
//     }),
//     input: (styles) => ({
//       ...styles,
//       color: colorInput
//     })
//   }

//   const { Option } = components
//   const IconOption = (props) => (
//     <Option {...props}>
//       {props.data.flag && <ReactCountryFlag svg countryCode={props.data.id} />}
//       {props.data.flag && ' '}
//       {props.data.label}
//     </Option>
//   )

//   return (
//     <Select
//       styles={customStyles}
//       placeholder={placeholder}
//       noOptionsMessage={() => noOptionsMessage}
//       options={options}
//       components={{ Option: IconOption, animatedComponents }}
//       onChange={onChange}
//       value={value}
//       isMulti={isMulti}
//       isClearable={isClearable}
//       isSearchable={isSearchable}
//       isDisabled={isDisabled}
//     />
//   )
// }
