import React from 'react'
import styled from 'styled-components'

export const RoomHeadingWrapper = styled.div`
  padding: 16px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray14};

  .fa {
    font-size: 28px;
    margin-left: 16px;
  }
`

const RoomHeading = (props) => {
  const {
    // channel,
  } = props

  return (
    <RoomHeadingWrapper className="d-center">
      <h3 className="title is-1">#Testing</h3>
      <div className="ml-auto">
        <i className="fa fa-star-o" aria-hidden="true" />
        <i className="fa fa-ellipsis-v" aria-hidden="true" />
      </div>
    </RoomHeadingWrapper>
  )
}

export default RoomHeading
