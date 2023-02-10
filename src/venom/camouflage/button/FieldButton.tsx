import {ButtonProps} from 'venom/types/button';
import {classNames, SlotProvider, useFocusableRef, useSlotProps, useStyleProps} from 'venom/camouflage/utils';
import {DOMProps, FocusableRef, StyleProps} from 'venom/types/shared';
import {FocusRing} from 'venom/aria/focus';
import {mergeProps} from 'venom/aria/utils';
import React, {RefObject} from 'react';
import styles from '@adobe/spectrum-css-temp/components/button/vars.css';
import {useButton} from 'venom/aria/button';
import {useHover} from 'venom/aria/interactions';

interface FieldButtonProps extends ButtonProps, DOMProps, StyleProps {
  isQuiet?: boolean,
  isActive?: boolean,
  validationState?: 'valid' | 'invalid',
  focusRingClass?: string
}

// @private
function FieldButton(props: FieldButtonProps, ref: FocusableRef) {
  props = useSlotProps(props, 'button');
  let {
    isQuiet,
    isDisabled,
    validationState,
    children,
    autoFocus,
    isActive,
    focusRingClass,
    ...otherProps
  } = props;
  let domRef = useFocusableRef(ref) as RefObject<HTMLButtonElement>;
  let {buttonProps, isPressed} = useButton(props, domRef);
  let {hoverProps, isHovered} = useHover({isDisabled});
  let {styleProps} = useStyleProps(otherProps);

  return (
    <FocusRing focusRingClass={classNames(styles, 'focus-ring', focusRingClass)} autoFocus={autoFocus}>
      <button
        {...mergeProps(buttonProps, hoverProps)}
        ref={domRef}
        className={
          classNames(
            styles,
            'spectrum-FieldButton',
            {
              'spectrum-FieldButton--quiet': isQuiet,
              'is-active': isActive || isPressed,
              'is-disabled': isDisabled,
              'spectrum-FieldButton--invalid': validationState === 'invalid',
              'is-hovered': isHovered
            },
            styleProps.className
          )
        }>
        <SlotProvider
          slots={{
            icon: {
              size: 'S',
              UNSAFE_className: classNames(styles, 'spectrum-Icon')
            }
          }}>
          {children}
        </SlotProvider>
      </button>
    </FocusRing>
  );
}

let _FieldButton = React.forwardRef(FieldButton);
export {_FieldButton as FieldButton};