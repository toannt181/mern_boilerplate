import React from 'react'
import styled from 'styled-components'

export const InviteMessageWrapper = styled.div`
  padding: 16px;
`

const InviteMessage = (props) => {
  const {
    acceptInvitation,
  } = props

  return (
    <InviteMessageWrapper>
      <h2 className="title is-2">You are invited to channel</h2>
      <p className="sub-description">Click accept to continue</p>
      <button type="submit" className="mb-2 button is-primary" onClick={acceptInvitation}>Accept</button>
    </InviteMessageWrapper>
  )
}

export default InviteMessage
