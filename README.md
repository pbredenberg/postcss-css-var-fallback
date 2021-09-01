# PostCSS CSS Var Fallback

[PostCSS] plugin to insert fallbacks for CSS Custom Properties.

[PostCSS]: https://github.com/postcss/postcss

```css
.foo {
   /* Input example */
   color: var(--color, #4a6da7);
}
```

```css
.foo {
   /* Output example */
   color: #4a6da7;
   color: var(--color, #4a6da7);
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-css-var-fallback
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-css-var-fallback'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
