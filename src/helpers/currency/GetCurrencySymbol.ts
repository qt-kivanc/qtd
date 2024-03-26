export default function GetCurrencySymbol(currency = "") {

  if (currency === "") {
    throw new Error("Currency Error: You must send the currency (EUR, USD, TRY, etc...");
  }

  if ( currency === "TRY" ) return "₺";
  if ( currency === "USD" ) return "$";
  if ( currency === "EUR" ) return "€";
  
  return "?";
  
}