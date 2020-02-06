import React from 'react'
import cn from 'classnames'
import { ChannelListWrapper, ChannelTitle, ChannelItem } from './styles'

const UserStatus = (props) => {
  const {
    channels,
    onAddChannel,
    onClickChannel,
    currentChannelId,
  } = props

  return (
    <ChannelListWrapper>
      <ChannelTitle className="d-center mb-2">
        <p className="subtitle">Channel</p>
        <button className="ml-auto btn-none is-primary" onClick={onAddChannel}><i className="fa fa-plus" aria-hidden="true" /></button>
      </ChannelTitle>
      <ul className="channel-list">
        {channels.map((channel) => (
          <ChannelItem
            onClick={() => onClickChannel(channel._id)}
            className={cn('channel-item', { active: currentChannelId === channel._id })}
            key={channel._id}
          >
            <div><span className="mr-1">#</span>{channel.name}</div>
            <span className="badge">{channel.number_unread_message}</span>
          </ChannelItem>
        ))}
      </ul>
    </ChannelListWrapper>
  )
}

export default UserStatus
