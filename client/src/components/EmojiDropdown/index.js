import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import cn from 'classnames'
import { SMILEYS, PEOPLE, ANIMALS, SPORTS, FOODS } from './constants'

const EmojiDropdownWrapper = styled.div`
  .dropdown-content {
    width: 330px;
  }

  .dropdown-menu {
    left: initial;
    right: 0;
  }

  .tabs {
    margin-bottom: 8px;
  }

  .fa {
    font-size: 20px;
    padding: 4px;
    margin: auto;
  }

  .tab-content {
    height: 200px;
    overflow: auto;
  }

  .emoji {
    padding: 4px;
    width: 40px;
    height: 40px;
    font-size: 28px;

    &:hover {
      background: ${({ theme }) => theme.colors.gray14};
      border-radius: 50%;
    }
  }
`

const TAB_LIST = [
  { iconClass: 'fa fa-smile-o', list: SMILEYS },
  { iconClass: 'fa fa-blind', list: PEOPLE },
  { iconClass: 'fa fa-plane', list: ANIMALS },
  { iconClass: 'fa fa-futbol-o', list: SPORTS },
  { iconClass: 'fa fa-cutlery', list: FOODS },
]

const bindCloseDropdownClickOutside = (e) => {
  const { target } = e
  const dropdowns = new Array(...document.querySelectorAll('.dropdown.is-active'))
  const isClickInsideDropDown = dropdowns.some(dropdown => dropdown.contains(target))
  if (!isClickInsideDropDown) {
    dropdowns.forEach(dropdown => dropdown.classList.remove('is-active'))
  }
}

const EmojiDropdown = ({ children, isActive, onClick = () => { } }) => {
  const [tabIndex, setTabIndex] = useState(1)
  const tab = TAB_LIST[tabIndex]

  useEffect(() => {
    window.addEventListener('click', bindCloseDropdownClickOutside)
  }, [])

  return (
    <EmojiDropdownWrapper>
      <div className={cn('dropdown is-up', { 'is-active': isActive })}>
        <div className="dropdown-trigger">
          {children}
        </div>
        <div className="dropdown-menu" id="dropdown-menu7" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              <div className="tabs">
                <ul>
                  {TAB_LIST.map((tab, index) => (
                    <li key={index} className={cn({ 'is-active': tabIndex === index })} onClick={() => setTabIndex(index)}>
                      {/* eslint-disable-next-line */}
                      <a>
                        <i className={tab.iconClass} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tab-content">
                {tab.list.split(' ').map((item, index) => (
                  <button
                    key={index}
                    className="btn-none emoji"
                    onClick={() => onClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmojiDropdownWrapper>
  )
}

export default EmojiDropdown
