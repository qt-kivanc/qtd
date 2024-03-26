import { useEffect } from "react";

/**
 * 
 * window objesine event listener ekler ve 
 * kullanıcı online ve offline olduğunda çağrılır.
 * 
 * @param {*} handler 
 * 
 */
const useConnectionStatus = (handler: (event:Event) => void) => {

  useEffect(() => {

    const listener = (event: Event) => {

      handler(event);

    };

    window.addEventListener("online", listener);

    return () => {
      window.removeEventListener("online", listener);
    };

  }, [handler]);
  
};

export default useConnectionStatus;
