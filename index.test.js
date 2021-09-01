const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts = { }) {
   let result = await postcss([plugin(opts)]).process(input, { from: undefined })
   expect(result.css).toEqual(output)
   expect(result.warnings()).toHaveLength(0)
}

it('Inserts simple hex fallback', async () => {
   const inputCSS = `
   a {
      color: var(--color, #090);
   }
   `;

   const expectedOuput = `
   a {
      color: #090;
      color: var(--color, #090);
   }
   `;

   await run(inputCSS, expectedOuput, { })
})

it('Inserts hex fallback', async () => {
   const inputCSS = `
   a {
      color: var(--color, #ffffff);
   }
   `;

   const expectedOuput = `
   a {
      color: #ffffff;
      color: var(--color, #ffffff);
   }
   `;

   await run(inputCSS, expectedOuput, { })
})

it('Inserts complex hex fallback', async () => {
   const inputCSS = `
   a {
      color: var(--color, #4a6da7);
   }
   `;

   const expectedOuput = `
   a {
      color: #4a6da7;
      color: var(--color, #4a6da7);
   }
   `;

   await run(inputCSS, expectedOuput, { })
})

it('Inserts css color name fallback', async () => {
   const inputCSS = `
      .test {
         color: var(--color, firebrick);
      }
   `;

   const expectedOuput = `
      .test {
         color: firebrick;
         color: var(--color, firebrick);
      }
   `;

   await run(inputCSS, expectedOuput, { })
})

it('Inserts rgba fallback', async () => {
   const inputCSS = `
   #test {
      color: var(--color, rgba(255, 255, 255, 0.3));
   }
   `;

   const expectedOuput = `
   #test {
      color: rgba(255, 255, 255, 0.3);
      color: var(--color, rgba(255, 255, 255, 0.3));
   }
   `;

   await run(inputCSS, expectedOuput, { })
})

it('Inserts rgb fallback', async () => {
   const inputCSS = `
      .test {
         color: var(--color, rgb(255, 255, 255));
      }
   `;

   const expectedOuput = `
      .test {
         color: rgb(255, 255, 255);
         color: var(--color, rgb(255, 255, 255));
      }
   `;

   await run(inputCSS, expectedOuput, { })
})

it('Inserts hsla fallback', async () => {
   const inputCSS = `
      .test {
         color: var(--color, hsla(30, 100%, 50%, 0.6));
      }
   `;

   const expectedOuput = `
      .test {
         color: hsla(30, 100%, 50%, 0.6);
         color: var(--color, hsla(30, 100%, 50%, 0.6));
      }
   `;

   await run(inputCSS, expectedOuput, { })
})

it('Inserts hsl fallback', async () => {
   const inputCSS = `
      .test {
         color: var(--color, hsl(30.0 100% 50% / 60%));
      }
   `;

   const expectedOuput = `
      .test {
         color: hsl(30.0 100% 50% / 60%);
         color: var(--color, hsl(30.0 100% 50% / 60%));
      }
   `;

   await run(inputCSS, expectedOuput, { })
})

it('Inserts no fallback', async () => {
   const inputCSS = `
      .test {
         color: var(--color);
      }
   `;

   const expectedOuput = `
      .test {
         color: var(--color);
      }
   `;

   await run(inputCSS, expectedOuput, { })
})
