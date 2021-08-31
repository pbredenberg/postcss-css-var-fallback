'use strict';

module.exports = () => {

   return {
      postcssPlugin: 'postcss-var-fallback',

      // Root (root) {
      //   // Transform CSS AST here
      //   console.log('Whats in root?', root);
      // },

      Root(root) {
         //console.log('ROOT:', root);
         root.walkDecls(decl => {
            //console.log('DECL:', decl);
            const regex = new RegExp(/var\((--[\w|-]+)(,\s?[#|\w|-]+)?\)/g);

            var getVarFallback = function(value) {
               const insideParenRegEx = new RegExp(/\(([^)]+)\)/);

               const varParams = value.match(insideParenRegEx);
               const params = varParams[1].split(',');
               if (params[1]) {
                  return params[1].trim(); // Return second (fallback) param
               }
            }

            if (decl.value.match(regex)) {

               const propValue = decl.prop;
               const fallback = getVarFallback(decl.value);

               if (fallback) {
                  decl.cloneBefore({ prop: propValue, value: fallback })
               }
               //console.log('Prop value =', propValue);
               //console.log('Fallback value =', fallback);
            }
         });
      },
   }
}
module.exports.postcss = true
