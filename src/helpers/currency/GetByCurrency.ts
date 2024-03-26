import GetCountryCodeByCurrencyCode from "../country/GetCountryCodeByCurrencyCode";

export default function GetByCurrency(value: number, symbol = true, currency = "") {
  
  if (currency === "") {
    throw new Error("Currency Error: You must send the currency (EUR, USD, TRY, etc...");
  }

  let country = GetCountryCodeByCurrencyCode(currency);

  return  symbol 
          ? new Intl.NumberFormat(
            country, 
              { 
                style: 'currency', 
                currency: currency 
              }
            ).format(value) 
          : value;
    
}