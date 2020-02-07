const margins = Array(8).fill().map((_, i) => `
  .ml-${i + 1} {
    margin-left: ${0.5 * (i + 1)}rem !important;
  }

  .mr-${i + 1} {
    margin-right: ${0.5 * (i + 1)}rem !important;
  }

  .mt-${i + 1} {
    margin-top: ${0.5 * (i + 1)}rem !important;
  }

  .mb-${i + 1} {
    margin-bottom: ${0.5 * (i + 1)}rem !important;
  }
`)
  .join('\n')

const mixin = `
  ${margins}

  .ml-auto {
    margin-left: auto;
  }

  .mr-auto {
    margin-right: auto;
  }

  .d-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text-center {
    text-align: center;
  }
`

export default mixin