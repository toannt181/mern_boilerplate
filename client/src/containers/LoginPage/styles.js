import styled from 'styled-components'
import { rgba } from 'polished'
import background from '../../assets/bg.jpg'

export const LoginPageWrapper = styled.div`
  background: ${({ theme }) => theme.colors.gray2};
  padding-top: 200px;
  height: 100vh;
  background: url(${background}) center center no-repeat;
  background-size: cover;

  .login-form {
    background: ${({ theme }) => theme.colors.gray3};
    border-radius: 4px;
    padding: 64px 40px;
    width: 720px;
    margin: auto;
    box-shadow: 0 2px 10px 0 ${({ theme }) => rgba(theme.colors.black, 0.2)};
  }

  .login-label {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.size.small};
    display: block;
  }
`

export const ChannelTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 4px;
`