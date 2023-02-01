/**
 * 
 * @param {*} theme 
 */
export default function UpdateThemeStyle(theme) {

  var themeRules = "";
  var sheet = document.styleSheets[0];

  Object.keys(theme).forEach((property, i) => {
      
    themeRules += `${property}:${theme[property]};`;

  });

  if (sheet.hasOwnProperty('cssRules')) {
    sheet.cssRules[0].style.cssText = themeRules;
  }

}