export default function GetCountryCodeByCurrencyCode(currency = "") {
  
  if (currency === "") {
    throw new Error("Currency Error: You must send the currency (EUR, USD, TRY, etc...");
  }

  if ( currency === "TRY" )       return "tr";
  else if ( currency === "EUR" )  return "eu";
  else if ( currency === "USD" )  return "en";
  else if ( currency === "GBP" )  return "uk";

  return "tr";
    
}