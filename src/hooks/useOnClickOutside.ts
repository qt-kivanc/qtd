import { MutableRefObject, useEffect } from "react";

/**
 * 
 * document objesine event listener ekler ve ref dışarısında
 * herhangi bir alana tıklanıldığında ref'in kapatılmasını sağlar.
 * 
 * @param ref 
 * @param handler 
 * 
 */
const useOnClickOutside = (
  ref     : MutableRefObject<HTMLDivElement | null>, 
  handler : (event:PointerEvent) => void
) => {

  useEffect(() => {

    const listener = (event:PointerEvent) => {

      if ( !event.target ) return;
      if ( !ref ) return;
      if ( !ref.current || ref.current.contains((event.target as Node))) {
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
