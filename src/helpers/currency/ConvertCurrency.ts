export default function ConvertCurrency(balance: number, currency: string) {
  
  if ( !balance ) balance = 0;
  
  if ( currency === "TRY" ) {
    return getBalance(balance, "₺");
  }
  else if ( currency === "USD" ) {
    return getBalance(balance, "$");
  }
  else if ( currency === "EUR" ) {
    return getBalance(balance, "€");
  }
  else {
    return getBalance(balance, "?");
  }
  
}

const getBalance = (balance: number, symbol: string) => {

  let isNegative = false;
  let _balance = parseFloat(String(balance)).toFixed(2);
    
  if ( _balance.indexOf("-") > -1 ) {
    isNegative = true;
    _balance = _balance.split("-")[1];
  } 

  return (isNegative ? "-" : "") + symbol + _balance;

}