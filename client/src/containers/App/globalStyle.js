import { createGlobalStyle } from 'styled-components'
import 'normalize.css'
import 'bulma/css/bulma.css'
import mixin from './mixin'

export default createGlobalStyle`
  ${mixin}

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  ul,li {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  input {
    border: none;
    background: transparent;

    &:focus {
      outline: none;
    }
  }

  .btn {
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.colors.regular};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    padding: 10px 20px;
    text-align: center;
    transition: all .4s ease;

    &:focus {
      box-shadow: none;
    }

    &.primary {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};

      &:hover {
        background-color: ${({ theme }) => theme.colors.blue2};
        color: $white;
      }
    }

    &.block {
      display: block;
      width: 100%;
    }

    &.sm {
      font-size: ${({ theme }) => theme.colors.small};
      padding: 4px 6px;
    }
  }
  
  .input2 {
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.blue3};
    padding: 8px 12px;
    display: block;
    width: 100%;
  }
  
  .btn-none {
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`
