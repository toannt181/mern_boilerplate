import React from 'react'
import styled from 'styled-components'

export const LogoWrapper = styled.div`
  .fa {
      margin-right: 4px;
      font-size: 20px;
    }

  vertical-align: middle;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`

function Logo({ ...rest }) {
  return (
    <LogoWrapper {...rest}><i className="fa fa-asterisk" /> MOVEONFLOW</LogoWrapper>
  )
}

export default Logo
