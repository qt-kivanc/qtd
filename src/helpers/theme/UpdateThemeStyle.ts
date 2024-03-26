/**
 * 
 * @param {*} theme 
 */
export default function UpdateThemeStyle(theme:string) {

  var themeRules = "";
  var sheet = document.styleSheets[0];

  Object.keys(theme).forEach((property) => {
      
    themeRules += `${property}:${theme[property]};`;

  });

  if (sheet.hasOwnProperty('cssRules')) {
    (sheet.cssRules[0] as CSSStyleRule).style.cssText = themeRules;
  }

}