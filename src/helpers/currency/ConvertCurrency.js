export default function ConvertCurrency(balance, currency) {
  
  if ( !balance ) balance = 0;
  
  if ( currency === "TRY" ) {
    return getBalance(balance, currency, "₺");
  }
  else if ( currency === "USD" ) {
    return getBalance(balance, currency, "$");
  }
  else if ( currency === "EUR" ) {
    return getBalance(balance, currency, "€");
  }
  else {
    return getBalance(balance, currency, "?");
  }
  
}

const getBalance = (balance, symbol) => {

  let isNegative = false;
  let _balance = parseFloat(balance).toFixed(2);
    
  if ( _balance.indexOf("-") > -1 ) {
    isNegative = true;
    _balance = _balance.split("-")[1];
  } 

  return (isNegative ? "-" : "") + symbol + _balance;

}