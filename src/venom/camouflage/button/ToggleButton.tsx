import {classNames, SlotProvider, useFocusableRef, useStyleProps} from 'venom/camouflage/utils';
import {FocusableRef} from 'venom/types/shared';
import {FocusRing} from 'venom/aria/focus';
import {mergeProps} from 'venom/aria/utils';
import React from 'react';
import {SpectrumToggleButtonProps} from 'venom/types/button';
import styles from '@adobe/spectrum-css-temp/components/button/vars.css';
import {Text} from '@react-spectrum/text';
import {useHover} from 'venom/aria/interactions';
import {useProviderProps} from '@react-spectrum/provider';
import {useToggleButton} from 'venom/aria/button';
import {useToggleState} from 'venom/stately/toggle';

function ToggleButton(props: SpectrumToggleButtonProps, ref: FocusableRef<HTMLButtonElement>) {
  props = useProviderProps(props);
  let {
    isQuiet,
    isDisabled,
    isEmphasized,
    staticColor,
    children,
    autoFocus,
    ...otherProps
  } = props;

  let domRef = useFocusableRef(ref);
  let state = useToggleState(props);
  let {buttonProps, isPressed} = useToggleButton(props, state, domRef);
  let {hoverProps, isHovered} = useHover({isDisabled});
  let {styleProps} = useStyleProps(otherProps);
  let isTextOnly = React.Children.toArray(props.children).every(c => !React.isValidElement(c));

  return (
    <FocusRing focusRingClass={classNames(styles, 'focus-ring')} autoFocus={autoFocus}>
      <button
        {...styleProps}
        {...mergeProps(buttonProps, hoverProps)}
        ref={domRef}
        className={
          classNames(
            styles,
            'spectrum-ActionButton',
            {
              'spectrum-ActionButton--quiet': isQuiet,
              'spectrum-ActionButton--emphasized': isEmphasized,
              'spectrum-ActionButton--staticColor': !!staticColor,
              'spectrum-ActionButton--staticWhite': staticColor === 'white',
              'spectrum-ActionButton--staticBlack': staticColor === 'black',
              'is-active': isPressed,
              'is-disabled': isDisabled,
              'is-hovered': isHovered,
              'is-selected': state.isSelected
            },
            styleProps.className
          )
        }>
        <SlotProvider
          slots={{
            icon: {
              size: 'S',
              UNSAFE_className: classNames(styles, 'spectrum-Icon')
            },
            text: {
              UNSAFE_className: classNames(styles, 'spectrum-ActionButton-label')
            }
          }}>
          {typeof children === 'string' || isTextOnly
            ? <Text>{children}</Text>
            : children}
        </SlotProvider>
      </button>
    </FocusRing>
  );
}

/**
 * ToggleButtons allow users to toggle a selection on or off, for example
 * switching between two states or modes.
 */
let _ToggleButton = React.forwardRef(ToggleButton);
export {_ToggleButton as ToggleButton};
