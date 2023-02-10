export default function GetDecimalByCurrency(currency = "") {
  
  if (currency === "") {
    throw new Error("Currency Error: You must send the currency (EUR, USD, TRY, etc...");
  }

  if ( currency === "TRY" ) return ",";
  if ( currency === "EUR" ) return ".";
  if ( currency === "USD" ) return ".";

  return ",";
    
}