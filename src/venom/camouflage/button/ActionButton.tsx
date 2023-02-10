import {classNames, SlotProvider, useFocusableRef, useSlotProps, useStyleProps} from 'venom/camouflage/utils';
import CornerTriangle from '@spectrum-icons/ui/CornerTriangle';
import {FocusableRef} from 'venom/types/shared';
import {FocusRing} from 'venom/aria/focus';
import {mergeProps} from 'venom/aria/utils';
import React from 'react';
import {SpectrumActionButtonProps} from 'venom/types/button';
import styles from '@adobe/spectrum-css-temp/components/button/vars.css';
import {Text} from '@react-spectrum/text';
import {useButton} from 'venom/aria/button';
import {useHover} from 'venom/aria/interactions';
import {useProviderProps} from '@react-spectrum/provider';

function ActionButton(props: SpectrumActionButtonProps, ref: FocusableRef<HTMLButtonElement>) {
  props = useProviderProps(props);
  props = useSlotProps(props, 'actionButton');
  let {
    isQuiet,
    isDisabled,
    staticColor,
    children,
    autoFocus,
    // @ts-ignore (private)
    holdAffordance,
    ...otherProps
  } = props;

  let domRef = useFocusableRef(ref);
  let {buttonProps, isPressed} = useButton(props, domRef);
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
              'spectrum-ActionButton--staticColor': !!staticColor,
              'spectrum-ActionButton--staticWhite': staticColor === 'white',
              'spectrum-ActionButton--staticBlack': staticColor === 'black',
              'is-active': isPressed,
              'is-disabled': isDisabled,
              'is-hovered': isHovered
            },
            styleProps.className
          )
        }>
        {holdAffordance &&
          <CornerTriangle UNSAFE_className={classNames(styles, 'spectrum-ActionButton-hold')} />
        }
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
 * ActionButtons allow users to perform an action.
 * They’re used for similar, task-based options within a workflow, and are ideal for interfaces where buttons aren’t meant to draw a lot of attention.
 */
let _ActionButton = React.forwardRef(ActionButton);
export {_ActionButton as ActionButton};