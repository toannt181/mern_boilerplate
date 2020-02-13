import React, { useEffect, memo } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import cn from 'classnames'
import { actions as userActions } from 'slices/userSlice'
import LetterAvatar from 'components/LetterAvatar'

export const FriendListWrapper = styled.div`
  padding: 16px;

  .list {
    margin-top: 8px;
  }

  .member-item {
    display: flex;
    align-items: center;

    .name {
      margin-left: 8px;
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }
  }
`

const FriendList = (props) => {
  const {
    members = [],
    title = '',
    dispatchFetchMemberList,
  } = props

  useEffect(() => {
    dispatchFetchMemberList()
  }, [])

  return (
    <FriendListWrapper>
      <div className="d-center mb-2">
        <p className="subtitle mr-auto">{title}</p>
      </div>
      <ul className="channel-list">
        {members.map((member) => (
          <div className="member-item" key={member._id}>
            <LetterAvatar
              className="is-small"
              color={member.avatar}
              background={member.thumbnail}
              status={member.status}
            >
              {member.name[0]}
            </LetterAvatar>
            <div className="name">{member.name}</div>
          </div>
        ))}
      </ul>
    </FriendListWrapper>
  )
}

export default memo(connect(
  state => ({
    members: state.user.members,
  }),
  {
    dispatchFetchMemberList: userActions.dispatchFetchMemberList,
  }
)(FriendList))
