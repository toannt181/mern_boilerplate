import React from 'react'
import styled from 'styled-components'

export const LogoWrapper = styled.div`
  .fa {
    font-size: 20px;
    ${({ size }) => size === 'big' && 'font-size: 28px'};
  }

  .text {
    margin-left: 4px;
  }

  vertical-align: middle;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`

function Logo({ iconOnly = false, ...rest }) {
  return (
    <LogoWrapper {...rest}><i className="fa fa-asterisk" />{!iconOnly && <span>MOVEONFLOW</span>}</LogoWrapper>
  )
}

export default Logo
