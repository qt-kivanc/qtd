const useComponentSize = (comRef) => {

    const [size, setSize] = React.useState({
      width: 0,
      height: 0
    });
  
    React.useEffect(() => {
      const sizeObserver = new ResizeObserver((entries, observer) => {
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