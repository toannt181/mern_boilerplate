import React from 'react'
import { ChannelListWrapper, ChannelTitle, ChannelItem } from './styles'

const UserStatus = (props) => {
  const {
    channels,
    onAddChannel,
    onClickChannel,
    currentChannel,
    onClickDeleteChannel,
  } = props

  return (
    <ChannelListWrapper>
      <ChannelTitle className="d-center mb-2">
        <div>Channel</div>
        <button className="ml-auto button is-small is-primary" onClick={onAddChannel}><i className="fa fa-plus" aria-hidden="true" /></button>
      </ChannelTitle>
      <ul className="channel-list">
        {channels.map((channel) => (
          <ChannelItem
            onClick={() => onClickChannel(channel._id)}
            className="channel-item"
            active={currentChannel === channel._id}
            key={channel._id}
          >
            <div>#{channel.name}</div>
            <div className="channel-id">{channel._id}</div>
            <button className="btn-delete btn-none" onClick={onClickDeleteChannel} data-id={channel._id}>
              <i className="fa fa-times-circle" aria-hidden="true" />
            </button>
          </ChannelItem>
        ))}
      </ul>
    </ChannelListWrapper>
  )
}

export default UserStatus
