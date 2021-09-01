'use strict';

module.exports = () => {

   return {
      postcssPlugin: 'postcss-var-fallback',

      Root(root) {
         root.walkDecls(decl => {
            // Capture declarations with include var()
            const regex = new RegExp(/var\(/);

            var getVarFallback = function(value) {
               // Capture everything within var() https://regex101.com/r/7UYMv8/1
               const insideParenRegEx = new RegExp(/var\(([^()]*\([^)]*\)|[^)]*)\)/);
               // Capture everything from first comma to end of string
               const fallbackRegEx = new RegExp(/,(.*$)/);

               const varParams = value.match(insideParenRegEx);
               const fallback = varParams[1].match(fallbackRegEx);
               if (fallback != null) {
                  return fallback[1].trim();
               }
            }

            if (decl.value.match(regex)) {

               const propValue = decl.prop;
               const fallback = getVarFallback(decl.value);

               if (fallback) {
                  decl.cloneBefore({ prop: propValue, value: fallback })
               }
            }
         });
      },
   }
}
module.exports.postcss = true
