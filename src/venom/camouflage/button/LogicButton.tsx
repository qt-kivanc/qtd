import {classNames, useFocusableRef, useStyleProps} from 'venom/camouflage/utils';
import {FocusableRef} from 'venom/types/shared';
import {FocusRing} from 'venom/aria/focus';
import {mergeProps} from 'venom/aria/utils';
import React from 'react';
import {SpectrumLogicButtonProps} from 'venom/types/button';
import styles from '@adobe/spectrum-css-temp/components/button/vars.css';
import {useButton} from 'venom/aria/button';
import {useHover} from 'venom/aria/interactions';
import {useProviderProps} from '@react-spectrum/provider';

function LogicButton(props: SpectrumLogicButtonProps, ref: FocusableRef<HTMLButtonElement>) {
  props = useProviderProps(props);
  let {
    variant,
    children,
    isDisabled,
    autoFocus,
    ...otherProps
  } = props;
  let domRef = useFocusableRef(ref);
  let {buttonProps, isPressed} = useButton(props, domRef);
  let {hoverProps, isHovered} = useHover({isDisabled});
  let {styleProps} = useStyleProps(otherProps);

  return (
    <FocusRing focusRingClass={classNames(styles, 'focus-ring')} autoFocus={autoFocus}>
      <button
        {...styleProps}
        {...mergeProps(buttonProps, hoverProps)}
        ref={domRef}
        className={
          classNames(
            styles,
            'spectrum-LogicButton',
            {
              [`spectrum-LogicButton--${variant}`]: variant,
              'is-disabled': isDisabled,
              'is-active': isPressed,
              'is-hovered': isHovered
            },
            styleProps.className
          )
        }>
        <span className={classNames(styles, 'spectrum-Button-label')}>{children}</span>
      </button>
    </FocusRing>
  );
}

/**
 * A LogicButton displays an operator within a boolean logic sequence.
 */
let _LogicButton = React.forwardRef(LogicButton);
export {_LogicButton as LogicButton};