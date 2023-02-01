import { useEffect } from "react";

/**
 * 
 * document objesine event listener ekler ve ref dışarısında
 * herhangi bir alana tıklanıldığında ref'in kapatılmasını sağlar.
 * 
 * @param {*} ref 
 * @param {*} handler 
 * 
 */
const useOnClickOutside = (ref, handler) => {

  useEffect(() => {

    const listener = event => {

      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);

    };

    document.addEventListener("pointerdown", listener);

    return () => {
      document.removeEventListener("pointerdown", listener);
    };

  }, [ref, handler]);
  
};

export default useOnClickOutside;
