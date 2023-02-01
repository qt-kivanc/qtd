export default function TCIdentity(identity) {

  var single = 0,
      double = 0,
      result = 0,
      totalNumber = 0,
      i = 0;

    if (identity.length != 11) return false;
    if (isNaN(identity)) return false;
    if (identity[0] == 0) return false;

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
    
    if (result % 10 != identity[9]) return false;

    for (var i = 0; i < 10; i++) {
      totalNumber += parseInt(identity[i]);
    }

    if (totalNumber % 10 != identity[10]) return false;

    return true;

};