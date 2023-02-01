export default function FindSelector(searchClassName) {

  let found = false;

  document.querySelectorAll('head > style').forEach(css => { 
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