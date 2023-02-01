import { useEffect } from "react";

/**
 * 
 * window objesine event listener ekler ve 
 * sayfa resize olduğunda çağrılır.
 * 
 * @param {*} handler 
 * 
 */
const useOnResize = (handler) => {

  useEffect(() => {

    const listener = event => {

      handler(event);

    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };

  }, [handler]);
  
};

export default useOnResize;
