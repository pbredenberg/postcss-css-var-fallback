const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts = { }) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('Inserts hex fallback', async () => {
  const inputCSS = `
  a {
    color: var(--colorA, #ffffff);
  }
  `;

  const expectedOuput = `
  a {
    color: #ffffff;
    color: var(--colorA, #ffffff);
  }
  `;

  await run(inputCSS, expectedOuput, { })
})

it('Inserts rgba fallback', async () => {
  const inputCSS = `
  b {
    color: var(--colorB, rgba(255, 255, 255, 0.3));
  }
  `;

  const expectedOuput = `
  b {
    color: rgba(255, 255, 255, 0.3);
    color: var(--colorB, rgba(255, 255, 255, 0.3));
  }
  `;

  await run(inputCSS, expectedOuput, { })
})

it('Inserts no fallback', async () => {
  const inputCSS = `
  c {
    color: var(--colorA);
  }
  `;

  const expectedOuput = `
  c {
    color: var(--colorA);
  }
  `;

  await run(inputCSS, expectedOuput, { })
})
