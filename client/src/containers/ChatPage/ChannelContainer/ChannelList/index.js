import React from 'react'
import cn from 'classnames'
import { ChannelListWrapper, ChannelTitle, ChannelItem } from './styles'

const UserStatus = (props) => {
  const {
    channels,
    onAddChannel = null,
    onClickChannel,
    currentChannelId,
    title = '',
  } = props

  return (
    <ChannelListWrapper>
      <ChannelTitle className="d-center mb-2">
        <p className="subtitle mr-auto">{title}</p>
        {onAddChannel && <button className="ml-auto btn-none btn-add" onClick={onAddChannel}><i className="fa fa-plus" aria-hidden="true" /></button>}
      </ChannelTitle>
      <ul className="channel-list">
        {channels.map((channel) => (
          <ChannelItem
            onClick={() => onClickChannel(channel._id)}
            className={cn('channel-item', { active: currentChannelId === channel._id })}
            key={channel._id}
          >
            <div><span className="fa fa-commenting-o mr-2" />{channel.name}<span className="badge is-notification">12</span></div>
            <span className="badge">{channel.number_unread_message}</span>
          </ChannelItem>
        ))}
      </ul>
    </ChannelListWrapper>
  )
}

export default UserStatus
