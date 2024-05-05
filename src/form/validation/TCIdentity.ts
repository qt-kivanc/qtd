function isNumeric(value:string) {
  return /^-?\d+$/.test(value);
}

export default function TCIdentity(identity:string) {

  var single = 0,
      double = 0,
      result = 0,
      totalNumber = 0,
      i = 0;

    if (identity.length != 11)    return false;
    if (isNumeric(identity))      return false;
    if (Number(identity[0]) == 0) return false;

    single  = parseInt(identity[0]) 
            + parseInt(identity[2]) 
            + parseInt(identity[4]) 
            + parseInt(identity[6]) 
            + parseInt(identity[8]);

    double  = parseInt(identity[1]) 
            + parseInt(identity[3])
            + parseInt(identity[5])
            + parseInt(identity[7]);

    single = single * 7;

    result = Math.abs(single - double);
    
    if (result % 10 != Number(identity[9])) return false;

    for (var i = 0; i < 10; i++) {
      totalNumber += parseInt(identity[i]);
    }

    if (totalNumber % 10 != Number(identity[10])) return false;

    return true;

};