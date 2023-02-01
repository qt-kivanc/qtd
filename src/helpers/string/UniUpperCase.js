/**
 * 
 * 
 * 
 */
 export default function UniUpperCase(value = "", lang = "tr") {

  var letters = { 
    "i": "İ",
    "ş": "Ş",
    "ğ": "Ğ",
    "ü": "Ü",
    "ö": "Ö",
    "ç": "Ç",
    "ı": "I" 
  };
  
  if ( lang === "tr" ) {
    value = value.replace(/(([iışğüçö]))/g, (letter) => letters[letter] );
  }
  
  return value.toUpperCase();

}