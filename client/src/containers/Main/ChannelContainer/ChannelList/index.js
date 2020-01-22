import React from 'react'
import { ChannelListWrapper, ChannelTitle } from './styles'

const UserStatus = () => (
  <ChannelListWrapper>
    <ChannelTitle>Channel</ChannelTitle>
    <ul className="channel-list">
      <li className="channel-item">#general</li>
      <li className="channel-item">#game</li>
      <li className="channel-item">#public</li>
    </ul>
  </ChannelListWrapper>
)

export default UserStatus
