import React from 'react'
import ReactSelect from 'react-select'

const Select = ({ options = [], ...rest }) => (
  <ReactSelect
    options={options}
    className={'react-select'}
    styles={{
      menuPortal: base => {
        const { zIndex, ...rest } = base;  // remove zIndex from base by destructuring
        return { ...rest, zIndex: 9999 };
      }
    }}
    menuPortalTarget={document.body}
    {...rest}
  />
)

export default Select
