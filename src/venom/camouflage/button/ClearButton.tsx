import {AriaButtonElementTypeProps, ButtonProps} from 'venom/types/button';
import {classNames, useFocusableRef, useStyleProps} from 'venom/camouflage/utils';
import CrossSmall from '@spectrum-icons/ui/CrossSmall';
import {DOMProps, FocusableRef, StyleProps} from 'venom/types/shared';
import {FocusRing} from 'venom/aria/focus';
import {mergeProps} from 'venom/aria/utils';
import React, {ElementType} from 'react';
import styles from '@adobe/spectrum-css-temp/components/button/vars.css';
import {useButton} from 'venom/aria/button';
import {useHover} from 'venom/aria/interactions';

interface ClearButtonProps<T extends ElementType = 'button'> extends ButtonProps, AriaButtonElementTypeProps<T>, DOMProps, StyleProps {
  focusClassName?: string,
  variant?: 'overBackground',
  excludeFromTabOrder?: boolean,
  preventFocus?: boolean
}

function ClearButton(props: ClearButtonProps, ref: FocusableRef<HTMLButtonElement>) {
  let {
    children = <CrossSmall UNSAFE_className={styles['spectrum-Icon']} />,
    focusClassName,
    variant,
    autoFocus,
    isDisabled,
    preventFocus,
    elementType = preventFocus ? 'div' : 'button' as ElementType,
    ...otherProps
  } = props;
  let domRef = useFocusableRef(ref);
  let {buttonProps, isPressed} = useButton({...props, elementType}, domRef);
  let {hoverProps, isHovered} = useHover({isDisabled});
  let {styleProps} = useStyleProps(otherProps);

  // For cases like the clear button in a search field, remove the tabIndex so
  // iOS 14 with VoiceOver doesn't focus the button and hide the keyboard when
  // moving the cursor over the clear button.
  if (preventFocus) {
    delete buttonProps.tabIndex;
  }

  let ElementType = elementType;
  return (
    <FocusRing focusRingClass={classNames(styles, 'focus-ring', focusClassName)} autoFocus={autoFocus}>
      <ElementType
        {...styleProps}
        {...mergeProps(buttonProps, hoverProps)}
        ref={domRef}
        className={
          classNames(
            styles,
            'spectrum-ClearButton',
            {
              [`spectrum-ClearButton--${variant}`]: variant,
              'is-disabled': isDisabled,
              'is-active': isPressed,
              'is-hovered': isHovered
            },
            styleProps.className
          )
        }>
        {children}
      </ElementType>
    </FocusRing>
  );
}

let _ClearButton = React.forwardRef(ClearButton);
export {_ClearButton as ClearButton};