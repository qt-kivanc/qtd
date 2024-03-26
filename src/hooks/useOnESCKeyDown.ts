import { useEffect } from "react";

/**
 * 
 * document objesine event listener ekler ve ESC tuşuna basıldığında
 * çağrılır.
 * 
 * @param {*} handler 
 * 
 */
const useOnESCKeyDown = (handler: (event:Event) => void) => {

  useEffect(() => {

    const listener = (event: Event | any) => {

      if ( event.keyCode !== 27 ) {
        return;
      }

      handler(event);

    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };

  }, [handler]);
  
};

export default useOnESCKeyDown;
