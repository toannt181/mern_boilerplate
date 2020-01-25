import React from 'react'
import { ChannelListWrapper, ChannelTitle } from './styles'

const UserStatus = ({ channels, onAddChannel }) => (
  <ChannelListWrapper>
    <ChannelTitle className="d-center">
      <div>Channel</div>
      <button className="ml-auto button is-small is-primary" onClick={onAddChannel}><i className="fa fa-plus" aria-hidden="true" /></button>
    </ChannelTitle>
    <ul className="channel-list">
      {channels.map((channel) => (
        <li className="channel-item" key={channel._id}>#{channel.name}</li>
      ))}
    </ul>
  </ChannelListWrapper>
)

export default UserStatus
