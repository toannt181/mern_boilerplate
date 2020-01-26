import React from 'react'
import { ChannelListWrapper, ChannelTitle, ChannelItem } from './styles'

const UserStatus = ({ channels, onAddChannel, onClickChannel, currentChannel }) => (
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
          #{channel.name}
        </ChannelItem>
      ))}
    </ul>
  </ChannelListWrapper>
)

export default UserStatus
