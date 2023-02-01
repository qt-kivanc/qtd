export default function GetCurrencySymbol(currency) {
  
  if ( currency === "TRY" ) {
    return "₺";
  }
  else if ( currency === "USD" ) {
    return "$";
  }
  else if ( currency === "EUR" ) {
    return "€";
  }
  else {
    return "?";
  }
  
}