import {ToggleProps} from 'venom/types/checkbox/index';
import {useControlledState} from 'venom/stately/utils';

export interface ToggleState {
  /** Whether the toggle is selected. */
  readonly isSelected: boolean,

  /** Updates selection state. */
  setSelected(isSelected: boolean): void,

  /** Toggle the selection state. */
  toggle(): void
}

/**
 * Provides state management for toggle components like checkboxes and switches.
 */
export function useToggleState(props: ToggleProps = {}): ToggleState {
  let {isReadOnly} = props;

  // have to provide an empty function so useControlledState doesn't throw a fit
  // can't use useControlledState's prop calling because we need the event object from the change
  let [isSelected, setSelected] = useControlledState(props.isSelected, props.defaultSelected || false, props.onChange);

  function updateSelected(value) {
    if (!isReadOnly) {
      setSelected(value);
    }
  }

  function toggleState() {
    if (!isReadOnly) {
      setSelected(!isSelected);
    }
  }

  return {
    isSelected,
    setSelected: updateSelected,
    toggle: toggleState
  };
}