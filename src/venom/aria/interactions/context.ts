import {FocusableElement} from 'venom/types/shared';
import {PressProps} from './usePress';
import React, {MutableRefObject} from 'react';

interface IPressResponderContext extends PressProps {
  register(): void,
  ref?: MutableRefObject<FocusableElement>
}

export const PressResponderContext = React.createContext<IPressResponderContext>(null);
PressResponderContext.displayName = 'PressResponderContext';