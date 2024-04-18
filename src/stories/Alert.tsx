import {Alert as AlertComponent, AlertProps} from '../index';
import {AlertDefaultProps} from '../alert/index';
import { AlertSize, AlertType } from 'types/AlertProps';

interface StoryAlertProps extends AlertProps {

  type      : AlertType,
  size      : AlertSize,
  children  : string

}

export const Alert: React.FC<any> = ({
  type,
  size,
  children,
  ...props
}: StoryAlertProps) => {

  const style = {
    width           : "500px",
    display         : "flex",
    justifyContent  : "center"
  }

  return (
    <div style={{...style}}>
      <AlertComponent
        type    = {type}
        size    = {size}
        {...props}
      >
        {children}
      </AlertComponent>
    </div>
  );

};

Alert.defaultProps = AlertDefaultProps;
