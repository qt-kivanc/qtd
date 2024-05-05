import { useEffect } from 'react';

/**
 * 
 * ADD EXTERNAL CSS
 * 
 * Dinamik css dosyalarını yüklemek için kullanılır. Eğer yüklenecek
 * olan css dosyası daha önce eklenmiş ise tekrar yüklemez. Bunu yükleyen
 * component ekrandan silinirse yüklediği yazı da silinir.
 * 
 * @param link      string
 * @param temporary boolean
 * 
 */
const useAddExternalCSS = (link: string, temporary = false) => {

  //const [ styleLink, SetStyleLink ] = useState(null);

  useEffect(() => {

    var found = false;
    var head = document.head;
    var dynamicLink = createLink();

    document.querySelectorAll('head > link').forEach((css: HTMLLinkElement) => { 
  
      if (css.href.indexOf(link) !== -1) 
        found = true;
    
    });
    
    if (!found) {
      head.appendChild(dynamicLink);
      //SetStyleLink(dynamicLink);
    }

    return () => { 
      if ( temporary ) {
        document.querySelectorAll('head > link').forEach((css: HTMLLinkElement) => { 
  
          if (css.href.indexOf(link) !== -1) {
            document.head.removeChild(css);
          }
        
        });
      }

    }

  }, [link]);

  const createLink = () => {
    
    var dynamicLink = document.createElement("link");
        dynamicLink.type = "text/css";
        dynamicLink.rel = "stylesheet";
        dynamicLink.href = link;

    return dynamicLink;

  }

};

export default useAddExternalCSS;