import React from 'react'
import styled from 'styled-components'

export const PageNotFoundWrapper = styled.div`
  text-align: center;
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);

  .title {
    font-size: 80px;
  }

  .subtitle {
    font-size: 30px;
  }
`

function PageNotFound() {
  return (
    <PageNotFoundWrapper>
      <h1 className="title">404</h1>
      <p className="subtitle">Page is being built</p>
    </PageNotFoundWrapper>
  )
}

export default PageNotFound
