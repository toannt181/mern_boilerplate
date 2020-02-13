import React from 'react'
import LetterAvatar from 'components/LetterAvatar'

const MessageAvatar = ({ user }) => (
  <LetterAvatar
    className="is-medium"
    color={user.avatar}
    background={user.thumbnail}
  >
    {user.name[0]}
  </LetterAvatar>
)

export default MessageAvatar
