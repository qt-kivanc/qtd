export default function AddZero( num: string ) {
  
  var value : number | string = Number(num);
  var res = num.toString().split(".");
  
  if(num.toString().indexOf('.') === -1) {
    
    value = value.toFixed(2);
    num = value.toString();
    
  } 
  else if (res[1].length < 3 || res[1].length > 2) {
    
    value = value.toFixed(2);
    num = value.toString();
    
  }
  
  return parseFloat(num).toFixed(2);

}