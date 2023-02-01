import { useEffect } from "react";

/**
 * 
 * window objesine event listener ekler ve 
 * kullanıcı online ve offline olduğunda çağrılır.
 * 
 * @param {*} handler 
 * 
 */
const useConnectionStatus = (handler) => {

  useEffect(() => {

    const listener = event => {

      handler(event);

    };

    window.addEventListener("online", listener);

    return () => {
      window.removeEventListener("online", listener);
    };

  }, [handler]);
  
};

export default useConnectionStatus;
