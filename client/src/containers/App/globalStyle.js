import { createGlobalStyle } from 'styled-components'
import 'normalize.css'
import 'bulma/css/bulma.css'
import mixin from './mixin'

export default createGlobalStyle`
  ${mixin}

  * {
    box-sizing: border-box;
    word-break: break-word;
  }

  html {
    overflow: hidden;
  }

  body {
    margin: 0;
    font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${({ theme }) => theme.colors.gray5};
    background: ${({ theme }) => theme.colors.gray15};
    font-size: 16px;
  }

  #root {
    min-height: 100vh;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  ul, li {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  p {
    margin-bottom: 8px;
  }

  input {
    border: none;
    background: transparent;

    &:focus {
      outline: none;
    }
  }

  .btn-none {
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }
    &.is-primary {
      color: ${({ theme }) => theme.colors.primary};
    }

    &.is-circle {
      border-radius: 50%;

      &:hover {
        background: ${({ theme }) => theme.colors.gray14};
      }
    }

    &.is-big {
      height: 36px;
      width: 36px;
    }
  }

  .title:not(:last-child) {
    margin-bottom: 8px;
  }

  .subtitle:not(:last-child),
  .highlight:not(:last-child) {
    margin-bottom: 0;
  }

  .title {
    font-weight: ${({ theme }) => theme.fontWeight.bold};

    &.is-1 {
      font-size: ${({ theme }) => theme.size.xxlarge};
    }

    &.is-2 {
      font-size: ${({ theme }) => theme.size.xlarge};
    }

    &.is-3 {
      font-size: ${({ theme }) => theme.size.large};
    }
  }

  .sub-description {
    color: ${({ theme }) => theme.colors.gray5};
    font-size: ${({ theme }) => theme.size.small};
  }

  .subtitle {
    color: ${({ theme }) => theme.colors.gray3};
    font-size: ${({ theme }) => theme.size.medium};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  .label {
    color: ${({ theme }) => theme.colors.gray5};
  }

  .badge {
    padding: 0 5px;
    background: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.size.xtiny};
    border-radius: ${({ theme }) => theme.radius.small};
  }

  .button {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`
