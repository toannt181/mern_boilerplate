import React from 'react'
import LetterAvatar from 'components/LetterAvatar'

const MessageAvatar = ({ user, onClick }) => (
  <LetterAvatar
    className="is-medium"
    color={user.avatar}
    background={user.thumbnail}
    onClick={onClick}
  >
    {user.name && user.name[0]}
  </LetterAvatar>
)

export default MessageAvatar
