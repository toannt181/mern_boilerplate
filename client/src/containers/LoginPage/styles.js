import styled from 'styled-components'
import { rgba } from 'polished'
import background from '../../assets/city.jpg'

export const LoginPageWrapper = styled.div`
  background: ${({ theme }) => theme.colors.gray2};
  height: 100vh;
  background: url(${background}) center center no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-container {
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.medium};
    width: 75%;
    display: flex;
    margin: auto;
    box-shadow: 0 2px 10px 0 ${({ theme }) => rgba(theme.colors.black, 0.2)};
  }

  .login-label {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.size.small};
    display: block;
  }

  .btn-group {
    margin-top: 40px;
  }

  .login-introduce, .login-form {
    flex: 1;
    padding: 64px;

    .sub-description {
      margin-bottom: 40px;
    }
  }

  .login-introduce {
    background: ${({ theme }) => theme.colors.gray15};
    border-radius: ${({ theme }) => theme.radius.medium};

    .title {
      margin-bottom: 20px;
    }

    .fa {
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 40px;
    }
  }
`

export const ChannelTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 4px;
`