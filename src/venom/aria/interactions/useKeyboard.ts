import {createEventHandler} from './createEventHandler';
import {DOMAttributes, KeyboardEvents} from 'venom/types/shared';

export interface KeyboardProps extends KeyboardEvents {
  /** Whether the keyboard events should be disabled. */
  isDisabled?: boolean
}

export interface KeyboardResult {
  /** Props to spread onto the target element. */
  keyboardProps: DOMAttributes
}

/**
 * Handles keyboard interactions for a focusable element.
 */
export function useKeyboard(props: KeyboardProps): KeyboardResult {
  return {
    keyboardProps: props.isDisabled ? {} : {
      onKeyDown: createEventHandler(props.onKeyDown),
      onKeyUp: createEventHandler(props.onKeyUp)
    }
  };
}