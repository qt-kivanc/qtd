import { useEffect, useState } from "react";

const useComponentSize = (comRef: React.RefObject<any>) => {

    const [size, setSize] = useState({
      width   : 0,
      height  : 0
    });
  
    useEffect(() => {

      if ( !comRef.current ) return;

      const sizeObserver = new ResizeObserver((entries) => {
        entries.forEach(({ target }) => {
          setSize({ width: target.clientWidth, height: target.clientHeight });
        });
      });

      sizeObserver.observe(comRef.current);
  
      return () => sizeObserver.disconnect();

    }, [comRef]);
  
    return [size];

  };

  export default useComponentSize;