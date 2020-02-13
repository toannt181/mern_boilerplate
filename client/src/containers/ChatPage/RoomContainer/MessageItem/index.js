import React from 'react'
import { MESSAGE_TYPE } from 'configs/constants'
import MessageText from './MessageText'
import MemberJoinMessage from './MemberJoinMessage'

const MessageItem = (props) => {
  const { message } = props

  switch (message.type) {
    case MESSAGE_TYPE.JOIN_MESSAGE:
      return <MemberJoinMessage {...props} />
    default:
      return <MessageText {...props} />
  }

}

export default MessageItem
