import styled from 'styled-components'

export const MainWrapper = styled.div`
  /* height: 100%; */
  /* display: flex; */

  .main {
    display: flex;

    .main-content {
      margin-left: 80px;
      position: relative;
      flex: 1;
      min-height: calc(100vh - 80px)
    }
  }
`
