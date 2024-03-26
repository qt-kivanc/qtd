export default function FindSelector(searchClassName: string) {

  let found = false;

  document.querySelectorAll('head > style').forEach((css:any) => { 
    Array(css.sheet.rules).forEach(rule => {
      
        for(var i=0; i < rule.length; i++ ) {
  
          if ( rule[i].cssText.search(searchClassName) > -1 ) {
            found = true;
          }
     
        }
      
      
    })
  });

  return found;

};