import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  InputHTMLAttributes,
  RefObject
} from 'react';
import {AriaToggleButtonProps} from 'venom/types/button';
import {ButtonAria, useButton} from './useButton';
import {chain} from 'venom/aria/utils';
import {DOMAttributes} from 'venom/types/shared';
import {mergeProps} from 'venom/aria/utils';
import {ToggleState} from 'venom/stately/toggle';

export function useToggleButton(props: AriaToggleButtonProps<'a'>, state: ToggleState, ref: RefObject<HTMLAnchorElement>): ButtonAria<AnchorHTMLAttributes<HTMLAnchorElement>>;
export function useToggleButton(props: AriaToggleButtonProps<'button'>, state: ToggleState, ref: RefObject<HTMLButtonElement>): ButtonAria<ButtonHTMLAttributes<HTMLButtonElement>>;
export function useToggleButton(props: AriaToggleButtonProps<'div'>, state: ToggleState, ref: RefObject<HTMLDivElement>): ButtonAria<HTMLAttributes<HTMLDivElement>>;
export function useToggleButton(props: AriaToggleButtonProps<'input'>, state: ToggleState, ref: RefObject<HTMLInputElement>): ButtonAria<InputHTMLAttributes<HTMLInputElement>>;
export function useToggleButton(props: AriaToggleButtonProps<'span'>, state: ToggleState, ref: RefObject<HTMLSpanElement>): ButtonAria<HTMLAttributes<HTMLSpanElement>>;
export function useToggleButton(props: AriaToggleButtonProps<ElementType>, state: ToggleState, ref: RefObject<Element>): ButtonAria<DOMAttributes>;
/**
 * Provides the behavior and accessibility implementation for a toggle button component.
 * ToggleButtons allow users to toggle a selection on or off, for example switching between two states or modes.
 */
export function useToggleButton(props: AriaToggleButtonProps<ElementType>, state: ToggleState, ref: RefObject<any>): ButtonAria<HTMLAttributes<any>> {
  const {isSelected} = state;
  const {isPressed, buttonProps} = useButton({
    ...props,
    onPress: chain(state.toggle, props.onPress)
  }, ref);

  return {
    isPressed,
    buttonProps: mergeProps(buttonProps, {
      'aria-pressed': isSelected
    })
  };
}