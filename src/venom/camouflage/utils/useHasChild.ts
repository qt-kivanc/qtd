import {RefObject, useState} from 'react';
import {useLayoutEffect} from 'venom/aria/utils';

export function useHasChild(query: string, ref: RefObject<HTMLElement>) {
  let [hasChild, setHasChild] = useState(true);
  useLayoutEffect(() => {
    setHasChild(!!(ref.current && ref.current.querySelector(query)));
  }, [setHasChild, query, ref]);
  return hasChild;
}