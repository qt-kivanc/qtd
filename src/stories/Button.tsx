import './button.css';
import {Button as ButtonComponent, ButtonProps} from '../index';
import { ButtonSize, ButtonVariant } from 'types/ButtonProps';

interface StoryButtonProps extends ButtonProps {

  variant   : ButtonVariant,
  size      : ButtonSize,
  children  : string

}

export const Button: React.FC<any> = ({
  variant,
  size,
  children,
  ...props
}: StoryButtonProps) => {

  const style = {
    width           : "500px",
    display         : "flex",
    justifyContent  : "center"
  }

  return (
    <div style={{...style}}>
      <ButtonComponent
        variant = {variant}
        size    = {size}
        {...props}
      >
        {children}
      </ButtonComponent>
    </div>
  );

};
