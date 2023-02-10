import {Dispatch, useCallback, useRef, useState} from 'react';
import {useLayoutEffect} from './';

type SetValueAction<S> = (prev: S) => Generator<any, void, unknown>;

// This hook works like `useState`, but when setting the value, you pass a generator function
// that can yield multiple values. Each yielded value updates the state and waits for the next
// layout effect, then continues the generator. This allows sequential updates to state to be
// written linearly.
export function useValueEffect<S>(defaultValue: S | (() => S)): [S, Dispatch<SetValueAction<S>>] {
  let [value, setValue] = useState(defaultValue);
  let valueRef = useRef(value);
  let effect = useRef(null);

  valueRef.current = value;

  // Store the function in a ref so we can always access the current version
  // which has the proper `value` in scope.
  let nextRef = useRef(null);
  nextRef.current = () => {
    // Run the generator to the next yield.
    let newValue = effect.current.next();

    // If the generator is done, reset the effect.
    if (newValue.done) {
      effect.current = null;
      return;
    }

    // If the value is the same as the current value,
    // then continue to the next yield. Otherwise,
    // set the value in state and wait for the next layout effect.
    if (value === newValue.value) {
      nextRef.current();
    } else {
      setValue(newValue.value);
    }
  };

  useLayoutEffect(() => {
    // If there is an effect currently running, continue to the next yield.
    if (effect.current) {
      nextRef.current();
    }
  });

  let queue = useCallback(fn => {
    effect.current = fn(valueRef.current);
    nextRef.current();
  }, [effect, nextRef]);

  return [value, queue];
}
