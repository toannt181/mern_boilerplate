import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import cn from 'classnames'

const DropdownWrapper = styled.div`
  .dropdown-menu {
    visibility: hidden;
  }

  &.left, &.right {
    .dropdown-menu {
      visibility: visible;
    }
  }

  &.right .dropdown-menu {
    left: initial;
    right: 0;
  }
`

const bindCloseDropdownClickOutside = (e) => {
  const { target } = e
  const dropdowns = new Array(...document.querySelectorAll('.dropdown.is-active'))
  const isClickInsideDropDown = dropdowns.some(dropdown => dropdown.contains(target))
  if (!isClickInsideDropDown) {
    dropdowns.forEach(dropdown => dropdown.classList.remove('is-active'))
  }
}

const Dropdown = ({ children, isActive, menu = null, up = false }) => {
  const dropdownRef = useRef()
  const [align, setAlign] = useState('')

  useEffect(() => {
    window.addEventListener('click', bindCloseDropdownClickOutside)
  }, [])

  useEffect(() => {
    const ref = dropdownRef.current
    const { right } = ref.getBoundingClientRect()
    const isOverflowScreen = right > document.body.offsetWidth

    if (!isOverflowScreen) return
    if (align === 'left') {
      setAlign('right')
    } else {
      setAlign('left')
    }
  }, [isActive, align, setAlign])

  return (
    <DropdownWrapper className={align}>
      <div className={cn('dropdown', { 'is-active': isActive }, [up ? 'is-up' : 'is-down'])}>
        <div className="dropdown-trigger">
          {children}
        </div>
        <div className="dropdown-menu" id="dropdown-menu7" role="menu" ref={dropdownRef}>
          <div className="dropdown-content">
            {menu}
          </div>
        </div>
      </div>
    </DropdownWrapper >
  )
}

export default Dropdown
