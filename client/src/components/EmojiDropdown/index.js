import React, { useState } from 'react'
import styled from 'styled-components'
import cn from 'classnames'
import { SMILEYS, PEOPLE, ANIMALS, SPORTS, FOODS } from './constants'

const EmojiDropdownWrapper = styled.div`
  .dropdown-content {
    width: 250px;
  }

  .dropdown-menu {
    left: initial;
    right: 0;
  }

  .fa {
    font-size: 14px;
    padding: 4px;
  }

  .tab-content {
    height: 200px;
    overflow: auto;
  }
`

const TAB_LIST = [
  { iconClass: 'fa fa-smile-o', list: SMILEYS },
  { iconClass: 'fa fa-blind', list: PEOPLE },
  { iconClass: 'fa fa-plane', list: ANIMALS },
  { iconClass: 'fa fa-futbol-o', list: SPORTS },
  { iconClass: 'fa fa-cutlery', list: FOODS },
]

const EmojiDropdown = ({ children }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const tab = TAB_LIST[tabIndex]

  return (
    <EmojiDropdownWrapper>
      <div className="dropdown is-up is-active">
        <div className="dropdown-trigger">
          {children}
        </div>
        <div className="dropdown-menu" id="dropdown-menu7" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              <div className="tabs is-small">
                <ul>
                  {TAB_LIST.map((tab, index) => (
                    <li key={index} className={cn({ 'is-active': tabIndex === index })} onClick={() => setTabIndex(index)}>
                      <a>
                        <i className={tab.iconClass} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tab-content">
                {tab.list.split('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmojiDropdownWrapper>
  )
}

export default EmojiDropdown
