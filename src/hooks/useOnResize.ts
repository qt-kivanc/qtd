import { useEffect } from "react";

/**
 * 
 * window objesine event listener ekler ve 
 * sayfa resize olduğunda çağrılır.
 * 
 * @param {*} handler 
 * 
 */
const useOnResize = (handler: (event:Event) => void) => {

  useEffect(() => {

    const listener = (event:Event) => {

      handler(event);

    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };

  }, [handler]);
  
};

export default useOnResize;
