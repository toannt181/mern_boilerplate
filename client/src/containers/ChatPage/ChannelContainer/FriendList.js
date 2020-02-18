import React, { useEffect, memo } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { actions as userActions } from 'slices/userSlice'
import { actions as appActions } from 'slices/appSlice'
import LetterAvatar from 'components/LetterAvatar'

export const FriendListWrapper = styled.div`
  padding: 8px 0;

  .subtitle {
    padding: 16px;
  }

  .member-item {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.colors.gray14};
    }

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
    dispatchUpdateViewUserId,
  } = props

  useEffect(() => {
    dispatchFetchMemberList()
  }, [dispatchFetchMemberList])

  const onClickMember = (id) => {
    dispatchUpdateViewUserId(id)
  }

  return (
    <FriendListWrapper>
      <div className="d-center">
        <p className="subtitle mr-auto">{title}</p>
      </div>
      <ul className="channel-list">
        {members.map((member) => (
          <div className="member-item mb-1" key={member._id} onClick={() => onClickMember(member._id)}>
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
    dispatchUpdateViewUserId: appActions.dispatchUpdateViewUserId,
  }
)(FriendList))
