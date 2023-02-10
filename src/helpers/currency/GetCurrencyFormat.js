import GetCurrencySymbol from "./GetCurrencySymbol";

export default function GetCurrencyFormat(value, currency = "") {
  
  if (currency === "") {
    throw new Error("Currency Error: You must send the currency (EUR, USD, TRY, etc...");
  }

  if ( value === "" ) return "";
  value = `${GetCurrencySymbol(currency)} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return value;
    
}