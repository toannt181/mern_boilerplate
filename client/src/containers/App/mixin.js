const margins = Array(8).fill().map((_, i) => `
  .ml-${i + 1} {
    margin-left: ${0.5 * (i + 1)}rem;
  }

  .mr-${i + 1} {
    margin-right: ${0.5 * (i + 1)}rem;
  }

  .mt-${i + 1} {
    margin-top: ${0.5 * (i + 1)}rem;
  }

  .mb-${i + 1} {
    margin-bottom: ${0.5 * (i + 1)}rem;
  }
`)
  .join('\n')

const mixin = `
  ${margins}

  .ml-auto {
    margin-left: auto;
  }

  .d-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default mixin