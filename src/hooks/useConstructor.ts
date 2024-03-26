import { useState } from "react";

/**
 * 
 * This hook acting like a class constructor.
 * 
 * @param {*} callBack 
 * 
 * @returns 
 * 
 */
const useConstructor = (callBack: () => void = () => {}) => {

  const [hasBeenCalled, setHasBeenCalled] = useState(false);

  if (hasBeenCalled) return;

  callBack();
  setHasBeenCalled(true);

}

export default useConstructor;