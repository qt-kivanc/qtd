import {DOMAttributes, FocusEvents} from 'venom/types/shared';
import {FocusEvent, useCallback} from 'react';
import {useSyntheticBlurEvent} from './utils';

export interface FocusProps extends FocusEvents {
  /** Whether the focus events should be disabled. */
  isDisabled?: boolean
}

export interface FocusResult {
  /** Props to spread onto the target element. */
  focusProps: DOMAttributes
}

/**
 * Handles focus events for the immediate target.
 * Focus events on child elements will be ignored.
 */
export function useFocus(props: FocusProps): FocusResult {
  let {
    isDisabled,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    onFocusChange
  } = props;

  const onBlur: FocusProps['onBlur'] = useCallback((e: FocusEvent) => {
    if (e.target === e.currentTarget) {
      if (onBlurProp) {
        onBlurProp(e);
      }

      if (onFocusChange) {
        onFocusChange(false);
      }

      return true;
    }
  }, [onBlurProp, onFocusChange]);


  const onSyntheticFocus = useSyntheticBlurEvent(onBlur);

  const onFocus: FocusProps['onFocus'] = useCallback((e: FocusEvent) => {
    if (e.target === e.currentTarget) {
      if (onFocusProp) {
        onFocusProp(e);
      }

      if (onFocusChange) {
        onFocusChange(true);
      }

      onSyntheticFocus(e);
    }
  }, [onFocusChange, onFocusProp, onSyntheticFocus]);

  return {
    focusProps: {
      onFocus: (!isDisabled && (onFocusProp || onFocusChange || onBlurProp)) ? onFocus : undefined,
      onBlur: (!isDisabled && (onBlurProp || onFocusChange)) ? onBlur : undefined
    }
  };
}