import React, { useState } from 'react'
import styled from 'styled-components'
import Dropdown from 'components/Dropdown'

export const RoomHeadingWrapper = styled.div`
  padding: 16px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray14};

  .fa {
    font-size: 20px;
  }
`

export const MenuWrapper = styled.div`
  .dropdown-item {
    padding: 8px 12px;
  }
`

export const Menu = ({ deleteChannel }) => (
  <MenuWrapper>
    <button onClick={deleteChannel} className="btn-none dropdown-item">
      Delete channel
    </button>
    {/* <button className="btn-none dropdown-item">
      Other dropdown item
    </button>
    <button href="#" className="btn-none dropdown-item is-active">
      Active dropdown item
    </button>
    <button href="#" className="btn-none dropdown-item">
      Other dropdown item
    </button>
    <hr className="dropdown-divider" />
    <button href="#" className="btn-none dropdown-item">
      With a divider
    </button> */}
  </MenuWrapper>
)

const RoomHeading = (props) => {
  const {
    currentChannel = null,
    deleteChannel,
    onInviteMember = (() => { }),
  } = props

  const [isShowMenu, toggleMenu] = useState(false)

  const onClickEllipse = () => toggleMenu(state => !state)

  return currentChannel && (
    <RoomHeadingWrapper className="d-center">
      <h3 className="title is-1">#{currentChannel.name}</h3>
      <div className="ml-auto d-center">
        <button className="btn-none is-circle is-big"><i className="fa fa-star-o" aria-hidden="true" /></button>
        <button className="btn-none is-circle is-big" onClick={onInviteMember}><i className="fa fa-plus" aria-hidden="true" /></button>
        <Dropdown
          isActive={isShowMenu}
          menu={<Menu deleteChannel={deleteChannel} />}
        >
          <button className="btn-none is-circle is-big" onClick={onClickEllipse}><i className="fa fa-ellipsis-v" aria-hidden="true" /></button>
        </Dropdown>
      </div>
    </RoomHeadingWrapper>
  )
}

export default RoomHeading
