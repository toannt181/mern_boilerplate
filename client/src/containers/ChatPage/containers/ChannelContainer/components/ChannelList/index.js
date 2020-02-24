import React from 'react'
import cn from 'classnames'
import { ChannelListWrapper, ChannelTitle, ChannelItem } from './styles'

const ChannelList = (props) => {
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
            <div><span className="fa fa-commenting-o mr-2" />
              {channel.name}
              {!!channel.unreadMessageNumber && <span className="badge is-notification">{channel.unreadMessageNumber}</span>}
            </div>
          </ChannelItem>
        ))}
      </ul>
    </ChannelListWrapper>
  )
}

export default ChannelList
